using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projekatWP_bar.Model{
  [Table("Takmicenje")]

  public class Takmicenje{
      [Key]
      [Column("ID")]
      public int ID { get; set; }
      public List<Klub> Klubovi { get; set; }  
  }
}