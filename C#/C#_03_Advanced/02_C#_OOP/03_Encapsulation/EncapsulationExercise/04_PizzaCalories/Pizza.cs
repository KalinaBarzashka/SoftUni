using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _04_PizzaCalories
{
    public class Pizza
    {
        private string name;
        private Dough dough;
        private readonly List<Topping> toppingList;

        public Pizza(string name, Dough dough)
        {
            this.Name = name;
            this.Dough = dough;
            this.toppingList = new List<Topping>();
        }
        public string Name 
        {
            get => this.name;
            private set
            {
                if(String.IsNullOrEmpty(value) || String.IsNullOrWhiteSpace(value) || value.Length > 15)
                {
                    throw new ArgumentException("Pizza name should be between 1 and 15 symbols.");
                }

                this.name = value;
            }
        }

        public Dough Dough { get; private set; }
        public IReadOnlyCollection<Topping> ToppingList 
        {
            get => this.toppingList.AsReadOnly(); 
        }

        public void AddTopping(Topping topping)
        {
            if(this.ToppingList.Count == 10)
            {
                throw new ArgumentException("Number of toppings should be in range [0..10].");
            }

            this.toppingList.Add(topping);
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            double calories = this.Dough.CalculateCalories() + this.toppingList.Sum(t => t.CalculateCalories());
            sb.AppendLine($"{this.Name} - {calories:F2} Calories.");

            return sb.ToString().Trim();
        }
    }
}
