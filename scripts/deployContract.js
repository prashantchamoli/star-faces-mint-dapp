const hre = require("hardhat");
const {merkleTree, default: MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.js");

const BASE_URI = 'ipfs://QmYVi9n4ssZ4GAMvuX8M7pZd1dgwVErX65c82JMLBXisSc/';
const proxyRegistryAddressRinkeby = "0xf57b2c51ded3a29e6891aba85459d600256cf317"; // google search
const proxyRegistryAddressMainnet = "0xa5409ec958c83c3f309868babaca7c86dcb077c1"; // google search



async function main() {
  // calculate merkle root from whitelist array
  const leafNodes = whitelist.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs : true });
  const root = merkleTree.getRoot();

  // Deploy contract

  const StarFaces = await hre.ethers.getContractFactory("StarFaces");
  const starFaces = await StarFaces.deploy(BASE_URI, root, proxyRegistryAddressRinkeby);

  await starFaces.deployed();

  console.log("StarFaces deployed to:", starFaces.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
