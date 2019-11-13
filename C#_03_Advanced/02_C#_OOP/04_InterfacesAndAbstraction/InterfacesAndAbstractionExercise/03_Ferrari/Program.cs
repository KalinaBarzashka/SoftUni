using System;

namespace _03_Ferrari
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            string name = Console.ReadLine();
            Ferrari car = new Ferrari(name);
            Console.WriteLine(car);
        }
    }
}
