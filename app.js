const inquirer = require('inquirer');
const bamazonCustomer = require('./bamazonCustomer.js');
const bamazonManager = require('./bamazonManager');
const bamazonSupervisor = require('./bamazonSupervisor');

function init(){
    inquirer.prompt([
        {
            message: "Which view would you like to access?",
            name: "bamazonSelection",
            type: 'rawlist',
            choices: ["Bamazon Customer", "Bamazon Manager", "Bamazon Supervisor", "Quit"]
        }
    ]).then(answer => {
        switch(answer.bamazonSelection){
            case "Bamazon Customer":
                bamazonCustomer.init();
                break;
            case "Bamazon Manager":
                bamazonManager.init();
                break;
            case "Bamazon Supervisor":
                bamazonSupervisor.init();
                break;
            case "Quit":
                bamazonCustomer.connection.end();
                bamazonManager.connection.end();
                bamazonSupervisor.connection.end();
                break;
        }
    }).catch(err => {
        if(err) throw err;
    }).finally(() => {
        return;
    });
}

init();

module.exports.init = init;