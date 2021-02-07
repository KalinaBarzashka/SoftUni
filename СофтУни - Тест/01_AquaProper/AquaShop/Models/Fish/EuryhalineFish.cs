using System;
using System.Collections.Generic;
using System.Text;

namespace AquaShop.Models.Fish
{
    public class EuryhalineFish : Fish
    {
        public EuryhalineFish(string name, string species, decimal price) : base(name, species, price)
        {
            base.Size = 5;
        }
    }
}
