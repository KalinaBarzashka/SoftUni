using System;
using System.Collections.Generic;
using System.Text;

namespace SingleInheritance
{
    public class Star : CosmicalObject
    {
        public Star()
        {
            this.Speed = 100;
        }
        protected override int Speed { get => base.Speed; set => base.Speed = value; }
    }
}
