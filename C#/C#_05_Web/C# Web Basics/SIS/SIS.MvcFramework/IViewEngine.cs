namespace SIS.MvcFramework
{
    public interface IViewEngine
    {
        string GetHtml(string templateName, object model, string user);
    }
}
