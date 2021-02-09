using System;
using System.Collections.Generic;
using System.Text;

namespace _04_PizzaCalories
{
    public class Topping
    {
        private const double meat = 1.2;
        private const double veggies  = 0.8;
        private const double cheese = 1.1;
        private const double sauce = 0.9;
        private const int minGrams = 0;
        private const int maxGrams = 50;

        private string type;
        private double weight;

        public Topping(string type, double weight)
        {
            this.Type = type;
            this.Weight = weight;
        }

        public string Type 
        {
            get => this.type;
            private set
            {
                if(value.ToLower() != "meat" && value.ToLower() != "veggies"
                    && value.ToLower() != "cheese" && value.ToLower() != "sauce")
                {
                    throw new ArgumentException($"Cannot place {value} on top of your pizza.");
                }

                this.type = value;
            }
        }

        public double Weight 
        {
            get => this.weight;
            private set
            {
                if(value < minGrams || value > maxGrams)
                {
                    throw new ArgumentException($"{this.Type} weight should be in the range [1..50].");
                }

                this.weight = value;
            }
        }

        public double CalculateCalories()
        {
            double calories = 0.0;

            if(this.Type.ToLower() == "meat")
            {
                calories = meat * this.Weight;
            }
            else if (this.Type.ToLower() == "veggies")
            {
                calories = veggies * this.Weight;
            }
            else if (this.Type.ToLower() == "cheese")
            {
                calories = cheese * this.Weight;
            }
            else if (this.Type.ToLower() == "sauce")
            {
                calories = sauce * this.Weight;
            }

            return 2 * calories;
        }
    }
}
