using System;
using System.Collections.Generic;
using System.Text;

namespace PersonInfo
{
    public class Citizen : IPerson
    {
        private string name;
        private int age;
        public Citizen(string name, int age)
        {
            this.Name = name;
            this.Age = age;
        }
        public string Name
        {
            get => this.name;
            private set
            {
                if(String.IsNullOrEmpty(value) || String.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException("Name cannot be empty.");
                }
                this.name = value;
            }
        }

        public int Age
        {
            get => this.age;
            private set
            {
                if (value <= 0)
                {
                    throw new ArgumentException("Age must be positive number.");
                }

                this.age = value;
            }
        }
    }
}
