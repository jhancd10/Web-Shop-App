using Bogus;
using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Repositories
{
    public class CustomerRepo : IAsyncDisposable
    {
        private readonly WebShopDbContext _context;

        public CustomerRepo(
            IDbContextFactory<WebShopDbContext> contextFactory)
        {
            _context = contextFactory.CreateDbContext();
        }

        private async Task<Customers> GetRandom()
        {
            // Create random value
            var rand = new Random();
            var toSkip = rand.Next(0, _context.Customers.Count());

            // Get customer with random value
            return await _context.Customers.Skip(toSkip).Take(1).FirstAsync();
        }

        public async Task<Customers> GetCustomer()
        {
            Customers customer = null!;

            // Generate a random boolean
            var rand = new Random();
            var condition = rand.NextDouble() > 0.5;

            // Random boolean is true then it will generate faker data to create Customer in DB
            // Otherwise get random Customer from DB
            if (condition)
            {
                var faker = new Faker<Customers>()
                            .RuleFor(c => c.Customer_Name, f => f.Name.FullName())
                            .RuleFor(c => c.Customer_Email, (f, e) => f.Internet.Email(e.Customer_Name))
                            .Generate(1).First();

                customer = await Create(faker.Customer_Name, faker.Customer_Email);
            }

            else customer = await GetRandom();

            return customer;
        }

        public async Task<Customers> Create(string name, string email)
        {
            // Create customer to insert in DB
            var customer = new Customers()
            {
                Customer_Name = name,
                Customer_Email = email
            };

            // Create and commit changes
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }
    }
}
