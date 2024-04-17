using System;
using System.Collections.Generic;

namespace WebShop.Data.DAL.Models;

public partial class OrderDetails
{
    public int Order_Id { get; set; }

    public int Product_Id { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Orders Order { get; set; } = null!;

    public virtual Products Product { get; set; } = null!;
}
