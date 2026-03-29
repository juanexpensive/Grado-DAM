from multiprocessing import Process

def sumar_entre(val1, val2):
    inicio = min(val1, val2)
    fin = max(val1, val2)

    resultado = sum(range(inicio, fin + 1))
    print(f"Suma entre {inicio} y {fin}: {resultado}")


if __name__ == "__main__":

    procesos = [
        Process(target=sumar_entre, args=(1, 5)),
        Process(target=sumar_entre, args=(10, 3)),
        Process(target=sumar_entre, args=(20, 25))
    ]

    for proceso in procesos:
        proceso.start()

    for proceso in procesos:
        proceso.join()

    print("Todos los procesos han terminado.")