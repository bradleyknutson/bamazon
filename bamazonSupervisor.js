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
    inquirer.prompt([
        {
            message: "Which action would you like to take?",
            name: "action",
            type: 'list',
            choices: ['View Product Sales by Department', 'Create New Department', 'Quit']
        }
    ]).then(answers => {
        switch(answers.action){
            case "View Product Sales by Department":
                departmentSales();
                break;
            case "Create New Department":
                newDepartment();
                break;
            case "Quit":
                connection.end();
                break;
        }
    }).catch(err => {
        if(err) throw err;
    });
}

function departmentSales(){
    console.log('hi');
    init();
}

function newDepartment(){
    console.log('there');
    init();
}