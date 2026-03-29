using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Data.SqlClient;
using Data.Database;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Data.Repositories
{
    public class ProductoRepository : IProductoRepository
    {
        string connectionString = Connection.getConnectionString();

        /// <summary>
        /// Agrega un nuevo registro de producto a la base de datos.
        /// Precondiciones: El objeto producto no debe ser nulo y debe tener propiedades válidas.
        /// Postcondiciones: Retorna true si el producto fue insertado, de lo contrario false.
        /// </summary>
        public async Task<bool> AddProducto(Producto producto)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Producto (nombre, descripcion, precio, stock, idCategoria, idEmpresaProveedora, activo) VALUES (@nombre, @descripcion, @precio, @stock, @idCategoria, @idEmpresaProveedora, @activo)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", producto.Nombre);
                cmd.Parameters.AddWithValue("@descripcion", producto.Descripcion);
                cmd.Parameters.AddWithValue("@precio", producto.Precio);
                cmd.Parameters.AddWithValue("@stock", producto.Stock);
                cmd.Parameters.AddWithValue("@idCategoria", producto.IdCategoria);
                cmd.Parameters.AddWithValue("@idEmpresaProveedora", producto.IdEmpresaProveedora);
                cmd.Parameters.AddWithValue("@activo", producto.Activo);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Obtiene todos los registros de productos de la base de datos.
        /// Precondiciones: La conexión a la base de datos debe estar disponible.
        /// Postcondiciones: Retorna un arreglo que contiene todos los productos encontrados.
        /// </summary>
        public async Task<Producto[]> GetAllProductos()
        {
            List<Producto> productos = new List<Producto>();

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Producto";
                SqlCommand cmd = new SqlCommand(query, conn);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    Producto producto = new Producto(
                        reader["nombre"].ToString(),
                        reader["descripcion"].ToString(),
                        (decimal)reader["precio"],
                        (int)reader["stock"],
                        (int)reader["idCategoria"],
                        (int)reader["idEmpresaProveedora"],
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                    productos.Add(producto);
                }
                reader.Close();
            }
            return productos.ToArray();
        }

        /// <summary>
        /// Obtiene un único producto por su identificador.
        /// Precondiciones: El ID debe ser un identificador válido.
        /// Postcondiciones: Retorna la entidad del producto si se encuentra, de lo contrario null.
        /// </summary>
        public async Task<Producto> GetProductoById(int id)
        {
            Producto producto = null;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Producto WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    producto = new Producto(
                        reader["nombre"].ToString(),
                        reader["descripcion"].ToString(),
                        (decimal)reader["precio"],
                        (int)reader["stock"],
                        (int)reader["idCategoria"],
                        (int)reader["idEmpresaProveedora"],
                        (bool)reader["activo"]
                    )
                    {
                        Id = (int)reader["id"]
                    };
                }
                reader.Close();
            }
            return producto;
        }

        /// <summary>
        /// Actualiza un registro de producto existente en la base de datos.
        /// Precondiciones: El ID del producto debe existir y los nuevos datos deben ser válidos.
        /// Postcondiciones: Retorna true si la actualización fue exitosa, de lo contrario false.
        /// </summary>
        public async Task<bool> UpdateProducto(int id, Producto producto)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Producto SET nombre = @nombre, descripcion = @descripcion, precio = @precio, stock = @stock, idCategoria = @idCategoria, idEmpresaProveedora = @idEmpresaProveedora, activo = @activo WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@nombre", producto.Nombre);
                cmd.Parameters.AddWithValue("@descripcion", producto.Descripcion);
                cmd.Parameters.AddWithValue("@precio", producto.Precio);
                cmd.Parameters.AddWithValue("@stock", producto.Stock);
                cmd.Parameters.AddWithValue("@idCategoria", producto.IdCategoria);
                cmd.Parameters.AddWithValue("@idEmpresaProveedora", producto.IdEmpresaProveedora);
                cmd.Parameters.AddWithValue("@activo", producto.Activo);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }

        /// <summary>
        /// Desactiva un producto estableciendo su estado activo en false.
        /// Precondiciones: El ID del producto debe existir.
        /// Postcondiciones: Retorna true si el producto fue desactivado, de lo contrario false.
        /// </summary>
        public async Task<bool> DeleteProducto(int id)
        {
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                string query = "UPDATE Producto SET activo = 0 WHERE id = @id";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@id", id);

                await conn.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }
    }
}
