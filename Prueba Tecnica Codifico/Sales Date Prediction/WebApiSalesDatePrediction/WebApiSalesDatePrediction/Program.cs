using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApiSalesDatePrediction.Models;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Obtener la cadena de conexión desde appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 🔹 Agregar el contexto de base de datos con SQL Server
builder.Services.AddDbContext<StoreSampleContext>(options =>
    options.UseSqlServer(connectionString));

//// 🔹 Obtener la configuración de JWT desde appsettings.json
//var jwtSettings = builder.Configuration.GetSection("Jwt");

//var secretKey = jwtSettings["SecretKey"];
//if (string.IsNullOrEmpty(secretKey))
//{
//    throw new ArgumentNullException("SecretKey", "La clave JWT no puede ser nula.");
//}

//// 🔹 Configurar autenticación con JWT
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = jwtSettings["Issuer"],
//            ValidAudience = jwtSettings["Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
//        };
//    });

//builder.Services.AddAuthorization();

// 🔹 Agregar controladores
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Configurar logs para ver errores detallados en consola
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Ajusta la URL de tu Angular
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();

app.UseCors("AllowAll");
// 🔹 Configuración del pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication(); // 🚀 Asegúrate de que esto esté ANTES de Authorization
app.UseAuthorization();

app.MapControllers();

app.Run();
