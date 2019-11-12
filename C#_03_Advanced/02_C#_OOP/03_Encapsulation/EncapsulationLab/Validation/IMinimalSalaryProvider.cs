using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace PersonsInfo
{
    public interface IMinimalSalaryProvider
    {
        int GetMinimalSalary();
    }

    public class ConstantMinimalSalaryProvider : IMinimalSalaryProvider
    {
        public int GetMinimalSalary()
        {
            return 600;
        }
    }

    public class FileMinimalSalaryprovider : IMinimalSalaryProvider
    {
        public int GetMinimalSalary()
        {
            var fileContent = File.ReadAllLines("settings.txt");
            return int.Parse(fileContent[0]);
        }
    }
}
