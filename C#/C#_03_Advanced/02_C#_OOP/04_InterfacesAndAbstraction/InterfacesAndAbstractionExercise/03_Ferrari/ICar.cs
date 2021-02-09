using System;
using System.Collections.Generic;
using System.Text;

namespace _03_Ferrari
{
    public interface ICar
    {
        string Model { get; }
        string Name { get; }
        string UseBrakes();
        string PushGas();
    }
}
