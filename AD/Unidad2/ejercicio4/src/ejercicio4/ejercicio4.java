package ejercicio4;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class ejercicio4 {
	
	private static final String ARCHIVO_ENTRADA = "src/ejercicio4/hanged.txt";
	private static final String ARCHIVO_CORREGIDO = "src/ejercicio4/hanged_corregido.txt";
	private static final String ARCHIVO_ORDENADO = "src/ejercicio4/palabrasOrdenadas.txt";

	public static void main(String[] args) {
		// Paso 1: Leer el archivo original, separarlo por mayúsculas y crear hanged_corregido.txt
		System.out.println("--- Paso 1: Generación de Palabras Separadas ---");
		generarPalabrasSeparadas(ARCHIVO_ENTRADA, ARCHIVO_CORREGIDO);
		
		System.out.println("\n--- Paso 2: Ordenación de Palabras ---");
		// Paso 2: Leer el archivo corregido, ordenar las palabras y crear palabrasOrdenadas.txt
		ordenarPalabras(ARCHIVO_CORREGIDO, ARCHIVO_ORDENADO);
	}

	// Método para leer el archivo original, separar el texto y escribirlo
	public static void generarPalabrasSeparadas(String archivoEntrada, String archivoSalida) {
		File fileEntrada = new File(archivoEntrada);

		try (Scanner sc = new Scanner(fileEntrada)) {
			if (!sc.hasNextLine()) {
				System.out.println("El archivo de entrada está vacío.");
				return;
			}
			
			String fullText = sc.nextLine();
			String textoSeparado = fullText.replaceAll("([A-Z])", "\n$1");
			
			if (textoSeparado.startsWith("\n")) {
				textoSeparado = textoSeparado.substring(1);
			}
			
			try (FileWriter escritor = new FileWriter(archivoSalida)) {
				escritor.write(textoSeparado);
				System.out.println("Texto transformado guardado en: " + archivoSalida);
			} catch (IOException e) {
				System.out.println("Error al escribir en el archivo de salida.");
				e.printStackTrace();
			}
			
		} catch (FileNotFoundException e) {
			System.out.println("Error: Archivo de entrada no encontrado (" + archivoEntrada + ").");
			e.printStackTrace();
		}
	}

	// Método que lee las palabras del archivo corregido, las ordena y escribe el resultado
	public static void ordenarPalabras(String archivoEntrada, String archivoSalida) {
		File fileEntrada = new File(archivoEntrada);
		List<String> palabras = new ArrayList<>();

		try (Scanner sc = new Scanner(fileEntrada)) {
			// Lee cada línea (que ahora es una palabra) del archivo corregido
			while (sc.hasNextLine()) {
				String palabra = sc.nextLine().trim(); // Usa trim() para limpiar espacios
				if (!palabra.isEmpty()) {
					palabras.add(palabra);
				}
			}
			
			// 1. Ordena la lista de palabras de forma ascendente (alfabéticamente)
			Collections.sort(palabras);
			
			// 2. Escribe las palabras ordenadas en el nuevo archivo
			try (FileWriter escritor = new FileWriter(archivoSalida)) {
				for (String palabra : palabras) {
					// Vuelve a escribir cada palabra seguida de un salto de línea
					escritor.write(palabra + "\n");
				}
				System.out.println("Lista de palabras ordenada y guardada en: " + archivoSalida);
			} catch (IOException e) {
				System.out.println("Error al escribir en el archivo de salida.");
				e.printStackTrace();
			}
			
		} catch (FileNotFoundException e) {
			System.out.println("Error: Archivo de entrada no encontrado (" + archivoEntrada + ").");
			System.out.println("Asegúrate de ejecutar primero la generación de palabras separadas.");
			e.printStackTrace();
		}
	}
}