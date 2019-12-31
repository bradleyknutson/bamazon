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
            console.log(`${product.item_id}: ${product.product_name} || Price: ${product.price}\n--------------------`)
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

function purchase(item, purchaseQuantity){
    connection.query(`SELECT * FROM products WHERE item_id = ${item}`, (err, res) => {
        if(err) throw err;
        if(res[0].stock_quantity >= purchaseQuantity){
            let newQuantity = res[0].stock_quantity - purchaseQuantity;
            let newSales = parseFloat(res[0].product_sales) + (parseFloat(res[0].price) * purchaseQuantity);
            connection.query(`UPDATE products SET ? WHERE ?`,[
                {
                    stock_quantity: newQuantity,
                    product_sales: newSales.toFixed(2)
                },
                {
                    item_id: item
                }
            ]);
            console.log("Purchase Complete! Congratulations!");
            inquirer.prompt([
                {
                    message: "Do you want to make another purchase?",
                    name: "startOver",
                    type: "confirm",
                    default: true
                }
            ]).then(answers => {
                switch(answers.startOver){
                    case true:
                        init();
                        break;
                    case false:
                        connection.end();
                }
            }).catch(err => {
                if(err) throw err;
            });
        }else{
            console.log('Insufficient Quantity! No order can be made');
            inquirer.prompt([
                {
                    message: "Do you want to try for another purchase?",
                    name: "startOver",
                    type: "confirm",
                    default: true
                }
            ]).then(answers => {
                switch(answers.startOver){
                    case true:
                        init();
                        break;
                    case false:
                        connection.end();
                }
            }).catch(err => {
                if(err) throw err;
            });
        }
    });
}