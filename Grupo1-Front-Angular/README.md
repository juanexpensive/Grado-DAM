# AbastecePro — Frontend Angular

## Credenciales de prueba

| Rol           | Email                                   | Contraseña          |
|---------------|------------------------------------------|---------------------|
| Administrador | fernando.galiana.admin@abastecepro.com  | fernandonervion123  |
| Empleado      | fernando.galiana@abastecepro.com        | fernandonervion123  |
---

## Tecnologías principales

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Angular | 21.1.0 | Framework SPA |
| TypeScript | 5.9.2 | Lenguaje principal |
| Firebase Auth | 12.9.0 | Autenticación de usuarios |
| RxJS | 7.8.x | Programación reactiva |
| jsPDF | 4.1.0 | Generación de facturas PDF |
| Express | 5.1.0 | Servidor SSR |
| Vitest | 4.0.8 | Testing |
| SCSS | — | Preprocesador CSS |

---

## Arquitectura del proyecto

El proyecto sigue una **Clean Architecture** adaptada a Angular, organizando el código en capas con responsabilidades bien definidas:

```
┌─────────────────────────────────────────────────┐
│                  features/                       │
│           (Componentes de pantalla)              │
│                     ▼                            │
│              presentation/                       │
│       (ViewModels + View Models)                 │
│                     ▼                            │
│                 domain/                          │
│   (Entities + Interfaces + UseCases + DTOs)      │
│                     ▼                            │
│                  data/                           │
│     (Repositories API + Datasources)             │
│                     ▼                            │
│                core/                             │
│   (Guards + Interceptors + Services + DI)        │
└─────────────────────────────────────────────────┘
```

---

## Estructura del proyecto

```
AbastecePro/
├── proxy.conf.json                   # Proxy para redirigir /api al backend
├── src/
│   ├── environments/                 # Configuración por entorno (dev/prod)
│   ├── styles/                       # SCSS global (temas, variables, mixins)
│   └── app/
│       ├── core/                     # Guards, interceptors, servicios transversales
│       ├── di/                       # Contenedor de inyección de dependencias
│       ├── domain/                   # Entidades, interfaces, casos de uso, DTOs
│       ├── data/                     # Repositorios API y datasources
│       ├── presentation/            # ViewModels y View Models
│       ├── features/                 # Pantallas organizadas por módulo funcional
│       └── shared/                   # Componentes, directivas, pipes, utilidades
```

---

## `core` — Servicios transversales

### Guards

| Guard | Descripción |
|-------|-------------|
| `authGuard` | Protege rutas que requieren autenticación. Redirige a `/login` si no hay sesión activa. |
| `adminGuard` | Protege rutas exclusivas de administradores. Redirige a `/home` si el rol no es `administrador`. |

### Interceptors

| Interceptor | Descripción |
|-------------|-------------|
| `authInterceptor` | Añade automáticamente el token `Authorization: Bearer` a cada petición HTTP si existe en `localStorage`. |
| `errorInterceptor` | Captura errores HTTP y los traduce a mensajes amigables en español. Maneja códigos 0, 400, 401, 403, 404, 500. |

### Services

<details>
<summary><strong>AuthService</strong></summary>

```
@Injectable({ providedIn: 'root' })
class AuthService

  Señales:
  - Signal<Usuario | null>  currentUser     (solo lectura)
  - Observable<Usuario | null>  currentUser$

  Métodos:
  + login(correo, password): Observable<Usuario | null>
  + logout(): void
  + getCurrentUser(): Usuario | null
  + isAuthenticated(): boolean
  + isAdmin(): boolean
  + updateCurrentUser(user: Usuario): void

  Flujo de login:
  1. Autentica con Firebase Auth (correo + contraseña)
  2. Obtiene datos del usuario desde la API por correo
  3. Almacena usuario en localStorage + actualiza señales
```
</details>

<details>
<summary><strong>FirebaseService</strong></summary>

```
@Injectable({ providedIn: 'root' })
class FirebaseService

  + login(email, password): Promise<UserCredential>
  + createUser(email, password): Promise<UserCredential>
  + deleteUser(email, password): Promise<void>
  + logout(): Promise<void>
  + get auth: Auth | null

  Notas:
  - createUser() usa una app secundaria temporal para preservar la sesión del admin
  - deleteUser() se usa como rollback si falla el guardado en la API
  - Solo se inicializa en el navegador (no en SSR)
```
</details>

---

## `di` — Contenedor de inyección de dependencias

### Tokens de inyección

| Token | Interfaz |
|-------|----------|
| `USUARIO_REPOSITORY_TOKEN` | `IUsuarioRepository` |
| `PRODUCTO_REPOSITORY_TOKEN` | `IProductoRepository` |
| `PEDIDO_REPOSITORY_TOKEN` | `IPedidoRepository` |
| `DETALLE_PEDIDO_REPOSITORY_TOKEN` | `IDetallePedidoRepository` |
| `CATEGORIA_REPOSITORY_TOKEN` | `ICategoriaRepository` |
| `EMPRESA_REPOSITORY_TOKEN` | `IEmpresaRepository` |
| `DIRECCION_REPOSITORY_TOKEN` | `IDireccionRepository` |

### Providers registrados

| Token | Implementación |
|-------|---------------|
| `USUARIO_REPOSITORY_TOKEN` | `UsuarioApiRepository` |
| `PRODUCTO_REPOSITORY_TOKEN` | `ProductoApiRepository` |
| `PEDIDO_REPOSITORY_TOKEN` | `PedidoApiRepository` |
| `DETALLE_PEDIDO_REPOSITORY_TOKEN` | `DetallePedidoApiRepository` |
| `CATEGORIA_REPOSITORY_TOKEN` | `CategoriaApiRepository` |
| `EMPRESA_REPOSITORY_TOKEN` | `EmpresaApiRepository` |
| `DIRECCION_REPOSITORY_TOKEN` | `DireccionApiRepository` |

---

## `domain`

### Tipos

```
type RolUsuario     = 'administrador' | 'empleado'
type EstadoPedido   = 'pendiente' | 'enviado' | 'entregado' | 'cancelado'
```

### Entities

<details>
<summary><strong>Empresa</strong></summary>

```
interface Empresa
  - number   id
  - string   cif
  - string   nombre
  - string   telefono
  - string   correo
  - string   iban
  - number   idDireccion
  - boolean  activo
```
</details>

<details>
<summary><strong>Direccion</strong></summary>

```
interface Direccion
  - number   id
  - string   numero
  - string   calle
  - string   codigoPostal
  - string   ciudad
  - string   pais
  - boolean  activo
```
</details>

<details>
<summary><strong>Usuario</strong></summary>

```
interface Usuario
  - number       id
  - string       nombre
  - string       apellidos
  - string       correo
  - string       password
  - string       telefono
  - RolUsuario   rol
  - number       idEmpresa
  - string       firebaseUID
  - boolean      activo
```
</details>

<details>
<summary><strong>Categoria</strong></summary>

```
interface Categoria
  - number   id
  - string   nombre
  - boolean  activo
```
</details>

<details>
<summary><strong>Producto</strong></summary>

```
interface Producto
  - number   id
  - string   nombre
  - string   descripcion
  - number   precio
  - number   stock
  - number   idCategoria
  - number   idEmpresaProveedora
  - boolean  activo
```
</details>

<details>
<summary><strong>Pedido</strong></summary>

```
interface Pedido
  - number         id
  - string         fecha          (ISO 8601)
  - number         precioTotal
  - EstadoPedido   estado
  - number         idUsuario
  - number         idEmpresaProveedora
  - number         idEmpresaConsumidora
  - boolean        activo
```
</details>

<details>
<summary><strong>DetallePedido</strong></summary>

```
interface DetallePedido
  - number  id
  - number  idPedido
  - number  idProducto
  - number  cantidadProducto
  - number  precioUnitario
```
</details>

### DTOs

<details>
<summary>Ver todos los DTOs</summary>

```
CategoriaFiltroDto        { id, nombre }

EmpresaInfoDto            { id, nombre, cif, direccion, telefono, correo, iban }

CrearPedidoDto            { idUsuario, idEmpresaProveedora, idEmpresaConsumidora, detalles[] }
CrearDetallePedidoDto     { idProducto, cantidadProducto, precioUnitario }
IdPedidoConPrecioDto      { id, precioTotal }
PedidoDetalleDto          { id, fecha, usuarioNombre, empresaProveedoraNombre,
                            direccionCompleta, precioTotal, estado, detalles[] }
DetallePedidoLineaDto     { idProducto, productoNombre, cantidadProducto,
                            precioUnitario, subtotal }
PedidoListadoDto          { id, fecha, empresaProveedoraNombre, precioTotal,
                            estado, usuarioNombre }

ProductoCardDto           { id, nombre, descripcion, precio, stock,
                            categoriaNombre, proveedorNombre }
ProductoCarritoDto        { idProducto, nombre, precioUnitario, cantidad, subtotal }
ProductoDetalleDto        { id, nombre, descripcion, precio, stock,
                            categoriaNombre, proveedorNombre, proveedorTelefono,
                            proveedorCorreo }

CrearUsuarioDto           { nombre, apellidos, correo, password, telefono, rol,
                            idEmpresa?, firebaseUID? }
UsuarioListadoDto         { id, nombre, apellidos, correo, telefono, rol }
UsuarioPerfilDto          { id, nombre, apellidos, correo, telefono, rol }
```
</details>

### Interfaces — Repositories

<details>
<summary>Ver todas las interfaces de repositorio</summary>

```
ICategoriaRepository
  + getAll(): Observable<Categoria[]>
  + getById(id: number): Observable<Categoria>
  + create(categoria: Omit<Categoria, 'id'>): Observable<Categoria>
  + update(categoria: Categoria): Observable<Categoria>

IDetallePedidoRepository
  + getAll(): Observable<DetallePedido[]>
  + getById(id: number): Observable<DetallePedido>
  + getByPedidoId(idPedido: number): Observable<DetallePedido[]>
  + create(detalle: Omit<DetallePedido, 'id'>): Observable<DetallePedido>
  + createMany(detalles: Omit<DetallePedido, 'id'>[]): Observable<DetallePedido[]>
  + update(detalle: DetallePedido): Observable<DetallePedido>
  + delete(id: number): Observable<boolean>

IDireccionRepository
  + getAll(): Observable<Direccion[]>
  + getById(id: number): Observable<Direccion>
  + create(direccion: Omit<Direccion, 'id'>): Observable<Direccion>
  + update(direccion: Direccion): Observable<Direccion>
  + delete(id: number): Observable<boolean>

IEmpresaRepository
  + getAll(): Observable<Empresa[]>
  + getById(id: number): Observable<Empresa>
  + create(empresa: Omit<Empresa, 'id'>): Observable<Empresa>
  + update(empresa: Empresa): Observable<Empresa>
  + delete(id: number): Observable<boolean>

IPedidoRepository
  + getAll(): Observable<Pedido[]>
  + getByUsuarioId(idUsuario: number): Observable<Pedido[]>
  + getById(id: number): Observable<Pedido>
  + create(pedido: Omit<Pedido, 'id'>): Observable<Pedido>
  + actualizarEstado(id: number, estado: EstadoPedido): Observable<Pedido>
  + delete(id: number): Observable<boolean>

IProductoRepository
  + getAll(): Observable<Producto[]>
  + getById(id: number): Observable<Producto>
  + buscar(texto: string): Observable<Producto[]>
  + filtrarPorCategoria(idCategoria: number): Observable<Producto[]>
  + create(producto: Omit<Producto, 'id'>): Observable<Producto>
  + update(producto: Producto): Observable<Producto>
  + delete(id: number): Observable<boolean>

IUsuarioRepository
  + getAll(): Observable<Usuario[]>
  + getById(id: number): Observable<Usuario>
  + getByEmail(correo: string): Observable<Usuario | null>
  + create(usuario: Omit<Usuario, 'id'>): Observable<Usuario>
  + update(usuario: Usuario): Observable<Usuario>
  + delete(id: number): Observable<boolean>
```
</details>

### Interfaces — Use Cases

<details>
<summary>Ver todas las interfaces de use case</summary>

```
Auth:
  ILoginUsuarioUseCase
    + execute(correo, password): Observable<Usuario | null>
  ILogoutUsuarioUseCase
    + execute(): void
  IGetCurrentUserUseCase
    + execute(): Observable<Usuario | null>

Categorías:
  IGetAllCategoriasUseCase
    + execute(): Observable<Categoria[]>

Pedidos:
  ICrearPedidoUseCase
    + execute(pedido: CrearPedidoDto): Observable<Pedido>
  IGetAllPedidosUseCase
    + execute(): Observable<Pedido[]>
  IGetPedidoByIdUseCase
    + execute(id: number): Observable<Pedido>
  IGetPedidosByUsuarioUseCase
    + execute(idUsuario: number): Observable<Pedido[]>
  IGetDetallesPedidoUseCase
    + execute(idPedido: number): Observable<DetallePedido[]>
  IActualizarEstadoPedidoUseCase
    + execute(id: number, estado: EstadoPedido): Observable<Pedido>

Productos:
  IGetAllProductosUseCase
    + execute(): Observable<Producto[]>
  IGetProductoByIdUseCase
    + execute(id: number): Observable<Producto>
  IBuscarProductosUseCase
    + execute(texto: string): Observable<Producto[]>
  IFiltrarProductosPorCategoriaUseCase
    + execute(idCategoria: number): Observable<Producto[]>

Usuarios:
  IGetAllUsuariosUseCase
    + execute(): Observable<Usuario[]>
  IGetUsuarioByIdUseCase
    + execute(id: number): Observable<Usuario>
  ICrearUsuarioUseCase
    + execute(usuario: CrearUsuarioDto): Observable<Usuario>
  IActualizarUsuarioUseCase
    + execute(usuario: Usuario): Observable<Usuario>
  IEliminarUsuarioUseCase
    + execute(id: number): Observable<boolean>
```
</details>

### Use Cases (implementaciones)

<details>
<summary>Ver implementaciones</summary>

```
Auth:
  GetCurrentUserUseCase
    - Lee usuario desde localStorage
    + execute(): Observable<Usuario | null>

  LoginUsuarioUseCase
    - IUsuarioRepository (inyectado por token)
    + execute(correo): Observable<Usuario | null>

  LogoutUsuarioUseCase
    - Elimina usuario de localStorage
    + execute(): void

Categorías:
  GetAllCategoriasUseCase
    - ICategoriaRepository (inyectado por token)
    + execute(): Observable<Categoria[]>

Pedidos:
  CrearPedidoUseCase
    - IPedidoRepository + IDetallePedidoRepository (inyectados por token)
    + execute(dto): Observable<{ pedido: Pedido; detalles: DetallePedido[] }>
    Flujo: calcula precioTotal → crea pedido → crea detalles con el ID obtenido

  GetAllPedidosUseCase
    - IPedidoRepository (inyectado por token)
    + execute(): Observable<Pedido[]>

  GetPedidoByIdUseCase
    - IPedidoRepository (inyectado por token)
    + execute(id): Observable<Pedido>

  GetPedidosByUsuarioUseCase
    - IPedidoRepository (inyectado por token)
    + execute(idUsuario): Observable<Pedido[]>

  GetDetallesPedidoUseCase
    - IDetallePedidoRepository (inyectado por token)
    + execute(idPedido): Observable<DetallePedido[]>

  ActualizarEstadoPedidoUseCase
    - IPedidoRepository (inyectado por token)
    + execute(id, estado): Observable<Pedido>

Productos:
  GetAllProductosUseCase
    - IProductoRepository (inyectado por token)
    + execute(): Observable<Producto[]>

  GetProductoByIdUseCase
    - IProductoRepository (inyectado por token)
    + execute(id): Observable<Producto>

  BuscarProductosUseCase
    - IProductoRepository (inyectado por token)
    + execute(texto): Observable<Producto[]>

  FiltrarProductosPorCategoriaUseCase
    - IProductoRepository (inyectado por token)
    + execute(idCategoria): Observable<Producto[]>

Usuarios:
  GetAllUsuariosUseCase
    - IUsuarioRepository (inyectado por token)
    + execute(): Observable<Usuario[]>

  GetUsuarioByIdUseCase
    - IUsuarioRepository (inyectado por token)
    + execute(id): Observable<Usuario>

  CrearUsuarioUseCase
    - IUsuarioRepository (inyectado por token)
    + execute(dto: CrearUsuarioDto): Observable<Usuario>

  ActualizarUsuarioUseCase
    - IUsuarioRepository (inyectado por token)
    + execute(usuario: Usuario): Observable<Usuario>

  EliminarUsuarioUseCase
    - IUsuarioRepository (inyectado por token)
    + execute(id): Observable<boolean>
```
</details>

---

## `data`

### Datasources

<details>
<summary><strong>API Datasource</strong></summary>

```
ApiConnectionService (@Injectable, providedIn: 'root')
  - baseUrl: '/api'
  - defaultHeaders: { 'Content-Type': 'application/json' }

  + get<T>(endpoint, params?): Observable<T>
  + post<T>(endpoint, body): Observable<T>
  + put<T>(endpoint, body): Observable<T>
  + delete<T>(endpoint): Observable<T>

API_CONFIG
  - baseUrl: '/api'
  - timeout: 30000

ENDPOINTS
  USUARIOS:        /Usuario,       /Usuario/{id}
  PRODUCTOS:       /Producto,      /Producto/{id}
  PEDIDOS:         /Pedido,        /Pedido/{id}
  DETALLES_PEDIDO: /DetallePedido, /DetallePedido/{id}
  CATEGORIAS:      /Categoria,     /Categoria/{id}
  EMPRESAS:        /Empresa,       /Empresa/{id}
  DIRECCIONES:     /Direccion,     /Direccion/{id}
```
</details>

<details>
<summary><strong>Local Datasource</strong></summary>

```
LocalStorageService (@Injectable, providedIn: 'root')
  + get<T>(key): T | null
  + set<T>(key, value): void
  + remove(key): void
  + clear(): void

  Notas:
  - Compatible con SSR (verifica isPlatformBrowser)
  - Maneja errores de JSON.parse/stringify con try-catch
```
</details>

### Repositories (implementaciones API)

<details>
<summary>Ver implementaciones de repositorios</summary>

```
CategoriaApiRepository : ICategoriaRepository
  + getAll / getById / create / update

DetallePedidoApiRepository : IDetallePedidoRepository
  + getAll / getById / getByPedidoId / create / createMany / update / delete
  Nota: mapea campos snake_case ↔ camelCase del backend

DireccionApiRepository : IDireccionRepository
  + getAll / getById / create / update / delete

EmpresaApiRepository : IEmpresaRepository
  + getAll / getById / create / update / delete

PedidoApiRepository : IPedidoRepository
  + getAll / getByUsuarioId / getById / create / actualizarEstado / delete
  Notas:
  - Normaliza estados numéricos del backend (0→pendiente, 1→enviado, 2→entregado, 3→cancelado)
  - create() hace fallback a getByUsuarioId si el POST no devuelve el pedido creado

ProductoApiRepository : IProductoRepository
  + getAll / getById / buscar / filtrarPorCategoria / create / update / delete
  Nota: getById() usa getAll() + filtro local (workaround: GET /Producto/{id} devuelve 500)

UsuarioApiRepository : IUsuarioRepository
  + getAll / getById / getByEmail / create / update / delete
  Notas:
  - Normaliza roles numéricos del backend (0→administrador, 1→empleado)
  - Mapea firebase_uid ↔ firebaseUID
```
</details>

---

## `presentation`

### View Models (modelos de vista)

| Modelo | Campos |
|--------|--------|
| `CarritoItemViewModel` | `idProducto`, `nombre`, `precioUnitario`, `cantidad`, `subtotal`, `stock`, `idEmpresaProveedora`, `proveedorNombre` |
| `CarritoViewModel` | `items[]`, `totalItems`, `precioTotal` |
| `FondoPantallaViewModel` | `id`, `nombre`, `archivo`, `seleccionado`, `previewUrl` |
| `PedidoViewModel` | `id`, `fecha`, `fechaFormateada`, `proveedorNombre`, `precioTotal`, `precioTotalFormateado`, `estado`, `estadoColor`, `estadoIcon`, `usuarioNombre` |
| `ProductoViewModel` | `id`, `nombre`, `descripcion`, `precio`, `precioFormateado`, `stock`, `categoriaNombre`, `proveedorNombre`, `idEmpresaProveedora`, `enStock` |
| `TemaViewModel` | `id`, `nombre`, `icono`, `activo` |
| `UsuarioViewModel` | `id`, `nombreCompleto`, `correo`, `telefono`, `rol`, `iniciales` |

### ViewModels (lógica de presentación)

<details>
<summary>Ver todos los ViewModels</summary>

```
ConfiguracionViewModel (@Injectable, providedIn: 'root')
  - Gestiona preferencias de tema (light/dark) y fondo de pantalla
  - Persiste en localStorage (STORAGE_KEYS.THEME / WALLPAPER)
  + cambiarTema(id): void
  + cambiarFondo(id): void
  + cerrarSesion(): void (logout + redirige a /login)

LoginViewModel (@Injectable, providedIn: 'root')
  - Signals: isLoading, errorMessage, correo, password
  - Computed: isFormValid (ambos campos no vacíos)
  + login(): void (AuthService.login → navega a /home)
  + reset(): void

MainMenuViewModel (@Injectable, providedIn: 'root')
  - Define módulos del menú: Compras, Pedidos, Usuarios, Ajustes
  - Computed: modulos (filtra módulos admin según rol)
  + nombreUsuario / rolUsuario (computed desde AuthService)

BusquedaProductosViewModel (@Injectable, providedIn: 'root')
  - Carga categorías + productos + empresas via forkJoin
  - Computed: productosFiltrados (por categoría, proveedor, texto, precio)
  + cargarDatos(forceReload): void

DetalleProductoViewModel (@Injectable, providedIn: 'root')
  - Carga producto + empresa + categoría via forkJoin
  + cargarDetalle(id): void

CarritoViewmodel (@Injectable, providedIn: 'root')
  - Restricción: todos los items deben ser del mismo proveedor
  - Persiste en localStorage (STORAGE_KEYS.CART_ITEMS)
  + agregarProducto(): void
  + actualizarCantidad(): void
  + eliminarProducto(): void
  + vaciarCarrito(): void

HistorialPedidosViewModel (@Injectable, providedIn: 'root')
  - Computed: pedidosFiltrados (búsqueda por ID, rango fechas, orden precio)
  + cargarPedidos(forceReload): void
  + toggleSoloMios() / toggleOrdenPrecio()

DetallePedidoViewmodel (@Injectable, providedIn: 'root')
  - Carga pedido + detalles + productos + usuarios via forkJoin
  + cargarDetalle(idPedido): void
  + actualizarEstado(nuevoEstado, onSuccess?): void

ListadoUsuariosViewModel (@Injectable, providedIn: 'root')
  - Filtra solo usuarios activos, mapea a UsuarioViewModel
  + cargarUsuarios(): void
  + eliminarUsuario(id): void

CrearUsuarioViewModel (@Injectable, providedIn: 'root')
  - Creación en dos pasos: Firebase Auth → API REST
  - Rollback: elimina de Firebase si falla la API
  + crearUsuario(): void

EditarUsuarioViewModel (@Injectable, providedIn: 'root')
  + cargarUsuario(id): void
  + guardar(): void (redirige a /usuarios tras 1.2s)
```
</details>

---

## `features` — Pantallas

### Rutas de la aplicación

| Ruta | Componente | Guards | Descripción |
|------|-----------|--------|-------------|
| `/login` | `LoginComponent` | — | Inicio de sesión |
| `/home` | `MainMenuComponent` | `authGuard` | Menú principal con tarjetas de módulos |
| `/compras` | `BusquedaProductosComponent` | `authGuard` | Catálogo de productos con filtros |
| `/compras/producto/:id` | `DetalleProductoComponent` | `authGuard` | Detalle de un producto |
| `/compras/carrito` | `CarritoComponent` | `authGuard` | Carrito de compras |
| `/pedidos` | `HistorialPedidosComponent` | `authGuard` | Historial de pedidos |
| `/pedidos/:id` | `DetallePedidoComponent` | `authGuard` | Detalle de un pedido |
| `/usuarios` | `ListadoUsuariosComponent` | `authGuard` + `adminGuard` | Gestión de usuarios |
| `/usuarios/crear` | `CrearUsuarioComponent` | `authGuard` + `adminGuard` | Crear nuevo usuario |
| `/usuarios/editar/:id` | `EditarUsuarioComponent` | `authGuard` + `adminGuard` | Editar usuario existente |
| `/ajustes` | `ConfiguracionComponent` | `authGuard` | Configuración (tema, fondo, cerrar sesión) |

### SSR (Server-Side Rendering)

Todas las rutas se renderizan en el **cliente** (`RenderMode.Client`). Solo la ruta comodín (`**`) se pre-renderiza (`RenderMode.Prerender`).

---

## `shared` — Componentes reutilizables

### Componentes

| Componente | Selector | Descripción |
|-----------|----------|-------------|
| `AnimatedListItemComponent` | `app-animated-list-item` | Envuelve items de lista con animaciones de entrada (fadeUp, fadeLeft, fadeScale) |
| `ErrorMessageComponent` | `app-error-message` | Muestra mensajes de error con icono, título y botón de reintentar |
| `SkeletonLoadingComponent` | `app-skeleton-loading` | Placeholders de carga tipo skeleton (card, list, text, circle, table) |
| `PhoneInputComponent` | `app-phone-input` | Input de teléfono con selector de país (34 países), detección automática de prefijo. Implementa `ControlValueAccessor` |

### Directivas

| Directiva | Selector | Descripción |
|-----------|----------|-------------|
| `ClickOutsideDirective` | `[clickOutside]` | Emite evento al hacer clic fuera del elemento |
| `FadeInDirective` | `[appFadeIn]` | Anima la entrada del elemento al entrar en el viewport (usa `IntersectionObserver`) |

### Pipes

| Pipe | Nombre | Descripción |
|------|--------|-------------|
| `CurrencyFormatPipe` | `currencyFormat` | Formatea números como moneda EUR (`Intl.NumberFormat('es-ES')`) |

### Servicios

| Servicio | Descripción |
|----------|-------------|
| `FacturaPdfService` | Genera facturas PDF con jsPDF: cabecera corporativa, tabla de productos con rayas zebra, total y pie de página. Descarga automática. |

### Utilidades

| Utilidad | Descripción |
|----------|-------------|
| `hashPassword(password)` | Hash SHA-256 via Web Crypto API. Devuelve `Promise<string>` (64 caracteres hex). |

### Constantes

<details>
<summary>Ver constantes de la aplicación</summary>

```
APP_NAME = 'AbastecePro'
APP_VERSION = (versión actual)

STORAGE_KEYS
  CURRENT_USER, AUTH_TOKEN, THEME, WALLPAPER, CART_ITEMS

WALLPAPERS
  5 fondos de pantalla con degradados CSS

THEMES
  light, dark

ROLES
  ADMIN = 'administrador'
  EMPLOYEE = 'empleado'

ESTADOS_PEDIDO
  pendiente  → { label, color, icon }
  enviado    → { label, color, icon }
  entregado  → { label, color, icon }
  cancelado  → { label, color, icon }

ANIMATION_DURATION
  FAST: 100ms, NORMAL: 180ms, SLOW: 280ms, VERY_SLOW: 400ms

STAGGER_DELAY
  FAST: 25ms, NORMAL: 40ms, SLOW: 70ms

ANIMATION_EASING
  EASE, EASE_IN, EASE_OUT, EASE_IN_OUT, SPRING

SKELETON_COUNT
  CARDS: 6, LIST_ITEMS: 8, TABLE_ROWS: 5
```
</details>

---

## Configuración

### Proxy (`proxy.conf.json`)

```json
{
  "/api": {
    "target": "https://abasteceproapi-bhfadqfrb3eubhd3.spaincentral-01.azurewebsites.net",
    "secure": true,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

### Providers globales (`app.config.ts`)

```
provideRouter(routes, withViewTransitions())          → Rutas con View Transitions API
provideHttpClient(withInterceptors([auth, error]))    → HTTP con interceptores
provideClientHydration(withEventReplay())             → Hidratación SSR
...REPOSITORY_PROVIDERS                                → Inyección de repositorios
```

### Entornos

| Variable | Desarrollo | Producción |
|----------|-----------|------------|
| `production` | `false` | `true` |
| `firebase.projectId` | `losreactnativoserp` | `losreactnativoserp` |

---

## Scripts

```bash
npm start          # Servidor de desarrollo (ng serve)
npm run build      # Build de producción
npm run watch      # Build en modo watch
npm test           # Ejecutar tests (Vitest)
npm run serve:ssr  # Servir build SSR con Express
```

---

## Requisitos

- **Node.js** ≥ 18
- **npm** ≥ 11.4.0
- **Angular CLI** ≥ 21.1.1

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd AbastecePro

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`.
