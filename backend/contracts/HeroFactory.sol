// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Hero , Summon Card Creator
/// @author Rohit Kodam
/// @notice You can use this contract for Hero and Summon Card generation.
contract HeroFactory is Ownable {
    /// @notice events for creation of Heroes, SummonCards.
    event HeroCreated(uint256 heroId, uint256 dna, uint8 species, uint8 rarity);

    event SummonCardCreated(uint256 cardId, uint8 species, uint8 rarity);

    uint256 modulus = 10**14;
    uint256 cooldownTime = 1 days;
    uint256 summoningTime = 2 days;

    uint256 randNonce = 0;

    /// @notice Structure for Heroes, SummonCards.
    struct Hero {
        uint256 dna;
        uint8 species;
        uint8 rarity;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }
    struct SummonCard {
        uint8 species;
        uint8 rarity;
        uint32 readyTime;
        bool used;
    }

    Hero[] public heroes;
    SummonCard[] public summonCards;

    mapping(uint256 => address) public heroToOwner;
    mapping(address => uint256) ownerHeroCount;
    mapping(uint256 => address) public summonCardToOwner;
    mapping(address => uint256) ownerSummonCardCount;

    /// @notice checks if only hero/card owner calls the function.
    modifier onlyOwnerOfHero(uint256 _heroId) {
        require(msg.sender == heroToOwner[_heroId]);
        _;
    }

    modifier onlyOwnerOfCard(uint256 _cardId) {
        require(msg.sender == summonCardToOwner[_cardId]);
        _;
    }

    ///@notice generates psudo-random number.
    function _generateRandomNumber() private returns (uint256) {
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % modulus;
    }

    ///@notice creates hero with given dna, species, rarity.
    function _createHero(
        uint256 _dna,
        uint8 _species,
        uint8 _rarity
    ) internal {
        heroes.push(
            Hero(
                _dna,
                _species,
                _rarity,
                1,
                uint32(block.timestamp + cooldownTime),
                0,
                0
            )
        );
        uint256 id = heroes.length - 1;
        heroToOwner[id] = msg.sender;
        ownerHeroCount[msg.sender]++;
        emit HeroCreated(id, _dna, _species, _rarity);
    }

    ///@notice creates summon card with given species, rarity.
    function _createSummonCard(uint8 _species, uint8 _rarity) internal {
        summonCards.push(
            SummonCard(
                _species,
                _rarity,
                uint32(block.timestamp + summoningTime),
                false
            )
        );
        uint256 id = summonCards.length - 1;
        summonCardToOwner[id] = msg.sender;
        ownerSummonCardCount[msg.sender]++;
        emit SummonCardCreated(id, _species, _rarity);
    }

    ///@notice creates the first hero of a player.
    function generateRandomHero() public {
        require(ownerHeroCount[msg.sender] == 0);
        uint256 randDna = _generateRandomNumber();
        uint8 randSpecies = uint8(randDna % 100);
        randDna /= 100;
        uint8 randRarity = uint8(randDna % 100);
        randDna /= 100;
        _createHero(randDna, randSpecies, randRarity);
    }

    ///@notice creates random summon card.
    function _generateRandomSummonCard() internal {
        uint256 randDna = _generateRandomNumber();
        uint8 randSpecies = uint8(randDna % 100);
        uint8 randRarity = uint8(randDna % 100);
        _createSummonCard(randSpecies, randRarity);
    }

    ///@notice uses the summon card to create a hero.
    function useSummoningCard(uint256 _id) public onlyOwnerOfCard(_id) {
        require(
            summonCards[_id].used == false &&
                summonCards[_id].readyTime <= block.timestamp
        );
        summonCards[_id].used = true;
        uint256 randDna = _generateRandomNumber();
        randDna /= 10000;
        _createHero(randDna, summonCards[_id].species, summonCards[_id].rarity);
    }
}
