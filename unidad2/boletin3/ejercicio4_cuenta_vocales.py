import threading
import time
import os

class HiloVocal(threading.Thread):
    def __init__(self, vocal, resultados):
        super().__init__()
        self.vocal = vocal
        self.resultados = resultados
        self.cantidad = 0

    def run(self):
        try:
            # En un entorno real, varios hilos leyendo el mismo archivo es seguro
            # si solo es lectura, pero el acceso a disco puede ser un cuello de botella.
            # Aquí cada hilo lee el archivo completo para buscar su vocal.
            if os.path.exists('texto.txt'):
                with open('texto.txt', 'r', encoding='utf-8') as f:
                    contenido = f.read().lower()
                    self.cantidad = contenido.count(self.vocal.lower())
                
                # Guardamos el resultado en el diccionario compartido
                self.resultados[self.vocal] = self.cantidad
        except Exception as e:
            print(f"Error en el hilo de la vocal {self.vocal}: {e}")

if __name__ == '__main__':
    # Texto de ejemplo (similar al del boletín 2)
    texto_ejemplo = """
    La programación de procesos en Python es muy interesante.
    El módulo threading permite ejecutar código en paralelo dentro de un proceso.
    Este ejercicio cuenta cuántas vocales hay en este texto usando hilos.
    Las vocales son a, e, i, o, u.
    """
    
    # Crear el archivo si no existe
    with open('texto.txt', 'w', encoding='utf-8') as f:
        f.write(texto_ejemplo)
    
    print("=== EJERCICIO 4: CUENTA VOCALES CON HILOS ===\n")
    
    inicio = time.time()
    vocales = ['a', 'e', 'i', 'o', 'u']
    resultados_compartidos = {}
    hilos = []
    
    # Lanzar hilos para cada vocal
    for v in vocales:
        h = HiloVocal(v, resultados_compartidos)
        hilos.append(h)
        h.start()
    
    # Esperar a que todos terminen
    for h in hilos:
        h.join()
    
    # Mostrar resultados
    print("Resultados del conteo:")
    print("-" * 30)
    total_vocales = 0
    for v in vocales:
        cant = resultados_compartidos.get(v, 0)
        print(f"Vocal '{v}': {cant}")
        total_vocales += cant
    print("-" * 30)
    print(f"Total: {total_vocales}")
    
    fin = time.time()
    print(f"\nTiempo de ejecución: {fin - inicio:.6f} segundos")
