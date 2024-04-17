using WebShop.Data.DAL.Models;

namespace WebShop.Core.Interfaces
{
    public interface ICustomerRepo
    {
        Task<Customers> GetRandom();
        Task<Customers> Create(string name, string email);
    }
}
