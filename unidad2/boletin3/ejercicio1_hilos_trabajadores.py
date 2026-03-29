import threading
import time
import random

class Trabajador(threading.Thread):
    def __init__(self, nombre):
        super().__init__()
        self.nombre = nombre
        # Daemon threads will exit when the main program exits
        self.daemon = True

    def run(self):
        while True:
            print(f"Soy {self.nombre} y estoy trabajando")
            # Sleep for random time between 1 and 10 seconds
            tiempo_trabajo = random.randint(1, 10)
            time.sleep(tiempo_trabajo)
            print(f"Soy {self.nombre} y he terminado de trabajar")

if __name__ == "__main__":
    nombres = ["Ana", "Pedro", "Luis", "Maria", "Carlos"]
    hilos = []

    print("Iniciando hilos trabajadores (Ctrl+C para detener)...")
    
    # Crear e iniciar hilos
    for nombre in nombres:
        t = Trabajador(nombre)
        hilos.append(t)
        t.start()

    # Keep main thread alive to let daemon threads run
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nDeteniendo la ejecución...")
