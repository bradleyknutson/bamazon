INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("The CS Detective", "Books", 12.99, 35),
      ("Dune", "Books", 9.79, 10),
      ("Settler's of Catan", "Board Games", 24.99, 100),
      ("Pandemic", "Board Games", 29.88, 24),
      ("Betrayal At House on the Hill", "Board Games", 32.49, 5),
      ("AMD Ryzen 7 3800 8-Core", "Electronics", 338.99, 13),
      ("Intel Core i9-9820X 10 Core", "Electronics", 644.24, 26),
      ("NVIDIA GeForce RTX 2080 Ti", "Electronics", 1498.00, 1),
      ("XFX Rx 5700", "Electronics", 329.99, 64),
      ("All-Clad D3 Stainless Cookware Set", "Home & Kitchen", 582.33, 6),
      ("Sandoo HA1897 Induction Cooktop, 1800W", "Home & Kitchen", 48.99, 12);

ALTER TABLE products
ADD COLUMN product_sales DEC(20,2);

INSERT INTO departments(department_name, over_head_costs)
VALUES("Books", 1000.00),
      ("Board Games", 3000.00),
      ("Electronics", 10000.00),
      ("Home & Kitchen", 12000.00),
      ("Arts & Crafts", 6000.00);