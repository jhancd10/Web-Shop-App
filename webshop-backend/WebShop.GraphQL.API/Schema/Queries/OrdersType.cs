using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.GraphQL.API.Schema.Queries
{
    public partial class QueryType
    {
        [UseFiltering]
        public async Task<List<Orders>> AllOrdersAsync([Service] WebShopDbContext _context)
        {
            var orders = await _context.Orders
                         .Include(o => o.Customer)
                         .Include(o => o.OrderDetails)
                         .ToListAsync();

            var products = await _context.Products.ToListAsync();

            Parallel.ForEach(orders,
            new ParallelOptions() { MaxDegreeOfParallelism = Environment.ProcessorCount - 1 },
            order =>
            {
                Parallel.ForEach(order.OrderDetails,
                new ParallelOptions() { MaxDegreeOfParallelism = Environment.ProcessorCount - 1 },
                orderDetail =>
                {
                    orderDetail.Product = products.FirstOrDefault(p => p.Product_Id == orderDetail.Product_Id)!;
                });
            });

            return orders;
        }
    }
}
