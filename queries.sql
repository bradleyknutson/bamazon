SELECT d.*, (d.department_sales - d.over_head_costs) AS "total_profit"
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

    ) d;