# Create a dictionary with Scrabble scores for each letter
score = {
    'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8,
    'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 's': 1, 't': 1,
    'u': 1, 'v': 4, 'w': 4, 'x': 8, 'y': 4, 'z': 10
}

# Ask the user to input a word and convert it to lowercase
word = input("Enter a word: ").lower()

# Calculate the total score by summing the score of each letter
total_score = sum(score.get(letter, 0) for letter in word)

# Print the total score
print(f"The total score of the word '{word}' is: {total_score}")
