n = int(input("Type a positivie integer higher than 2: "))
i = 2
while n % i != 0:
    i += 1
if i == n:
    print(str(n) + " IS a prime number")
else:
    print(str(n) + " is NOT a prime number")