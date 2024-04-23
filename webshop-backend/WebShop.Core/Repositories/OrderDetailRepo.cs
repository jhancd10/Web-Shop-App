using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Repositories
{
    public class OrderDetailRepo : IAsyncDisposable
    {
        private readonly WebShopDbContext _context;

        public OrderDetailRepo(
            IDbContextFactory<WebShopDbContext> contextFactory)
        {
            _context = contextFactory.CreateDbContext();
        }

        public async Task<OrderDetails> Create(int orderId, int productId, int quantity, decimal price)
        {
            // Create order detail to insert in DB
            var orderDetail = new OrderDetails()
            {
                Order_Id = orderId,
                Product_Id = productId,
                Quantity = quantity,
                Price = price
            };

            // Create and commit changes
            await _context.OrderDetails.AddAsync(orderDetail);
            await _context.SaveChangesAsync();

            return orderDetail;
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }
    }
}
