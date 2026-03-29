/**
 * @fileoverview Tokens de inyección de dependencias.
 * Definen los identificadores (InjectionToken) para inyectar las interfaces
 * abstractas de los repositorios en los casos de uso y viewmodels.
 */

// #region Imports
import { InjectionToken } from '@angular/core';
import { IUsuarioRepository } from '../../domain/interfaces/repositories/i-usuario.repository';
import { IProductoRepository } from '../../domain/interfaces/repositories/i-producto.repository';
import { IPedidoRepository } from '../../domain/interfaces/repositories/i-pedido.repository';
import { IDetallePedidoRepository } from '../../domain/interfaces/repositories/i-detalle-pedido.repository';
import { ICategoriaRepository } from '../../domain/interfaces/repositories/i-categoria.repository';
import { IEmpresaRepository } from '../../domain/interfaces/repositories/i-empresa.repository';
import { IDireccionRepository } from '../../domain/interfaces/repositories/i-direccion.repository';
// #endregion

// #region Tokens de Repositorios
/** Token para el repositorio de usuarios */
export const USUARIO_REPOSITORY_TOKEN = new InjectionToken<IUsuarioRepository>('IUsuarioRepository');

/** Token para el repositorio de productos */
export const PRODUCTO_REPOSITORY_TOKEN = new InjectionToken<IProductoRepository>('IProductoRepository');

/** Token para el repositorio de pedidos */
export const PEDIDO_REPOSITORY_TOKEN = new InjectionToken<IPedidoRepository>('IPedidoRepository');

/** Token para el repositorio de detalles de pedido */
export const DETALLE_PEDIDO_REPOSITORY_TOKEN = new InjectionToken<IDetallePedidoRepository>('IDetallePedidoRepository');

/** Token para el repositorio de categorías */
export const CATEGORIA_REPOSITORY_TOKEN = new InjectionToken<ICategoriaRepository>('ICategoriaRepository');

/** Token para el repositorio de empresas */
export const EMPRESA_REPOSITORY_TOKEN = new InjectionToken<IEmpresaRepository>('IEmpresaRepository');

/** Token para el repositorio de direcciones */
export const DIRECCION_REPOSITORY_TOKEN = new InjectionToken<IDireccionRepository>('IDireccionRepository');
// #endregion
