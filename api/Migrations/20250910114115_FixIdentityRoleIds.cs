using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixIdentityRoleIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1dfc3958-10d8-48ba-894f-92adf09a5893");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e475a9e0-1694-41e5-9871-3dad8821abc6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c0573de4-679f-458c-ad2b-5ed78716143f", null, "Admin", "ADMIN" },
                    { "c700d60f-79fc-4d69-a2d4-7226e771a885", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c0573de4-679f-458c-ad2b-5ed78716143f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c700d60f-79fc-4d69-a2d4-7226e771a885");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1dfc3958-10d8-48ba-894f-92adf09a5893", null, "Admin", "ADMIN" },
                    { "e475a9e0-1694-41e5-9871-3dad8821abc6", null, "User", "USER" }
                });
        }
    }
}
