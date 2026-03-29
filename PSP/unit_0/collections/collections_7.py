# Create an empty dictionary to store contacts
contacts = {}

# Start the menu loop
while True:
    # Show menu options
    print("\nContact Book Menu:")
    print("1. Add Contact")
    print("2. Delete Contact")
    print("3. Search Contact")
    print("4. Exit")

    # Ask the user to choose an option
    choice = input("Choose an option (1-4): ")

    # Add a new contact
    if choice == '1':
        name = input("Enter contact name: ")
        phone = input("Enter contact phone number: ")
        contacts[name] = phone  # Store in dictionary
        print(f"Contact '{name}' added.")

    # Delete an existing contact
    elif choice == '2':
        name = input("Enter contact name to delete: ")
        if name in contacts:
            del contacts[name]
            print(f"Contact '{name}' deleted.")
        else:
            print(f"Contact '{name}' not found.")

    # Search for a contact
    elif choice == '3':
        name = input("Enter contact name to search: ")
        if name in contacts:
            print(f"Contact '{name}': {contacts[name]}")
        else:
            print(f"Contact '{name}' not found.")

    # Exit the program
    elif choice == '4':
        print("Exiting the program.")
        break

    # Handle invalid options
    else:
        print("Invalid option. Please try again.")
