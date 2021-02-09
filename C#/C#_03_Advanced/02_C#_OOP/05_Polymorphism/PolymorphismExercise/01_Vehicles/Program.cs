using System;

namespace _01_Vehicles
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] carInput = Console.ReadLine().Split();
            double carFuelQuantity = double.Parse(carInput[1]);
            double carLitersPerKm = double.Parse(carInput[2]);
            Car car = new Car(carFuelQuantity, carLitersPerKm);

            string[] truckInput = Console.ReadLine().Split();
            double truckFuelQuantity = double.Parse(truckInput[1]);
            double truckLitersPerKm = double.Parse(truckInput[2]);
            Truck truck = new Truck(truckFuelQuantity, truckLitersPerKm);

            int numCommands = int.Parse(Console.ReadLine());

            for (int i = 0; i < numCommands; i++)
            {
                string[] commands = Console.ReadLine().Split();
                if(commands[0] == "Drive")
                {
                    if(commands[1] == "Car")
                    {
                        Console.WriteLine(car.Drive(double.Parse(commands[2])));
                    }
                    else if (commands[1] == "Truck")
                    {
                        Console.WriteLine(truck.Drive(double.Parse(commands[2])));
                    }
                }
                else if(commands[0] == "Refuel")
                {
                    if (commands[1] == "Car")
                    {
                        car.Refueled(double.Parse(commands[2]));
                    }
                    else if (commands[1] == "Truck")
                    {
                        truck.Refueled(double.Parse(commands[2]));
                    }
                }
            }

            Console.WriteLine(car.ToString());
            Console.WriteLine(truck.ToString());
        }
    }
}
