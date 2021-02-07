using AquaShop.Core.Contracts;
using AquaShop.Models.Aquariums;
using AquaShop.Models.Aquariums.Contracts;
using AquaShop.Models.Decoration;
using AquaShop.Models.Decorations;
using AquaShop.Models.Decorations.Contracts;
using AquaShop.Models.Fish;
using AquaShop.Models.Fish.Contracts;
using AquaShop.Repositories;
using AquaShop.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AquaShop.Core
{
    public class Controller : IController
    {
        private IRepository<IDecoration> repository;
        private List<IAquarium> aquariums;
        public Controller()
        {
            this.repository = new DecorationRepository();
            this.aquariums = new List<IAquarium>();
        }
        public string AddAquarium(string aquariumType, string aquariumName)
        {
            if(aquariumType != "FreshwaterAquarium" && aquariumType != "SaltwaterAquarium")
            {
                throw new InvalidOperationException("Invalid aquarium type.");
            }

            IAquarium aquarium = null;
            if (aquariumType == "FreshwaterAquarium")
            {
                aquarium = new FreshwaterAquarium(aquariumName);
            }
            else if (aquariumType == "SaltwaterAquarium")
            {
                aquarium = new SaltwaterAquarium(aquariumName);
            }

            this.aquariums.Add(aquarium);
            return $"Successfully added {aquarium.GetType().Name}.";
        }

        public string AddDecoration(string decorationType)
        {
            if (decorationType != "Ornament" && decorationType != "Plant")
            {
                throw new InvalidOperationException("Invalid decoration type.");
            }

            IDecoration decoration = null;
            if (decorationType == "Ornament")
            {
                decoration = new Ornament();
            }
            else if (decorationType == "Plant")
            {
                decoration = new Plant();
            }

            this.repository.Add(decoration);
            return $"Successfully added {decorationType}.";
        }

        public string AddFish(string aquariumName, string fishType, string fishName, string fishSpecies, decimal price)
        {
            if (fishType != "FreshwaterFish" && fishType != "SaltwaterFish" && fishType != "EuryhalineFish")
            {
                throw new InvalidOperationException("Invalid Fish type.");
            }
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            IFish fish = null;

            if (fishType == "FreshwaterFish")
            {
                fish = new FreshwaterFish(fishName, fishSpecies, price);
            }
            else if (fishType == "SaltwaterFish")
            {
                fish = new SaltwaterFish(fishName, fishSpecies, price);
            }
            else if (fishType == "EuryhalineFish")
            {
                fish = new EuryhalineFish(fishName, fishSpecies, price);
            }

            if(fish.GetType().Name == "FreshwaterFish" && aquarium.GetType().Name == "FreshwaterAquarium")
            {
                return aquarium.AddFish(fish);
            }
            else if (fish.GetType().Name == "SaltwaterFish" && aquarium.GetType().Name == "SaltwaterAquarium")
            {
                return aquarium.AddFish(fish);
            }
            else if(fish.GetType().Name == "EuryhalineFish")
            {
                return aquarium.AddFish(fish);
            }

            return "Water not suitable.";
        }

        public string CalculateValue(string aquariumName)
        {
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            
            decimal value = 0M;
            value += aquarium.Decorations.Sum(x => x.Price);
            value += aquarium.Fish.Sum(x => x.Price);

            return $"The value of Aquarium {aquariumName} is {value:F2}.";
        }

        public string FeedFish(string aquariumName)
        {
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            return aquarium.Feed();
        }

        public string InitiateHunt(string aquariumName, string attackerName, string defenderName)
        {
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            IFish attackerFish = aquarium.Fish.FirstOrDefault(x => x.Name == attackerName);
            IFish defenderFish = aquarium.Fish.FirstOrDefault(x => x.Name == defenderName);

            if(attackerFish == null)
            {
                throw new InvalidOperationException($"There isn’t a fish with the name {attackerName} in {aquariumName}.");
            }
            else if (defenderFish == null)
            {
                throw new InvalidOperationException($"There isn’t a fish with the name {defenderName} in {aquariumName}.");
            }

            if(attackerFish.GetType().Name != "SaltwaterFish")
            {
                throw new InvalidOperationException($"Fish {attackerName} isn’t capable of hunting.");
            }
            SaltwaterFish attacker = attackerFish as SaltwaterFish;
            bool hunted = attacker.Hunt(defenderFish);
            if(hunted == true)
            {
                aquarium.RemoveFish(defenderFish);
                return "The hunt was successful.";
            }

            return "The hunt was unsuccessful.";
        }

        public string InsertDecoration(string aquariumName, string decorationType)
        {
            IDecoration decoration = this.repository.FindByType(decorationType);
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            if(decoration == null)
            {
                throw new InvalidOperationException($"There isn’t a decoration of type {decorationType}.");
            }
            this.repository.Remove(decoration);
            return aquarium.AddDecoration(decoration);
        }

        public string Report()
        {
            StringBuilder sb = new StringBuilder();
            foreach (var aquarium in aquariums)
            {
                sb.AppendLine(aquarium.GetInfo());
            }

            return sb.ToString().Trim();
        }

        public string SwitchLights(string aquariumName)
        {
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            return aquarium.SwitchLights();
        }
    }
}
