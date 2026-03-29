from multiprocessing import Process, Queue
from pathlib import Path

def leer_fichero(cola, nombre_fichero):
    ruta = Path(__file__).parent / nombre_fichero

    with open(ruta, "r") as fichero:
        for linea in fichero:
            a, b = map(int, linea.split())
            cola.put((a, b))

    cola.put(None)  # Señal de finalización


def sumar_desde_cola(cola):
    for a, b in iter(cola.get, None):
        inicio = min(a, b)
        fin = max(a, b)
        resultado = sum(range(inicio, fin + 1))
        print(f"Suma entre {inicio} y {fin}: {resultado}")


if __name__ == "__main__":
    cola = Queue()

    lector = Process(target=leer_fichero, args=(cola, "numeros2.txt"))
    sumador = Process(target=sumar_desde_cola, args=(cola,))

    lector.start()
    sumador.start()

    lector.join()
    sumador.join()

    print("Todos los procesos han terminado.")
