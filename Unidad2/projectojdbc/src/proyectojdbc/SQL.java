package proyectojdbc;

import java.sql.*;
import java.util.Scanner;

public class SQL {
    private static final String URL = "jdbc:mysql://dns11036.phdns11.es:3306/ad2526_juan_caro";
    private static final String USUARIO = "ad2526_juan_caro"; 
    private static final String PASSWORD = "12345";
    
    private static Connection conexion = null;
    private static Scanner scanner = new Scanner(System.in);
    
    // Método para conectar a la base de datos
    public static void conectar() {
        try {
            if (conexion == null || conexion.isClosed()) {
                conexion = DriverManager.getConnection(URL, USUARIO, PASSWORD);
                System.out.println("--------------------------------------------------------------");
                System.out.println(" Conexión establecida correctamente");
                System.out.println("--------------------------------------------------------------");
            }
        } catch (SQLException e) {
            System.err.println(" Error al conectar con la base de datos: " + e.getMessage());
        }
    }
    
    // Método para crear todas las tablas o una específica
    public static void crearTablas() {
        try {
            conectar();
            System.out.println("\n=== CREAR TABLAS ===");
            System.out.println("1. Crear todas las tablas");
            System.out.println("2. Crear tabla específica");
            System.out.print("Seleccione opción: ");
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            if (opcion == 1) {
                crearTablaProfesores();
                crearTablaAlumnado();
                crearTablaMatricula();
                System.out.println("--------------------------------------------------------------");
                System.out.println(" Todas las tablas creadas correctamente");
                System.out.println("--------------------------------------------------------------");

            } else if (opcion == 2) {
                System.out.println("\n1. Profesores");
                System.out.println("2. Alumnado");
                System.out.println("3. Matrícula");
                System.out.print("Seleccione tabla: ");
                int tabla = scanner.nextInt();
                scanner.nextLine();
                
                switch (tabla) {
                    case 1:
                        crearTablaProfesores();
                        break;
                    case 2:
                        crearTablaAlumnado();
                        break;
                    case 3:
                        if (existeTabla("Profesores") && existeTabla("Alumnado")) {
                            crearTablaMatricula();
                        } else {
                            System.out.println(" No se puede crear Matrícula sin las tablas Profesores y Alumnado");
                        }
                        break;
                }
            }
        } catch (SQLException e) {
            System.err.println(" Error al crear tablas: " + e.getMessage());
        }
    }
    
    private static void crearTablaProfesores() throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS Profesores (" +
                    "idProfesor INT AUTO_INCREMENT PRIMARY KEY, " +
                    "Nombre VARCHAR(45), " +
                    "Apellidos VARCHAR(45), " +
                    "FechaNacimiento DATE, " +
                    "Antiguedad INT)";
        Statement stmt = conexion.createStatement();
        stmt.executeUpdate(sql);
        System.out.println("--------------------------------------------------------------");
        System.out.println(" Tabla Profesores creada");
        System.out.println("--------------------------------------------------------------");
    }
    
    private static void crearTablaAlumnado() throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS Alumnado (" +
                    "idAlumnado INT AUTO_INCREMENT PRIMARY KEY, " +
                    "Nombre VARCHAR(45), " +
                    "Apellidos VARCHAR(45), " +
                    "FechaNacimiento DATE)";
        Statement stmt = conexion.createStatement();
        stmt.executeUpdate(sql);
        System.out.println("--------------------------------------------------------------");
        System.out.println(" Tabla Alumnado creada");
        System.out.println("--------------------------------------------------------------");

    }
    
    private static void crearTablaMatricula() throws SQLException {
        String sql = "CREATE TABLE IF NOT EXISTS Matricula (" +
                    "idMatricula INT AUTO_INCREMENT PRIMARY KEY, " +
                    "idProfesorado INT, " +
                    "idAlumnado INT, " +
                    "Asignatura VARCHAR(45), " +
                    "Curso INT, " +
                    "FOREIGN KEY (idProfesorado) REFERENCES Profesores(idProfesor), " +
                    "FOREIGN KEY (idAlumnado) REFERENCES Alumnado(idAlumnado))";
        Statement stmt = conexion.createStatement();
        stmt.executeUpdate(sql);
        System.out.println("--------------------------------------------------------------");
        System.out.println(" Tabla Matrícula creada");
        System.out.println("--------------------------------------------------------------");

    }
    
    private static boolean existeTabla(String nombreTabla) throws SQLException {
        DatabaseMetaData metaData = conexion.getMetaData();
        ResultSet rs = metaData.getTables(null, null, nombreTabla, null);
        return rs.next();
    }
    
    // Método para insertar registros
    public static void insertar() {
        try {
            conectar();
            System.out.println("\n=== INSERTAR REGISTRO ===");
            System.out.println("1. Profesores");
            System.out.println("2. Alumnado");
            System.out.println("3. Matrícula");
            System.out.print("Seleccione tabla: ");
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            switch (opcion) {
                case 1:
                    insertarProfesor();
                    break;
                case 2:
                    insertarAlumno();
                    break;
                case 3:
                    insertarMatricula();
                    break;
            }
        } catch (SQLException e) {
            System.err.println(" Error al insertar: " + e.getMessage());
        }
    }
    
    private static void insertarProfesor() throws SQLException {
        System.out.print("Nombre: ");
        String nombre = scanner.nextLine();
        System.out.print("Apellidos: ");
        String apellidos = scanner.nextLine();
        System.out.print("Fecha de Nacimiento (YYYY-MM-DD): ");
        String fecha = scanner.nextLine();
        System.out.print("Antigüedad (años): ");
        int antiguedad = scanner.nextInt();
        scanner.nextLine();
        
        String sql = "INSERT INTO Profesores (Nombre, Apellidos, FechaNacimiento, Antiguedad) VALUES (?, ?, ?, ?)";
        PreparedStatement pstmt = conexion.prepareStatement(sql);
        pstmt.setString(1, nombre);
        pstmt.setString(2, apellidos);
        pstmt.setDate(3, Date.valueOf(fecha));
        pstmt.setInt(4, antiguedad);
        pstmt.executeUpdate();
        System.out.println("--------------------------------------------------------------");
        System.out.println(" Profesor insertado correctamente");
        System.out.println("--------------------------------------------------------------");

    }
    
    private static void insertarAlumno() throws SQLException {
        System.out.print("Nombre: ");
        String nombre = scanner.nextLine();
        System.out.print("Apellidos: ");
        String apellidos = scanner.nextLine();
        System.out.print("Fecha de Nacimiento (YYYY-MM-DD): ");
        String fecha = scanner.nextLine();
        
        String sql = "INSERT INTO Alumnado (Nombre, Apellidos, FechaNacimiento) VALUES (?, ?, ?)";
        PreparedStatement pstmt = conexion.prepareStatement(sql);
        pstmt.setString(1, nombre);
        pstmt.setString(2, apellidos);
        pstmt.setDate(3, Date.valueOf(fecha));
        pstmt.executeUpdate();
        System.out.println("--------------------------------------------------------------");
        System.out.println(" Alumno insertado correctamente");
        System.out.println("--------------------------------------------------------------");

    }
    
    private static void insertarMatricula() throws SQLException {
        // Seleccionar profesor
        System.out.print("Nombre del profesor: ");
        String nombreProf = scanner.nextLine();
        String sqlProf = "SELECT idProfesor, Nombre, Apellidos FROM Profesores WHERE Nombre LIKE ?";
        PreparedStatement pstmtProf = conexion.prepareStatement(sqlProf);
        pstmtProf.setString(1, "%" + nombreProf + "%");
        ResultSet rsProf = pstmtProf.executeQuery();
        
        int idProfesor = 0;
        int count = 0;
        System.out.println("\nProfesores encontrados:");
        while (rsProf.next()) {
            count++;
            System.out.println(count + ". ID: " + rsProf.getInt("idProfesor") + 
                             " - " + rsProf.getString("Nombre") + " " + rsProf.getString("Apellidos"));
            idProfesor = rsProf.getInt("idProfesor");
        }
        
        if (count == 0) {
            System.out.println("No se puede insertar una matrícula para un profesor que no existe en la Base de Datos");
            return;
        } else if (count > 1) {
            System.out.print("Seleccione el ID del profesor: ");
            idProfesor = scanner.nextInt();
            scanner.nextLine();
        }
        
        // Seleccionar alumno
        System.out.print("Nombre del alumno: ");
        String nombreAlum = scanner.nextLine();
        String sqlAlum = "SELECT idAlumnado, Nombre, Apellidos FROM Alumnado WHERE Nombre LIKE ?";
        PreparedStatement pstmtAlum = conexion.prepareStatement(sqlAlum);
        pstmtAlum.setString(1, "%" + nombreAlum + "%");
        ResultSet rsAlum = pstmtAlum.executeQuery();
        
        int idAlumno = 0;
        count = 0;
        System.out.println("\nAlumnos encontrados:");
        while (rsAlum.next()) {
            count++;
            System.out.println(count + ". ID: " + rsAlum.getInt("idAlumnado") + 
                             " - " + rsAlum.getString("Nombre") + " " + rsAlum.getString("Apellidos"));
            idAlumno = rsAlum.getInt("idAlumnado");
        }
        
        if (count == 0) {
            System.out.println("--------------------------------------------------------------");
            System.out.println(" No se puede insertar una matrícula para un alumno que no existe en la Base de Datos");
            System.out.println("--------------------------------------------------------------");
            return;
        } else if (count > 1) {
            System.out.print("Seleccione el ID del alumno: ");
            idAlumno = scanner.nextInt();
            scanner.nextLine();
        }
        
        System.out.print("Asignatura: ");
        String asignatura = scanner.nextLine();
        System.out.print("Curso: ");
        int curso = scanner.nextInt();
        scanner.nextLine();
        
        String sql = "INSERT INTO Matricula (idProfesorado, idAlumnado, Asignatura, Curso) VALUES (?, ?, ?, ?)";
        PreparedStatement pstmt = conexion.prepareStatement(sql);
        pstmt.setInt(1, idProfesor);
        pstmt.setInt(2, idAlumno);
        pstmt.setString(3, asignatura);
        pstmt.setInt(4, curso);
        pstmt.executeUpdate();
        System.out.println(" Matrícula insertada correctamente");
    }
    
    // Método para listar registros
    public static void listar() {
        try {
            conectar();
            System.out.println("\n=== LISTAR REGISTROS ===");
            System.out.println("1. Profesores");
            System.out.println("2. Alumnado");
            System.out.println("3. Matrícula");
            System.out.print("Seleccione opción: ");
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            switch (opcion) {
                case 1:
                    listarProfesores();
                    break;
                case 2:
                    listarAlumnado();
                    break;
                case 3:
                    listarMatriculas();
                    break;
            }
        } catch (SQLException e) {
            System.err.println(" Error al listar: " + e.getMessage());
        }
    }
    
    private static void listarProfesores() throws SQLException {
        System.out.println("\n--- PROFESORES ---");
        System.out.println("1. Listar todos");
        System.out.println("2. Filtrar por criterio");
        System.out.print("Seleccione opción: ");
        int opcion = scanner.nextInt();
        scanner.nextLine();
        
        String sql = "SELECT * FROM Profesores";
        
        if (opcion == 2) {
            System.out.println("Filtrar por:");
            System.out.println("1. Nombre (=)");
            System.out.println("2. Apellidos (LIKE)");
            System.out.println("3. Fecha Nacimiento (< o >)");
            System.out.println("4. Antigüedad (< o >)");
            System.out.print("Seleccione: ");
            int filtro = scanner.nextInt();
            scanner.nextLine();
            
            switch (filtro) {
                case 1:
                    System.out.print("Nombre: ");
                    String nombre = scanner.nextLine();
                    sql += " WHERE Nombre = '" + nombre + "'";
                    break;
                case 2:
                    System.out.print("Apellidos: ");
                    String apellidos = scanner.nextLine();
                    sql += " WHERE Apellidos LIKE '%" + apellidos + "%'";
                    break;
                case 3:
                    System.out.print("Fecha (YYYY-MM-DD): ");
                    String fecha = scanner.nextLine();
                    System.out.print("¿Mayor (>) o menor (<)?: ");
                    String operador = scanner.nextLine();
                    sql += " WHERE FechaNacimiento " + operador + " '" + fecha + "'";
                    break;
                case 4:
                    System.out.print("Antigüedad: ");
                    int antiguedad = scanner.nextInt();
                    scanner.nextLine();
                    System.out.print("¿Mayor (>) o menor (<)?: ");
                    operador = scanner.nextLine();
                    sql += " WHERE Antiguedad " + operador + " " + antiguedad;
                    break;
            }
        }
        
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        
        System.out.println("\nID | Nombre | Apellidos | Fecha Nac. | Antigüedad");
        System.out.println("--------------------------------------------------------");
        while (rs.next()) {
            System.out.printf("%d | %s | %s | %s | %d\n",
                rs.getInt("idProfesor"),
                rs.getString("Nombre"),
                rs.getString("Apellidos"),
                rs.getDate("FechaNacimiento"),
                rs.getInt("Antiguedad"));
        }
        System.out.println("--------------------------------------------------------------");

    }
    
    private static void listarAlumnado() throws SQLException {
        System.out.println("\n--- ALUMNADO ---");
        System.out.println("1. Listar todos");
        System.out.println("2. Filtrar por criterio");
        System.out.print("Seleccione opción: ");
        int opcion = scanner.nextInt();
        scanner.nextLine();
        
        String sql = "SELECT * FROM Alumnado";
        
        if (opcion == 2) {
            System.out.println("Filtrar por:");
            System.out.println("1. Nombre (=)");
            System.out.println("2. Apellidos (LIKE)");
            System.out.println("3. Fecha Nacimiento (< o >)");
            System.out.print("Seleccione: ");
            int filtro = scanner.nextInt();
            scanner.nextLine();
            
            switch (filtro) {
                case 1:
                    System.out.print("Nombre: ");
                    String nombre = scanner.nextLine();
                    sql += " WHERE Nombre = '" + nombre + "'";
                    break;
                case 2:
                    System.out.print("Apellidos: ");
                    String apellidos = scanner.nextLine();
                    sql += " WHERE Apellidos LIKE '%" + apellidos + "%'";
                    break;
                case 3:
                    System.out.print("Fecha (YYYY-MM-DD): ");
                    String fecha = scanner.nextLine();
                    System.out.print("¿Mayor (>) o menor (<)?: ");
                    String operador = scanner.nextLine();
                    sql += " WHERE FechaNacimiento " + operador + " '" + fecha + "'";
                    break;
            }
        }
        
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        
        System.out.println("\nID | Nombre | Apellidos | Fecha Nac.");
        System.out.println("--------------------------------------------");
        while (rs.next()) {
            System.out.printf("%d | %s | %s | %s\n",
                rs.getInt("idAlumnado"),
                rs.getString("Nombre"),
                rs.getString("Apellidos"),
                rs.getDate("FechaNacimiento"));
        }
        System.out.println("--------------------------------------------------------------");

    }
    
    private static void listarMatriculas() throws SQLException {
        System.out.println("\n--- MATRÍCULAS ---");
        String sql = "SELECT m.idMatricula, p.Nombre AS NombreProf, p.Apellidos AS ApellidosProf, " +
                    "a.Nombre AS NombreAlum, a.Apellidos AS ApellidosAlum, m.Asignatura, m.Curso " +
                    "FROM Matricula m " +
                    "JOIN Profesores p ON m.idProfesorado = p.idProfesor " +
                    "JOIN Alumnado a ON m.idAlumnado = a.idAlumnado";
        
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        
        System.out.println("\nID | Profesor | Alumno | Asignatura | Curso");
        System.out.println("--------------------------------------------------------------");
        while (rs.next()) {
            System.out.printf("%d | %s %s | %s %s | %s | %d\n",
                rs.getInt("idMatricula"),
                rs.getString("NombreProf"),
                rs.getString("ApellidosProf"),
                rs.getString("NombreAlum"),
                rs.getString("ApellidosAlum"),
                rs.getString("Asignatura"),
                rs.getInt("Curso"));
        }
        System.out.println("--------------------------------------------------------------");

    }
    
    // Método para modificar registros
    public static void modificar() {
        try {
            conectar();
            conexion.setAutoCommit(false);
            
            System.out.println("\n=== MODIFICAR REGISTRO ===");
            System.out.println("1. Profesores");
            System.out.println("2. Alumnado");
            System.out.println("3. Matrícula");
            System.out.print("Seleccione tabla: ");
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            System.out.print("ID del registro a modificar: ");
            int id = scanner.nextInt();
            scanner.nextLine();
            
            switch (opcion) {
                case 1:
                    modificarProfesor(id);
                    break;
                case 2:
                    modificarAlumno(id);
                    break;
                case 3:
                    modificarMatricula(id);
                    break;
            }
            
            System.out.print("\n¿Confirmar cambios? (S/N): ");
            String confirmar = scanner.nextLine();
            if (confirmar.equalsIgnoreCase("S")) {
                conexion.commit();
                System.out.println(" Cambios confirmados");
            } else {
                conexion.rollback();
                System.out.println(" Cambios deshechos");
            }
            
            conexion.setAutoCommit(true);
        } catch (SQLException e) {
            try {
                conexion.rollback();
                conexion.setAutoCommit(true);
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            System.err.println(" Error al modificar: " + e.getMessage());
        }
    }
    
    private static void modificarProfesor(int id) throws SQLException {
        System.out.print("Nuevo nombre: ");
        String nombre = scanner.nextLine();
        System.out.print("Nuevos apellidos: ");
        String apellidos = scanner.nextLine();
        System.out.print("Nueva fecha (YYYY-MM-DD): ");
        String fecha = scanner.nextLine();
        System.out.print("Nueva antigüedad: ");
        int antiguedad = scanner.nextInt();
        scanner.nextLine();
        
        String sql = "UPDATE Profesores SET Nombre=?, Apellidos=?, FechaNacimiento=?, Antiguedad=? WHERE idProfesor=?";
        PreparedStatement pstmt = conexion.prepareStatement(sql);
        pstmt.setString(1, nombre);
        pstmt.setString(2, apellidos);
        pstmt.setDate(3, Date.valueOf(fecha));
        pstmt.setInt(4, antiguedad);
        pstmt.setInt(5, id);
        pstmt.executeUpdate();
        
        // Mostrar registro modificado
        String sqlSelect = "SELECT * FROM Profesores WHERE idProfesor = " + id;
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sqlSelect);
        System.out.println("\nRegistro modificado:");
        while (rs.next()) {
            System.out.printf("ID: %d | %s %s | %s | Antigüedad: %d\n",
                rs.getInt("idProfesor"),
                rs.getString("Nombre"),
                rs.getString("Apellidos"),
                rs.getDate("FechaNacimiento"),
                rs.getInt("Antiguedad"));
        }
    }
    
    private static void modificarAlumno(int id) throws SQLException {
        System.out.print("Nuevo nombre: ");
        String nombre = scanner.nextLine();
        System.out.print("Nuevos apellidos: ");
        String apellidos = scanner.nextLine();
        System.out.print("Nueva fecha (YYYY-MM-DD): ");
        String fecha = scanner.nextLine();
        
        String sql = "UPDATE Alumnado SET Nombre=?, Apellidos=?, FechaNacimiento=? WHERE idAlumnado=?";
        PreparedStatement pstmt = conexion.prepareStatement(sql);
        pstmt.setString(1, nombre);
        pstmt.setString(2, apellidos);
        pstmt.setDate(3, Date.valueOf(fecha));
        pstmt.setInt(4, id);
        pstmt.executeUpdate();
        
        String sqlSelect = "SELECT * FROM Alumnado WHERE idAlumnado = " + id;
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sqlSelect);
        System.out.println("\nRegistro modificado:");
        while (rs.next()) {
            System.out.printf("ID: %d | %s %s | %s\n",
                rs.getInt("idAlumnado"),
                rs.getString("Nombre"),
                rs.getString("Apellidos"),
                rs.getDate("FechaNacimiento"));
        }
    }
    
    private static void modificarMatricula(int id) throws SQLException {
        System.out.print("Nueva asignatura: ");
        String asignatura = scanner.nextLine();
        System.out.print("Nuevo curso: ");
        int curso = scanner.nextInt();
        scanner.nextLine();
        
        String sql = "UPDATE Matricula SET Asignatura=?, Curso=? WHERE idMatricula=?";
        PreparedStatement pstmt = conexion.prepareStatement(sql);
        pstmt.setString(1, asignatura);
        pstmt.setInt(2, curso);
        pstmt.setInt(3, id);
        pstmt.executeUpdate();
        
        String sqlSelect = "SELECT * FROM Matricula WHERE idMatricula = " + id;
        Statement stmt = conexion.createStatement();
        ResultSet rs = stmt.executeQuery(sqlSelect);
        System.out.println("\nRegistro modificado:");
        while (rs.next()) {
            System.out.printf("ID: %d | Asignatura: %s | Curso: %d\n",
                rs.getInt("idMatricula"),
                rs.getString("Asignatura"),
                rs.getInt("Curso"));
        }
    }
    
    // Método para borrar registros
    public static void borrar() {
        try {
            conectar();
            conexion.setAutoCommit(false);
            
            System.out.println("\n=== BORRAR REGISTROS ===");
            System.out.println("1. Profesores");
            System.out.println("2. Alumnado");
            System.out.println("3. Matrícula");
            System.out.print("Seleccione tabla: ");
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            System.out.println("1. Borrar todos los registros");
            System.out.println("2. Borrar por filtro");
            System.out.print("Seleccione: ");
            int modo = scanner.nextInt();
            scanner.nextLine();
            
            String tabla = "";
            String condicion = "";
            
            switch (opcion) {
                case 1:
                    tabla = "Profesores";
                    break;
                case 2:
                    tabla = "Alumnado";
                    break;
                case 3:
                    tabla = "Matricula";
                    break;
            }
            
            if (modo == 2) {
                System.out.print("Campo por el que filtrar: ");
                String campo = scanner.nextLine();
                System.out.print("Valor: ");
                String valor = scanner.nextLine();
                condicion = " WHERE " + campo + " = '" + valor + "'";
            }
            
            // Mostrar registros a borrar
            String sqlSelect = "SELECT * FROM " + tabla + condicion;
            Statement stmt = conexion.createStatement();
            ResultSet rs = stmt.executeQuery(sqlSelect);
            
            System.out.println("\nRegistros que se borrarán:");
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            
            while (rs.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(metaData.getColumnName(i) + ": " + rs.getString(i) + " | ");
                }
                System.out.println();
            }
            
            System.out.print("\n¿Confirmar borrado? (S/N): ");
            String confirmar = scanner.nextLine();
            
            if (confirmar.equalsIgnoreCase("S")) {
                String sqlDelete = "DELETE FROM " + tabla + condicion;
                stmt.executeUpdate(sqlDelete);
                conexion.commit();
                System.out.println(" Registros borrados");
            } else {
                conexion.rollback();
                System.out.println(" Operación cancelada");
            }
            
            conexion.setAutoCommit(true);
        } catch (SQLException e) {
            try {
                conexion.rollback();
                conexion.setAutoCommit(true);
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            System.err.println(" Error al borrar: " + e.getMessage());
            if (e.getMessage().contains("foreign key constraint")) {
                System.err.println("No se puede borrar debido a restricciones de integridad referencial");
            }
        }
    }
    
    // Método para eliminar tablas (DROP)
    public static void eliminarTablas() {
        try {
            conectar();
            System.out.println("\n=== ELIMINAR TABLAS (DROP) ===");
            System.out.println("1. Eliminar todas las tablas");
            System.out.println("2. Eliminar tabla específica");
            System.out.print("Seleccione opción: ");
            int opcion = scanner.nextInt();
            scanner.nextLine();
            
            if (opcion == 1) {
                System.out.print("¿Está seguro de eliminar TODAS las tablas? (S/N): ");
                String confirmar = scanner.nextLine();
                if (confirmar.equalsIgnoreCase("S")) {
                    Statement stmt = conexion.createStatement();
                    stmt.executeUpdate("DROP TABLE IF EXISTS Matricula");
                    stmt.executeUpdate("DROP TABLE IF EXISTS Alumnado");
                    stmt.executeUpdate("DROP TABLE IF EXISTS Profesores");
                    System.out.println("--------------------------------------------------------------");
                    System.out.println(" Todas las tablas eliminadas");
                    System.out.println("--------------------------------------------------------------");
                }
            } else {
                System.out.println("1. Profesores");
                System.out.println("2. Alumnado");
                System.out.println("3. Matrícula");
                System.out.print("Seleccione tabla: ");
                int tabla = scanner.nextInt();
                scanner.nextLine();
                
                String nombreTabla = "";
                switch (tabla) {
                    case 1:
                        nombreTabla = "Profesores";
                        System.out.println("Debe eliminar primero la tabla Matrícula");
                        return;
                    case 2:
                        nombreTabla = "Alumnado";
                        System.out.println("Debe eliminar primero la tabla Matrícula");
                        return;
                    case 3:
                        nombreTabla = "Matricula";
                        break;
                }
                
                System.out.print("¿Eliminar tabla " + nombreTabla + "? (S/N): ");
                String confirmar = scanner.nextLine();
                if (confirmar.equalsIgnoreCase("S")) {
                    Statement stmt = conexion.createStatement();
                    stmt.executeUpdate("DROP TABLE IF EXISTS " + nombreTabla);
                    System.out.println(" Tabla " + nombreTabla + " eliminada");
                }
            }
        } catch (SQLException e) {
            System.err.println(" Error al eliminar tablas: " + e.getMessage());
            if (e.getMessage().contains("foreign key constraint")) {
                System.err.println("No se puede eliminar la tabla debido a restricciones de clave foránea");
            }
        }
    }
    
    // Método para mostrar el menú principal
    public static void mostrarMenu() {
        System.out.println("1. Conectar a la base de datos");
        System.out.println("2. Crear tablas");
        System.out.println("3. Insertar registros");
        System.out.println("4. Listar registros");
        System.out.println("5. Modificar registros");
        System.out.println("6. Borrar registros");
        System.out.println("7. Eliminar tablas (DROP)");
        System.out.println("8. Salir");
        System.out.print("\nSeleccione una opción: ");
    }
    
    // Método principal
    public static void main(String[] args) {
        boolean ejecutando = true;
      
        while (ejecutando) {
            try {
                mostrarMenu();
                int opcion = scanner.nextInt();
                scanner.nextLine(); 
                
                switch (opcion) {
                    case 1:
                        conectar();
                        break;
                    case 2:
                        crearTablas();
                        break;
                    case 3:
                        insertar();
                        break;
                    case 4:
                        listar();
                        break;
                    case 5:
                        modificar();
                        break;
                    case 6:
                        borrar();
                        break;
                    case 7:
                        eliminarTablas();
                        break;
                    case 8:
                        ejecutando = false;
                        if (conexion != null && !conexion.isClosed()) {
                            conexion.close();
                            System.out.println(" Conexión cerrada");
                        }
                        System.out.println("\n Sistema finalizado.");
                        break;
                    default:
                        System.out.println(" Opción no válida");
                }
            } catch (Exception e) {
                System.err.println(" Error: " + e.getMessage());
                scanner.nextLine(); // Limpiar buffer en caso de error
            }
        }
        scanner.close();
    }
}