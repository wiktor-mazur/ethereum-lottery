const { ethers } = require("hardhat");

async function main() {
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(3);

    console.log("Lottery deployed to:", lottery.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });