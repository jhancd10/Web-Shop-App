using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.GraphQL.API.Schema.Queries
{
    public partial class QueryType
    {
        [UseOffsetPaging(IncludeTotalCount = true)]
        [UseFiltering]
        public IQueryable<Products> AllProducts(WebShopDbContext _context) 
            => _context.Products.Include(p => p.Category);

        public IQueryable<Products> AllProductsTotal(WebShopDbContext _context)
            => _context.Products.Include(p => p.Category);
    }
}
