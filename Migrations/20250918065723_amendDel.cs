using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySite.Migrations
{
    /// <inheritdoc />
    public partial class amendDel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Projects",
                newName: "Del");

            migrationBuilder.RenameColumn(
                name: "IsDeleted",
                table: "Categorys",
                newName: "Del");

            migrationBuilder.AddColumn<bool>(
                name: "Del",
                table: "ProjectImages",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Del",
                table: "ProjectImages");

            migrationBuilder.RenameColumn(
                name: "Del",
                table: "Projects",
                newName: "IsDeleted");

            migrationBuilder.RenameColumn(
                name: "Del",
                table: "Categorys",
                newName: "IsDeleted");
        }
    }
}
