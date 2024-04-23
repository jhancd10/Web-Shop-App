using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Contexts;
using WebShop.Data.DAL.Models;

namespace WebShop.GraphQL.API.Schema.Queries
{
    public partial class QueryType
    {
        [UseOffsetPaging(IncludeTotalCount = true)]
        [UseFiltering]
        public IQueryable<Categories> AllCategories(WebShopDbContext _context)
            =>  _context.Categories.Include(c => c.Product);
    }
}
