using System;
using System.Collections.Generic;

namespace WebShop.Data.DAL.Models;

public partial class Customers
{
    public int Customer_Id { get; set; }

    public string Customer_Name { get; set; } = null!;

    public string Customer_Email { get; set; } = null!;

    public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();
}
