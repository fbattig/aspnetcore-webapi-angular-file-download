using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UploadFilesServer.Migrations
{
    public partial class NewFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocumentType",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentType",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Users");
        }
    }
}
