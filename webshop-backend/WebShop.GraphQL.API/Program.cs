using Microsoft.EntityFrameworkCore;
using WebShop.Core.Interfaces;
using WebShop.Core.Repositories;
using WebShop.Core.Services;
using WebShop.Data.DAL.Contexts;
using WebShop.GraphQL.API.Schema.Mutations;
using WebShop.GraphQL.API.Schema.Queries;

// Create the container
var builder = WebApplication.CreateBuilder(args);

// Get connection string and configure service using EF
var WebShopConnectionString = builder.Configuration.GetConnectionString("WebShopConnection");
builder.Services.AddDbContext<WebShopDbContext>(options => options.UseSqlServer(WebShopConnectionString));

// Configure GraphQL service
builder.Services
    .AddGraphQLServer()
    .AddFiltering()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>()
    .RegisterDbContext<WebShopDbContext>()
    .AddApolloTracing();

// Configure services to use DI
builder.Services.AddScoped<ICustomerRepo, CustomerRepo>();
builder.Services.AddScoped<IOrderRepo, OrderRepo>();
builder.Services.AddScoped<IOrderDetailRepo, OrderDetailRepo>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IProductRepo, ProductRepo>();

// Build container
var app = builder.Build();

// Expose base endpoint
app.MapGraphQL("/api/graphql");

// Run the container
app.Run();
