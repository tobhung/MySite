using Microsoft.EntityFrameworkCore;
using MySite.Models;

namespace MySite.Models
{

    public class BaseDBContext : DbContext
    {
        public BaseDBContext(DbContextOptions<BaseDBContext> options) : base(options)
        {

        }

        public DbSet<Category> Categorys { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<ProjectImage> ProjectImages { get; set; }


    }

}
