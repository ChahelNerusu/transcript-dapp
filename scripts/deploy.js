/* eslint-env node */
// scripts/deploy.js
/* global ethers, process */

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const TranscriptRegistry = await ethers.getContractFactory("TranscriptRegistry");
  const registry = await TranscriptRegistry.deploy();
  await registry.deployed();

  console.log("TranscriptRegistry deployed to:", registry.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
