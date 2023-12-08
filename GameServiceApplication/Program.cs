using GameServiceApplication.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

var allowSpecificOrigins = "_allowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
    {
        options.AddPolicy(allowSpecificOrigins, policy =>
        {
            policy.WithOrigins("https://localhost:44484")
                .WithHeaders(HeaderNames.ContentType, "x-custom-header");
        });
    }
);
builder.Services.AddControllersWithViews();
// builder.Services.AddSwaggerGen(config =>
//     {
//         config.AddServer(new OpenApiServer
//         {
//             Description = "Development Server",
//             Url = "https://localhost:7047"
//         });
//     }
// );

var app = builder.Build();
// app.UseSwagger().UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseCors(allowSpecificOrigins);
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
