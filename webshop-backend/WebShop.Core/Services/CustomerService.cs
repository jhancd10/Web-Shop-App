using Bogus;
using WebShop.Core.Interfaces;
using WebShop.Data.DAL.Models;

namespace WebShop.Core.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepo _customerRepo;

        public CustomerService(
            ICustomerRepo customerRepo)
        {
            _customerRepo = customerRepo;
        }

        public async Task<Customers> GetCustomer()
        {
            Customers customer = null!;

            // Generate a random boolean
            var rand = new Random();
            var condition = rand.NextDouble() > 0.5;

            // Random boolean is true then it will generate faker data to create Customer in DB
            // Otherwise get random Customer from DB
            if (condition)
            {
                var faker = new Faker<Customers>()
                            .RuleFor(c => c.Customer_Name, f => f.Name.FullName())
                            .RuleFor(c => c.Customer_Email, (f, e) => f.Internet.Email(e.Customer_Name))
                            .Generate(1).First();

                customer = await _customerRepo.Create(faker.Customer_Name, faker.Customer_Email);
            }

            else customer = await _customerRepo.GetRandom();

            return customer;
        }
    }
}
