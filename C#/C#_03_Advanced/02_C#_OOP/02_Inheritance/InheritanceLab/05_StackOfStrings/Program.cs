using System;

namespace CustomStack
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            var stack = new StackOfStrings();
            Console.WriteLine(stack.IsEmpty());
            stack.AddRange(new[] { "1", "2", "3" });
            Console.WriteLine(stack.IsEmpty());
        }
    }
}
