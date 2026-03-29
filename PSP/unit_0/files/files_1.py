# Open the file "alumns.txt" in read mode
f = open ("alumns.txt","rt")

# Create empty lists to store ages, heights, and names
ages = []
heights = []
names = []

# Process each line in the file
for line in f:
    # Split the line into name, age, and height
    name, age, height = line.split()
    # Add the name to the names list
    names.append(name)
    # Convert age to integer and add to the ages list
    ages.append(int(age))
    # Convert height to float and add to the heights list
    heights.append(float(height))
f.close()
# Print all student names
print("Nombres: ", names)
# Calculate and print the average age
print("Edad media: ", sum(ages)/len(ages))
# Calculate and print the average height
print("Estatura media: ", sum(heights)/len(heights))
