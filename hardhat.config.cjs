require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: process.env.LOCAL_RPC || "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  paths: {
    artifacts: "./frontend/src/artifacts"
  }
};
