<<<<<<< Updated upstream
class CheckingAccount:
    def __init__(self, DNI, initial_balance, name=""):
        #Initialize a checking account. If the name is not provided, it defaults to an empty string.
=======
#NEED TO FINISH
"""
Diseñar la clase CuentaCorriente, que almacena los datos DNI, nombre y el saldo. 
Añade los siguientes constructores:
Con el DNI del titular de la cuenta y un saldo inicial. El nombre se inicializará a cadena vacía.
Con el DNI, nombre y el saldo inicial.
Las operaciones típicas de una cuenta corriente son:
Sacar dinero: el método debe indicar si ha sido posible llevar a cabo la operación, 
si existe saldo suficiente. Si es posible llevar a cabo la operación se resta la cantidad a sacar al saldo de la cuenta.
Ingresar dinero: se incrementa el saldo.
Crear también los métodos __str__, __eq__ y __lt__. 
Se considera que dos cuentas corrientes son iguales si tienen el mismo DNI. 
Las cuentas corrientes se ordenarán de menor a mayor por el saldo.
"""

class CuentaCorriente:
    def __init__(self, DNI, name, balance): 
>>>>>>> Stashed changes
        self.DNI = DNI
        self.name = name
        self.balance = initial_balance

    def withdraw(self, amount):

        #Withdraw money from the account. Returns True if the operation was successful, False otherwise.

        if amount <= 0:
            print("The withdrawal amount must be positive.")
            return False
        if amount > self.balance:
            print(f"Insufficient funds. Current balance: {self.balance}€")
            return False
        self.balance -= amount
        print(f"You have withdrawn {amount}€. New balance: {self.balance}€")
        return True

    def deposit(self, amount):
        
        #Deposit money into the account. Returns True if the operation was successful, False otherwise.
        
        if amount <= 0:
            print("The deposit amount must be positive.")
            return False
        self.balance += amount
        print(f"You have deposited {amount}€. New balance: {self.balance}€")
        return True

    def __str__(self):
        #Return a string representation of the account.
        return f"CheckingAccount(DNI={self.DNI}, Name='{self.name}', Balance={self.balance}€)"

    def __eq__(self, other):
        #Two accounts are considered equal if they have the same DNI.
        return self.DNI == other.DNI

    def __lt__(self, other):
        #Accounts are ordered by balance (from lower to higher).
        return self.balance < other.balance
# Create two accounts
account1 = CheckingAccount("12345678A", 500, "John")
account2 = CheckingAccount("87654321B", 300, "Doe")

# Print account details
print(account1)
print(account2)

# Perform some operations
account1.withdraw(100)
account1.deposit(50)

# Compare accounts
print(account1 == account2)  # False (different DNI)
print(account1 < account2)   # False (because 450 > 300)