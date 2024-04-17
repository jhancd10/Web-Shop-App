using System;
using System.Collections.Generic;

namespace WebShop.Data.DAL.Models;

public partial class Orders
{
    public int Order_Id { get; set; }

    public int? Customer_Id { get; set; }

    public DateTime Order_Date { get; set; }

    public decimal Order_Total { get; set; }

    public virtual Customers? Customer { get; set; }

    public virtual ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>();
}
