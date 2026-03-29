from multiprocessing import Process, Queue

def leer_fichero(cola, nombre_fichero):
    with open(nombre_fichero, "r") as fichero:
        for linea in fichero:
            cola.put(int(linea.strip()))

    cola.put(None)  


def sumar_desde_cola(cola):
    for numero in iter(cola.get, None):
        resultado = sum(range(1, numero + 1))
        print(f"Suma hasta {numero}: {resultado}")


if __name__ == "__main__":
    cola = Queue()

    lector = Process(target=leer_fichero, args=(cola, "numeros.txt"))
    sumador = Process(target=sumar_desde_cola, args=(cola,))

    lector.start()
    sumador.start()

    lector.join()
    sumador.join()