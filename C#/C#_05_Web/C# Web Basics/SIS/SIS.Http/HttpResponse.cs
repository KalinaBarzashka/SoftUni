using System;
using System.Collections.Generic;
using System.Text;

namespace SIS.Http
{
    public class HttpResponse
    {
        public HttpResponse(HttpResponseStatusCode statusCode, byte[] body)
            : this()
        {
            this.Version = HttpVersionType.Http10;
            this.Body = body;
            this.StatusCode = statusCode;
            if (body?.Length > 0)
            {
                this.Headers.Add(new Header("Content-Lenght", body.Length.ToString()));
            }
        }

        internal HttpResponse()
        {
            this.Body = new byte[0];
            this.Headers = new List<Header>();
            this.Cookies = new List<ResponseCookie>();
        }

        public HttpVersionType Version { get; set; }

        public HttpResponseStatusCode StatusCode { get; set; }

        public IList<Header> Headers { get; set; }

        public IList<ResponseCookie> Cookies { get; set; }

        public byte[] Body { get; set; }

        public override string ToString()
        {
            StringBuilder responseAsString = new StringBuilder();
            var httpVersionAsString = this.Version switch
            {
                HttpVersionType.Http10 => "HTTP/1.0",
                HttpVersionType.Http11 => "HTTP/1.1",
                HttpVersionType.Http20 => "HTTP/2.0",
                _ => "HTTP/1.1"
            };
            responseAsString.Append($"{httpVersionAsString} {(int)this.StatusCode} {this.StatusCode}" + HttpConstants.NewLine);
            foreach (var header in this.Headers)
            {
                responseAsString.Append(header.ToString() + HttpConstants.NewLine);
            }

            foreach (var cookie in this.Cookies)
            {
                responseAsString.Append("Set-Cookie: " + cookie.ToString() + HttpConstants.NewLine);
            }

            responseAsString.Append(HttpConstants.NewLine);
            return responseAsString.ToString();
        }
    }
}
