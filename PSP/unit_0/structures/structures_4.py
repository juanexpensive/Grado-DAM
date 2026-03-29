#create a random number 1-100 and assing it to variable guess
import random
secret = (random.randint(1, 100))

print ("Try to guess my secret number, if you want to stop type -1")

guess = int(input())
#loop while user doesnt guess correcly and doesnt type -1

while guess != secret and guess != -1 :
    if guess > secret:
        print ("My number is lower than yours")
    elif secret > guess:
        print ("My number is higher than yours") 
    guess = int(input())

#final ifs, print if you guess correctly or if you quit
if guess == secret:
    print ("You got it!")
if guess == -1:
    print ("Bye!")