using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain.Interfaces;

namespace Domain.UseCases
{
    public class DireccionUseCase : IDireccionUseCase
    {
        private readonly IDireccionRepository _direccionRepository;

        public DireccionUseCase(IDireccionRepository direccionRepository)
        {
            _direccionRepository = direccionRepository;
        }

        public Task<Direccion[]> GetAllDirecciones()
        {
            return _direccionRepository.GetAllDirecciones();
        }

        public Task<Direccion> GetDireccionById(int id)
        {
            return _direccionRepository.GetDireccionById(id);
        }

        public Task<bool> AddDireccion(Direccion direccion)
        {
            return _direccionRepository.AddDireccion(direccion);
        }

        public Task<bool> UpdateDireccion(int id, Direccion direccion)
        {
            return _direccionRepository.UpdateDireccion(id, direccion);
        }

        public Task<bool> DeleteDireccion(int id)
        {
            return _direccionRepository.DeleteDireccion(id);
        }


    }
}
