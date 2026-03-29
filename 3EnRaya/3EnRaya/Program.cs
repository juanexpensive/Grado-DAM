using _3EnRaya.Hubs;
using _3EnRaya.Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddSingleton<JuegoEstado>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyHeader()
                  .AllowAnyMethod()
                  .SetIsOriginAllowed((host) => true)
                  .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapHub<TresEnRayaHub>("/tresEnRaya");

app.Run();
