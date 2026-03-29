"""
Crea un programa que pida diez números reales por teclado,
 los almacene en una lista, y luego lo recorra para averiguar el máximo y mínimo y mostrarlos por pantalla.
"""
def main():
    numbers = []
    for _ in range(10):
        num = float(input("Enter a real number: "))
        numbers.append(num)

    maximum = max(numbers)
    minimum = min(numbers)

    print(f"The maximum number is: {maximum}")
    print(f"The minimum number is: {minimum}")
if __name__ == "__main__":
    main()