// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import "hardhat/console.sol";

contract MintALisa is ERC721URIStorage {
  // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721 ("MintALisa", "MONA") {
    console.log("This is my Mona Lisa Contract.");
  }

  function mintNFT(address recipient, string memory tokenURI)
        public virtual payable
        returns (uint256)
    {
        require(msg.value >= 10, "Not enough ETH sent; check price!");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
