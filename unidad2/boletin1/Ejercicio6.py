from multiprocessing import Pool

def sumar_entre(val1, val2):
    inicio = min(val1, val2)
    fin = max(val1, val2)

    resultado = sum(range(inicio, fin + 1))
    print(f"Suma entre {inicio} y {fin}: {resultado}")


if __name__ == "__main__":

    intervalos = [
        (1, 5),
        (10, 3),
        (20, 25),
        (100, 50)
    ]

    with Pool() as pool:
        pool.starmap(sumar_entre, intervalos)

    print("Todos los procesos han terminado.")
