using System;
using System.Collections.Generic;
using System.Text;

namespace _01_Vehicles
{
    public abstract class Vehicle
    {
        public Vehicle(double fuelQuantity, double fuelConsumption)
        {
            this.FuelQuantity = fuelQuantity; 
            this.FuelConsumption = fuelConsumption;
        }
        public double FuelQuantity { get; set; }
        public double FuelConsumption { get; set; }
        protected abstract double AdditionalConsumption { get; }
        public virtual string Drive(double distance)
        {
            double requiredFuel = distance * (this.FuelConsumption + AdditionalConsumption);
            if (requiredFuel <= FuelQuantity)
            {
                FuelQuantity -= requiredFuel;
                return $"{this.GetType().Name} travelled {distance} km";
            }
            return $"{this.GetType().Name} needs refueling";
        }
        public virtual void Refueled(double fuel)
        {
            this.FuelQuantity += fuel;
        }

        public override string ToString()
        {
            return $"{this.GetType().Name}: {FuelQuantity:F2}";
        }
    }
}
