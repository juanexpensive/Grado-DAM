package com.school;

import com.school.model.*;
import com.school.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class App {
    private static final Scanner scanner = new Scanner(System.in);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public static void main(String[] args) {
        boolean salir = false;
        while (!salir) {
            System.out.println("\n===== MENÚ HIBERNATE (TAREA 3.1) =====");
            System.out.println("1. Conectar (Inicializar Hibernate)");
            System.out.println("2. Crear Tablas (Efectivo por hbm2ddl)");
            System.out.println("3. Insertar Registro");
            System.out.println("4. Listar Registros");
            System.out.println("5. Modificar Registro");
            System.out.println("6. Borrar Registro");
            System.out.println("7. Eliminar Tablas (Drop)");
            System.out.println("8. Salir");
            System.out.print("Seleccione una opción: ");

            int opcion = leerEntero();
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
                    salir = true;
                    break;
                default:
                    System.out.println("Opción no válida.");
            }
        }
        HibernateUtil.shutdown();
        System.out.println("Sistema finalizado.");
    }

    private static void conectar() {
        try {
            HibernateUtil.getSessionFactory();
            System.out.println("Conexión con Hibernate establecida correctamente.");
        } catch (Exception e) {
            System.err.println("Error al conectar: " + e.getMessage());
        }
    }

    private static void crearTablas() {
        /*
         * Se llama a crearEsquema() para realizar un borrado y creación manual
         * de todas las tablas si se desea resetear la base de datos.
         */
        System.out.println("\n--- GESTIÓN DE TABLAS ---");
        System.out.println("1. Recrear todas las tablas (Drop & Create)");
        System.out.println("2. Volver al menú");
        System.out.print("Opción: ");
        int op = leerEntero();

        if (op == 1) {
            HibernateUtil.crearEsquema();
        } else {
            System.out.println("Volviendo al menú principal.");
        }
    }

    private static void insertar() {
        System.out.println("\n¿Sobre qué tabla quiere insertar?");
        System.out.println("1. Profesor\n2. Alumno\n3. Matrícula");
        int tabla = leerEntero();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        try {
            switch (tabla) {
                case 1:
                    Profesor p = new Profesor();
                    System.out.print("Nombre: ");
                    p.setNombre(scanner.nextLine());
                    System.out.print("Apellidos: ");
                    p.setApellidos(scanner.nextLine());
                    System.out.print("Fecha Nacimiento (yyyy-MM-dd): ");
                    p.setFechaNacimiento(leerFecha());
                    System.out.print("Antigüedad: ");
                    p.setAntiguedad(leerEntero());
                    session.persist(p);
                    break;
                case 2:
                    Alumno a = new Alumno();
                    System.out.print("Nombre: ");
                    a.setNombre(scanner.nextLine());
                    System.out.print("Apellidos: ");
                    a.setApellidos(scanner.nextLine());
                    System.out.print("Fecha Nacimiento (yyyy-MM-dd): ");
                    a.setFechaNacimiento(leerFecha());
                    session.persist(a);
                    break;
                case 3:
                    insertarMatricula(session);
                    break;
            }
            tx.commit();
            System.out.println("Registro insertado correctamente.");
        } catch (Exception e) {
            if (tx != null)
                tx.rollback();
            System.err.println("Error al insertar: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    private static void insertarMatricula(Session session) {
        System.out.print("Nombre del profesor: ");
        String nombreProf = scanner.nextLine();
        Query<Profesor> qP = session.createQuery("from Profesor where nombre like :name", Profesor.class);
        qP.setParameter("name", "%" + nombreProf + "%");
        List<Profesor> profes = qP.list();

        if (profes.isEmpty()) {
            throw new RuntimeException("No se puede insertar una matrícula para un profesor que no existe.");
        }
        Profesor profElegido = profes.get(0);
        if (profes.size() > 1) {
            System.out.println("Varios encontrados. Elija ID:");
            profes.forEach(System.out::println);
            int id = leerEntero();
            profElegido = session.get(Profesor.class, id);
        }

        System.out.print("Nombre del alumno: ");
        String nombreAlu = scanner.nextLine();
        Query<Alumno> qA = session.createQuery("from Alumno where nombre like :name", Alumno.class);
        qA.setParameter("name", "%" + nombreAlu + "%");
        List<Alumno> alumnos = qA.list();

        if (alumnos.isEmpty()) {
            throw new RuntimeException("No se puede insertar una matrícula para un alumno que no existe.");
        }
        Alumno aluElegido = alumnos.get(0);
        if (alumnos.size() > 1) {
            System.out.println("Varios encontrados. Elija ID:");
            alumnos.forEach(System.out::println);
            int id = leerEntero();
            aluElegido = session.get(Alumno.class, id);
        }

        System.out.print("Asignatura: ");
        String asig = scanner.nextLine();
        System.out.print("Curso: ");
        int curso = leerEntero();

        Matricula m = new Matricula(profElegido, aluElegido, asig, curso);
        session.persist(m);
    }

    private static void listar() {
        System.out.println("\nSeleccione tabla a consultar:");
        System.out.println("1. Profesor\n2. Alumno\n3. Matrícula");
        int tabla = leerEntero();

        if (tabla < 1 || tabla > 3) {
            System.out.println("Opción no válida.");
            return;
        }

        System.out.println("1. Listar todos los registros\n2. Filtrar por campo");
        int modo = leerEntero();

        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            switch (tabla) {
                case 1:
                    listarConFiltro(session, Profesor.class, modo, "Profesor");
                    break;
                case 2:
                    listarConFiltro(session, Alumno.class, modo, "Alumno");
                    break;
                case 3:
                    listarConFiltro(session, Matricula.class, modo, "Matrícula");
                    break;
            }
        }
    }

    private static <T> void listarConFiltro(Session session, Class<T> clazz, int modo, String nombre) {
        String hql = "from " + clazz.getSimpleName();
        List<T> lista;

        if (modo == 2) {
            // Menú de selección de campo según la entidad
            System.out.println("\nSeleccione campo para filtrar:");
            String campo = "";
            if (clazz == Profesor.class) {
                System.out.println("1. ID\n2. Nombre\n3. Apellidos\n4. Antigüedad");
                int f = leerEntero();
                campo = switch (f) {
                    case 1 -> "idProfesor";
                    case 2 -> "nombre";
                    case 3 -> "apellidos";
                    case 4 -> "antiguedad";
                    default -> "idProfesor";
                };
            } else if (clazz == Alumno.class) {
                System.out.println("1. ID\n2. Nombre\n3. Apellidos");
                int f = leerEntero();
                campo = switch (f) {
                    case 1 -> "idAlumnado";
                    case 2 -> "nombre";
                    case 3 -> "apellidos";
                    default -> "idAlumnado";
                };
            } else if (clazz == Matricula.class) {
                System.out.println("1. ID\n2. Asignatura\n3. Curso");
                int f = leerEntero();
                campo = switch (f) {
                    case 1 -> "idMatricula";
                    case 2 -> "asignatura";
                    case 3 -> "curso";
                    default -> "idMatricula";
                };
            }

            // Menú de selección de operador
            System.out.println("Seleccione operador:");
            System.out.println("1. Igual (=)\n2. Contiene (LIKE)\n3. Mayor que (>)\n4. Menor que (<)");
            int opSel = leerEntero();
            String op = switch (opSel) {
                case 2 -> "LIKE";
                case 3 -> ">";
                case 4 -> "<";
                default -> "=";
            };

            System.out.print("Valor a buscar: ");
            String valor = scanner.nextLine();

            if (op.equals("LIKE")) {
                hql += " where " + campo + " like :val";
                lista = session.createQuery(hql, clazz).setParameter("val", "%" + valor + "%").list();
            } else {
                hql += " where " + campo + " " + op + " :val";
                lista = session.createQuery(hql, clazz).setParameter("val", valor).list();
            }
        } else {
            lista = session.createQuery(hql, clazz).list();
        }

        // Verificamos si hay resultados para mostrar el mensaje adecuado
        if (lista.isEmpty()) {
            String mensaje = "No hay aun ningún " + nombre.toLowerCase() + " insertado.";
            if (nombre.equalsIgnoreCase("Matrícula")) {
                mensaje = "No hay aun ninguna matrícula insertada.";
            }
            if (modo == 2) {
                mensaje = "No se han encontrado registros en " + nombre + " con ese filtro.";
            }
            System.out.println(mensaje);
        } else {
            System.out.println("\n--- " + nombre.toUpperCase() + " ---");
            lista.forEach(System.out::println);
        }
    }

    private static void modificar() {
        System.out.println("\n¿Qué tabla modificar? (1. Profesor, 2. Alumno, 3. Matrícula)");
        int tabla = leerEntero();
        System.out.print("ID del registro: ");
        int id = leerEntero();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        try {
            Object obj = null;
            if (tabla == 1)
                obj = session.get(Profesor.class, id);
            else if (tabla == 2)
                obj = session.get(Alumno.class, id);
            else if (tabla == 3)
                obj = session.get(Matricula.class, id);

            if (obj == null) {
                System.out.println("No se encontró el registro con ID " + id);
                return;
            }

            System.out.println("Registro actual: " + obj);

            // Lógica de modificación con selección de campos
            if (obj instanceof Alumno a) {
                System.out.println("Seleccione el campo a modificar:");
                System.out.println("1. Nombre");
                System.out.println("2. Apellidos");
                System.out.println("3. Fecha de Nacimiento");
                int opcion = leerEntero();

                switch (opcion) {
                    case 1:
                        System.out.print("Nuevo Nombre: ");
                        a.setNombre(scanner.nextLine());
                        break;
                    case 2:
                        System.out.print("Nuevos Apellidos: ");
                        a.setApellidos(scanner.nextLine());
                        break;
                    case 3:
                        System.out.print("Nueva Fecha de Nacimiento (yyyy-MM-dd): ");
                        a.setFechaNacimiento(leerFecha());
                        break;
                    default:
                        System.out.println("Opción no válida.");
                        return;
                }
            } else if (obj instanceof Profesor p) {
                System.out.println("Seleccione el campo a modificar:");
                System.out.println("1. Nombre");
                System.out.println("2. Apellidos");
                System.out.println("3. Fecha de Nacimiento");
                System.out.println("4. Antigüedad");
                int opcion = leerEntero();

                switch (opcion) {
                    case 1:
                        System.out.print("Nuevo Nombre: ");
                        p.setNombre(scanner.nextLine());
                        break;
                    case 2:
                        System.out.print("Nuevos Apellidos: ");
                        p.setApellidos(scanner.nextLine());
                        break;
                    case 3:
                        System.out.print("Nueva Fecha de Nacimiento (yyyy-MM-dd): ");
                        p.setFechaNacimiento(leerFecha());
                        break;
                    case 4:
                        System.out.print("Nueva Antigüedad: ");
                        p.setAntiguedad(leerEntero());
                        break;
                    default:
                        System.out.println("Opción no válida.");
                        return;
                }
            } else if (obj instanceof Matricula m) {
                System.out.println("Seleccione el campo a modificar:");
                System.out.println("1. Asignatura");
                System.out.println("2. Curso");
                int opcion = leerEntero();

                switch (opcion) {
                    case 1:
                        System.out.print("Nueva Asignatura: ");
                        m.setAsignatura(scanner.nextLine());
                        break;
                    case 2:
                        System.out.print("Nuevo Curso: ");
                        m.setCurso(leerEntero());
                        break;
                    default:
                        System.out.println("Opción no válida.");
                        return;
                }
            }

            System.out.print("¿Confirmar cambios? (S/N): ");
            if (scanner.nextLine().equalsIgnoreCase("S")) {
                session.merge(obj); // Asegura que los cambios se persistan
                tx.commit();
                System.out.println("Cambios guardados correctamente.");
            } else {
                tx.rollback();
                System.out.println("Cambios descartados.");
            }
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            System.err.println("Error al modificar: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    private static void borrar() {
        System.out.println("\n1. Borrar todas las tablas (registros)\n2. Borrar tabla concreta");
        int op = leerEntero();

        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();

        try {
            if (op == 2) {
                System.out.println("1. Profesor, 2. Alumno, 3. Matrícula");
                int tabla = leerEntero();
                System.out.println("1. Borrar todos\n2. Filtrar");
                int modo = leerEntero();

                String hql = "DELETE FROM " + (tabla == 1 ? "Profesor" : tabla == 2 ? "Alumno" : "Matricula");
                if (modo == 2) {
                    System.out.print("Campo: ");
                    String f = scanner.nextLine();
                    System.out.print("Valor: ");
                    String v = scanner.nextLine();
                    hql += " WHERE " + f + " = :v";
                    session.createMutationQuery(hql).setParameter("v", v).executeUpdate();
                } else {
                    session.createMutationQuery(hql).executeUpdate();
                }
            }
            System.out.print("¿Confirmar borrado? (S/N): ");
            if (scanner.nextLine().equalsIgnoreCase("S")) {
                tx.commit();
            } else {
                tx.rollback();
            }
        } catch (Exception e) {
            if (tx != null)
                tx.rollback();
            System.err.println("Error de integridad: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    private static void eliminarTablas() {
        System.out.println(
                "Para eliminar tablas con Hibernate, cambie 'hbm2ddl.auto' a 'create-drop' o ejecute SQL nativo.");
        System.out.println("Esta funcionalidad requiere permisos de DDL.");
    }

    private static int leerEntero() {
        try {
            int n = scanner.nextInt();
            scanner.nextLine();
            return n;
        } catch (Exception e) {
            scanner.nextLine();
            return -1;
        }
    }

    private static Date leerFecha() {
        try {
            return dateFormat.parse(scanner.nextLine());
        } catch (Exception e) {
            return new Date();
        }
    }
}
