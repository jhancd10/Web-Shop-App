-- Insert 10 different categories with names and associated icon names in 'MATERIAL UI'
INSERT INTO Categories (Category_Name, Category_Icon)
VALUES 
    ('Electronics', 'DevicesOther'),
    ('Clothing', 'ShoppingBag'),
    ('Books', 'MenuBook'),
    ('Home & Kitchen', 'Home'),
    ('Toys', 'Toys'),
    ('Sports & Outdoors', 'DirectionsRun'),
    ('Beauty & Personal Care', 'Spa'),
    ('Health & Household', 'LocalHospital'),
    ('Automotive', 'DirectionsCar'),
    ('Pet Supplies', 'Pets')
;

-- Generate inserts for creating 100 products and associate them with random categories
DECLARE @i INT = 1;
DECLARE @numCategories INT;
DECLARE @categoryId INT;
DECLARE @productId INT;

WHILE @i <= 100
BEGIN
    -- Select a random number of categories for the current product (between 1 and 5)
    SET @numCategories = ABS(CHECKSUM(NEWID())) % 5 + 1;

    -- Insert the product into the Products table
    INSERT INTO Products (Product_Code, Title, Description, Price, Available_Stock)
    VALUES (
        CONCAT('PROD', @i),
        CONCAT('Product ', @i),
        CONCAT('Description for Product ', @i),
        ROUND(RAND() * 1000, 2), -- Random price between 0 and 1000
        ROUND(RAND() * 100, 2) -- Random available stock between 0 and 100
    );

    -- Get the product_id of the inserted product
    SET @productId = SCOPE_IDENTITY();

    -- Insert the product into the ProductCategories table with random categories
    DECLARE @j INT = 1;
    WHILE @j <= @numCategories
    BEGIN
        -- Select a random category_id from 1 to 10
        SET @categoryId = ABS(CHECKSUM(NEWID())) % 10 + 1;

        -- Associate the product with the randomly selected category
        INSERT INTO ProductCategories (Product_Id, Category_Id)
        VALUES (@productId, @categoryId);

        -- Increment counter
        SET @j = @j + 1;
    END;

    -- Increment counter
    SET @i = @i + 1;
END;
