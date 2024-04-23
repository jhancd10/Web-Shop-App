using Microsoft.EntityFrameworkCore;
using WebShop.Data.Common;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Repositories
{
    public class ProductRepo : IAsyncDisposable
    {
        private readonly WebShopDbContext _context;

        public ProductRepo(
            IDbContextFactory<WebShopDbContext> contextFactory)
        {
            _context = contextFactory.CreateDbContext();
        }

        public async Task<Products> GetById(int id)
            => await _context.Products.FirstAsync(p => p.Product_Id == id);

        public async Task<bool> StockProductValidation(int id, int quantity)
        {
            // Get product data
            var product = await GetById(id);
            
            // Validation
            return (product.Available_Stock - quantity >= 0);
        }

        public async Task<bool> StockProductsValidation(List<ProductStock> products)
        {
            var validation = false;

            foreach (var product in products)
            {
                validation = await StockProductValidation(product.ProductId, product.Quantity);
                if (!validation) break;
            }

            return validation;
        }

        public async Task<Products> UpdateStock(int id, int quantity)
        {
            // Get product data
            var product = await GetById(id);

            // Update stock
            product.Available_Stock -= quantity;

            // Save changes
            await _context.SaveChangesAsync();

            return product;
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }
    }
}
