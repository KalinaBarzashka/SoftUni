using SIS.Http;
using System;

namespace SIS.MvcFramework
{
    public class HttpPostAttribute : HttpMethodAttribute
    {
        public HttpPostAttribute()
        {

        }

        public HttpPostAttribute(string url)
            : base(url)
        {
        }

        public override HttpMethodType Type => HttpMethodType.Post;
    }
}
