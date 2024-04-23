# Web Shop - Shopping Cart Application

Aplication that allows users to check categories, browse products with filters, add them to the cart, complete purchases and get orders information.


## Features

- Browse products
- Add products to cart
- Remove products from cart
- Update product quantity in cart
- Clear cart
- Complete purchase

## Technologies Used

- Frontend: Vite, React, TypeScript, Material-UI, ApolloClient and Zustand.
- Backend: GraphQl API built with DotNet8, ASP.NET, EF, HotChocolate, Dependency Injection.
- Database: SQL Server


## How to Run Locally

1. Clone the repository:

```bash
$  git clone https://github.com/jhancd10/Web-Shop-App.git
```

2. To set up the local database, follow these steps:
- Install SQL Server Express if you haven't already.
- Navigate to 'webshop-database' directory.
- Run the script 'webshop_model_creation.sql' in your SQL Server Management Studio (SSMS) to create the database schema.
- After creating the schema, execute the 'seed-database.sql' script to populate the initial data for the application.

3. Install Visual Studio and VS Code.

4. Navigate to 'webshop-backend/WebShop.GraphQL.API' directory.

5. Edit 'appsettings.json' file to set up database connection string:
```json
"ConnectionStrings": {
  "WebShopConnection": "DATABASE_CONNECTION_STRING"
},
```

6. Install dependencies and Start the backend server:
```bash
$  dotnet restore
$  dotnet run
```

7. Open your web browser and go to 'http://localhost:PORT/api/graphql/' to view the application.
```bash
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:PORT
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: PATH\Web-Shop-App\webshop-backend\WebShop.GraphQL.API
```

8. Navigate to 'webshop-frontend' directory.

9. Edit '.env' file to set up GRAPHQL_API_URL:
```
VITE_GRAPHQL_API_URL=http://localhost:PORT/api/graphql/
```

10. Install dependencies and Start the frontend server:
```bash
$  npm install
$  npm run dev
```

11. Open your web browser and go to 'http://localhost:PORT/api/graphql/' to view the application.
```bash
VITE v5.2.8  ready in 291 ms
  ➜  Local:   http://localhost:PORT/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Screenshots

![Alt text](/screenshots/catalogFilters.jpeg?raw=true "Catalog and Filters")

![Alt text](/screenshots/AddItemsCart.jpeg?raw=true "Items added to Shopping Cart")

![Alt text](/screenshots/Cart.jpeg?raw=true "Shopping Cart")

![Alt text](/screenshots/Categories.jpeg?raw=true "Categories")

![Alt text](/screenshots/Orders.jpeg?raw=true "Orders")
