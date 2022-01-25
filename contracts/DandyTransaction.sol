//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
 
contract DandyTransaction {
    uint256 public transactionCounter;

    struct Transaction{
        address sender;
        address receiver;
        uint amount;
        string narration;
        uint256 timestamp;
    }
    
    Transaction[] public transactions;

    event Transfer(address from, address to, uint amount, string narration, uint256 timestamp);

    constructor(){
        console.log("Dandy transactions!");
    }

    function SendFund(address receiver, uint amount, string memory narration) public payable {
        Transaction memory newTransaction = Transaction(msg.sender, receiver, amount, narration, block.timestamp);
        transactions.push(newTransaction);
        transactionCounter += 1;

        emit Transfer(
            newTransaction.sender, 
            newTransaction.receiver, 
            newTransaction.amount,
            newTransaction.narration,
            newTransaction.timestamp
        );
    }

}
