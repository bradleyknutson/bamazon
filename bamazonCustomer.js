const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "8bbNp^QpF$55yHq*",
    database: "bamazon"
});

connection.connect(err => {
    if(err) throw err;
    init();
});

function init(){
    connection.query("SELECT * FROM products", (err, res) => {
        if(err) throw err;
        res.forEach(product => {
            console.log(`--------------------\nID: ${product.item_id}\nProduct: ${product.product_name}\nPrice: ${product.price}\n--------------------`)
        });
    });
    promptPurchase();
}

function promptPurchase(){
    connection.query("SELECT * FROM products", (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                message: "Which product would you like to buy?",
                name: 'productChoice',
                type: 'list',
                choices: function(){
                    let choicesArr = [];
                    res.forEach(i => {
                        choicesArr.push(`${i.item_id}: ${i.product_name}`);
                    });
                    return choicesArr;
                }
            },
            {
                message: "How many of of this item do you want to buy?",
                name: 'purchaseQuantity',
                type: "input",
                validate: function(value) {
                    if(isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(answers => {
            purchase(answers.productChoice.substr(0, answers.productChoice.indexOf(':')), answers.purchaseQuantity);
        }).catch(err => {
            if(err) throw err;
        });
    });
}

function purchase(item, quantity){
    
}