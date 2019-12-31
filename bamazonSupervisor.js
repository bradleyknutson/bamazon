const inquirer = require('inquirer');
const mysql = require('mysql');
const {table} = require('table');

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
    connection.query(`SELECT d.*, (d.department_sales - d.over_head_costs) AS "total_sales"
    FROM(
        SELECT
            departments.department_id,
            departments.department_name,
            departments.over_head_costs,
            SUM(products.product_sales) AS "department_sales"
        FROM
            departments,
            products
        WHERE 
            products.department_name = departments.department_name
        GROUP BY
            products.department_name
        ) d;`, (err, res) => {
            let data = [['Department ID', "Department Name", "Overhead Costs", "Department Sales", "Total Sales"]];
            if(err) throw err;
            res.forEach(department => {
                data.push([department.department_id, department.department_name, department.over_head_costs, department.department_sales, department.total_sales]);
            });
            let output = table(data);
            console.log(output);
            init();
        });
}

function newDepartment(){
    console.log('there');
    init();
}

