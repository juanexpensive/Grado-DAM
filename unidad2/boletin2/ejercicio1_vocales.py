from multiprocessing import Pool
import time

def contar_vocal(vocal):
    try:
        with open('texto.txt', 'r', encoding='utf-8') as f:
            contenido = f.read().lower()
            cantidad = contenido.count(vocal.lower())
            return (vocal, cantidad)
    except FileNotFoundError:
        return (vocal, 0)

if __name__ == '__main__':
    # Crear fichero de ejemplo si no existe
    texto_ejemplo = """
    La programación de procesos en Python es muy interesante.
    El módulo multiprocessing permite ejecutar código en paralelo.
    Las vocales son letras fundamentales del alfabeto español.
    Este ejercicio cuenta cuántas vocales hay en este texto.
    """
    
    with open('texto.txt', 'w', encoding='utf-8') as f:
        f.write(texto_ejemplo)
    
    print("=== EJERCICIO 1: CONTADOR DE VOCALES ===\n")
    
    # Medición de tiempo
    inicio = time.time()
    
    # Lista de vocales
    vocales = ['a', 'e', 'i', 'o', 'u']
    
    # Crear pool de procesos
    with Pool() as pool:
        # Lanzar procesos en paralelo para cada vocal
        resultados = pool.map(contar_vocal, vocales)
    
    # Imprimir resultados
    print("Resultados del conteo de vocales:")
    print("-" * 40)
    total = 0
    for vocal, cantidad in resultados:
        print(f"Vocal '{vocal}': {cantidad} apariciones")
        total += cantidad
    print("-" * 40)
    print(f"Total de vocales: {total}")
    
    # Tiempo final
    fin = time.time()
    tiempo_total = fin - inicio
    print(f"\nTiempo de ejecución: {tiempo_total:.6f} segundos")
