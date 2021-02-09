using SIS.Http;
using SIS.Http.Logging;
using SIS.MvcFramework;
using SulsApp.ViewModels.Home;
using System;

namespace SulsApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger logger;

        public HomeController(ILogger logger)
        {
            this.logger = logger;
        }


        // /Home/Index
        // /
        [HttpGet("/")]
        public HttpResponse Index()
        {
            this.logger.Log("Hello from Index!");
            var viewModel = new IndexViewModel
            {
                Message = "Welcome to SULS Platform!",
                Year = DateTime.UtcNow.Year
            };
            return this.View(viewModel);
        }
    }
}
