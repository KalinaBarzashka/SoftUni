using AquaShop.Models.Aquariums.Contracts;
using AquaShop.Models.Decorations.Contracts;
using AquaShop.Models.Fish.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AquaShop.Models.Aquariums
{
    public abstract class Aquarium : IAquarium
    {
        private string name;
        private List<IDecoration> decorations;
        private List<IFish> fishes;

        public Aquarium(string name, int capacity)
        {
            this.Name = name;
            this.Capacity = capacity;
            this.decorations = new List<IDecoration>();
            this.fishes = new List<IFish>();
        }
        public string Name
        {
            get => this.name;
            private set
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException("Fish name cannot be null or empty.");
                }

                this.name = value;
            }
        }

        public int Capacity
        {
            get;
            private set;
        }

        public bool Lights { get; private set; } = false;

        public int Comfort => this.Decorations.Sum(s => s.Comfort);

        public ICollection<IDecoration> Decorations => this.decorations.AsReadOnly();

        public ICollection<IFish> Fish => this.fishes.AsReadOnly();

        public string AddDecoration(IDecoration decoration)
        {
            this.decorations.Add(decoration);
            return $"Successfully added {decoration.GetType().Name} to {this.Name}.";
        }

        public string AddFish(IFish fish)
        {
            if(this.Capacity > this.fishes.Count)
            {
                this.fishes.Add(fish);
                return $"Successfully added {fish.GetType().Name} to {this.Name}.";
            }
            else
            {
                return "Not enough capacity.";
            }
        }

        public string Feed()
        {
            if(this.Lights == true)
            {
                foreach (var fish in fishes)
                {
                    fish.Eat();
                }
                return $"Fish fed: {this.fishes.Count}";
            }

            return "Fish fed: 0";
        }

        public string GetInfo()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine($"{this.Name} ({this.GetType().Name}):");
            sb.AppendLine($"Fish: {(fishes.Count == 0 ? "none" : string.Join(", ", fishes.Select(x => x.Name)))}");
            sb.AppendLine($"Decorations: {this.Decorations.Count}");
            sb.AppendLine($"Comfort: {this.Comfort}");

            return sb.ToString().Trim();
        }

        public void RemoveFish(IFish fish)
        {
            this.fishes.Remove(fish);
        }

        public string SwitchLights()
        {
            if(this.Lights == false)
            {
                this.Lights = true;
                return "Lights turned on.";
            }

            this.Lights = false;
            return "Lights turned off.";
        }
    }
}
