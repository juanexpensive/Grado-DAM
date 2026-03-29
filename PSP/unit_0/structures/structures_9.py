
def show_numbers_between(a, b):
    if a > b:
        a, b = b, a  
    for number in range(a + 1, b):
        print(number)

def main():
    num1 = int(input("Introduce el primer número entero: "))
    num2 = int(input("Introduce el segundo número entero: "))
    show_numbers_between(num1, num2)

if __name__ == "__main__":
    main()
    