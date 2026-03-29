#Modifica el ejercicio anterior para que el programa principal use un Pool para lanzar varios procesos de forma concurrente.
#Cambia el valor del número de procesos y compara los tiempos que tarda en ejecutarse en los distintos casos.

from multiprocessing import Pool
import time

# Función que suma todos los números desde 1 hasta x
def suma(x):
    total = sum(range(1, x + 1))  
    return total 

if __name__ == '__main__':


    #Decimos que tenemos 3 procesos
    with Pool(processes=100) as pool:
        #lista de datos
        numeros = [10, 20, 50, 100]  

        #funcion suma y le pasamos los datos
        inicio = time.perf_counter()
        total = pool.map(suma, numeros)
        final = time.perf_counter()
    
    print ("Resultado: ", total) 
    print (f"Tiempo:  {final - inicio}")
