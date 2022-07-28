// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./HeroFight.sol";
import "@openzeppelin/contracts/token/ERC721.sol";


/// @title Hero Transfering
/// @author Rohit Kodam
/// @notice You can use this contract for Transfering heroes.
contract HeroOwnership is HeroFight, ERC721 {
    
    using SafeMath for uint256;

    /// @notice approved address for transfer of heroes.
    mapping (uint => address) heroAppovals;

    /// @notice events for Transfer, Approvals for transfer.
    event TransferSuccess(address _from, address _to, uint256 _tokenId);
    event ApprovalSuccess(address _from, address _to, uint256 _tokenId);
    
    /// @notice gives total number of heroes.
    function balanceOf(address _owner) public view returns (uint256 _balance){
        return ownerHeroCount[_owner];
    }

    /// @notice gives owner of a Hero.
    function ownerOf(uint256 _tokenId) public view returns (address _owner){
        return heroToOwner[_tokenId];
    }

    /// @notice hero transfer function from --> to.
    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerHeroCount[_to] = ownerHeroCount[_to].add(1);
        ownerHeroCount[msg.sender]= ownerHeroCount[msg.sender].sub(1);
        heroToOwner[_tokenId] = _to;
        emit TransferSuccess(_from, _to, _tokenId);
    }

    /// @notice transfer function only Owner can use
    function transfer(address _to,uint256 _tokenId) public onlyOwnerOfHero(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    /// @notice approve function only Owner can use to approve others to takeOwnership of a Hero.
    function approve(address _to,uint256 _tokenId) public onlyOwnerOfHero(_tokenId) {
        heroAppovals[_tokenId] = _to;
        emit ApprovalSuccess(msg.sender, _to, _tokenId);
    }

    /// @notice approved address can use it to takeOwnership of a Hero.
    function takeOwnerShip(uint256 _tokenId) public{
        require(heroAppovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner,msg.sender,_tokenId);
    }
}
