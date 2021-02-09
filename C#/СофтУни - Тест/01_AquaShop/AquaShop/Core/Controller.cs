using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AquaShop.Core.Contracts;
using AquaShop.Models.Aquariums;
using AquaShop.Models.Aquariums.Contracts;
using AquaShop.Models.Decoration;
using AquaShop.Models.Decorations.Contracts;
using AquaShop.Repositories;
using AquaShop.Repositories.Contracts;

namespace AquaShop.Core
{
    class Controller : IController
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
            if (aquariumType != "FreshwaterAquarium" && aquariumType != "SaltwaterAquarium")
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
            return $"Successfully added {aquariumType}.";
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
            throw new NotImplementedException();
        }

        public string CalculateValue(string aquariumName)
        {
            throw new NotImplementedException();
        }

        public string FeedFish(string aquariumName)
        {
            throw new NotImplementedException();
        }

        public string InitiateHunt(string aquariumName, string attackerName, string defenderName)
        {
            throw new NotImplementedException();
        }

        public string InsertDecoration(string aquariumName, string decorationType)
        {
            IDecoration decoration = this.repository.FindByType(decorationType);
            IAquarium aquarium = this.aquariums.FirstOrDefault(x => x.Name == aquariumName);
            if (decoration == null)
            {
                throw new InvalidOperationException($"There isn’t a decoration of type {decorationType}.");
            }
            this.repository.Remove(decoration);
            return aquarium.AddDecoration(decoration);
        }

        public string Report()
        {
            throw new NotImplementedException();
        }

        public string SwitchLights(string aquariumName)
        {
            throw new NotImplementedException();
        }
    }
}
