using System;
using System.Collections.Generic;
using System.Text;

namespace Shapes
{
    public class Circle : Shape
    {
        private double radius;

        public Circle(double radius)
        {
            this.Radius = radius;
        }

        public double Radius { get => this.radius; private set { this.radius = value; } }

        public override double CalculateArea()
        {
            return Math.PI * Math.Pow(Radius, 2);
        }

        public override double CalculatePerimeter()
        {
            return 2 * Math.PI * radius;
        }

        public override string Draw()
        {
            return base.Draw() + this.GetType().Name;
        }
    }
}
