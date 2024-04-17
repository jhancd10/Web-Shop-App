﻿using WebShop.Core.Interfaces;

namespace WebShop.GraphQL.API.Schema.Mutations
{
    public partial class Mutation
    {
        private readonly ICustomerService _customerService;
        private readonly IOrderRepo _orderRepo;
        private readonly IOrderDetailRepo _orderDetailRepo;
        private readonly IProductRepo _productRepo;

        public Mutation(
            ICustomerService customerService,
            IOrderRepo orderRepo,
            IOrderDetailRepo orderDetailRepo,
            IProductRepo productRepo)
        {
            _customerService = customerService;
            _orderRepo = orderRepo;
            _orderDetailRepo = orderDetailRepo;
            _productRepo = productRepo;
        }
    }
}