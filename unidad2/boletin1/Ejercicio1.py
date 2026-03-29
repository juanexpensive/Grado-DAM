from multiprocessing import Process  

# Función que suma todos los números desde 1 hasta x
def suma(x):
    total = sum(range(1, x + 1))  
    print(f"Suma hasta {x}: {total}")  

if __name__ == '__main__':
    n = int(input("Introduce un numero: "))  # aquí estaba el problema

    procesos = []  

    # Creamos el proceso usando el número introducido
    p = Process(target=suma, args=(n,))  
    procesos.append(p)  
    p.start()  

    # Esperamos a que termine
    for p in procesos:
        p.join()
