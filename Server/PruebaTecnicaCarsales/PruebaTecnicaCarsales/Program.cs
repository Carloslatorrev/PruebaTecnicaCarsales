using PruebaTecnicaCarsales.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Agregar servicios CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200", "http://frontend-container:80") // Agrega la URL de tu contenedor frontend aquí
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddScoped<CharacterService>();
builder.Services.AddScoped<EpisodeService>();
builder.Services.AddScoped<LocationService>();

builder.Services.AddHttpClient<CharacterService>();
builder.Services.AddHttpClient<EpisodeService>();
builder.Services.AddHttpClient<LocationService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularClient");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();