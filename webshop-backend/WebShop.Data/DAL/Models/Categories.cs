using System;
using System.Collections.Generic;

namespace WebShop.Data.DAL.Models;

public partial class Categories
{
    public int Category_Id { get; set; }

    public string Category_Name { get; set; } = null!;

    public string Category_Icon { get; set; } = null!;

    public virtual ICollection<Products> Product { get; set; } = new List<Products>();
}
