using System;
using System.Collections.Generic;
using System.Linq;

namespace _03_ShoppingSpree
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            List<Person> listPerson = new List<Person>();
            List<Product> listProducts = new List<Product>();

            string[] personInput = Console.ReadLine().Split(';', StringSplitOptions.RemoveEmptyEntries);
            string[] productInput = Console.ReadLine().Split(';', StringSplitOptions.RemoveEmptyEntries);

            CreatePersons(personInput, listPerson);
            if(listPerson.Count == 0) { return; }
            CreateProducts(productInput, listProducts);
            if(listProducts.Count == 0) { return; }

            while (true)
            {
                string input = Console.ReadLine();
                if (input == "END") { break; }
                string[] commands = input.Split();
                string name = commands[0];
                string productName = commands[1];

                Person person = listPerson.Single(x => x.Name == name);
                Product product = listProducts.Single(x => x.Name == productName);

                if (!person.BuyProduct(product))
                {
                    Console.WriteLine($"{person.Name} can't afford {product.Name}");
                }
                else
                {
                    Console.WriteLine($"{person.Name} bought {product.Name}");
                }
            }

            foreach (var person in listPerson)
            {
                string productsBought = person.Products.Count == 0 ? "Nothing bought" : String.Join(", ", person.Products.Select(p => p.Name));

                Console.WriteLine($"{person.Name} - {productsBought}");
            }
        }

        public static void CreatePersons(string[] personInput, List<Person> list)
        {
            for (int i = 0; i < personInput.Length; i++)
            {
                string[] personInfo = personInput[i].Split('=');
                string name = personInfo[0];
                decimal money = decimal.Parse(personInfo[1]);

                try
                {
                    Person person = new Person(name, money);
                    list.Add(person);
                }
                catch (ArgumentException ex)
                {
                    Console.WriteLine(ex.Message);
                    Environment.Exit(0);
                }
            }
        }

        public static void CreateProducts(string[] productInput, List<Product> list)
        {
            for (int i = 0; i < productInput.Length; i++)
            {
                string[] productInfo = productInput[i].Split('=');
                string name = productInfo[0];
                decimal cost = decimal.Parse(productInfo[1]);

                try
                {
                    Product product = new Product(name, cost);
                    list.Add(product);
                }
                catch (ArgumentException ex)
                {
                    Console.WriteLine(ex.Message);
                    Environment.Exit(0);
                }
            }
        }
    }
}
