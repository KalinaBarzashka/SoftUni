using SIS.Http;
using SIS.Http.Response;
using SIS.MvcFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoApp
{
    public static class Program
    {
        public static async Task Main(string[] args)
        {
            await WebHost.StartAsync(new Startup()); ;
        }
    }
}
