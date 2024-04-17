using Microsoft.EntityFrameworkCore;
using WebShop.Data.DAL.Models;

namespace WebShop.Data.DAL.Contexts;

public partial class WebShopDbContext : DbContext
{
    public WebShopDbContext()
    {
    }

    public WebShopDbContext(DbContextOptions<WebShopDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categories> Categories { get; set; }

    public virtual DbSet<Customers> Customers { get; set; }

    public virtual DbSet<OrderDetails> OrderDetails { get; set; }

    public virtual DbSet<Orders> Orders { get; set; }

    public virtual DbSet<Products> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categories>(entity =>
        {
            entity.HasKey(e => e.Category_Id).HasName("PK__Categori__6DB38D6E1E7396BC");

            entity.Property(e => e.Category_Icon).HasMaxLength(100);
            entity.Property(e => e.Category_Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Customers>(entity =>
        {
            entity.HasKey(e => e.Customer_Id).HasName("PK__Customer__8CB286999086296E");

            entity.Property(e => e.Customer_Email).HasMaxLength(255);
            entity.Property(e => e.Customer_Name).HasMaxLength(255);
        });

        modelBuilder.Entity<OrderDetails>(entity =>
        {
            entity.HasKey(e => new { e.Order_Id, e.Product_Id }).HasName("PK__OrderDet__48672FC0012D92B8");

            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Order_Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderDeta__Order__30F848ED");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.Product_Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OrderDeta__Produ__31EC6D26");
        });

        modelBuilder.Entity<Orders>(entity =>
        {
            entity.HasKey(e => e.Order_Id).HasName("PK__Orders__F1E4607B84CB9028");

            entity.Property(e => e.Order_Date).HasColumnType("datetime");
            entity.Property(e => e.Order_Total).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Customer_Id)
                .HasConstraintName("FK__Orders__Customer__2E1BDC42");
        });

        modelBuilder.Entity<Products>(entity =>
        {
            entity.HasKey(e => e.Product_Id).HasName("PK__Products__9834FBBAB9737587");

            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Product_Code).HasMaxLength(50);
            entity.Property(e => e.Title).HasMaxLength(255);

            entity.HasMany(d => d.Category).WithMany(p => p.Product)
                .UsingEntity<Dictionary<string, object>>(
                    "ProductCategories",
                    r => r.HasOne<Categories>().WithMany()
                        .HasForeignKey("Category_Id")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ProductCa__Categ__29572725"),
                    l => l.HasOne<Products>().WithMany()
                        .HasForeignKey("Product_Id")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__ProductCa__Produ__286302EC"),
                    j =>
                    {
                        j.HasKey("Product_Id", "Category_Id").HasName("PK__ProductC__6EEFC36C7F27A225");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
