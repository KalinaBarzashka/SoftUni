using System;

namespace Shapes
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            Rectangle rectangle = new Rectangle(3, 2);
            Circle circle = new Circle(2);
            rectangle.CalculateArea();
            rectangle.CalculatePerimeter();
            rectangle.Draw();
            circle.CalculateArea();
            circle.CalculatePerimeter();
            circle.Draw();
        }
    }
}
