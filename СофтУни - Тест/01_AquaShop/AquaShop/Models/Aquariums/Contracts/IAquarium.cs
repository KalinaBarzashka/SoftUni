namespace AquaShop.Models.Aquariums.Contracts
{
    using System.Collections.Generic;

    using AquaShop.Models.Decorations.Contracts;
    using AquaShop.Models.Fish.Contracts;

    public interface IAquarium
    {
        string Name { get; }

        int Capacity { get; }

        bool Lights { get; }

        int Comfort { get; }

        ICollection<IDecoration> Decorations { get; }

        ICollection<IFish> Fish { get; }

        string SwitchLights();

        string AddFish(IFish fish);

        void RemoveFish(IFish fish);

        string AddDecoration(IDecoration decoration);

        string Feed();

        string GetInfo();
    }
}
