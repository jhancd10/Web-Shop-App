using WebShop.Data.Common;
using WebShop.Data.DAL.Models;
using WebShop.GraphQL.API.Schema.InputTypes;

namespace WebShop.GraphQL.API.Schema.Mutations
{
    public partial class MutationType
    {
        public async Task<Orders> CreateOrder(OrderInputType orderInput)
        {
            // Stock validation
            var orderProducts = orderInput.OrderDetail
                                .Select(o => new ProductStock()
                                {
                                    ProductId = o.ProductId,
                                    Quantity = o.Quantity
                                }).ToList();

            var validationResult = await _productRepo.StockProductsValidation(orderProducts);

            if (validationResult)
            {
                // Get Customer data
                var customer = await _customerService.GetCustomer();

                // Create Order
                var order = await _orderRepo.Create(customer.Customer_Id, orderInput.Total);

                // Create Order Detail with products associate to order
                foreach (var detail in orderInput.OrderDetail)
                {
                    await _orderDetailRepo.Create(order.Order_Id, detail.ProductId, detail.Quantity, detail.Price);
                    await _productRepo.UpdateStock(detail.ProductId, detail.Quantity);
                }

                return order;
            }

            else throw new GraphQLException("Error trying to validate the products stock.");
        }
    }
}
