using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

using AquaShop.Repositories.Contracts;
using AquaShop.Models.Decorations.Contracts;

namespace AquaShop.Repositories
{
    class DecorationRepository : IRepository<IDecoration>
    {
        private List<IDecoration> models;

        public DecorationRepository()
        {
            this.models = new List<IDecoration>();
        }

        public IReadOnlyCollection<IDecoration> Models => this.models.AsReadOnly();

        public void Add(IDecoration model)
        {
            this.models.Add(model);
        }

        public IDecoration FindByType(string type)
        {
            return this.models.FirstOrDefault(x => x.GetType().Name == type);
        }

        public bool Remove(IDecoration model)
        {
            int index = this.models.FindIndex(m => m == model);
            if (index >= 0)
            {
                this.models.RemoveAt(index);
                return true;
            }
            return false;
        }

    }
}
