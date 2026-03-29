namespace Domain.UseCases
{
    using Domain.DTOs;
    using Domain.Entities;
    using Domain.Interfaces;
    using Repositories;
    using System.Collections.Generic;
    using System.Linq;

    public class DefaultUseCaseJuego : IUseCaseJuego
    {
        private readonly IRepositoryPersonas _repositoryPersonas;
        private readonly IRepositoryDepartamentos _repositoryDepartamentos;

        // Mapa de colores para cada departamento (lógica de negocio)
        private readonly Dictionary<int, string> _coloresDepartamentos = new Dictionary<int, string>
        {
            { 1, "#FF6B6B" },  // Rojo claro
            { 2, "#4ECDC4" },  // Verde azulado
            { 3, "#45B7D1" },  // Azul claro
            { 4, "#FFA07A" },  // Naranja claro
            { 5, "#98D8C8" },  // Verde menta
            { 6, "#F7DC6F" },  // Amarillo
            { 7, "#BB8FCE" },  // Morado claro
            { 8, "#85C1E2" }   // Azul cielo
        };

        public DefaultUseCaseJuego(
            IRepositoryPersonas repositoryPersonas,
            IRepositoryDepartamentos repositoryDepartamentos)
        {
            _repositoryPersonas = repositoryPersonas;
            _repositoryDepartamentos = repositoryDepartamentos;
        }

        private string ObtenerColorParaDepartamento(int idDepartamento)
        {
            if (_coloresDepartamentos.ContainsKey(idDepartamento))
            {
                return _coloresDepartamentos[idDepartamento];
            }

            // Color por defecto si no está en el mapa
            return "#E0E0E0";
        }

        public DatosJuegoDTO ObtenerDatosJuego()
        {
            var personas = _repositoryPersonas.getListaPersonas();
            var departamentos = _repositoryDepartamentos.getListaDepartamentos();

            var personasJuego = personas.Select(p => new PersonaJuegoDTO
            {
                Id = p.id,
                Nombre = p.nombre,
                Apellido = p.apellido,
                IdDepartamento = p.idDepartamento,
                ColorDepartamento = ObtenerColorParaDepartamento(p.idDepartamento)
            }).ToList();

            var departamentosJuego = departamentos.Select(d => new DepartamentoJuegoDTO
            {
                Id = d.id,
                Nombre = d.nombre,
                Color = ObtenerColorParaDepartamento(d.id)
            }).ToList();

            return new DatosJuegoDTO
            {
                Personas = personasJuego,
                Departamentos = departamentosJuego
            };
        }

        public ResultadoJuego ComprobarDepartamentos(Dictionary<int, int> asignaciones)
        {
            var personas = _repositoryPersonas.getListaPersonas();
            int aciertos = 0;
            int total = personas.Length;

            foreach (var persona in personas)
            {
                if (asignaciones.ContainsKey(persona.id) &&
                    asignaciones[persona.id] == persona.idDepartamento)
                {
                    aciertos++;
                }
            }

            return new ResultadoJuego
            {
                Aciertos = aciertos,
                Total = total,
                Gano = aciertos == total
            };
        }
    }
}