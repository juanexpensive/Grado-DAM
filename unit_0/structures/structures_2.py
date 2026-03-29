#ask the user to type two numbers and save them in variables
print ("type the first number")
num1 = int(input())

print ("type the second number")
num2 = int(input())

#order the variables in descending order
if num1 > num2:
    print (num2,num1)
elif num2 > num1:
    print (num1,num2)
else:
    print("one of them must be higher")