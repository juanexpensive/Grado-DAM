from multiprocessing import Process, Pipe
from pathlib import Path

def leer_fichero(conn, nombre_fichero):
    ruta = Path(__file__).parent / nombre_fichero

    with open(ruta, "r") as fichero:
        for linea in fichero:
            a, b = map(int, linea.split())
            conn.send((a, b))

    conn.send(None)   # Señal de finalización
    conn.close()


def sumar_desde_pipe(conn):
    for a, b in iter(conn.recv, None):
        inicio = min(a, b)
        fin = max(a, b)
        resultado = sum(range(inicio, fin + 1))
        print(f"Suma entre {inicio} y {fin}: {resultado}")

    conn.close()


if __name__ == "__main__":
    conn_lectura, conn_suma = Pipe()

    lector = Process(target=leer_fichero, args=(conn_lectura, "numeros2.txt"))
    sumador = Process(target=sumar_desde_pipe, args=(conn_suma,))

    lector.start()
    sumador.start()

    lector.join()
    sumador.join()

    print("Todos los procesos han terminado.")
