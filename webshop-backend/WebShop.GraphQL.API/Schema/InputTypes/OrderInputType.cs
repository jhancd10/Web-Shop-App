namespace WebShop.GraphQL.API.Schema.InputTypes
{
    public class OrderInputType
    {
        public decimal Total { get; set; }
        public List<OrderDetailInputType> OrderDetail { get; set; } = [];
    }

    public class OrderDetailInputType
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
