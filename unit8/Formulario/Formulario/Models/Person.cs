namespace Domain.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }

        public Person() { }
        
        public Person(int id, string name, string surname, DateTime dateOfBirth)
        {
            Id = id;
            Name = name;
            Surname = surname;
            DateOfBirth = dateOfBirth;
        }
    }
}
