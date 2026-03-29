import threading
import random
import time

class HiloAdivino(threading.Thread):
    # Variables de clase compartidas
    numero_oculto = 0
    ya_acertado = False
    lock = threading.Lock() # Para evitar impresiones mezcladas

    def __init__(self, nombre):
        super().__init__()
        self.nombre = nombre

    def run(self):
        while True:
            # Verificar si alguien ya acertó
            if HiloAdivino.ya_acertado:
                # Si ya acertaron, terminamos
                break
            
            # Generar propuesta aleatoria
            numero_propuesto = random.randint(0, 100)
            
            # Comprobar si coincide con el número oculto
            if numero_propuesto == HiloAdivino.numero_oculto:
                # Verificar doblemente y marcar como acertado de forma atómica (simulada)
                if not HiloAdivino.ya_acertado:
                    HiloAdivino.ya_acertado = True
                    with HiloAdivino.lock:
                        print(f"¡{self.nombre} HA ACERTADO! El número era {numero_propuesto}.")
                return # Terminar ejecución
            else:
                # Si fallamos, verificamos si alguien más ya acertó antes de seguir
                if HiloAdivino.ya_acertado:
                    break
                
                # Opcional: imprimir intento fallido
                # with HiloAdivino.lock:
                #     print(f"{self.nombre} propuso {numero_propuesto} y falló.")
                
                # Pequeña pausa para no saturar y dar oportunidad a otros hilos
                time.sleep(0.01)

if __name__ == "__main__":
    # Generar número oculto al azar
    HiloAdivino.numero_oculto = random.randint(0, 100)
    print(f"=== EJERCICIO 3: NÚMERO OCULTO ===")
    print(f"(Secretamente, el número es: {HiloAdivino.numero_oculto})")
    print("Iniciando 10 hilos adivinos...")

    hilos = []
    
    # Crear e iniciar 10 hilos
    for i in range(10):
        t = HiloAdivino(f"Adivino-{i+1}")
        hilos.append(t)
        t.start()
    
    # Esperar a que terminen
    for t in hilos:
        t.join()
        
    print("Todos los hilos han terminado. Juego finalizado.")
