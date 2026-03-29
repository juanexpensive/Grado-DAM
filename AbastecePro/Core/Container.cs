using Microsoft.Extensions.DependencyInjection;
using Data.Repositories;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using Domain.UseCases;

namespace Core
{
    public static class Container
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services)
        {
            // Repositories
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IProductoRepository, ProductoRepository>();
            services.AddScoped<IPedidoRepository, PedidoRepository>();
            services.AddScoped<ICategoriaRepository, CategoriaRepository>();
            services.AddScoped<IDetallePedidoRepository, DetallePedidoRepository>();
            services.AddScoped<IEmpresaRepository, EmpresaRepository>();
            services.AddScoped<IDireccionRepository, DireccionRepository>();


            // UseCases
            services.AddScoped<IUsuarioUseCase, UsuarioUseCase>();
            services.AddScoped<IProductoUseCase, ProductoUseCase>();
            services.AddScoped<IPedidoUseCase, PedidoUseCase>();
            services.AddScoped<ICategoriaUseCase, CategoriaUseCase>();
            services.AddScoped<IDetallePedidoUseCase, DetallePedidoUseCase>();
            services.AddScoped<IEmpresaUseCase, EmpresaUseCase>();
            services.AddScoped<IDireccionUseCase, DireccionUseCase>();
          
            return services;
        }
    }
}
