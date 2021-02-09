using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SulsApp.Models
{
    public class Problem
    {
        public Problem()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Submissions = new HashSet<Submission>();
        }
        public string Id { get; set; }
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }
        //[Required]
        public int Points { get; set; } //не е нужно да е Required, защото не е nullable int
        public virtual ICollection<Submission> Submissions { get; set; }
    }
}
