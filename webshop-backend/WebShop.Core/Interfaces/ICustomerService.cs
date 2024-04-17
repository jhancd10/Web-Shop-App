using WebShop.Data.DAL.Models;

namespace WebShop.Core.Interfaces
{
    public interface ICustomerService
    {
        Task<Customers> GetCustomer();
    }
}
