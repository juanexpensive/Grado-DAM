# Open the file "end.txt" in write mode
with open("end.txt", "w") as f:

    # Start an infinite loop to read lines from the user
    while True:
        # Ask the user to write a line
        line = input("Write something, to stop type 'end': ")
        
        # If the user types "end", exit the loop
        if line == "end":
            break
        
        # Write the entered line to the file, adding a newline character
        f.write(line + "\n")
