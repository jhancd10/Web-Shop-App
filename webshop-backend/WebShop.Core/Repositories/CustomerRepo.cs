using Microsoft.EntityFrameworkCore;
using WebShop.Core.Interfaces;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Repositories
{
    public class CustomerRepo : ICustomerRepo
    {
        private readonly WebShopDbContext _context;

        public CustomerRepo(
            WebShopDbContext context)
        {
            _context = context;
        }

        public async Task<Customers> GetRandom()
        {
            // Create random value
            var rand = new Random();
            var toSkip = rand.Next(0, _context.Customers.Count());

            // Get customer with random value
            return await _context.Customers.Skip(toSkip).Take(1).FirstAsync();
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
    }
}
