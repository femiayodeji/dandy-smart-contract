// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";
 
contract DandyTransaction {
    uint256 transactionCounter;

    struct Transaction{
        address sender;
        address receiver;
        uint amount;
        string narration;
        uint256 timestamp;
    }
    
    Transaction[] transactions;

    event Transfer(address from, address to, uint amount, string narration, uint256 timestamp);

    constructor() payable {
        console.log("Dandy Transaction$");
    }

    function sendFund(address payable receiver, uint amount, string memory narration) public {
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

    function getTotalTransaction() public view returns(uint256){
        return transactionCounter;
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

}
