import multiprocessing
import os

def proceso1(departamento, conn_to_p2):
    """
    Recibe el nombre de un departamento y envía al proceso 2 aquellas líneas 
    del fichero que contengan dicho departamento (sin el departamento).
    """
    try:
        if not os.path.exists("salarios.txt"):
            print("Error: No se encuentra salarios.txt")
            conn_to_p2.close()
            return

        with open("salarios.txt", "r", encoding="utf-8") as f:
            for line in f:
                partes = line.strip().split(";")
                if len(partes) == 4:
                    nombre, apellido, salario, dept = partes
                    if dept.strip().lower() == departamento.strip().lower():
                        # Enviamos la info sin el departamento
                        conn_to_p2.send(f"{nombre};{apellido};{salario}")
        
    except Exception as e:
        print(f"Error en Proceso 1: {e}")
    finally:
        conn_to_p2.close()

def proceso2(salario_minimo, conn_from_p1, conn_to_p3):
    """
    Recibe un salario mínimo y filtra las líneas del Proceso 1.
    """
    try:
        while True:
            try:
                linea = conn_from_p1.recv()
                partes = linea.split(";")
                if len(partes) == 3:
                    salario = float(partes[2])
                    if salario >= salario_minimo:
                        conn_to_p3.send(linea)
            except EOFError:
                break
    except Exception as e:
        print(f"Error en Proceso 2: {e}")
    finally:
        conn_to_p3.close()

def proceso3(conn_from_p2):
    """
    Toma las líneas del Proceso 2 y las escribe en empleados.txt.
    Formato: Apellido Nombre, Salario
    """
    try:
        with open("empleados.txt", "w", encoding="utf-8") as f:
            while True:
                try:
                    linea = conn_from_p2.recv()
                    partes = linea.split(";")
                    if len(partes) == 3:
                        nombre, apellido, salario = partes
                        f.write(f"{apellido} {nombre}, {salario}\n")
                except EOFError:
                    break
    except Exception as e:
        print(f"Error en Proceso 3: {e}")

if __name__ == "__main__":
    # Cambiamos al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    print("--- Gestión de Empleados ---")
    dept_input = input("Introduce el nombre del departamento: ")
    try:
        salario_min_input = float(input("Introduce el salario mínimo: "))
    except ValueError:
        print("Salario no válido. Se usará 0.")
        salario_min_input = 0.0

    # Crear Pipes
    parent_conn_1, child_conn_1 = multiprocessing.Pipe()
    parent_conn_2, child_conn_2 = multiprocessing.Pipe()

    # Definir procesos
    # P1: envía por child_conn_1
    # P2: recibe por parent_conn_1, envía por child_conn_2
    # P3: recibe por parent_conn_2
    p1 = multiprocessing.Process(target=proceso1, args=(dept_input, child_conn_1))
    p2 = multiprocessing.Process(target=proceso2, args=(salario_min_input, parent_conn_1, child_conn_2))
    p3 = multiprocessing.Process(target=proceso3, args=(parent_conn_2,))

    # Iniciar procesos
    p1.start()
    p2.start()
    p3.start()

    # Cerrar extremos no usados en el proceso padre para que el EOF se propague correctamente
    child_conn_1.close()
    parent_conn_1.close()
    child_conn_2.close()
    parent_conn_2.close()

    # Esperar a que terminen
    p1.join()
    p2.join()
    p3.join()

    print("\nProceso finalizado. Los resultados están en 'empleados.txt'.")
