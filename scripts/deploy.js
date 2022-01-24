const main = async () => {
    const dandyContractFactory = await hre.ethers.getContractFactory("DandyTransaction");
    const dandyContract = await dandyContractFactory.deploy();
    await dandyContract.deployed();

    console.log("Contract deployed to:", dandyContract.address);
};

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};

runMain();
