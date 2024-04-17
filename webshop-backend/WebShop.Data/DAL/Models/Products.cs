using System;
using System.Collections.Generic;

namespace WebShop.Data.DAL.Models;

public partial class Products
{
    public int Product_Id { get; set; }

    public string Product_Code { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int Available_Stock { get; set; }

    public virtual ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>();

    public virtual ICollection<Categories> Category { get; set; } = new List<Categories>();
}
