using System;
using System.Collections.Generic;
using System.IO;

namespace Demo
{
    public interface ILineWriter
    {
        void WriteLine(string line);
    }
    public interface ISameLineWriter
    {
        void Write(string text);
    }
    public interface IWriter : ILineWriter, ISameLineWriter //or internal - accessed in our api
    {
        void WriteLines(IEnumerable<string> lines);
        //string Name { get; }
    }
    public class ConsoleWriter : IWriter
    {
        //public string Name => throw new NotImplementedException();

        public void Write(string text)
        {
            Console.Write(text);
        }

        public void WriteLine(string line)
        {
            Console.WriteLine(line);
        }

        public void WriteLines(IEnumerable<string> lines)
        {
            foreach (var line in lines)
            {
                this.WriteLine(line);
            }
        }

        public class FileWriter : IWriter, IDisposable
        {
            private StreamWriter streamWriter;

            public FileWriter(string fileName)
            {
                this.streamWriter = new StreamWriter(fileName);
            }

            public void Dispose()
            {
                this.streamWriter.Dispose();
            }

            public void Write(string text)
            {
                this.streamWriter.Write(text);
            }

            public void WriteLine(string line)
            {
                this.streamWriter.WriteLine(line);
            }

            public void WriteLines(IEnumerable<string> lines)
            {
                foreach (var line in lines)
                {
                    this.streamWriter.WriteLine(line);
                }
            }
        }

        public class StartUp
        {
            static void Main(string[] args)
            {
                using (var writer = new FileWriter("output.txt"))
                {
                    PrintHello(writer);
                }
            }

            static void PrintHello(ILineWriter writer)
            {
                writer.WriteLine("Hello!");
                // ...
                // ...
                // ...
            }
        }
    }
}
