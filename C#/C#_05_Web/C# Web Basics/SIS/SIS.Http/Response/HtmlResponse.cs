using System.Text;

namespace SIS.Http.Response
{
    public class HtmlResponse : HttpResponse
    {
        public HtmlResponse(string html) 
            : base()
        {
            this.Headers.Add(new Header("Content-Type", "text/html"));
            this.StatusCode = HttpResponseStatusCode.Ok;
            this.Body = Encoding.UTF8.GetBytes(html);
            this.Headers.Add(new Header("Content-Length", this.Body.Length.ToString()));
        }
    }
}
