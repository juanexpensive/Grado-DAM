package com.school.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import java.util.logging.Level;
import java.util.logging.Logger;

public class HibernateUtil {
    static {
        // Restauramos los logs para poder ver el error de creación de tablas en la
        // consola.
        Logger.getLogger("org.hibernate").setLevel(Level.INFO);
    }

    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            return new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Error en la creación de la SessionFactory: " + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    /**
     * Crea el esquema de la base de datos de forma manual (Drop & Create).
     * Se utiliza una SessionFactory temporal con 'hibernate.hbm2ddl.auto' en
     * 'create'
     * para forzar el borrado y recreación de todas las tablas registradas.
     */
    public static void crearEsquema() {
        try {
            System.out.println("Iniciando creación de tablas con Hibernate (Modo Robusto - Limpieza Nativa)...");

            // PRIMERO: Limpieza nativa para evitar problemas de Foreign Keys (errno: 150)
            ejecutarLimpiezaNativa();

            // SEGUNDO: Creación estándar con Hibernate
            Configuration config = new Configuration().configure();

            // Registramos explícitamente las clases
            config.addAnnotatedClass(com.school.model.Profesor.class);
            config.addAnnotatedClass(com.school.model.Alumno.class);
            config.addAnnotatedClass(com.school.model.Matricula.class);

            config.setProperty("hibernate.hbm2ddl.auto", "create");
            config.setProperty("hibernate.show_sql", "true");
            config.setProperty("hibernate.format_sql", "true");

            try (SessionFactory tempSF = config.buildSessionFactory()) {
                System.out.println(" Esquema recreado correctamente.");
            }
        } catch (Exception e) {
            System.err.println("Error al generar el esquema: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void ejecutarLimpiezaNativa() {
        // Usamos una configuración básica para obtener una sesión y lanzar queries
        // nativas
        // que salten las validaciones de claves foráneas de MySQL.
        Configuration config = new Configuration().configure();
        try (SessionFactory sf = config.buildSessionFactory();
                org.hibernate.Session session = sf.openSession()) {

            org.hibernate.Transaction tx = session.beginTransaction();
            System.out.println(" - Ejecutando limpieza nativa de tablas...");

            // 1. Desactivar checks de foreign keys
            session.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0", Object.class).executeUpdate();

            // 2. Borrar tablas (orden irrelevante ahora)
            session.createNativeQuery("DROP TABLE IF EXISTS Matricula", Object.class).executeUpdate();
            session.createNativeQuery("DROP TABLE IF EXISTS Alumnado", Object.class).executeUpdate();
            session.createNativeQuery("DROP TABLE IF EXISTS Profesores", Object.class).executeUpdate();

            // 3. Reactivar checks
            session.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1", Object.class).executeUpdate();

            tx.commit();
            System.out.println(" - Limpieza nativa completada.");
        } catch (Exception e) {
            System.err.println(" ! Advertencia en limpieza nativa: " + e.getMessage());
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getSessionFactory().close();
    }
}
