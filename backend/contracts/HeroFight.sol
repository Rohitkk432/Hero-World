// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./HeroHelper.sol";

/// @title Hero Duels with other Heroes
/// @author Rohit Kodam
/// @notice hero duels ad helper functions.
contract HeroFight is HeroHelper {
    uint256 randNum = 0;
    uint256 attackVictoryProbability = 60;

    ///@notice generates psudo-random number.
    function randMod(uint256 _modulus) internal returns (uint256) {
        randNum++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    ///@notice triggers cooldown for a hero.
    function _triggerCooldown(Hero storage _hero) internal {
        _hero.readyTime = uint32(block.timestamp + cooldownTime);
    }

    ///@notice checks if cooldown is complete.
    function _isReady(Hero storage _hero) internal view returns (bool) {
        return (_hero.readyTime <= block.timestamp);
    }

    ///@notice determines the winner of the fight/duel between two heroes.
    function fight(uint256 _heroId, uint256 _targetId)
        external
        onlyOwnerOfHero(_heroId)
    {
        Hero storage myHero = heroes[_heroId];
        Hero storage enemyHero = heroes[_targetId];
        uint256 rand = randMod(100);
        if (rand <= attackVictoryProbability) {
            myHero.winCount++;
            myHero.level++;
            enemyHero.lossCount++;
            _generateRandomSummonCard();
            _triggerCooldown(myHero);
        } else {
            myHero.lossCount++;
            enemyHero.winCount++;
            _triggerCooldown(myHero);
        }
    }
}
