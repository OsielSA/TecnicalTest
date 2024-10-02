using Microsoft.EntityFrameworkCore;
using TecnicalTestApi.Data;
using TecnicalTestApi.Services;

var builder = WebApplication.CreateBuilder(args);


// Agrega servicios CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()  // Permite cualquier origen
                   .AllowAnyMethod()  // Permite cualquier método (GET, POST, etc.)
                   .AllowAnyHeader(); // Permite cualquier encabezado
        });
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddScoped<EmployeeService>();
builder.Services.AddScoped<EmployeeStatusService>();
builder.Services.AddScoped<PositionService>();

//Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Database connection
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connection));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
