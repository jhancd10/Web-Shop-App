using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Repositories
{
    public class OrderRepo : IAsyncDisposable
    {
        private readonly WebShopDbContext _context;

        public OrderRepo(
            IDbContextFactory<WebShopDbContext> contextFactory)
        {
            _context = contextFactory.CreateDbContext();
        }

        public async Task<Orders> Create(int customerId, decimal total)
        {
            // Create order to insert in DB
            var order = new Orders()
            {
                Customer_Id = customerId,
                Order_Date = DateTime.Now,
                Order_Total = total
            };

            // Create and commit changes
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }
    }
}
