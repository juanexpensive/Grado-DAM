import multiprocessing
import random
import os

def generar_temperaturas(dia):
    """
    Proceso 1: Genera 24 temperaturas aleatorias (0-20, 2 decimales)
    y las guarda en un fichero con el nombre DD-12.txt.
    """
    nombre_fichero = f"{dia:02d}-12.txt"
    with open(nombre_fichero, "w") as f:
        for _ in range(24):
            temp = round(random.uniform(0, 20), 2)
            f.write(f"{temp}\n")

def calcular_maxima(dia):
    """
    Proceso 2: Lee las temperaturas de un fichero y escribe la máxima en maximas.txt.
    Formato: fecha:maxima
    """
    nombre_fichero = f"{dia:02d}-12.txt"
    fecha = f"{dia:02d}-12"
    
    if not os.path.exists(nombre_fichero):
        return

    try:
        with open(nombre_fichero, "r") as f:
            temperaturas = [float(line.strip()) for line in f if line.strip()]
        
        if temperaturas:
            maxima = max(temperaturas)
            with open("maximas.txt", "a") as f_out:
                f_out.write(f"{fecha}:{maxima}\n")
    except Exception as e:
        print(f"Error en calcular_maxima dia {dia}: {e}")

def calcular_minima(dia):
    """
    Proceso 3: Lee las temperaturas de un fichero y escribe la mínima en minimas.txt.
    Formato: fecha:minima
    """
    nombre_fichero = f"{dia:02d}-12.txt"
    fecha = f"{dia:02d}-12"
    
    if not os.path.exists(nombre_fichero):
        return

    try:
        with open(nombre_fichero, "r") as f:
            temperaturas = [float(line.strip()) for line in f if line.strip()]
        
        if temperaturas:
            minima = min(temperaturas)
            with open("minimas.txt", "a") as f_out:
                f_out.write(f"{fecha}:{minima}\n")
    except Exception as e:
        print(f"Error en calcular_minima dia {dia}: {e}")

if __name__ == "__main__":
    # Cambiamos al directorio del script para que los archivos se creen allí
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # Asegurarnos de que los archivos de salida estén limpios al inicio
    for out_file in ["maximas.txt", "minimas.txt"]:
        if os.path.exists(out_file):
            os.remove(out_file)

    print("Iniciando Proceso 1 para los 31 días...")
    procesos_generacion = []
    for dia in range(1, 32):
        p = multiprocessing.Process(target=generar_temperaturas, args=(dia,))
        procesos_generacion.append(p)
        p.start()

    for p in procesos_generacion:
        p.join()
    
    print("Generación completada. Iniciando Procesos 2 y 3...")

    procesos_analisis = []
    for dia in range(1, 32):
        p2 = multiprocessing.Process(target=calcular_maxima, args=(dia,))
        p3 = multiprocessing.Process(target=calcular_minima, args=(dia,))
        procesos_analisis.append(p2)
        procesos_analisis.append(p3)
        p2.start()
        p3.start()

    for p in procesos_analisis:
        p.join()

    print("Procesamiento finalizado. Revisa maximas.txt y minimas.txt.")
