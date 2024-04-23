using Microsoft.EntityFrameworkCore;
using WebShop.Core.Repositories;
using WebShop.Data.DAL.Contexts;
using WebShop.GraphQL.API.Schema.Mutations;
using WebShop.GraphQL.API.Schema.Queries;

// Create the container
var builder = WebApplication.CreateBuilder(args);

var myCors = "myCors";

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myCors, builder =>
    {
        builder
            .WithOrigins("*")
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Get connection string and configure service using EF

builder.Services.AddPooledDbContextFactory<WebShopDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("WebShopConnection"))
);

// Configure services to use DI
builder.Services.AddTransient<ProductRepo>();
builder.Services.AddTransient<CustomerRepo>();
builder.Services.AddTransient<OrderRepo>();
builder.Services.AddTransient<OrderDetailRepo>();

// Configure GraphQL service
builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<WebShopDbContext>(DbContextKind.Pooled)
    .RegisterService<ProductRepo>()
    .RegisterService<CustomerRepo>()
    .RegisterService<OrderRepo>()
    .RegisterService<OrderDetailRepo>()
    .AddFiltering()
    .AddQueryType<QueryType>()
    .AddMutationType<MutationType>()
    .AddApolloTracing();

// Build container
var app = builder.Build();

app.UseCors(x =>
    x.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);

// Expose base endpoint
app.MapGraphQL("/api/graphql");

// Run the container
app.Run();
