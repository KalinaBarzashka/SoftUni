using System;
using System.Collections.Generic;
using System.Text;

namespace SIS.Http.Response
{
    public class FileResponse : HttpResponse
    {
        public FileResponse(byte[] fileContent, string contentType)// : base()
        {
            this.StatusCode = HttpResponseStatusCode.Ok;
            this.Body = fileContent;
            this.Headers.Add(new Header("Content-Type", contentType));
            this.Headers.Add(new Header("Content-Length", this.Body.Length.ToString()));
        }
    }
}
