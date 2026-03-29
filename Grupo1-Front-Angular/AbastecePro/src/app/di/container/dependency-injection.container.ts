/**
 * @fileoverview Contenedor de inyección de dependencias.
 * Registra las implementaciones concretas (repositorios API) para cada
 * token de inyección, permitiendo la inversión de dependencias.
 */

// #region Imports
import { Provider } from '@angular/core';

import {
  USUARIO_REPOSITORY_TOKEN,
  PRODUCTO_REPOSITORY_TOKEN,
  PEDIDO_REPOSITORY_TOKEN,
  DETALLE_PEDIDO_REPOSITORY_TOKEN,
  CATEGORIA_REPOSITORY_TOKEN,
  EMPRESA_REPOSITORY_TOKEN,
  DIRECCION_REPOSITORY_TOKEN,
} from '../types/injection.tokens';

import { UsuarioApiRepository } from '../../data/repositories/api/usuario-api.repository';
import { ProductoApiRepository } from '../../data/repositories/api/producto-api.repository';
import { PedidoApiRepository } from '../../data/repositories/api/pedido-api.repository';
import { DetallePedidoApiRepository } from '../../data/repositories/api/detalle-pedido-api.repository';
import { CategoriaApiRepository } from '../../data/repositories/api/categoria-api.repository';
import { EmpresaApiRepository } from '../../data/repositories/api/empresa-api.repository';
import { DireccionApiRepository } from '../../data/repositories/api/direccion-api.repository';
// #endregion

// #region Providers de Repositorios
/**
 * Array de providers que vincula cada token abstracto con su implementación concreta (API).
 * Se importa en la configuración de la app (app.config.ts) para registrar todos los
 * repositorios en el inyector raíz de Angular.
 */
export const REPOSITORY_PROVIDERS: Provider[] = [
  { provide: USUARIO_REPOSITORY_TOKEN, useClass: UsuarioApiRepository },
  { provide: PRODUCTO_REPOSITORY_TOKEN, useClass: ProductoApiRepository },
  { provide: PEDIDO_REPOSITORY_TOKEN, useClass: PedidoApiRepository },
  { provide: DETALLE_PEDIDO_REPOSITORY_TOKEN, useClass: DetallePedidoApiRepository },
  { provide: CATEGORIA_REPOSITORY_TOKEN, useClass: CategoriaApiRepository },
  { provide: EMPRESA_REPOSITORY_TOKEN, useClass: EmpresaApiRepository },
  { provide: DIRECCION_REPOSITORY_TOKEN, useClass: DireccionApiRepository },
];
// #endregion
