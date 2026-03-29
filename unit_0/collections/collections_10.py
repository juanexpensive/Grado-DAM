# Create the substitution dictionary
substitution = {
    'e': 'p', 'i': 'v', 'k': 'i', 'm': 'u', 'p': 'm',
    'q': 't', 'r': 'e', 's': 'r', 't': 'k', 'u': 'q',
    'v': 's'
}

# Ask the user to input a phrase and convert it to lowercase
phrase = input("Input a phrase: ").lower()

# Replace each letter according to the dictionary, keep letters not in the dictionary unchanged
crypted_phrase = ''.join(substitution.get(letter, letter) for letter in phrase)

# Print the encrypted phrase
print(f"Crypted phrase: {crypted_phrase}")
