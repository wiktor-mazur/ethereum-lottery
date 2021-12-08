require("@nomiclabs/hardhat-waffle");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: 'network',
  networks: {
    network: {
      url: process.env.NETWORK_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    }
  },
};
