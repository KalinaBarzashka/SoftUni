using SIS.Http;
using SIS.Http.Response;
using SIS.MvcFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace DemoApp
{
    public class Startup : IMvcApplication
    {
        public void Configure(IList<Route> routeTable)
        {
            routeTable.Add(new Route(HttpMethodType.Get, "/", IndexPage));
            routeTable.Add(new Route(HttpMethodType.Post, "/Tweets/Create", CreateTweet));
            //routeTable.Add(new Route(HttpMethodType.Get, "/users/login", GetLogin));
            //routeTable.Add(new Route(HttpMethodType.Post, "/users/login", PostLogin));
            //routeTable.Add(new Route(HttpMethodType.Get, "/contact", Contact));
            routeTable.Add(new Route(HttpMethodType.Get, "/favicon.ico", FavIcon));
            //Actions:
            // / => IndexPage() извиква се когато се отваря главната страница
            // /favicon.ico => favico.ico - може да минем през метод или да заредим от статичен файл
            // GET /Contact => response ShowContactForm(request)
            // POST /Contact => response FillContactForm(request)
        }

        public void ConfigureServices()
        {
            var db = new ApplicationDbContext();
            db.Database.EnsureCreated();
        }

        //Action: /headers => returns html table with the list of all headers; name and value

        //HomeController
        public static HttpResponse IndexPage(HttpRequest request)
        {
            //var username = request.SessionData.ContainsKey("Username") ? request.SessionData["Username"] : "Anonymous";
            var db = new ApplicationDbContext();
            var tweets = db.Tweets.Select(x => new
            {
                x.CreatedOn,
                x.Creator,
                x.Content
            }).ToList();//правим проекция, за да материализираме данните от базата, трябва да извикаме ToList() - за да почнем да ги визуализираме; също така не е хубаво да подаваме на view-то без да сме ги материализирали, защото тогава там тепърва трябва да се дърпат от базата от данни; ако е във view-то, гръщката ще стигне до потребителя
            StringBuilder html = new StringBuilder();
            html.Append("<table><tr><th>Date</th><th>Creator</th><th>Content</th></tr>");
            foreach (var tweet in tweets)
            {
                html.Append($"<tr><td>{tweet.CreatedOn}</td><td>{tweet.Creator}</td><td>{tweet.Content}</td></tr>");
            }
            html.Append("</table>");
            html.Append($"<form action='/Tweets/Create' method='post'><input name='creator' /><br /><textarea name='tweetName'></textarea><br /><input type='submit' /></form>");

            return new HtmlResponse(html.ToString());
        }

        // /Tweets - Tweets Controller -> method (action) Index by default
        // /Tweets/Create - Tweets Controller -> method Create
        public static HttpResponse CreateTweet(HttpRequest request)
        {
            var db = new ApplicationDbContext();
            db.Tweets.Add(new Tweet
            {
                CreatedOn = DateTime.UtcNow,
                Creator = request.FormData["creator"],
                Content = request.FormData["tweetName"]
            });
            db.SaveChanges();
            return new RedirectResponse("/");
        }

        //public static HttpResponse GetLogin(HttpRequest request)
        //{
        //    request.SessionData["Username"] = "Kalina";
        //    return new HtmlResponse("<h1>Login page form</h1>");
        //}
        //
        //public static HttpResponse PostLogin(HttpRequest request)
        //{
        //    return new HtmlResponse("<h1>Login page</h1>");
        //}

        //public static HttpResponse Contact(HttpRequest request)
        //{
        //    return new HtmlResponse("<h1>Contact page</h1>");
        //}

        public static HttpResponse FavIcon(HttpRequest request)
        {
            var byteContent = File.ReadAllBytes("wwwroot/favicon.ico");
            return new FileResponse(byteContent, "image/x-icon");
        }
    }
}
