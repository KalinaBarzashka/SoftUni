using System;
using System.Collections.Generic;
using System.Text;

namespace SingleInheritance
{
    public class CosmicalObject : Object
    {
        public CosmicalObject()
        {
            this.Speed = 1000;
        }
        protected virtual int Speed { get; set; }

    }
}
