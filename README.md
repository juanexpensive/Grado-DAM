# Proyecto-SGE-Grupo1


### `core` — Contenedor de dependencias

#### Repositories
| Interfaz | Implementación |
|----------|---------------|
| `IEmpresaRepository` | `EmpresaRepository` |
| `IDireccionRepository` | `DireccionRepository` |
| `IUsuarioRepository` | `UsuarioRepository` |
| `ICategoriaRepository` | `CategoriaRepository` |
| `IProductoRepository` | `ProductoRepository` |
| `IPedidoRepository` | `PedidoRepository` |
| `IDetallePedidoRepository` | `DetallePedidoRepository` |

#### Use Cases
| Interfaz | Implementación |
|----------|---------------|
| `IEmpresaUseCase` | `EmpresaUseCase` |
| `IDireccionUseCase` | `DireccionUseCase` |
| `IUsuarioUseCase` | `UsuarioUseCase` |
| `ICategoriaUseCase` | `CategoriaUseCase` |
| `IProductoUseCase` | `ProductoUseCase` |
| `IPedidoUseCase` | `PedidoUseCase` |
| `IDetallePedidoUseCase` | `DetallePedidoUseCase` |

---

### `domain`

#### Utils

```
enum Roles    { Admin, Usuario }
enum Estados  { Pendiente, Enviado, Entregado, Cancelado, Pagado }
```

#### Entities

<details>
<summary><strong>Empresa</strong></summary>

```
class Empresa
  - int Id
  - string Nombre
  - string Cif
  - int IdDireccion
  - string Telefono
  - string Correo
  - string Iban
  - bool Activo

  Empresa()
  Empresa(nombre, cif, idDireccion, telefono, correo, iban, activo = true)
```
</details>

<details>
<summary><strong>Direccion</strong></summary>

```
class Direccion
  - int Id
  - string Calle
  - string Numero
  - string Ciudad
  - string Pais
  - string CodigoPostal
  - bool Activo

  Direccion()
  Direccion(calle, numero, ciudad, pais, codigoPostal, activo = true)
```
</details>

<details>
<summary><strong>Usuario</strong></summary>

```
class Usuario
  - int Id
  - string Nombre
  - string Apellidos
  - string Correo
  - string Telefono
  - Roles Rol
  - string Firebase_uid
  - bool Activo

  Usuario()
  Usuario(nombre, apellidos, correo, telefono, rol, firebase_uid, activo = true)
```
</details>

<details>
<summary><strong>Categoria</strong></summary>

```
class Categoria
  - int Id
  - string Nombre
  - bool Activo

  Categoria()
  Categoria(nombre, activo = true)
  Categoria(id, nombre, activo = true)
```
</details>

<details>
<summary><strong>Producto</strong></summary>

```
class Producto
  - int Id
  - string Nombre
  - string Descripcion
  - decimal Precio
  - int Stock
  - int IdCategoria
  - int IdEmpresaProveedora
  - bool Activo

  Producto()
  Producto(nombre, descripcion, precio, stock, idCategoria, idEmpresaProveedora, activo = true)
```
</details>

<details>
<summary><strong>Pedido</strong></summary>

```
class Pedido
  - int Id
  - DateTime Fecha
  - int IdUsuario
  - int IdEmpresaProveedora
  - int IdEmpresaConsumidora
  - decimal PrecioTotal
  - Estados Estado  // acepta string ("Pendiente") o número (0) en JSON
  - bool Activo

  Pedido()
  Pedido(fecha, idUsuario, idEmpresaProveedora, idEmpresaConsumidora, precioTotal, estado, activo = true)
```
</details>

<details>
<summary><strong>DetallePedido</strong></summary>

```
class DetallePedido
  - int Id
  - int IdPedido
  - int IdProducto
  - int CantidadProducto
  - decimal PrecioUnitario

  DetallePedido()
  DetallePedido(idPedido, idProducto, cantidadProducto, precioUnitario)
```
</details>

#### Interfaces — Repositories

<details>
<summary>Ver todas las interfaces de repositorio</summary>

```
IEmpresaRepository
  + Task<Empresa[]>  GetAllEmpresas()
  + Task<Empresa>    GetEmpresaById(int id)
  + Task<bool>       AddEmpresa(Empresa empresa)
  + Task<bool>       UpdateEmpresa(int id, Empresa empresa)
  + Task<bool>       DeleteEmpresa(int id)

IDireccionRepository
  + Task<Direccion[]>  GetAllDirecciones()
  + Task<Direccion>    GetDireccionById(int id)
  + Task<bool>         AddDireccion(Direccion direccion)
  + Task<bool>         UpdateDireccion(int id, Direccion direccion)
  + Task<bool>         DeleteDireccion(int id)

IUsuarioRepository
  + Task<Usuario[]>  GetAllUsuarios()
  + Task<Usuario>    GetUsuarioById(int id)
  + Task<bool>       AddUsuario(Usuario usuario)
  + Task<bool>       UpdateUsuario(int id, Usuario usuario)
  + Task<bool>       DeleteUsuario(int id)

ICategoriaRepository
  + Task<Categoria[]>  GetAllCategorias()
  + Task<Categoria>    GetCategoriaById(int id)
  + Task<bool>         AddCategoria(Categoria categoria)
  + Task<bool>         UpdateCategoria(int id, Categoria categoria)
  + Task<bool>         DeleteCategoria(int id)

IProductoRepository
  + Task<Producto[]>  GetAllProductos()
  + Task<Producto>    GetProductoById(int id)
  + Task<bool>        AddProducto(Producto producto)
  + Task<bool>        UpdateProducto(int id, Producto producto)
  + Task<bool>        DeleteProducto(int id)

IPedidoRepository
  + Task<Pedido[]>  GetAllPedidos()
  + Task<Pedido>    GetPedidoById(int id)
  + Task<bool>      AddPedido(Pedido pedido)
  + Task<bool>      UpdatePedido(int id, Pedido pedido)
  + Task<bool>      DeletePedido(int id)

IDetallePedidoRepository
  + Task<DetallePedido[]>  GetAllDetallesPedido()
  + Task<DetallePedido>    GetDetallePedidoById(int id)
  + Task<bool>             AddDetallePedido(DetallePedido detallePedido)
  + Task<bool>             UpdateDetallePedido(int id, DetallePedido detallePedido)
  + Task<bool>             DeleteDetallePedido(int id)
```
</details>

#### Interfaces — Use Cases

<details>
<summary>Ver todas las interfaces de use case</summary>

```
IEmpresaUseCase
  + Task<Empresa[]>  GetAllEmpresas()
  + Task<Empresa>    GetEmpresaById(int id)
  + Task<bool>       AddEmpresa(Empresa empresa)
  + Task<bool>       UpdateEmpresa(int id, Empresa empresa)
  + Task<bool>       DeleteEmpresa(int id)

IDireccionUseCase
  + Task<Direccion[]>  GetAllDirecciones()
  + Task<Direccion>    GetDireccionById(int id)
  + Task<bool>         AddDireccion(Direccion direccion)
  + Task<bool>         UpdateDireccion(int id, Direccion direccion)
  + Task<bool>         DeleteDireccion(int id)

IUsuarioUseCase
  + Task<Usuario[]>  GetAllUsuarios()
  + Task<Usuario>    GetUsuarioById(int id)
  + Task<bool>       AddUsuario(Usuario usuario)
  + Task<bool>       UpdateUsuario(int id, Usuario usuario)
  + Task<bool>       DeleteUsuario(int id)

ICategoriaUseCase
  + Task<Categoria[]>  GetAllCategorias()
  + Task<Categoria>    GetCategoriaById(int id)
  + Task<bool>         AddCategoria(Categoria categoria)
  + Task<bool>         UpdateCategoria(int id, Categoria categoria)
  + Task<bool>         DeleteCategoria(int id)

IProductoUseCase
  + Task<Producto[]>  GetAllProductos()
  + Task<Producto>    GetProductoById(int id)
  + Task<bool>        AddProducto(Producto producto)
  + Task<bool>        UpdateProducto(int id, Producto producto)
  + Task<bool>        DeleteProducto(int id)

IPedidoUseCase
  + Task<Pedido[]>  GetAllPedidos()
  + Task<Pedido>    GetPedidoById(int id)
  + Task<bool>      AddPedido(Pedido pedido)
  + Task<bool>      UpdatePedido(int id, Pedido pedido)
  + Task<bool>      DeletePedido(int id)

IDetallePedidoUseCase
  + Task<DetallePedido[]>  GetAllDetallesPedido()
  + Task<DetallePedido>    GetDetallePedidoById(int id)
  + Task<bool>             AddDetallePedido(DetallePedido detallePedido)
  + Task<bool>             UpdateDetallePedido(int id, DetallePedido detallePedido)
  + Task<bool>             DeleteDetallePedido(int id)
```
</details>

#### Use Cases (implementaciones)

<details>
<summary>Ver implementaciones</summary>

```
EmpresaUseCase : IEmpresaUseCase
  - IEmpresaRepository _empresaRepository
  + GetAllEmpresas / GetEmpresaById / AddEmpresa / UpdateEmpresa / DeleteEmpresa

DireccionUseCase : IDireccionUseCase
  - IDireccionRepository _direccionRepository
  + GetAllDirecciones / GetDireccionById / AddDireccion / UpdateDireccion / DeleteDireccion

UsuarioUseCase : IUsuarioUseCase
  - IUsuarioRepository _usuarioRepository
  + GetAllUsuarios / GetUsuarioById / AddUsuario / UpdateUsuario / DeleteUsuario

CategoriaUseCase : ICategoriaUseCase
  - ICategoriaRepository _categoriaRepository
  + GetAllCategorias / GetCategoriaById / AddCategoria / UpdateCategoria / DeleteCategoria

ProductoUseCase : IProductoUseCase
  - IProductoRepository _productoRepository
  + GetAllProductos / GetProductoById / AddProducto / UpdateProducto / DeleteProducto

PedidoUseCase : IPedidoUseCase
  - IPedidoRepository _pedidoRepository
  + GetAllPedidos / GetPedidoById / AddPedido / UpdatePedido / DeletePedido

DetallePedidoUseCase : IDetallePedidoUseCase
  - IDetallePedidoRepository _detallePedidoRepository
  + GetAllDetallesPedido / GetDetallePedidoById / AddDetallePedido / UpdateDetallePedido / DeleteDetallePedido
```
</details>

---

### `data`

#### Repositories

<details>
<summary>Ver implementaciones de repositorios</summary>

```
EmpresaRepository : IEmpresaRepository
  + GetAllEmpresas / GetEmpresaById / AddEmpresa / UpdateEmpresa / DeleteEmpresa

DireccionRepository : IDireccionRepository
  + GetAllDirecciones / GetDireccionById / AddDireccion / UpdateDireccion / DeleteDireccion

UsuarioRepository : IUsuarioRepository
  + GetAllUsuarios / GetUsuarioById / AddUsuario / UpdateUsuario / DeleteUsuario

CategoriaRepository : ICategoriaRepository
  + GetAllCategorias / GetCategoriaById / AddCategoria / UpdateCategoria / DeleteCategoria

ProductoRepository : IProductoRepository
  + GetAllProductos / GetProductoById / AddProducto / UpdateProducto / DeleteProducto

PedidoRepository : IPedidoRepository
  + GetAllPedidos / GetPedidoById / AddPedido / UpdatePedido / DeletePedido

DetallePedidoRepository : IDetallePedidoRepository
  + GetAllDetallesPedido / GetDetallePedidoById / AddDetallePedido / UpdateDetallePedido / DeleteDetallePedido
```
</details>

#### Database

```
class Connection
  + static string getConnectionString()
```

---

### `api` — Controllers

| Controller | Ruta base | Métodos |
|------------|-----------|---------|
| `EmpresaController` | `api/Empresa` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |
| `DireccionController` | `api/Direccion` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |
| `UsuarioController` | `api/Usuario` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |
| `CategoriaController` | `api/Categoria` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |
| `ProductoController` | `api/Producto` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |
| `PedidoController` | `api/Pedido` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |
| `DetallePedidoController` | `api/DetallePedido` | GET, GET/{id}, POST, PUT/{id}, DELETE/{id} |

<details>
<summary>Ver detalle de endpoints</summary>

```
EmpresaController
  [HttpGet]           GetEmpresa()
  [HttpGet("{id}")]   GetEmpresaById(int id)
  [HttpPost]          AddEmpresa(Empresa empresa)
  [HttpPut("{id}")]   UpdateEmpresa(int id, Empresa empresa)
  [HttpDelete("{id}")] DeleteEmpresa(int id)

DireccionController
  [HttpGet]           GetAllDirecciones()
  [HttpGet("{id}")]   GetDireccionById(int id)
  [HttpPost]          AddDireccion(Direccion direccion)
  [HttpPut("{id}")]   UpdateDireccion(int id, Direccion direccion)
  [HttpDelete("{id}")] DeleteDireccion(int id)

UsuarioController
  [HttpGet]           GetAllUsuarios()
  [HttpGet("{id}")]   GetUsuarioById(int id)
  [HttpPost]          AddUsuario(Usuario usuario)
  [HttpPut("{id}")]   UpdateUsuario(int id, Usuario usuario)
  [HttpDelete("{id}")] DeleteUsuario(int id)

CategoriaController
  [HttpGet]           GetAllCategorias()
  [HttpGet("{id}")]   GetCategoriaById(int id)
  [HttpPost]          AddCategoria(Categoria categoria)
  [HttpPut("{id}")]   UpdateCategoria(int id, Categoria categoria)
  [HttpDelete("{id}")] DeleteCategoria(int id)

ProductoController
  [HttpGet]           GetAllProductos()
  [HttpGet("{id}")]   GetProductoById(int id)
  [HttpPost]          AddProducto(Producto producto)
  [HttpPut("{id}")]   UpdateProducto(int id, Producto producto)
  [HttpDelete("{id}")] DeleteProducto(int id)

PedidoController
  [HttpGet]             GetAllPedidos()
  [HttpGet("{id}")]     GetPedidoById(int id)
  [HttpPost]            AddPedido(Pedido pedido)          → 201 Created + Pedido
  [HttpPut("{id}")]     UpdatePedido(int id, Pedido pedido) → 200 OK + Pedido
  [HttpDelete("{id}")] DeletePedido(int id)

DetallePedidoController
  [HttpGet]           GetAllDetallesPedido()
  [HttpGet("{id}")]   GetDetallePedidoById(int id)
  [HttpPost]          AddDetallePedido(DetallePedido detallePedido)
  [HttpPut("{id}")]   UpdateDetallePedido(int id, DetallePedido detallePedido)
  [HttpDelete("{id}")] DeleteDetallePedido(int id)
```
</details>