class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def calc(self, quantity):
        # Multiply price by quantity
        return self.price * quantity

    def __str__(self):
        # Show the product name and price for 1 unit
        return f"{self.name} costs {self.calc(1)}"

    def __lt__(self, other):
        # Compare products by price
        return self.price < other.price


class Perishable(Product):
    def __init__(self, name, price, days_to_expire):
        super().__init__(name, price)
        self.days_to_expire = days_to_expire

    def calc(self, quantity):
        total = super().calc(quantity)
        # Apply discount based on days to expire
        if self.days_to_expire == 1:
            return total / 4
        elif self.days_to_expire == 2:
            return total / 3
        elif self.days_to_expire == 3:
            return total / 2
        else:
            return total


class NonPerishable(Product):
    def __init__(self, name, price, type):
        super().__init__(name, price)
        self.type_ = type

    def calc(self, quantity):
        return super().calc(quantity)


# Example usage
product = Product("Milk", 40)
print(product)  # Milk costs 40
perishable = Perishable("Yogurt", 20, 1)
print(perishable.calc(4))  # 20*4 / 4 = 20
