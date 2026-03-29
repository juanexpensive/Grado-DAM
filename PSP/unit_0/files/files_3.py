# Ask the user for their name
name = input("Enter your name: ")

# Ask the user for their age
age = input("Enter your age: ")

# Open the file "datos.txt" in append mode
# "a" mode will create the file if it does not exist
f = open("datos.txt", "a")

# Write the name and age to the file on a new line
f.write(name + " " + age + "\n")

# Close the file to save changes
f.close()

