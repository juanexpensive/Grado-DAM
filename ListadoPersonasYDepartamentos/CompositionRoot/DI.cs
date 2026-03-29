using Data.Repositories;
using Domain.Interfaces;
using Domain.Repositories; 
using Domain.UseCases;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CompositionRoot
{
    public static class DI
    {
        public static IServiceCollection AddCompositionRoot(this IServiceCollection services, IConfiguration configuration)
        {
            //Registrar repositorios concretos
            services.AddScoped<IRepositoryPersonas, PersonasRepositoryAzure>();

            //Registrar casos de uso
            services.AddScoped<IUseCasePersonas, DefaultUseCasePersonas>();
            services.AddScoped<IUseCaseJuego, DefaultUseCaseJuego>();

            services.AddScoped<IRepositoryDepartamentos, DepartamentosRepositoryAzure>();
            services.AddScoped<IUseCaseDepartamentos, DefaultUseCaseDepartamentos>();

            return services;
        }
    }
}
