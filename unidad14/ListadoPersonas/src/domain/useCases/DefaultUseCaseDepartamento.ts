/** 
import { Departamento } from '../entities/Departamento';
import { Persona } from '../entities/Persona';



export class DefaultUseCaseDepartamentos implements IUseCaseDepartamentos {


  async getDepartamentos(): Promise<Departamento[]> {
    return await this.repositoryDepartamentos.getListaDepartamentos();
  }

  async getDetalleDepartamento(id: number): Promise<Departamento | null> {
    return await this.repositoryDepartamentos.getDepartamentoById(id);
  }

  async getPersonasPorDepartamento(id: number): Promise<Persona[]> {
    const personas = await this.repositoryPersonas.getListaPersonas();
    return personas.filter(p => p.IDDepartamento === id);
  }

  async crearDepartamento(departamento: Departamento): Promise<void> {
    await this.repositoryDepartamentos.crearDepartamento(departamento);
  }

  async actualizarDepartamento(departamento: Departamento): Promise<void> {
    await this.repositoryDepartamentos.actualizarDepartamento(departamento.ID, departamento);
  }

  async eliminarDepartamento(id: number): Promise<void> {
    await this.repositoryDepartamentos.eliminarDepartamento(id);
  }

}

*/