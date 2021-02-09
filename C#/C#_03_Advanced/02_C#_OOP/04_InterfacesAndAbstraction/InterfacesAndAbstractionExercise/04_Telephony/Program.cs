using System;

namespace _04_Telephony
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] phones = Console.ReadLine().Split();
            string[] webSites = Console.ReadLine().Split();
            Smartphone phone = new Smartphone();

            phone.Call(phones);
            phone.Browse(webSites);


        }
    }
}
