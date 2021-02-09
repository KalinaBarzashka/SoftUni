using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SulsApp.Models
{
    public class Submission
    {
        public Submission()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        [Required]
        [MaxLength(800)]
        public string Code { get; set; }
        public int AchievedResult { get; set; }
        public DateTime CreatedOn { get; set; }
        //navigational props - always must be virtual - така позволяваме на entity framework да направи наследник на този клас, т.н. Proxy object, когато ви даде данните от базата от данни и тези пропъртита да ги override-не. Ако не са virtual, не може да се override-нат и не може да се намеси да сложи на тяхно място някакъв прокси обект също. Когато са virtual Entity framework може да позволи, когато кажем .Problem, той да направи тепърва нова заявка и да  дръпне проблема/user-a в последствие. За колекциите важи също. lazy loading => m+1 problem 
        public string ProblemId { get; set; }
        public virtual Problem Problem { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
