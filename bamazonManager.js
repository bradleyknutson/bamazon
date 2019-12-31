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

function addInventory(){
    connection.query(`SELECT * FROM products`, (err, res) => {
       inquirer.prompt([
           {
               message: "Which product would you like to add inventory to?",
               name: 'addProduct',
               type: 'list',
               choices: function(){
                   let choicesArr = [];
                   res.forEach(product => {
                       choicesArr.push(`${product.item_id}: ${product.product_name} - ${product.stock_quantity}`)
                   });
                   return choicesArr;
               }
           },
           {
               message: "How many would you like to order?",
               name: "quantity",
               type: 'input',
               validate: function(value){
                   if(value.isInteger()){
                       return true;
                   }else{
                       return false;
                   }
               }
           }
       ]).then(answers => {
           totalQuantity = parseInt(answers.addProduct.substr(answers.addProduct.indexOf('- ') + 1)) + parseInt(answers.quantity);
           connection.query(`UPDATE products SET stock_quantity = ${totalQuantity} WHERE item_id = ${answers.addProduct.substr(0, answers.addProduct.indexOf(':'))}`, (err) => {
               if(err) throw err;
               console.log(`Inventory Updated Successfully\nNew Inventory: ${totalQuantity}`);
               init();
           });
       }).catch(err => {
           if(err) throw err;
       });
    });
}

function addProduct(){
    connection.query(`SELECT DISTINCT department_name FROM products`, (err, res) => {
        if(err) throw err;
        inquirer.prompt([
            {
                message: "What product would you like to add?",
                name: "productName",
                type: "input",
                validate: function(value){
                    if(value){
                        return true;
                    }else{
                        return false;
                    }
                }
            },
            {
                message: "Which department does it belong to?",
                name: "department",
                type: 'list',
                choices: function(){
                    choicesArr = [];
                    res.forEach(department => {
                        choicesArr.push(department.department_name);
                    });
                    return choicesArr;
                }
            },
            {
                message: "How much does it cost?",
                name: "price",
                type: "input",
                validate: function(value){
                    if(!isNaN(value) && parseFloat(value).toFixed(2) == value){
                        return true;
                    }else{
                        console.log('\nPlease try again, price must remain in correct format (99.99)');
                        return false;
                    }
                }
            },
            {
                message: "How much of the product is available?",
                name: "quantity",
                type: 'input',
                validate: function(value){
                    if(!isNaN(value) && parseInt(value) == value){
                        return true;
                    }else{
                        console.log("Quantity must be a whole number");
                        return false;
                    }
                }
            }
        ]).then(answers => {
            connection.query(`INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('${answers.productName}', '${answers.department}', ${parseFloat(answers.price).toFixed(2)}, ${parseInt(answers.quantity)});`, (err, res) => {
                if(err) throw err;
                console.log('Product added successfully!');
                init();              
            });
        }).catch(err => {
            if(err) throw err;
        });
    });

}



