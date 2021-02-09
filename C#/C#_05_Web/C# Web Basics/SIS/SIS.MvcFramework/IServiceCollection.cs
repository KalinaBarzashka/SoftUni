using System;

namespace SIS.MvcFramework
{
    public interface IServiceCollection
    {
        void Add<TSourse, TDestination>() //interface, type of class
            where TDestination : TSourse;

        object CreateInstance(Type type);

        T CreateInstance<T>();
    }
}