from multiprocessing import Process, Pipe
from pathlib import Path

def leer_fichero(conn, nombre_fichero):
    ruta = Path(__file__).parent / nombre_fichero

    with open(ruta, "r") as fichero:
        for linea in fichero:
            conn.send(int(linea.strip()))

    conn.send(None)   # Señal de finalización
    conn.close()


def sumar_desde_pipe(conn):
    for numero in iter(conn.recv, None):
        resultado = sum(range(1, numero + 1))
        print(f"Suma hasta {numero}: {resultado}")

    conn.close()


if __name__ == "__main__":
    conn_lectura, conn_suma = Pipe()

    lector = Process(target=leer_fichero, args=(conn_lectura, "numeros.txt"))
    sumador = Process(target=sumar_desde_pipe, args=(conn_suma,))

    lector.start()
    sumador.start()

    lector.join()
    sumador.join()
