using WebShop.Core.Interfaces;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Repositories
{
    public class OrderDetailRepo : IOrderDetailRepo
    {
        private readonly WebShopDbContext _context;

        public OrderDetailRepo(
            WebShopDbContext context)
        {
            _context = context;
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
    }
}
