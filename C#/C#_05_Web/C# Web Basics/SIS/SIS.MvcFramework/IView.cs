namespace SIS.MvcFramework
{
    public interface IView
    {
        string GetHTML(object model, string user);
    }
}
