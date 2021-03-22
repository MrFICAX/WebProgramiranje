using Microsoft.EntityFrameworkCore.Migrations;

namespace projekatWP_bar.Migrations
{
    public partial class takmicenje : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Takmicenje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Takmicenje", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Klub",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Datum_prijave = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    TakmicenjeID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klub", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Klub_Takmicenje_TakmicenjeID",
                        column: x => x.TakmicenjeID,
                        principalTable: "Takmicenje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Takmicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Kilaza = table.Column<int>(type: "int", nullable: false),
                    Kategorija = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    KlubID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Takmicar", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Takmicar_Klub_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klub",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Klub_TakmicenjeID",
                table: "Klub",
                column: "TakmicenjeID");

            migrationBuilder.CreateIndex(
                name: "IX_Takmicar_KlubID",
                table: "Takmicar",
                column: "KlubID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Takmicar");

            migrationBuilder.DropTable(
                name: "Klub");

            migrationBuilder.DropTable(
                name: "Takmicenje");
        }
    }
}
