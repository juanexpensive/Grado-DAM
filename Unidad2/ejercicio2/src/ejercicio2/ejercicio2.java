package ejercicio2;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class ejercicio2 {
    public static void main(String[] args) {

        String autor = "Juan Caro Vaquero"; 
        File baseDir = new File("C:\\Users\\juan.caro\\AD"); 

        if (baseDir.exists() && baseDir.isDirectory()) {
            recorrerCarpetas(baseDir, autor);
        } else {
            System.out.println("La carpeta base no existe o no es un directorio.");
        }
    }

    public static void recorrerCarpetas(File carpeta, String autor) {
        File[] archivos = carpeta.listFiles();
        if (archivos == null) return;

        for (File archivo : archivos) {
            if (archivo.isDirectory()) {
                crearHTML(archivo, autor);        
                recorrerCarpetas(archivo, autor);  
            }
        }
    }

    public static void crearHTML(File carpeta, String autor) {
        String nombreCarpeta = carpeta.getName();
        String rutaCompleta = carpeta.getAbsolutePath();
        File htmlFile = new File(carpeta, nombreCarpeta + ".html");

        try (FileWriter writer = new FileWriter(htmlFile)) {
            writer.write("<html>\n");
            writer.write("   <head>\n");
            writer.write("      <title>" + nombreCarpeta + "</title>\n");
            writer.write("   </head>\n");
            writer.write("   <body>\n");
            writer.write("      <h1>" + rutaCompleta + "</h1>\n");
            writer.write("      <h3>Autor: " + autor + "</h3>\n");
            writer.write("   </body>\n");
            writer.write("</html>");
            System.out.println("Archivo HTML creado en: " + rutaCompleta);
        } catch (IOException e) {
            System.out.println("Error al crear el archivo HTML en: " + rutaCompleta);
            e.printStackTrace();
        }
    }
}
