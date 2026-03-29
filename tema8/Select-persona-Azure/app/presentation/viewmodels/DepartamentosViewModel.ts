import { IUseCaseDepartamentos } from '../../domain/interfaces/use-cases/IUseCaseDepartamentos';
import { Departamento } from '../../domain/entities/Departamento';

export class DepartamentosViewModel {
  private useCase: IUseCaseDepartamentos;

  constructor(useCase: IUseCaseDepartamentos) {
    this.useCase = useCase;
  }

  async cargarDepartamentos(): Promise<Departamento[]> {
    return await this.useCase.getDepartamentos();
  }

  async cargarDetalleDepartamento(id: number): Promise<Departamento | null> {
    return await this.useCase.getDetalleDepartamento(id);
  }

  async crearDepartamento(departamento: Departamento): Promise<void> {
    return await this.useCase.crearDepartamento(departamento);
  }

  async actualizarDepartamento(departamento: Departamento): Promise<void> {
    return await this.useCase.actualizarDepartamento(departamento);
  }

  async eliminarDepartamento(id: number): Promise<void> {
    return await this.useCase.eliminarDepartamento(id);
  }
}