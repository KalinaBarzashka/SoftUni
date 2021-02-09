﻿using SIS.Http;
using SIS.Http.Response;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;

namespace SIS.MvcFramework
{
    public abstract class Controller
    {
        public HttpRequest Request { get; set; }
        protected HttpResponse View<T>(T viewModel = null, [CallerMemberName] string viewName = null)
            where T : class //компилаторът подпъхва параметъра с името на view-то
        {
            var controllerName = this.GetType().Name.Replace("Controller", String.Empty); ; //ще ни даде типа на конкретния контролер
            // [..10] - всичко без последните 10 символа; version 2.1
            var viewPath = "Views/" + controllerName + "/" + viewName + ".html";
            return this.ViewByName<T>(viewPath, viewModel);
        }

        protected HttpResponse View([CallerMemberName] string viewName = null)
        {
            return this.View<object>(null, viewName);
        }

        protected HttpResponse Error(string error)
        {
            return this.ViewByName<ErrorViewModel>("Views/Shared/Error.html", new ErrorViewModel { Error = error });
        }

        private HttpResponse ViewByName<T> (string viewPath, object viewModel)
        {
            IViewEngine viewEngine = new ViewEngine();
            var html = File.ReadAllText(viewPath);
            html = viewEngine.GetHtml(html, viewModel, this.User);

            var layout = File.ReadAllText("Views/Shared/_Layout.html");
            var bodyWithLayout = layout.Replace("@RenderBody()", html);
            bodyWithLayout = viewEngine.GetHtml(bodyWithLayout, viewModel, this.User);
            return new HtmlResponse(bodyWithLayout);
        }

        protected bool IsUserLoggedIn()
        {
            return this.User != null;
        }

        protected HttpResponse Redirect(string url)
        {
            return new RedirectResponse(url);
        }

        protected void SignIn(string userId)
        {
            this.Request.SessionData["UserId"] = userId;
        }

        protected void SignOut()
        {
            this.Request.SessionData["UserId"] = null;
        }

        public string User =>
            this.Request.SessionData.ContainsKey("UserId") ?
            this.Request.SessionData["UserId"] : null;
    }
}
