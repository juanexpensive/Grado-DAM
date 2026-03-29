"""
Escribe un programa que tome una cadena de texto como 
entrada y genere un diccionario que cuente la frecuencia de cada palabra en el texto.
"""
def main():
    text = input("Input text: ")
    word_count = {}
    words = text.split()

    for word in words:
        word_count[word] = word_count.get(word, 0) + 1

    print("Word frequency:")
    for word, count in word_count.items():
        print(f"{word}: {count}")

if __name__ == "__main__":
    main()