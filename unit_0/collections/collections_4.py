# Create an empty list to store the numbers
numbers = []

# Ask the user to enter 10 numbers
for _ in range(10):
    num = float(input("Input a number: "))
    numbers.append(num)  # Add each number to the list

# Sort the list from highest to lowest
numbers.sort(reverse=True)

# Print the sorted numbers
print("Numbers sorted from highest to lowest:")
for n in numbers:
    print(n)
