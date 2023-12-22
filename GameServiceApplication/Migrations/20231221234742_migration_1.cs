using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace GameServiceApplication.Migrations
{
    /// <inheritdoc />
    public partial class migration_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayersInventoryData");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayersCardLinks",
                table: "PlayersCardLinks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayersArtifactLinks",
                table: "PlayersArtifactLinks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayerCharacterLinks",
                table: "PlayerCharacterLinks");

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
                name: "Id",
                table: "PlayersCardLinks");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PlayersArtifactLinks");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "PlayerCharacterLinks");

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

            migrationBuilder.AddColumn<int>(
                name: "HashSalt",
                table: "PlayerProfiles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "CharactersData",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "Rarity",
                table: "CharactersData",
                type: "text",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.CreateTable(
                name: "PlayersCoreInformation",
                columns: table => new
                {
                    PlayerId = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayersCoreInformation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RaritiesData",
                table: "RaritiesData");

            migrationBuilder.DropColumn(
                name: "HashSalt",
                table: "PlayerProfiles");

            migrationBuilder.DropColumn(
                name: "Rarity",
                table: "CharactersData");

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

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "PlayersCardLinks",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "PlayersArtifactLinks",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "PlayerCharacterLinks",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Characters",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Cards",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Artifacts",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayersCardLinks",
                table: "PlayersCardLinks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayersArtifactLinks",
                table: "PlayersArtifactLinks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayerCharacterLinks",
                table: "PlayerCharacterLinks",
                column: "Id");

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

            migrationBuilder.CreateTable(
                name: "PlayersInventoryData",
                columns: table => new
                {
                    Capacity = table.Column<int>(type: "integer", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                });
        }
    }
}
