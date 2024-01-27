using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace GameServiceApplication.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RaritiesData",
                table: "RaritiesData");

            migrationBuilder.DropColumn(
                name: "Rarity",
                table: "CardsData");

            migrationBuilder.DropColumn(
                name: "Rarity",
                table: "ArtifactsData");

            migrationBuilder.RenameTable(
                name: "RaritiesData",
                newName: "Rarities");

            migrationBuilder.RenameTable(
                name: "CharactersData",
                newName: "Characters");

            migrationBuilder.RenameTable(
                name: "CardsData",
                newName: "Cards");

            migrationBuilder.RenameTable(
                name: "ArtifactsData",
                newName: "Artifacts");

            migrationBuilder.RenameColumn(
                name: "Rarity",
                table: "Characters",
                newName: "Description");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Characters",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<double>(
                name: "DefaultCost",
                table: "Characters",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Cards",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<double>(
                name: "DefaultCost",
                table: "Cards",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Artifacts",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<double>(
                name: "DefaultCost",
                table: "Artifacts",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Rarities",
                table: "Rarities",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Characters",
                table: "Characters",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cards",
                table: "Cards",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Artifacts",
                table: "Artifacts",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Rarities",
                table: "Rarities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Characters",
                table: "Characters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cards",
                table: "Cards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Artifacts",
                table: "Artifacts");

            migrationBuilder.DropColumn(
                name: "DefaultCost",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "DefaultCost",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "DefaultCost",
                table: "Artifacts");

            migrationBuilder.RenameTable(
                name: "Rarities",
                newName: "RaritiesData");

            migrationBuilder.RenameTable(
                name: "Characters",
                newName: "CharactersData");

            migrationBuilder.RenameTable(
                name: "Cards",
                newName: "CardsData");

            migrationBuilder.RenameTable(
                name: "Artifacts",
                newName: "ArtifactsData");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "CharactersData",
                newName: "Rarity");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "CharactersData",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "CardsData",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Rarity",
                table: "CardsData",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ArtifactsData",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Rarity",
                table: "ArtifactsData",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RaritiesData",
                table: "RaritiesData",
                column: "Id");
        }
    }
}
