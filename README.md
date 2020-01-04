# Bamazon

## Description
Bamazon is a command line store where you can purchase many goods and services.  This app includes views for customer, in order to see and purchase products, manager, which allows you to manage inventory, and supervisor which allows you to manage departments and see total sales.

## Installation
* While in Bamazon directory: run `npm i` to install dependencies.
* Initialize mysql by running `mysql -u [username] -p` and then enter your mysql password.
* From the mysql command line, use `./ [path-to-schema.sql]` to build the necessary database.
* From the mysql command line, use `./ [path to seed.sql]` to add initial data to the database.

## Usage
* run `node app.js` to initialize the store.
* Choose between which view you would like to see.  Customer, Manager, or Supervisor.
### Customer
* You will see a list of all products to purchase
* Using the arrow keys, select which one you want to buy and then enter in a whole, positive number (or 0) for how many you want to purchase.
### Manager
* Choose between:
* * Viewing all current products for sale.
* * Viewing low inventory, which consists of items with less than 5 in stock.
* * Add to inventory, which allows you to restock current items.
* * Add new products, which allows you to create a new product entry for purchasing.
### Supervisor
* Choose between:
* * View product sales by department.
* * Creating a new department for products to be assigned to.

## Demo
[Demo Video Here](  )

## Frameworks Used
* ### npm
* * inquirer
* * mysql
* * table


## Roadmap
* Allow for easier purchasing of items when product list is long, as opposed to endless scrolling.
* Allow for updating the price of items and/or sales.