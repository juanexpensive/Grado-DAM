class Book:
    def __init__(self, title, author, total_copies, lent_copies):

        #Initialize a Book object with its title, author, total copies, and number of lent copies.

        self.title = title
        self.author = author
        self.total_copies = total_copies
        self.lent_copies = lent_copies

    def loan(self):

        #Make a loan (lend one copy). Returns True if the loan was successful, False otherwise. A loan can only happen if there are available copies.

        if self.lent_copies < self.total_copies:
            self.lent_copies += 1
            print(f"Loan successful. Lent copies: {self.lent_copies}")
            return True
        else:
            print("No copies available for loan.")
            return False

    def return_book(self):

        #Return a lent book (decrease the lent count by 1). 
        #Returns True if the operation was successful, False otherwise.
        #A book cannot be returned if there are no lent copies.

        if self.lent_copies > 0:
            self.lent_copies -= 1
            print(f"Book returned. Lent copies: {self.lent_copies}")
            return True
        else:
            print("No lent books to return.")
            return False

    def __str__(self):
        #Return a string representation of the book.
        return (f"Book(title='{self.title}', author='{self.author}', "
                f"total_copies={self.total_copies}, lent_copies={self.lent_copies})")

    def __eq__(self, other):
        #Two books are considered equal if they have the same title and author.
        if not isinstance(other, Book):
            return False
        return self.title == other.title and self.author == other.author

    def __lt__(self, other):
        #Books are ordered alphabetically by author name.
        return self.author < other.author
# Example usage
book1 = Book("1984", "George Orwell", 5, 2)
book2 = Book("Animal Farm", "George Orwell", 3, 1)
book3 = Book("Brave New World", "Aldous Huxley", 4, 0)

print(book1)
print(book2)
print(book3)

# Try lending and returning
book1.loan()
book1.return_book()

# Equality check
print(book1 == book2)  # False (different title)

# Sorting by author
books = [book1, book2, book3]
books.sort()
for b in books:
    print(b)

