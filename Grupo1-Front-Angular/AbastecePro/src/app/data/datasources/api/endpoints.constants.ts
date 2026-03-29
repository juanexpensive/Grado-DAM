/**
 * @fileoverview Constantes de endpoints de la API REST.
 * Define las rutas de cada recurso del backend ASP.NET,
 * incluyendo funciones para generar rutas con parámetros de ID.
 */

// #region Endpoints
export const ENDPOINTS = {
  /** Endpoints del recurso Usuario */
  USUARIOS: {
    /** Ruta base para obtener todos o crear usuario */
    BASE: '/Usuario',
    /** Genera la ruta para un usuario específico por su ID */
    BY_ID: (id: number) => `/Usuario/${id}`,
  },
  /** Endpoints del recurso Producto */
  PRODUCTOS: {
    /** Ruta base para obtener todos o crear producto */
    BASE: '/Producto',
    /** Genera la ruta para un producto específico por su ID */
    BY_ID: (id: number) => `/Producto/${id}`,
  },
  /** Endpoints del recurso Pedido */
  PEDIDOS: {
    /** Ruta base para obtener todos o crear pedido */
    BASE: '/Pedido',
    /** Genera la ruta para un pedido específico por su ID */
    BY_ID: (id: number) => `/Pedido/${id}`,
  },
  /** Endpoints del recurso DetallePedido */
  DETALLES_PEDIDO: {
    /** Ruta base para obtener todos los detalles de pedido */
    BASE: '/DetallePedido',
    /** Genera la ruta para un detalle específico por su ID */
    BY_ID: (id: number) => `/DetallePedido/${id}`,
  },
  /** Endpoints del recurso Categoría */
  CATEGORIAS: {
    /** Ruta base para obtener todas las categorías */
    BASE: '/Categoria',
    /** Genera la ruta para una categoría específica por su ID */
    BY_ID: (id: number) => `/Categoria/${id}`,
  },
  /** Endpoints del recurso Empresa */
  EMPRESAS: {
    /** Ruta base para obtener todas las empresas */
    BASE: '/Empresa',
    /** Genera la ruta para una empresa específica por su ID */
    BY_ID: (id: number) => `/Empresa/${id}`,
  },
  /** Endpoints del recurso Dirección */
  DIRECCIONES: {
    /** Ruta base para obtener todas las direcciones */
    BASE: '/Direccion',
    /** Genera la ruta para una dirección específica por su ID */
    BY_ID: (id: number) => `/Direccion/${id}`,
  },
};
// #endregion
