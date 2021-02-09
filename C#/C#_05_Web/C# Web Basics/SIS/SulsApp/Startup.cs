using Microsoft.EntityFrameworkCore;
using SIS.Http;
using SIS.MvcFramework;
using SulsApp.Controllers;
using SulsApp.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace SulsApp
{
    public class Startup : IMvcApplication
    {
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.Add<IUsersService, UsersService>();
            serviceCollection.Add<IProblemsService, ProblemsService>();
        }

        public void Configure(IList<Route> routeTable)
        {
            //Middleware...
            var db = new ApplicationDbContext();
            db.Database.Migrate();
        }
    }
}
