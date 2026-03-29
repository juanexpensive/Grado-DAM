import random  # Import the random module to generate random numbers

# Generate a list of random integers
# Default: 10 numbers between 1 and 100
random_list = [random.randint(1, 100) for _ in range(10)]

# Print the generated list
print("Generated list of random integers:", random_list)
