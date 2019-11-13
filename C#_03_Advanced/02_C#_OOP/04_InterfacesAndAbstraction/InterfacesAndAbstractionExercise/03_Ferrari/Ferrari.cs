using System;
using System.Collections.Generic;
using System.Text;

namespace _03_Ferrari
{
    public class Ferrari : ICar
    {
        public Ferrari(string name)
        {
            this.Name = name;
        }
        public string Model { get; } = "488-Spider";

        public string Name
        {
            get;
            private set;
        }

        public string PushGas()
        {
            return "Gas!";
        }

        public string UseBrakes()
        {
            return "Brakes!";
        }

        public override string ToString()
        {
            return $"{this.Model}/{this.UseBrakes()}/{this.PushGas()}/{this.Name}";
        }
    }
}
