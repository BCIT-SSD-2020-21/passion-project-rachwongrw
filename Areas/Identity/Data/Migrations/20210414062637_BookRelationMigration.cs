using Microsoft.EntityFrameworkCore.Migrations;

namespace passion_project.Areas.Identity.Data.Migrations
{
    public partial class BookRelationMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Text_Source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Copyright_Year = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Num_Sections = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url_Rss = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url_Zip_file = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url_Project = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url_Librivox = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url_Other = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Total_time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Total_Time_Secs = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserBook",
                columns: table => new
                {
                    BooksListenedId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserBook", x => new { x.BooksListenedId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserBook_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserBook_Books_BooksListenedId",
                        column: x => x.BooksListenedId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserBook_UsersId",
                table: "ApplicationUserBook",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserBook");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");
        }
    }
}
