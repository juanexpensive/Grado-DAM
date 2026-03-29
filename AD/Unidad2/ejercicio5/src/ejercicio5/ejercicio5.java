package ejercicio5;
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.charset.StandardCharsets;

public class ejercicio5 {

    // Nombres de los archivos
    private static final String ARCHIVO_LECTURA = "entrada.txt";
    private static final String ARCHIVO_ESCRITURA = "salida.txt";

    /**
     * 1. Crea un documento con 'a', lo lee y lo escribe 5 veces aleatoriamente.
     */
    public static void parte1() throws IOException {
        System.out.println("--- Parte 1: Escribir 'a' 5 veces aleatoriamente ---");
        
        // 1. Crear el documento de lectura con una única 'a'
        try (RandomAccessFile rafEntrada = new RandomAccessFile(ARCHIVO_LECTURA, "rw")) {
            rafEntrada.writeBytes("a"); // Escribir la letra 'a'
            System.out.println("Creado " + ARCHIVO_LECTURA + " con contenido: 'a'");
        }

        // 2. Leer de forma aleatoria (seek) y escribir 5 veces
        try (RandomAccessFile rafEntrada = new RandomAccessFile(ARCHIVO_LECTURA, "r");
             RandomAccessFile rafSalida = new RandomAccessFile(ARCHIVO_ESCRITURA, "rw")) {

            // Obtener el byte de la 'a'. En este caso es solo 1 byte.
            rafEntrada.seek(0);
            byte letraA = rafEntrada.readByte();

            // Escribir 5 veces de forma aleatoria (seek) en el archivo de salida
            // Usaremos posiciones distintas para simular el acceso aleatorio.
            long[] posiciones = {0, 5, 2, 7, 1}; // Posiciones de escritura (byte offsets)
            
            for (int i = 0; i < 5; i++) {
                // Posicionar el puntero de escritura
                rafSalida.seek(posiciones[i]);
                rafSalida.writeByte(letraA);
                System.out.println("Escrito 'a' en la posición: " + posiciones[i]);
            }
            // El resultado final en el archivo será la superposición de bytes: "a.a..a.a.a" (dependiendo del SO/Codificación, puede variar)

        }
        System.out.println("Completado. Revisar " + ARCHIVO_ESCRITURA);
        System.out.println("-------------------------------------------------------");
    }

    /**
     * 2. Aumenta el documento de lectura (a, b, c, d, e en líneas diferentes) 
     * y las escribe en otro de forma inversa sin usar ARRAYS ni BUFFER.
     */
    public static void parte2() throws IOException {
        System.out.println("--- Parte 2: Invertir (a, b, c, d, e) sin Arrays/Buffer ---");

        // 1. Aumentar el documento de lectura (a, b, c, d, e, cada una con un salto de línea)
        // Usaremos \n para la "línea diferente". Esto hace que cada registro sea 2 bytes.
        String contenido = "a\nb\nc\nd\ne\n";
        try (RandomAccessFile rafEntrada = new RandomAccessFile(ARCHIVO_LECTURA, "rw")) {
            rafEntrada.setLength(0); // Limpiar el archivo para el nuevo contenido
            rafEntrada.writeBytes(contenido);
            System.out.println("Re-creado " + ARCHIVO_LECTURA + " con contenido: \n" + contenido.trim().replace("\n", ", "));
        }

        // 2. Método de escritura inversa sin arrays ni buffer
        try (RandomAccessFile rafEntrada = new RandomAccessFile(ARCHIVO_LECTURA, "r");
             RandomAccessFile rafSalida = new RandomAccessFile("salida_inversa.txt", "rw")) {

            rafSalida.setLength(0); // Limpiar el archivo de salida
            
            // Cada 'registro' (letra + salto de línea \n) ocupa 2 bytes.
            final int BYTES_POR_REGISTRO = 2;
            long numRegistros = rafEntrada.length() / BYTES_POR_REGISTRO;

            System.out.println("Número de registros (a, b, c, d, e) es: " + numRegistros);
            
            // Iterar desde el último registro hasta el primero (inverso)
            for (long i = numRegistros - 1; i >= 0; i--) {
                // Calcular la posición de inicio del registro actual en la entrada
                long posicionLectura = i * BYTES_POR_REGISTRO;
                
                // Mover el puntero de lectura
                rafEntrada.seek(posicionLectura);
                
                // Leer el registro (letra + \n) byte a byte. No usamos .readChar() ni .readLine() 
                // ya que podrían implicar buffers o codificación no controlada.
                byte letra = rafEntrada.readByte();
                byte salto = rafEntrada.readByte();
                
                // Escribir en el archivo de salida
                rafSalida.writeByte(letra);
                rafSalida.writeByte(salto);
                
                System.out.println("Leído: " + (char)letra + (char)salto + "Escrito.");
            }
            
            System.out.println("Resultado esperado: e\nd\nc\nb\na\n");

        }
        System.out.println("Completado. Revisar salida_inversa.txt");
        System.out.println("-------------------------------------------------------");
    }

    /**
     * 3. Añade un número a cada letra (a1, b2, c3, d4, e5) y realiza la misma operación.
     * Resultado esperado: e5 d4 c3 b2 a1 (en líneas separadas).
     */
    public static void parte3() throws IOException {
        System.out.println("--- Parte 3: Invertir (a1, b2, c3, d4, e5) sin Arrays/Buffer ---");

        // 1. Crear el documento de lectura (a1, b2, c3, d4, e5, cada una con un salto de línea)
        // Usaremos \n para la "línea diferente". Esto hace que cada registro sea 3 bytes.
        String contenido = "a1\nb2\nc3\nd4\ne5\n";
        try (RandomAccessFile rafEntrada = new RandomAccessFile(ARCHIVO_LECTURA, "rw")) {
            rafEntrada.setLength(0); // Limpiar el archivo
            rafEntrada.writeBytes(contenido);
            System.out.println("Re-creado " + ARCHIVO_LECTURA + " con contenido: \n" + contenido.trim().replace("\n", ", "));
        }

        // 2. Método de escritura inversa sin arrays ni buffer
        try (RandomAccessFile rafEntrada = new RandomAccessFile(ARCHIVO_LECTURA, "r");
             RandomAccessFile rafSalida = new RandomAccessFile("salida_inversa2.txt", "rw")) {

            rafSalida.setLength(0); // Limpiar el archivo de salida
            
            // Cada 'registro' (letra + número + salto de línea \n) ocupa 3 bytes.
            final int BYTES_POR_REGISTRO = 3;
            long numRegistros = rafEntrada.length() / BYTES_POR_REGISTRO;

            System.out.println("Número de registros (a1, b2, c3, d4, e5) es: " + numRegistros);

            // Iterar desde el último registro hasta el primero (inverso)
            for (long i = numRegistros - 1; i >= 0; i--) {
                // Calcular la posición de inicio del registro actual en la entrada
                long posicionLectura = i * BYTES_POR_REGISTRO;
                
                // Mover el puntero de lectura
                rafEntrada.seek(posicionLectura);
                
                // Leer el registro (letra, número, \n) byte a byte
                byte byte1 = rafEntrada.readByte(); // Letra
                byte byte2 = rafEntrada.readByte(); // Número
                byte byte3 = rafEntrada.readByte(); // Salto de línea
                
                // Escribir en el archivo de salida
                rafSalida.writeByte(byte1);
                rafSalida.writeByte(byte2);
                rafSalida.writeByte(byte3);
                
                // Nota: Usamos una codificación temporal para imprimir el registro leído
                String registroLeido = new String(new byte[]{byte1, byte2, byte3}, StandardCharsets.US_ASCII).trim();
                System.out.println("Leído: " + registroLeido + " - Escrito.");
            }
            
            System.out.println("Resultado esperado: e5\nd4\nc3\nb2\na1\n");
        }
        System.out.println("Completado. Revisar salida_inversa2.txt");
        System.out.println("-------------------------------------------------------");
    }

    public static void main(String[] args) {
        try {
            parte1();
            parte2();
            parte3();
            

        } catch (IOException e) {
            System.err.println("Ocurrió un error de E/S: " + e.getMessage());
            e.printStackTrace();
        }
    }
}