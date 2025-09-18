using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MySite.Migrations
{
    /// <inheritdoc />
    public partial class removeCategoryFromProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Categorys_CategoryID",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_CategoryID",
                table: "Projects");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Projects_CategoryID",
                table: "Projects",
                column: "CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Categorys_CategoryID",
                table: "Projects",
                column: "CategoryID",
                principalTable: "Categorys",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
