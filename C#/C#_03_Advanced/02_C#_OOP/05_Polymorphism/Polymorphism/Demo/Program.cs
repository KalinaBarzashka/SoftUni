using System;
using System.Collections.Generic;
using System.Linq;

namespace Demo
{
    class Animal
    {
        public virtual void PrintToConsole()
        {
            Console.WriteLine("I am an animal!");
        }
        public void AnimalMethod() { }
    }

    class Mammal : Animal
    {
        public override void PrintToConsole()
        {
            Console.WriteLine("I am a mammal!");
        }
        public void MammalMethod() { }
    }

    class Person : Mammal
    {
        public override void PrintToConsole()
        {
            Console.WriteLine($"I am a person with {this.GetSalary()} salary!");
        }
        public int GetSalary() { return 1000; }
    }

    class Cat : Mammal
    {
        public override void PrintToConsole()
        {
            Console.WriteLine("Cat");
        }
    }

    class Dog : Mammal
    {
        public override void PrintToConsole()
        {
            Console.WriteLine("Dog");
        }
    }

    class Snake : Mammal
    {
        //public override void PrintToConsole()
        //{
        //    Console.WriteLine("Ssssssss");
        //}
    }

    public class StartUp
    {
        static void Main(string[] args)
        {
            //var list = new List<Animal>();
            //list.Add(new Animal());
            //list.Add(new Mammal());
            //list.Add(new Person());
            //list.Add(new Mammal());
            //list.Add(new Animal());
            //list.Add(new Person());
            //list.Add(new Cat());
            //list.Add(new Dog());
            //list.Add(new Snake());
            //
            //foreach (Animal item in list)
            //{
            //    Console.WriteLine(item.GetType());
            //    item.PrintToConsole();
            //    Console.WriteLine(new string('-', 60));
            //}
            //
            //DoSomething(new Cat());

            //Person animal = new Person();
            //
            //if(animal is Animal) //true
            //{
            //    Console.WriteLine("is");
            //}

            //Animal animal = new Mammal();
            //
            //if(animal is Animal animal1) //true
            //{
            //    if (animal1 is Mammal mammal)//true
            //    {
            //        Console.WriteLine("is mammal");
            //    }
            //}

            var numbers = Enumerable.Range(0, 100).Where(x => Math.Log(x % 10 - 2) is var value && value >= 1 && value <= 2);

            foreach (var item in numbers)
            {
                Console.WriteLine(item);
            }
        }

        static void DoSomething (Animal animal)
        {
            animal.AnimalMethod();
        }
    }
}
