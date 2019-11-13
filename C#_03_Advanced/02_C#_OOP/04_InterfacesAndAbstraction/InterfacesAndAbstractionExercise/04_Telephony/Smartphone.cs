using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _04_Telephony
{
    public class Smartphone : ICallable, IBrowseable
    {
        public void Browse(string[] websites)
        {
            foreach (var site in websites)
            {
                bool contains = site.Any(Char.IsDigit);

                if (contains == true)
                {
                    Console.WriteLine("Invalid URL!");
                }
                else
                {
                    Console.WriteLine($"Browsing: {site}!");
                }
            }
        }

        public void Call(string[] phones)
        {
            foreach (var phone in phones)
            {
                bool contains = phone.Any(Char.IsLetter);

                if(contains == true)
                {
                    Console.WriteLine("Invalid number!");
                }
                else
                {
                    Console.WriteLine($"Calling... {phone}");
                }
            }
        }
    }
}
