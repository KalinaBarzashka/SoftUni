using System;
using System.Collections.Generic;
using System.Text;

namespace _01_Vehicles
{
    public class Car : Vehicle
    {
        private double additionalConsumption = 0.9;
        public Car(double fuelQuantity, double fuelConsumption) : base(fuelQuantity, fuelConsumption)
        {
        }

        protected override double AdditionalConsumption => additionalConsumption;
    }
}
