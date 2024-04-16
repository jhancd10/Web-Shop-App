-- Create Categories table
CREATE TABLE Categories (
    Category_Id INT IDENTITY(1,1) PRIMARY KEY,
    Category_Name NVARCHAR(100) NOT NULL,
    Category_Icon NVARCHAR(100) NOT NULL
);

-- Create Products table
CREATE TABLE Products (
    Product_Id INT IDENTITY(1,1) PRIMARY KEY,
    Product_Code NVARCHAR(50) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2) NOT NULL,
    Available_Stock INT NOT NULL
);

-- Create ProductCategories table
CREATE TABLE ProductCategories (
    Product_Id INT,
    Category_Id INT,
    PRIMARY KEY (Product_Id, Category_Id),
    FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id),
    FOREIGN KEY (Category_Id) REFERENCES Categories(Category_Id)
);

-- Create Customers table
CREATE TABLE Customers (
    Customer_Id INT IDENTITY(1,1) PRIMARY KEY,
    Customer_Name NVARCHAR(255) NOT NULL,
    Customer_Email NVARCHAR(255) NOT NULL
);

-- Create Orders table
CREATE TABLE Orders (
    Order_Id INT IDENTITY(1,1) PRIMARY KEY,
    Customer_Id INT,
    Order_Date DATETIME NOT NULL,
    Order_Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (Customer_Id) REFERENCES Customers(Customer_Id)
);

-- Create OrderDetails table
CREATE TABLE OrderDetails (
    Order_Id INT,
    Product_Id INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (Order_Id, Product_Id),
    FOREIGN KEY (Order_Id) REFERENCES Orders(Order_Id),
    FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
);
