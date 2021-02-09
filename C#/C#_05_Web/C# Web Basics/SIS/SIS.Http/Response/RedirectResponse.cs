namespace SIS.Http.Response
{
    public class RedirectResponse : HttpResponse
    {
        public RedirectResponse(string newLocation)
        {
            this.Headers.Add(new Header("Location", newLocation));
            this.StatusCode = HttpResponseStatusCode.Found;
        }
    }
}
