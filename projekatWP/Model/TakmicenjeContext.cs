using Microsoft.EntityFrameworkCore;
namespace projekatWP_bar.Model
{
    public class TakmicenjeContext: DbContext{
        public DbSet<Takmicenje> Takmicenja {get; set;}
        public DbSet<Klub> Klubovi {get; set;}
        public DbSet<Takmicar> Takmicari {get; set;}
        public TakmicenjeContext(DbContextOptions options):base(options){
            
        }
        protected override void OnModelCreating(ModelBuilder mb){
            mb.Entity<Takmicenje>().HasMany(q => q.Klubovi).WithOne(p => p.Takmicenje).OnDelete(DeleteBehavior.Cascade);
            mb.Entity<Klub>().HasOne(p => p.Takmicenje).WithMany(q => q.Klubovi).OnDelete(DeleteBehavior.Cascade);
            mb.Entity<Klub>().HasMany(p => p.Takmicari).WithOne(q => q.Klub).OnDelete(DeleteBehavior.Cascade);
            // mb.Entity<Takmicar>().HasOne(p => p.Klub);
        } 
    }

}