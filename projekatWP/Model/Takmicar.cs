using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace projekatWP_bar.Model{
    [Table("Takmicar")]
    public class Takmicar{
        [Key]
        [Column("ID")]
        public int ID {get; set;}

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }
        
        [Column("Prezime")]
        [MaxLength(255)]        
        public string Prezime { get; set; }

        [Column("Kilaza")]
        public int Kilaza { get; set; }

        [Column("Kategorija")]
        [MaxLength(255)]        
        public string Kategorija { get; set; }

        [JsonIgnore]
        public Klub Klub { get; set; }        
    }
}