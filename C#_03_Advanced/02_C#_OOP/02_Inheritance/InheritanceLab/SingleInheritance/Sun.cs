using System;
using System.Collections.Generic;
using System.Text;

namespace SingleInheritance
{
    public class Sun : Star
    {
        public Sun()
        {
            this.Speed = 10;
        }
        protected int Speed { get; set; }

        public override string ToString()
        {
            int Speed = 1;
            return Speed.ToString();
        }
    }
}
