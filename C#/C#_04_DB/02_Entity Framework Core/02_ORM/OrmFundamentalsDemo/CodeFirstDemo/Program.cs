using CodeFirstDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CodeFirstDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            var db = new ApplicationDbContext();
            db.Database.EnsureCreated();

            //01
            //db.Categories.Add(new Category
            //{
            //    Title = "Sport",
            //    News = new List<News>
            //    {
            //        new News
            //        {
            //            Title = "CSKA bie Levski",
            //            Content = "ЦСКА бие Левски",
            //            Comments = new List<Comment>
            //            {
            //                new Comment { Author = "Kali", Content = "da" },
            //                new Comment { Author = "Kris", Content = "ne" }
            //            }
            //        }
            //    }
            //});
            //db.SaveChanges();

            //02
            //var news = db.News.Select(x => new
            //{
            //    Name = x.Title,
            //    Categoryname = x.Category.Title
            //}).ToList();
            //
            //foreach (var singleNews in news)
            //{
            //    Console.WriteLine(singleNews.Categoryname + " => " +singleNews.Name);
            //}

            //03
            //var news = db.News.FirstOrDefault();
            //news.Content = "Levski bie CSKA?";
            //
            //db.SaveChanges();

            //04
            db.Categories.Add(new Category { Title = "Weather" });
            db.SaveChanges();
        }
    }
}
