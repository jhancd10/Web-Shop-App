using WebShop.Data.Common;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Interfaces
{
    public interface IProductRepo
    {
        Task<Products> GetById(int id);
        Task<bool> StockProductValidation(int id, int quantity);
        Task<bool> StockProductsValidation(List<ProductStock> products);
        Task<Products> UpdateStock(int id, int quantity);
    }
}
