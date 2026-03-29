import { clsMensajeUsuario } from '../../entities/clsMensajeUsuario';

export interface IRepositoryPersonas {
  getListaPersonas(): Promise<clsMensajeUsuario[]>;
}