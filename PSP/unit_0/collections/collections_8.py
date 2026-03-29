"""
Diseña un programa que registre 
las ventas de una tienda en un diccionario, donde las claves son los nombres de los productos y los valores son las cantidades vendidas.
 El programa debe permitir al usuario agregar nuevas ventas y calcular el total de ventas para un producto específico. 
 Implementa un menú con ambas opciones. 

"""
def add_sale(sales):
    product = input("Enter product name: ")
    quantity = int(input("Enter quantity sold: "))
    if product in sales:
        sales[product] += quantity
    else:
        sales[product] = quantity
    print(f"Added {quantity} of {product}.")
def total_sales(sales):
    product = input("Enter product name to check total sales: ")
    if product in sales:
        print(f"Total sales for {product}: {sales[product]}")
    else:
        print(f"No sales recorded for {product}.")  
def main():
    sales = {}
    while True:
        print("\nSales Menu:")
        print("1. Add Sale")
        print("2. Total Sales for a Product")
        print("3. Exit")
        choice = input("Choose an option (1-3): ")
        if choice == '1':
            add_sale(sales)
        elif choice == '2':
            total_sales(sales)
        elif choice == '3':
            print("Exiting the program.")
            break
        else:
            print("Invalid option. Please try again.")
if __name__ == "__main__":
    main()