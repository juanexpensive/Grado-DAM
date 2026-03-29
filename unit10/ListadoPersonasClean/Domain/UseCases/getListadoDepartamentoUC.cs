using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.UseCases
{
    public class getListadoDepartamentoUC : IListadoDepartamentoUseCases
    {
        private readonly IListadoDepartamentoRepository _listadoDepartamentoRepository;
        public getListadoDepartamentoUC(IListadoDepartamentoRepository listadoDepartamentoRepository)
        {
            _listadoDepartamentoRepository = listadoDepartamentoRepository;
        }
        public List<Entities.Departamento> obtenerListadoDepartamento()
        {
            return _listadoDepartamentoRepository.obtenerListadoDepartamento();
        }
    }
}
