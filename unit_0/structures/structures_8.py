n = int(input("type a positive integer: "))
counter = 1
counter2 = n

while counter != n+1:
    print (counter2*" ", counter*"* " )
    counter += 1
    counter2 -= 1
