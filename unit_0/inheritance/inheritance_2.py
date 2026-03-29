# Base class
class Worker:
    def __init__(self, name):
        # Initialize a Worker with a private name attribute
        self._name = name

    def setNombre(self, name):
        # Setter method to update the name
        self._name = name

    def getNombre(self):
        # Getter method to retrieve the name
        return self._name
    
    def __str__(self):
        # String representation of Worker
        return f"Worker {self._name}"


# Operator inherits from Worker
class Operator(Worker):
    def __init__(self, name):
        # Call Worker constructor
        super().__init__(name)

    def __str__(self):
        # Append "-> Operator" to the base string
        return f"{super().__str__()} -> Operator"


# Director inherits from Worker
class Director(Worker):
    def __init__(self, name):
        # Call Worker constructor
        super().__init__(name)

    def __str__(self):
        # Append "-> Director" to the base string
        return f"{super().__str__()} -> Director"


# Official inherits from Operator
class Official(Operator):
    def __init__(self, name):
        # Call Operator constructor
        super().__init__(name)

    def __str__(self):
        # Append "-> Official" to the Operator string
        return f"{super().__str__()} -> Official"


# Technician inherits from Operator
class Technician(Operator):
    def __init__(self, name):
        # Call Operator constructor
        super().__init__(name)

    def __str__(self):
        # Append "-> Technician" to the Operator string
        return f"{super().__str__()} -> Technician"


# Create objects
worker = Worker("a")        # Worker instance
operator = Operator("b")    # Operator instance
director = Director("c")    # Director instance
official = Official("d")    # Official instance
x = Technician("e")         # Technician instance

# Print objects (automatically calls __str__)
print(worker)    # Worker a
print(operator)  # Worker b -> Operator
print(director)  # Worker c -> Director
print(official)  # Worker d -> Operator -> Official
print(x)         # Worker e -> Operator -> Technician
