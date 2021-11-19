# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

## Setup
- setup hardhat
```shell
$ npx hardhat compile
the solidity code has been compiled

$ npx hardhat node 
20 accounts will be generated, copy the pvt key of any account into metamask and there will be 1000eths

$ npx hardhat run scripts/deploy.js --network localhost
contract deployed on local network

or 
$ npx hardhat run scripts/deploy.js --network ropsten
contract deployed on ropsten network
```
- run the following scripts in order
```shell
npm install
// config the hardhat config file with necessary configs
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
npm start
```

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
# chess-polygon

