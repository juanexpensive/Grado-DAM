import threading
import time

class HiloContador(threading.Thread):
    # Variable compartida a nivel de clase
    contador = 0
    LIMITE = 1000

    def __init__(self, nombre):
        super().__init__()
        self.nombre = nombre

    def run(self):
        # Mientras el contador sea menor que 1000, incrementamos
        while True:
            # Leemos el valor actual
            actual = HiloContador.contador
            
            if actual >= HiloContador.LIMITE:
                break
                
            # Pequeña pausa para forzar cambio de contexto y provocar condiciones de carrera
            # Esto ayuda a visualizar el problema de concurrencia
            time.sleep(0.001)
            
            # Incrementamos y actualizamos
            HiloContador.contador = actual + 1
            
            # Imprimimos traza (la E/S también favorece cambios de contexto)
            print(f"{self.nombre} incrementa contador a: {HiloContador.contador}")

if __name__ == "__main__":
    hilos = []
    
    print("=== EJERCICIO 2: CONTADOR COMPARTIDO ===")
    print("Iniciando 10 hilos para llegar a 1000...")
    
    # Crear 10 hilos
    for i in range(10):
        t = HiloContador(f"Hilo-{i+1}")
        hilos.append(t)
        t.start()
    
    # Esperar a que todos terminen
    for t in hilos:
        t.join()
        
    print("-" * 40)
    print(f"Valor final del contador: {HiloContador.contador}")
    print(f"Objetivo: {HiloContador.LIMITE}")
    
    if HiloContador.contador != HiloContador.LIMITE:
        print("RESULTADO: ¡Condition de carrera detectada! El contador no es exacto.")
    else:
        print("RESULTADO: El contador llegó a 1000 (puede requerir más ejecuciones para ver fallos).")
