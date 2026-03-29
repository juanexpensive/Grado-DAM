"""
Ejercicio 3: Sistema de gestión de notas con multiprocessing
Genera notas, calcula medias y encuentra la nota máxima
"""

from multiprocessing import Pool, Process
import random
import time
import os

def proceso1_generar_notas(ruta_fichero):
    """
    Genera 6 números aleatorios entre 1 y 10 (notas con decimales)
    Args:
        ruta_fichero: ruta donde guardar las notas
    """
    notas = [round(random.uniform(1, 10), 2) for _ in range(6)]
    
    with open(ruta_fichero, 'w') as f:
        for nota in notas:
            f.write(f"{nota}\n")
    
    return ruta_fichero

def proceso2_calcular_media(args):
    """
    Lee un fichero de notas y calcula la media
    Args:
        args: tupla (ruta_fichero, nombre_alumno)
    """
    ruta_fichero, nombre_alumno = args
    
    # Leer notas del fichero
    with open(ruta_fichero, 'r') as f:
        notas = [float(linea.strip()) for linea in f]
    
    # Calcular media
    media = sum(notas) / len(notas)
    
    # Guardar en medias.txt (con bloqueo para evitar conflictos)
    with open('medias.txt', 'a') as f:
        f.write(f"{media:.2f} {nombre_alumno}\n")
    
    return (nombre_alumno, media)

def proceso3_nota_maxima():
    """
    Lee medias.txt y encuentra la nota máxima
    """
    if not os.path.exists('medias.txt'):
        print("No existe el fichero medias.txt")
        return
    
    nota_maxima = -1
    alumno_max = ""
    
    with open('medias.txt', 'r') as f:
        for linea in f:
            partes = linea.strip().split()
            nota = float(partes[0])
            nombre = partes[1]
            
            if nota > nota_maxima:
                nota_maxima = nota
                alumno_max = nombre
    
    print("\n" + "=" * 50)
    print("RESULTADO FINAL:")
    print(f"Nota máxima: {nota_maxima:.2f}")
    print(f"Alumno: {alumno_max}")
    print("=" * 50)

def main_con_pool():
    """
    Implementación usando Pool para paralelización
    """
    print("=== EJERCICIO 3 (CON POOL) ===\n")
    
    inicio = time.time()
    
    # Limpiar fichero de medias si existe
    if os.path.exists('medias.txt'):
        os.remove('medias.txt')
    
    # PASO 1: Generar ficheros de notas para 10 alumnos (concurrente)
    print("PASO 1: Generando notas para 10 alumnos...")
    rutas_ficheros = [f'Alumno{i+1}.txt' for i in range(10)]
    
    with Pool() as pool:
        pool.map(proceso1_generar_notas, rutas_ficheros)
    
    print(f"✓ Generados {len(rutas_ficheros)} ficheros de notas\n")
    
    # PASO 2: Calcular medias (concurrente)
    print("PASO 2: Calculando medias...")
    nombres_alumnos = [f'Alumno{i+1}' for i in range(10)]
    argumentos = list(zip(rutas_ficheros, nombres_alumnos))
    
    with Pool() as pool:
        resultados = pool.map(proceso2_calcular_media, argumentos)
    
    print(f"✓ Calculadas {len(resultados)} medias\n")
    
    # Mostrar todas las medias
    print("Medias calculadas:")
    print("-" * 40)
    for nombre, media in resultados:
        print(f"{nombre}: {media:.2f}")
    print("-" * 40)
    
    # PASO 3: Encontrar nota máxima
    print("\nPASO 3: Buscando nota máxima...")
    proceso3_nota_maxima()
    
    fin = time.time()
    print(f"\nTiempo total (Pool): {fin - inicio:.6f} segundos")
    
    # Limpiar ficheros creados
    for fichero in rutas_ficheros:
        if os.path.exists(fichero):
            os.remove(fichero)

def main_con_bucles():
    """
    Implementación usando bucles for y Process
    """
    print("\n\n=== EJERCICIO 3 (CON BUCLES FOR) ===\n")
    
    inicio = time.time()
    
    # Limpiar fichero de medias si existe
    if os.path.exists('medias.txt'):
        os.remove('medias.txt')
    
    # PASO 1: Generar ficheros de notas para 10 alumnos (concurrente)
    print("PASO 1: Generando notas para 10 alumnos...")
    procesos = []
    rutas_ficheros = []
    
    for i in range(10):
        ruta = f'Alumno{i+1}.txt'
        rutas_ficheros.append(ruta)
        p = Process(target=proceso1_generar_notas, args=(ruta,))
        procesos.append(p)
        p.start()
    
    # Esperar a que todos terminen
    for p in procesos:
        p.join()
    
    print(f"✓ Generados {len(rutas_ficheros)} ficheros de notas\n")
    
    # PASO 2: Calcular medias (concurrente)
    print("PASO 2: Calculando medias...")
    procesos = []
    
    for i in range(10):
        ruta = rutas_ficheros[i]
        nombre = f'Alumno{i+1}'
        p = Process(target=proceso2_calcular_media, args=((ruta, nombre),))
        procesos.append(p)
        p.start()
    
    # Esperar a que todos terminen
    for p in procesos:
        p.join()
    
    print(f"✓ Calculadas 10 medias\n")
    
    # Mostrar todas las medias
    print("Medias calculadas:")
    print("-" * 40)
    with open('medias.txt', 'r') as f:
        for linea in f:
            partes = linea.strip().split()
            print(f"{partes[1]}: {partes[0]}")
    print("-" * 40)
    
    # PASO 3: Encontrar nota máxima
    print("\nPASO 3: Buscando nota máxima...")
    proceso3_nota_maxima()
    
    fin = time.time()
    print(f"\nTiempo total (Bucles): {fin - inicio:.6f} segundos")
    
    # Limpiar ficheros creados
    for fichero in rutas_ficheros:
        if os.path.exists(fichero):
            os.remove(fichero)

if __name__ == '__main__':
    # Ejecutar ambas versiones
    main_con_pool()
    main_con_bucles()
