using System;
using System.Collections.Generic;
using System.Text;

namespace PersonsInfo
{
    public class Person
    {
        private string firstName;
        private string lastName;
        private int age;
        public Person(string firstName, string lastName, int age)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.Age = age;
        }
        public string FirstName 
        { 
            get
            {
                return this.firstName;
            }
        }
        public string LastName 
        { 
            get
            {
                return this.lastName;
            }
        }
        public int Age 
        { 
            get
            {
                return this.age;
            }
            private set
            {
                if(value < 0)
                {
                    throw new ArgumentOutOfRangeException("Age", "Age must be positive number!");
                }

                this.age = value;
            }
        }

        public override string ToString()
        {
            return $"{this.FirstName} {this.LastName} is {this.Age} years old.";
        }
    }
}
