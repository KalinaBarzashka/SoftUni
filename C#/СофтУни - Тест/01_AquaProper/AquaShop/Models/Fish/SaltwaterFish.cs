using AquaShop.Models.Fish.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace AquaShop.Models.Fish
{
    public class SaltwaterFish : Fish
    {
        public SaltwaterFish(string name, string species, decimal price) : base(name, species, price)
        {
            base.Size = 5;
        }

        public override void Eat()
        {
            base.Size += 2;
        }

        public bool Hunt(IFish fish)
        {
            if(this.Size > fish.Size)
            {
                this.Size += 10;
                return true;
            }

            return false;
        }
    }
}
