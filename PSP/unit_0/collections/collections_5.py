import random  # Import the random module to generate random numbers

# Create a list of 100 random integers between 1 and 10
random_list = [random.randint(1, 10) for _ in range(100)]

# Print the generated list
print("Generated list of random integers between 1 and 10:", random_list)

# Ask the user for a number N to count
n = int(input("Enter an integer value N between 1 and 10: "))

# Check if N is within the valid range
if n < 1 or n > 10:
    print("Invalid input: N must be between 1 and 10.")
else:
    # Count how many times N appears in the list
    count_n = random_list.count(n)
    print(f"The number {n} appears {count_n} times in the list.")
