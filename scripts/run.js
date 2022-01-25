const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const receiverAddress = "0xcfa5AF3F2f986f373B8374E842350431e523e6cf";

    const dandyContractFactory = await hre.ethers.getContractFactory("DandyTransaction");
    const dandyContract = await dandyContractFactory.deploy({
        value: hre.ethers.utils.parseEther("1"),
    });
    await dandyContract.deployed();

    console.log("Contract deployed to:", dandyContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(dandyContract.address);
    console.log("Contract balance:",hre.ethers.utils.formatEther(contractBalance));

    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Owner balance:",hre.ethers.utils.formatEther(ownerBalance));

    let randomPersonBalance = await hre.ethers.provider.getBalance(randomPerson.address);
    console.log("Random person balance:",hre.ethers.utils.formatEther(randomPersonBalance));

    let txn;
    txn = await dandyContract.getTotalTransaction();
    console.log("Total transaction:", txn.toNumber());
    
    txn = await dandyContract.getTransactions();
    console.log("Transactions:", txn);

    let sendTxn = await dandyContract.sendFund(
        randomPerson.address,
        0.2,
        "Running test"
    );
    await sendTxn.wait();
    console.log("Transaction successful!", sendTxn);

    randomPersonBalance = await hre.ethers.provider.getBalance(randomPerson.address);
    console.log("Random person balance:",hre.ethers.utils.formatEther(randomPersonBalance));

};

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    } catch (error){
        console.log(error);
        process.exit(1);
    }
};

runMain();