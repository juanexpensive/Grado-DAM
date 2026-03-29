import math  # Import math for distance calculation

class Point:
    def __init__(self, x, y):
        # Initialize the point with coordinates (x, y)
        self.x = x
        self.y = y

    def __str__(self):
        # Return the point as a string in the form (x, y)
        return f"({self.x}, {self.y})"

    def setXY(self, x, y):
        # Set both coordinates to new values
        self.x = x
        self.y = y

    def move(self, dx, dy):
        # Move the point by (dx, dy)
        self.x += dx
        self.y += dy

    def distance(self, other_point):
        # Calculate the distance between this point and another point
        dx = self.x - other_point.x
        dy = self.y - other_point.y
        return math.sqrt(dx**2 + dy**2)

p1 = Point(1, 1)
p2 = Point(4, 5)

print(p1)  # (1, 1)
print(p2)  # (4, 5)

p1.move(2, 3)
print(p1)  # (3, 4)

p2.setXY(7, -2)
print(p2)  # (7, -2)

print(p1.distance(p2))  # 7.211...
