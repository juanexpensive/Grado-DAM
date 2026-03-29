using ASPChatClean.Hubs;

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURACIÓN DE CORS (Añadir antes de builder.Build)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(origin => true) // Permite cualquier origen dinámicamente
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Obligatorio para SignalR
    });
});

builder.Services.AddSignalR();
builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

// 2. IMPORTANTE: UseRouting debe ir antes de UseCors
app.UseRouting();

// 3. APLICAR POLÍTICA DE CORS
app.UseCors();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// 4. MAPEO DEL HUB
app.MapHub<ChatHub>("/chatHub");

app.Run();
