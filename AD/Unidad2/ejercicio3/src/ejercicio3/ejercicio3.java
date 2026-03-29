package ejercicio3;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class ejercicio3 {
	public static void main(String[] args) {
		File archivoEntrada = new File("src/ejercicio3/hanged.txt");
		String nombreArchivoSalida = "src/ejercicio3/hanged_corregido.txt";

		try (Scanner sc = new Scanner(archivoEntrada)) {
			// 1. Lectura y Transformación del texto
			if (!sc.hasNextLine()) {
				System.out.println("El archivo de entrada está vacío.");
				return;
			}
			
			String fullText = sc.nextLine();
			
			// Inserta un salto de línea antes de cada mayúscula
			String textoSeparado = fullText.replaceAll("([A-Z])", "\n$1");
			
			// Elimina el salto de línea inicial si lo hay
			if (textoSeparado.startsWith("\n")) {
				textoSeparado = textoSeparado.substring(1);
			}
			
			// 2. Escritura del texto transformado en un nuevo archivo
			try (FileWriter escritor = new FileWriter(nombreArchivoSalida)) {
				escritor.write(textoSeparado);
				System.out.println("Texto transformado guardado en: " + nombreArchivoSalida);
			} catch (IOException e) {
				System.out.println("Error al escribir en el archivo de salida.");
				e.printStackTrace();
			}
			
			// 3. Impresión por consola del resultado
			System.out.println("\n--- Contenido Generado ---\n" + textoSeparado);
			
		} catch (FileNotFoundException e) {
			System.out.println("Error: Archivo de entrada no encontrado.");
			e.printStackTrace();
		}
	}
}