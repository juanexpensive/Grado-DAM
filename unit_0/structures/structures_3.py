print("Type positive integers")

total = 0
x = int(input())

while x > 0:
    total += x
    print("Keep typing numbers, if you want to exit type a negative number")
    x = int(input())

print("The sum of positive numbers is:", total)
