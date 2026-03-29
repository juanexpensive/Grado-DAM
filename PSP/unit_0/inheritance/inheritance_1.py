"""
Define una clase llamada Animal que tiene como atributos nombre y número de patas. Además del constructor, define los siguientes métodos:
habla: En la clase Animal devolverá una cadena vacía, ‘’.
__str__: Devolverá una cadena de la siguiente forma: “Me llamo nombre, tengo x patas y sueno así: sonido”. Habrá que sustituir lo que está en azul por el nombre y el número de patas del animal. En el caso de sonido hay que llamar a la función habla.
A continuación, define dos clases, Gato y Perro que heredan de Animal. En el caso de Gato, además del constructor, definirá los siguientes métodos:
habla: Devolverá ‘Miau’.
__str__: Primero escribirá “Soy un gato” y a continuación la misma cadena que el padre.
En el caso de Perro, además del constructor, definirá los siguientes métodos:
habla: Devolverá “Guau”.
__str__: Primero escribirá “Soy un perro” y a continuación la misma cadena que el padre.
"""

class Animal :
    def __init__(self, name, number_legs):
        self.name = name
        self.number_legs = number_legs
        
    def speak (self):
        return ""

    def __str__(self):
        return f"My name is: {self.name}, I have: {self.number_legs} legs and I speak like this: {self.speak()}"

class Dog (Animal):

    def __str__(self):
        return f"Im a Dog. {super().__str__()}"

    def speak(self):
        return "Guau"

class Cat (Animal):
    
    def speak(self):
        return "Miau"
    def __str__(self):
        return f"Im a Cat. {super().__str__()}"

    
dog = Dog("Puppy", 4)
print(dog.__str__())

cat= Cat("Kitty", 4)
print(cat.__str__())
