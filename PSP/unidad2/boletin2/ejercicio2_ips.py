"""
Ejercicio 2: Procesos enlazados con Pipes
Genera IPs aleatorias y las filtra por clase usando comunicación entre procesos
"""

from multiprocessing import Process, Pipe
import random
import time

def proceso1_generar_ips(conn):
    """
    Genera 10 direcciones IP aleatorias y las envía al siguiente proceso
    Args:
        conn: conexión del Pipe para enviar datos
    """
    print("Proceso 1: Generando 10 IPs aleatorias...")
    ips = []
    for i in range(10):
        ip = f"{random.randint(1, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}"
        ips.append(ip)
        print(f"  IP generada: {ip}")
    
    # Enviar todas las IPs al siguiente proceso
    conn.send(ips)
    conn.close()

def proceso2_filtrar_ips(conn_recibir, conn_enviar):
    """
    Filtra las IPs recibidas y envía solo las de clase A, B o C
    Args:
        conn_recibir: conexión para recibir datos del proceso 1
        conn_enviar: conexión para enviar datos al proceso 3
    """
    print("\nProceso 2: Filtrando IPs por clase...")
    ips = conn_recibir.recv()
    conn_recibir.close()
    
    ips_filtradas = []
    for ip in ips:
        primer_octeto = int(ip.split('.')[0])
        
        # Clasificar IP
        if 1 <= primer_octeto <= 126:
            clase = 'A'
            ips_filtradas.append((ip, clase))
            print(f"  IP {ip} -> Clase {clase} (filtrada)")
        elif 128 <= primer_octeto <= 191:
            clase = 'B'
            ips_filtradas.append((ip, clase))
            print(f"  IP {ip} -> Clase {clase} (filtrada)")
        elif 192 <= primer_octeto <= 223:
            clase = 'C'
            ips_filtradas.append((ip, clase))
            print(f"  IP {ip} -> Clase {clase} (filtrada)")
        else:
            print(f"  IP {ip} -> Clase D/E (descartada)")
    
    # Enviar IPs filtradas al proceso 3
    conn_enviar.send(ips_filtradas)
    conn_enviar.close()

def proceso3_mostrar_ips(conn):
    """
    Recibe IPs filtradas y las muestra con su clase
    Args:
        conn: conexión para recibir datos del proceso 2
    """
    print("\nProceso 3: Mostrando IPs filtradas:")
    print("-" * 50)
    ips_clasificadas = conn.recv()
    conn.close()
    
    if not ips_clasificadas:
        print("No se recibieron IPs de clase A, B o C")
    else:
        for ip, clase in ips_clasificadas:
            print(f"IP: {ip:15} -> Clase: {clase}")
    print("-" * 50)

if __name__ == '__main__':
    print("=== EJERCICIO 2: PROCESOS ENLAZADOS CON PIPES ===\n")
    
    # Medición de tiempo
    inicio = time.time()
    
    # Crear Pipes para comunicación
    # Pipe 1: Proceso1 -> Proceso2
    conn1_enviar, conn1_recibir = Pipe()
    
    # Pipe 2: Proceso2 -> Proceso3
    conn2_enviar, conn2_recibir = Pipe()
    
    # Crear procesos
    p1 = Process(target=proceso1_generar_ips, args=(conn1_enviar,))
    p2 = Process(target=proceso2_filtrar_ips, args=(conn1_recibir, conn2_enviar))
    p3 = Process(target=proceso3_mostrar_ips, args=(conn2_recibir,))
    
    # Lanzar procesos en orden
    p1.start()
    p2.start()
    p3.start()
    
    # Esperar a que terminen
    p1.join()
    p2.join()
    p3.join()
    
    # Tiempo final
    fin = time.time()
    tiempo_total = fin - inicio
    print(f"\nTiempo de ejecución: {tiempo_total:.6f} segundos")
