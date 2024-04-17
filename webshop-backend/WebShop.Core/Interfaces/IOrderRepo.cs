using WebShop.Data.DAL.Models;

namespace WebShop.Core.Interfaces
{
    public interface IOrderRepo
    {
        Task<Orders> Create(int customerId, decimal total);
    }
}
