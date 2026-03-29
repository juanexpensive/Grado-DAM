"""
Ejercicio 4: Filtrado de películas por año
Usa Pipes para comunicar procesos que leen, filtran y guardan películas
"""

from multiprocessing import Process, Pipe
import time
import os
from datetime import datetime

def proceso1_leer_filtrar(ruta_fichero, anio, conn):
    """
    Lee el fichero de películas y envía solo las del año indicado
    Args:
        ruta_fichero: ruta al fichero con las películas
        anio: año de estreno a filtrar
        conn: conexión del Pipe para enviar datos
    """
    print(f"Proceso 1: Leyendo películas del fichero '{ruta_fichero}'...")
    peliculas_filtradas = []
    
    try:
        with open(ruta_fichero, 'r', encoding='utf-8') as f:
            for linea in f:
                linea = linea.strip()
                if linea:  # Ignorar líneas vacías
                    partes = linea.split(';')
                    if len(partes) == 2:
                        nombre = partes[0].strip()
                        anio_estreno = int(partes[1].strip())
                        
                        if anio_estreno == anio:
                            peliculas_filtradas.append((nombre, anio_estreno))
                            print(f"  ✓ Filtrada: {nombre} ({anio_estreno})")
                        else:
                            print(f"  ✗ Descartada: {nombre} ({anio_estreno})")
        
        print(f"\nTotal películas filtradas: {len(peliculas_filtradas)}")
        
        # Enviar películas filtradas al siguiente proceso
        conn.send(peliculas_filtradas)
        conn.close()
        
    except FileNotFoundError:
        print(f"ERROR: No se encontró el fichero '{ruta_fichero}'")
        conn.send([])
        conn.close()
    except Exception as e:
        print(f"ERROR al procesar el fichero: {e}")
        conn.send([])
        conn.close()

def proceso2_guardar(conn):
    """
    Recibe películas y las guarda en un fichero
    Args:
        conn: conexión del Pipe para recibir datos
    """
    print("\nProceso 2: Esperando películas filtradas...")
    peliculas = conn.recv()
    conn.close()
    
    if not peliculas:
        print("No se recibieron películas para guardar")
        return
    
    # Obtener año de la primera película (todas son del mismo año)
    anio = peliculas[0][1]
    nombre_fichero = f'peliculas{anio}.txt'
    
    print(f"Proceso 2: Guardando {len(peliculas)} películas en '{nombre_fichero}'...")
    
    with open(nombre_fichero, 'w', encoding='utf-8') as f:
        for nombre, anio_estreno in peliculas:
            f.write(f"{nombre};{anio_estreno}\n")
    
    print(f"✓ Películas guardadas correctamente en '{nombre_fichero}'")
    
    # Mostrar contenido guardado
    print(f"\nContenido del fichero '{nombre_fichero}':")
    print("-" * 60)
    with open(nombre_fichero, 'r', encoding='utf-8') as f:
        print(f.read())
    print("-" * 60)

def crear_fichero_ejemplo():
    """
    Crea un fichero de ejemplo con películas
    """
    peliculas_ejemplo = """El Padrino;1972
Star Wars;1977
Regreso al Futuro;1985
Matrix;1999
El Señor de los Anillos: La Comunidad del Anillo;2001
El Caballero Oscuro;2008
Origen;2010
Interstellar;2014
Mad Max: Furia en la Carretera;2015
Dunkerque;2017
Vengadores: Endgame;2019
Dune;2021
Top Gun: Maverick;2022
Oppenheimer;2023
Dune: Parte Dos;2024
Pulp Fiction;1994
Forrest Gump;1994
Cadena Perpetua;1994
El Club de la Pelea;1999
Gladiador;2000
"""
    
    with open('peliculas.txt', 'w', encoding='utf-8') as f:
        f.write(peliculas_ejemplo)
    
    print("✓ Fichero de ejemplo 'peliculas.txt' creado\n")

if __name__ == '__main__':
    print("=== EJERCICIO 4: FILTRADO DE PELÍCULAS POR AÑO ===\n")
    
    inicio = time.time()
    
    # Crear fichero de ejemplo
    crear_fichero_ejemplo()
    
    # Solicitar año al usuario
    anio_actual = datetime.now().year
    while True:
        try:
            anio = int(input(f"Introduce un año (menor a {anio_actual}): "))
            if anio < anio_actual:
                break
            else:
                print(f"El año debe ser menor a {anio_actual}")
        except ValueError:
            print("Por favor, introduce un número válido")
    
    # Solicitar ruta del fichero
    ruta_fichero = input("Introduce la ruta al fichero de películas (Enter para 'peliculas.txt'): ").strip()
    if not ruta_fichero:
        ruta_fichero = 'peliculas.txt'
    
    print("\n" + "=" * 60)
    
    # Crear Pipe para comunicación entre procesos
    conn_enviar, conn_recibir = Pipe()
    
    # Crear procesos
    p1 = Process(target=proceso1_leer_filtrar, args=(ruta_fichero, anio, conn_enviar))
    p2 = Process(target=proceso2_guardar, args=(conn_recibir,))
    
    # Lanzar procesos
    p1.start()
    p2.start()
    
    # Esperar a que terminen
    p1.join()
    p2.join()
    
    fin = time.time()
    print(f"\n✓ Tiempo de ejecución: {fin - inicio:.6f} segundos")
