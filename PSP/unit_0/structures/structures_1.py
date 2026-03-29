print ("type the answer you want to know if its even or not")
#Save on variable the users input as int
num = int(input()) 

#Check if variable num is even or not and print the answer
if num % 2 == 0:
    print ("number is even") 
elif num % 2 != 0:
    print ("number is odd")
else:
    print("type a valid number")