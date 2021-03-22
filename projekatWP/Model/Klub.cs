using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace projekatWP_bar.Model{
  [Table("Klub")]
  public class Klub{
      [Key]
      [Column("ID")]
      public int ID { get; set; }

      [Column("Ime")]
      [MaxLength(255)]
      public string Ime { get; set; }

      // [Column("Broj_takmicara")]
      // public int Broj_takmicara { get; set; }

      [Column("Datum_prijave")]
      [MaxLength(255)]
      public string Datum_prijave { get; set; }  

      public List<Takmicar> Takmicari { get; set; }  

      [JsonIgnore]
      public Takmicenje Takmicenje { get; set; }
  }
}