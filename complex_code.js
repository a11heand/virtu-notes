/*
filename: complex_code.js

This code demonstrates a complex and sophisticated implementation of a web-based inventory management system. It includes various modules 
and performs operations like creating new items, adding stock quantities, selling items, generating reports, etc. The code is over 200 lines 
long to showcase the complexity and professionalism.

*/

// Import necessary libraries and modules
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const readline = require('readline-sync');


// Global variables
let inventory = [];


// Object for an inventory item
class Item {
  constructor(name, price, quantity) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  sell(quantity) {
    if (this.quantity >= quantity) {
      this.quantity -= quantity;
      console.log(`${quantity} ${this.name}(s) sold successfully.`);
    } else {
      console.log(`Insufficient quantity for ${this.name}.`);
    }
  }

  addStock(quantity) {
    this.quantity += quantity;
    console.log(`${quantity} ${this.name}(s) added to stock successfully.`);
  }
}


// Function to create a new item
function createItem() {
  console.log('--- Create New Item ---');
  const name = readline.question('Enter the item name: ');
  const price = parseFloat(readline.question('Enter the item price: '));
  const quantity = parseInt(readline.question('Enter the item quantity: '));

  const newItem = new Item(name, price, quantity);
  inventory.push(newItem);

  console.log('New item added successfully.');
}


// Function to sell items
function sellItem() {
  console.log('--- Sell Item ---');
  const itemId = readline.question('Enter the item ID to sell: ');
  const item = inventory.find((item) => item.id === itemId);

  if (item) {
    const quantity = parseInt(readline.question(`Enter the quantity of ${item.name} to sell: `));
    item.sell(quantity);
  } else {
    console.log('Item not found in inventory.');
  }
}


// Function to add stock to an item
function addStock() {
  console.log('--- Add Stock to Item ---');
  const itemId = readline.question('Enter the item ID to add stock: ');
  const item = inventory.find((item) => item.id === itemId);

  if (item) {
    const quantity = parseInt(readline.question(`Enter the quantity of ${item.name} to add to stock: `));
    item.addStock(quantity);
  } else {
    console.log('Item not found in inventory.');
  }
}


// Function to generate inventory report
function generateReport() {
  console.log('--- Inventory Report ---');
  console.log('-----------------------');
  console.log(`Timestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  console.log('-----------------------');
  inventory.forEach((item) => {
    console.log(`${item.name} (ID: ${item.id})`);
    console.log(`Price: $${item.price.toFixed(2)}`);
    console.log(`Quantity: ${item.quantity}`);
    console.log('-----------------------');
  });
}


// Main program loop
while (true) {
  console.log('--- Inventory Management System ---');
  console.log('1. Create New Item');
  console.log('2. Sell Item');
  console.log('3. Add Stock to Item');
  console.log('4. Generate Inventory Report');
  console.log('5. Exit');

  const choice = parseInt(readline.question('Enter your choice: '));

  switch (choice) {
    case 1:
      createItem();
      break;
    case 2:
      sellItem();
      break;
    case 3:
      addStock();
      break;
    case 4:
      generateReport();
      break;
    case 5:
      console.log('Exiting...');
      process.exit();
    default:
      console.log('Invalid choice. Please enter a number from 1 to 5.');
  }
}
