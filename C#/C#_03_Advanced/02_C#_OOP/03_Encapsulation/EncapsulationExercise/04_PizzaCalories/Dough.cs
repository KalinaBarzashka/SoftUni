using System;
using System.Collections.Generic;
using System.Text;

namespace _04_PizzaCalories
{
    public class Dough
    {
        private const double white = 1.5;
        private const double wholegrain = 1.0;
        private const double crispy = 0.9;
        private const double chewy = 1.1;
        private const double homemade = 1.0;
        private const int minWeight = 1;
        private const int maxWeight = 200;

        private string flourType;
        public string bakingTechnique;
        public double weight;

        public Dough(string flourType, string backingTechnique, double weight)
        {
            this.FlourType = flourType;
            this.BakingTechnique = backingTechnique;
            this.Weight = weight;
        }

        public string FlourType 
        {
            get => this.flourType;
            private set
            {
                if(value.ToLower() != "white" && value.ToLower() != "wholegrain")
                {
                    throw new ArgumentException("Invalid type of dough.");
                }

                this.flourType = value;
            }
        }

        public string BakingTechnique 
        {
            get => this.bakingTechnique;
            private set
            {
                if(value.ToLower() != "crispy" && value.ToLower() != "chewy" && value.ToLower() != "homemade")
                {
                    throw new ArgumentException("Invalid type of dough.");
                }

                this.bakingTechnique = value;
            }
        }

        public double Weight
        {
            get => this.weight;
            private set
            {
                if(value < minWeight || value > maxWeight)
                {
                    throw new ArgumentException("Dough weight should be in the range [1..200].");
                }
                this.weight = value;
            }
        }

        public double CalculateCalories()
        {
            double calories = 0.0;

            if(this.FlourType.ToLower() == "white" && this.BakingTechnique.ToLower() == "crispy")
            {
                calories = white * crispy * this.Weight;
            }
            else if (this.FlourType.ToLower() == "white" && this.BakingTechnique.ToLower() == "chewy")
            {
                calories = white * chewy * this.Weight;
            }
            else if (this.FlourType.ToLower() == "white" && this.BakingTechnique.ToLower() == "homemade")
            {
                calories = white * homemade * this.Weight;
            }
            else if (this.FlourType.ToLower() == "wholegrain" && this.BakingTechnique.ToLower() == "crispy")
            {
                calories = wholegrain * crispy * this.Weight;
            }
            else if (this.FlourType.ToLower() == "wholegrain" && this.BakingTechnique.ToLower() == "chewy")
            {
                calories = wholegrain * chewy * this.Weight;
            }
            else if (this.FlourType.ToLower() == "wholegrain" && this.BakingTechnique.ToLower() == "homemade")
            {
                calories = wholegrain * homemade * this.Weight;
            }

            return 2 * calories;
        }
    }
}
