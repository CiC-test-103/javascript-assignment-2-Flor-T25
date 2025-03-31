// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit); // Create a new Account.
        this.accounts.push(newAccount); // Add the new Account to the bank's list of accounts.
        return newAccount; // Return the created account.
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all 
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    deposit(amount) {
        this.balance += amount; // Increase the account balance by the deposit amount.
        this.transactionHistory.push({ transactionType: 'Deposit', amount: amount }); // Record the deposit transaction.
    }
    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
    withdraw(amount) {
        if (this.balance >= amount) { // Check if there are enough funds.
            this.balance -= amount; // Decrease the account balance by the amount withdrawn.
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount: amount }); // Record the withdrawal transaction.
        } 
        else {
            console.log("Insufficient funds."); // Print an error message if there are not enough funds.
        }
    }
    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    transfer(amount, recipientAccount) {
        if (this.balance >= amount) { // Check if there are enough funds.
            this.balance -= amount; // Decrease the account balance by the transferred amount.
            recipientAccount.balance += amount; // Increase the recipient's account balance by the transferred amount.
            this.transactionHistory.push({ transactionType: 'Transfer', amount: amount, to: recipientAccount.name }); // Record the transfer transaction for the sender.
            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount: amount, from: this.name }); // Record the received transaction for the recipient.
        } 
        else {
            console.log("Insufficient funds."); // Print an error message if there are not enough funds.
        }
    }
    // Example: checkBalance()
    checkBalance() {
        return this.balance; // Return the current balance.
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());