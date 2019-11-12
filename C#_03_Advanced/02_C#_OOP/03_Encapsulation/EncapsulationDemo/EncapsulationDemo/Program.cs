using System;
using System.Collections.Generic;

namespace EncapsulationDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            Person firstPerson = new Person("Kalina", 20);
            Person secondPerson = new Person("Kris", 25);
            Console.WriteLine(firstPerson.Age);
            Console.WriteLine(secondPerson.Name);

            var school = new School();
            firstPerson.StartSchool(school).ReportAge();
        }
    }

    public class Person
    {
        private string name;
        private int age;
        public Person(string name, int age)
        {
            this.name = name;
            this.Age = age;
        }

        public int Age 
        { 
            get
            {
                return this.age;
            }
            set
            {
                if(value < 0)
                {
                    throw new ArgumentOutOfRangeException("Age", "Age must be positive number.");
                }
                this.age = value;
            }
        }

        public string Name
        {
            get
            {
                return this.name;
            }
        }

        public Person StartSchool(School school)
        {
            school.Students.Add(this);
            return this;
        }

        public Person ReportAge()
        {
            Console.WriteLine(this.Age);
            return this;
        }
    }

    public class School
    {
        public School()
        {
            this.Students = new List<Person>();
        }
        public IList<Person> Students { get; set; }
    }
}
