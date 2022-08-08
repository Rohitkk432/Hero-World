// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./HeroFight.sol";

/// @title Hero Transfering
/// @author Rohit Kodam
/// @notice You can use this contract for Transfering heroes.
contract HeroOwnership is HeroFight {
    /// @notice approved address for transfer of heroes.
    mapping(uint256 => address) heroAppovals;

    /// @notice events for Transfer, Approvals for transfer.
    event TransferSuccess(address _from, address _to, uint256 _tokenId);
    event ApprovalSuccess(address _from, address _to, uint256 _tokenId);

    /// @notice gives total number of heroes.
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerHeroCount[_owner];
    }

    /// @notice gives owner of a Hero.
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return heroToOwner[_tokenId];
    }

    /// @notice hero transfer function from --> to.
    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
        require(_from != _to);
        ownerHeroCount[_to]++;
        ownerHeroCount[_from]--;
        heroToOwner[_tokenId] = _to;
        emit TransferSuccess(_from, _to, _tokenId);
    }

    /// @notice transfer function only Owner can use
    function transfer(address _to, uint256 _tokenId)
        public
        onlyOwnerOfHero(_tokenId)
    {
        require(msg.sender != _to);
        _transfer(msg.sender, _to, _tokenId);
    }

    /// @notice approve function only Owner can use to approve others to takeOwnership of a Hero.
    function approve(address _to, uint256 _tokenId)
        public
        onlyOwnerOfHero(_tokenId)
    {
        require(msg.sender != _to);
        heroAppovals[_tokenId] = _to;
        emit ApprovalSuccess(msg.sender, _to, _tokenId);
    }

    /// @notice approved address can use it to takeOwnership of a Hero.
    function takeOwnership(uint256 _tokenId) public {
        require(heroAppovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        require(heroAppovals[_tokenId] != owner);
        _transfer(owner, msg.sender, _tokenId);
    }

    ///@notice gets all heroes approved for you to take ownership.
    function getHeroesApprovedForYou(address _you)
        external
        view
        returns (Hero[] memory)
    {
        uint256 arrayCount = 0;
        for (uint256 i = 0; i < heroes.length; i++) {
            if (heroAppovals[i] == _you && heroToOwner[i] != _you) {
                arrayCount++;
            }
        }
        Hero[] memory result = new Hero[](arrayCount);
        uint256 counter = 0;
        for (uint256 i = 0; i < heroes.length; i++) {
            if (heroAppovals[i] == _you && heroToOwner[i] != _you) {
                result[counter] = heroes[i];
                counter++;
            }
        }
        return result;
    }
}
