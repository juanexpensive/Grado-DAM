using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.UseCases;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Domain.UseCases
{
    public class EmpresaUseCase : IEmpresaUseCase
    {
        private readonly IEmpresaRepository _empresaRepository;

        public EmpresaUseCase(IEmpresaRepository empresaRepository)
        {
            _empresaRepository = empresaRepository;
        }

        public Task<Empresa[]> GetAllEmpresas()
        {
            return _empresaRepository.GetAllEmpresas();
        }

        public Task<Empresa> GetEmpresaById(int id)
        {
            return _empresaRepository.GetEmpresaById(id);
        }

        public Task<bool> AddEmpresa(Empresa empresa)
        {
            return _empresaRepository.AddEmpresa(empresa);
        }

        public Task<bool> UpdateEmpresa(int id, Empresa empresa)
        {
            return _empresaRepository.UpdateEmpresa(id, empresa);
        }

        public Task<bool> DeleteEmpresa(int id)
        {
            return _empresaRepository.DeleteEmpresa(id);
        }
    }
}


    
