# Ask the user to input a character
char = input("Input a character: ")

# Check if the input is exactly one character
if len(char) != 1:
    print("Please enter a single character.")
else:
    # Convert the character to lowercase and check if it's a vowel
    if char.lower() in "aeiou":
        print(f"'{char}' is a vowel.")
    else:
        print(f"'{char}' is not a vowel.")
