class Article:
    def __init__(self, name, price, quantity_left):
        # Initialize the article with name, base price, and stock quantity
        self.name = name
        self.price = price
        self.iva = 21  # IVA (tax) is always 21%
        self.quantity_left = quantity_left

    def getPVP(self):
        # Return the price including IVA (tax)
        return self.price * (1 + self.iva / 100)

    def getPVPDiscount(self, discount):
        # Return the price with IVA and a discount applied
        pvp = self.getPVP()
        return pvp * (1 - discount / 100)

    def sell(self, amount):
        # Sell a certain amount if stock is available
        if amount <= 0:
            print("The amount to sell must be positive.")
            return False
        if amount > self.quantity_left:
            print("Not enough stock to complete the sale.")
            return False
        self.quantity_left -= amount
        print(f"Sold {amount} units. Remaining stock: {self.quantity_left}")
        return True

    def store(self, amount):
        # Add a certain amount to the stock
        if amount <= 0:
            print("The amount to store must be positive.")
            return False
        self.quantity_left += amount
        print(f"Added {amount} units. New stock: {self.quantity_left}")
        return True

    def __str__(self):
        # Return a string representation of the article
        return (f"Article(name='{self.name}', price={self.price}€, IVA={self.iva}%, "
                f"stock={self.quantity_left})")

    def __eq__(self, other):
        # Two articles are equal if they have the same name
        if not isinstance(other, Article):
            return False
        return self.name == other.name

    def __lt__(self, other):
        # Articles are ordered alphabetically by name
        return self.name < other.name

# Create some articles
a1 = Article("Keyboard", 50, 10)
a2 = Article("Mouse", 25, 20)

# Print articles
print(a1)
print(a2)

# Show PVP (price with IVA)
print("Keyboard PVP:", a1.getPVP())

# Show PVP with discount
print("Keyboard PVP with 10% discount:", a1.getPVPDiscount(10))

# Try selling and storing
a1.sell(3)
a1.store(5)

# Compare articles
print(a1 == a2)  # False
print(a1 < a2)   # True (because "Keyboard" < "Mouse")
