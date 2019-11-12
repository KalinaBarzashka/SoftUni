using System;

namespace _04_PizzaCalories
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            try
            {
                string[] pizzaItems = Console.ReadLine().Split(" ");
                string pizzaName = pizzaItems[1];
            
                string[] doughItems = Console.ReadLine().Split(" ");
                string flour = doughItems[1];
                string bakeType = doughItems[2];
                double weight = double.Parse(doughItems[3]);
            
                Dough dough = new Dough(flour, bakeType, weight);
                Pizza pizza = new Pizza(pizzaName, dough);
            
                while(true)
                {
                    string[] input = Console.ReadLine().Split(" ");
            
                    if(input[0] == "END") { break; }
            
                    string type = input[1];
                    double weighTopping = double.Parse(input[2]);
                    Topping topping = new Topping(type, weighTopping);

                    pizza.AddTopping(topping);
                }
            
                Console.WriteLine(pizza.ToString());
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
        }
    }
}
