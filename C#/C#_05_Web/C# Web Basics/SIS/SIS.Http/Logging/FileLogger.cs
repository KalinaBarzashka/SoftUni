using System.IO;

namespace SIS.Http.Logging
{
    public class FileLogger : ILogger
    {
        //NE!
        public void Log(string message)
        {
            File.AppendAllLines("log.txt", new[] { message });
        }
    }
}
