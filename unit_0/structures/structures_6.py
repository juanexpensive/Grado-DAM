#initialize variable numero and set input as value, factorial as 1 and i as 1, i is used as a counter
numero = int(input("Type your number: "))

factorial = 1

i = 1
#loop while variable factorial times factorial times i, then i adds +1
while (i <= numero):
    factorial = factorial * i
    i = i + 1

print ("Factorial of " + str(numero) + " is " + str(factorial))