using WebShop.Data.DAL.Models;

namespace WebShop.Core.Interfaces
{
    public interface IOrderDetailRepo
    {
        Task<OrderDetails> Create(int orderId, int productId, int quantity, decimal price);
    }
}
