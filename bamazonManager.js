const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '8bbNp^QpF$55yHq*',
    database: 'bamazon'
});

connection.connect(err => {
    if(err) throw err;
    init();
});

function init(){
    inquirer.prompt([
        {
            message: "What would you like to do?",
            name: "option",
            type: 'list',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Quit']
        }
    ]).then(answers => {
        switch(answers.option){
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLow();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Quit":
                connection.end();
                break;
        }
    }).catch(err => {
        if(err) throw err;
    });
}

function viewProducts(){
    connection.query(`SELECT * FROM products`, (err, res) => {
        // console.log('\n');
        res.forEach(product => {
            console.log(`${product.item_id}: ${product.product_name} || Price: ${product.price} || Quantity: ${product.stock_quantity}\n--------------------------------------------`);
        });
        init();
    });
}

function viewLow(){
    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, (err, res) => {
        res.forEach(product => {
            console.log(`${product.item_id}: ${product.product_name} || Price: ${product.price} || Quantity: ${product.stock_quantity}\n--------------------------------------------`);
        });
        init();        
    });
}