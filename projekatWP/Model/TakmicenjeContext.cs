using Microsoft.EntityFrameworkCore;
namespace projekatWP_bar.Model
{
    public class TakmicenjeContext: DbContext{
        public DbSet<Takmicenje> Takmicenja {get; set;}
        public DbSet<Klub> Klubovi {get; set;}
        public DbSet<Takmicar> Takmicari {get; set;}
        public TakmicenjeContext(DbContextOptions options):base(options){
            
        }
    }

}