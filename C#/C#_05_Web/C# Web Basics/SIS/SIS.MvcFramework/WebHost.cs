using SIS.Http;
using SIS.Http.Logging;
using SIS.Http.Response;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace SIS.MvcFramework
{
    public static class WebHost
    {
        public static async Task StartAsync(IMvcApplication application)
        {
            IList<Route> routeTable = new List<Route>();
            IServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.Add<ILogger, ConsoleLogger>();

            application.ConfigureServices(serviceCollection);
            application.Configure(routeTable);

            AutoRegisterStaticFilesRoutes(routeTable);
            AutoRegisterActionRoutes(routeTable, application, serviceCollection);
            var logger = serviceCollection.CreateInstance<ILogger>();
            logger.Log("Registered routes:");

            foreach (var route in routeTable)
            {
                logger.Log(route.ToString());
            }

            logger.Log(string.Empty);
            logger.Log("Requests:");
            var httpServer = new HttpServer(80, routeTable, logger);
            await httpServer.StartAsync();
        }

        private static void AutoRegisterActionRoutes(IList<Route> routeTable, IMvcApplication application, IServiceCollection serviceCollection)
        {
            //Assembly.GetEntryAssembly().GetTypes();
            var controllers = application.GetType().Assembly.GetTypes().Where(type => type.IsSubclassOf(typeof(Controller)) && !type.IsAbstract);
            foreach (var controller in controllers)
            {
                //remove overrided methods!
                var actions = controller.GetMethods()
                    .Where(x => !x.IsSpecialName //props
                    && !x.IsConstructor 
                    && x.IsPublic
                    && x.DeclaringType == controller);
                
                foreach (var action in actions)
                {
                    string url = "/" + controller.Name.Replace("Controller", string.Empty) + "/" + action.Name;

                    var attribute = action.GetCustomAttributes()
                        .FirstOrDefault(x => x.GetType().IsSubclassOf(typeof(HttpMethodAttribute)))
                        as HttpMethodAttribute;

                    var httpActionType = HttpMethodType.Get;
                    if (attribute != null)
                    {
                        httpActionType = attribute.Type;
                        if (attribute.Url != null)
                        {
                            url = attribute.Url;
                        }
                    }

                    routeTable.Add(new Route(httpActionType, url, (request) =>
                    InvokeAction(request, serviceCollection, controller, action)));
                }
            }
        }

        private static HttpResponse InvokeAction(HttpRequest request, IServiceCollection serviceCollection, Type controllerType, MethodInfo actionMethod)
        {
            // instance controller
            var controller = serviceCollection.CreateInstance(controllerType) as Controller;
            controller.Request = request;

            var actionParameterValues = new List<object>();
            var actionParameters = actionMethod.GetParameters();
            foreach (var actionParameter in actionParameters)
            {
                object value = Convert.ChangeType(GetValueFromRequest(request, actionParameter.Name), actionParameter.ParameterType);

                if(value  == null)
                {
                    var parameter = serviceCollection.CreateInstance(actionParameter.ParameterType);
                    foreach (var property in actionParameter.ParameterType.GetProperties(BindingFlags.Public | BindingFlags.Instance))
                    {
                        var propertyValue = GetValueFromRequest(request, property.Name);
                        property.SetValue(parameter, Convert.ChangeType(propertyValue, property.PropertyType));
                    }
                    actionParameterValues.Add(parameter);
                }
                else
                {
                    actionParameterValues.Add(value);
                }
            }

            // call action
            var response = actionMethod.Invoke(controller, actionParameterValues.ToArray()) as HttpResponse;



            // pass http request
            return response;
        }

        private static object GetValueFromRequest(HttpRequest request, string actionParameterName)
        {
            object value = null;
            actionParameterName = actionParameterName.ToLower();
            if (request.QueryData.Any(x => x.Key.ToLower() == actionParameterName))
            {
                value = request.QueryData.FirstOrDefault(x => x.Key.ToLower() == actionParameterName).Value;
            }
            else if (request.FormData.Any(x => x.Key.ToLower() == actionParameterName))
            {
                value = request.FormData.FirstOrDefault(x => x.Key.ToLower() == actionParameterName).Value;
            }

            return value;
        }

        private static void AutoRegisterStaticFilesRoutes(IList<Route> routeTable)
        {
            var staticFiles = Directory.GetFiles("wwwroot", "*", SearchOption.AllDirectories);
            foreach (var staticFile in staticFiles)
            {
                var path = staticFile.Replace("wwwroot", string.Empty).Replace(@"\", "/");
                routeTable.Add(new Route(HttpMethodType.Get, path, (request) =>
                {
                    var fileInfo = new FileInfo(staticFile);
                    var contentType = fileInfo.Extension switch
                    {
                        ".css" => "text/css",
                        ".html" => "text/html",
                        ".js" => "text/javascript",
                        ".ico" => "image/x-icon",
                        ".jpg" => "image/jpeg",
                        ".jpeg" => "image/jpeg",
                        ".png" => "image/png",
                        ".gif" => "image/gif",
                        _ => "text/plain"
                    };
                    return new FileResponse(File.ReadAllBytes(staticFile), contentType);
                }));
            };
        }
    }
}
