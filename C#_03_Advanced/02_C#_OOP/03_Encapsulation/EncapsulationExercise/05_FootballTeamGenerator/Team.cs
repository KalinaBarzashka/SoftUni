using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _05_FootballTeamGenerator
{
    public class Team
    {
        private string name;
        private List<Player> players;

        public Team(string name)
        {
            this.Name = name;
            this.players = new List<Player>();
        }

        public string Name
        {
            get => this.name;
            private set
            {
                if (String.IsNullOrEmpty(value) || String.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException("A name should not be empty.");
                }

                this.name = value;
            }
        }

        public IReadOnlyCollection<Player> Players
        {
            get => this.players.AsReadOnly();
        }

        public int Rating 
        {
            get => CalculateTeamRating();
        }

        private int CalculateTeamRating()
        {
            int rating = 0;
            if(this.Players.Any())
            {
                rating = (int)Math.Round(this.players.Average(p => p.Stats));
            }

            return rating;
        }

        public void AddPlayer(Player player)
        {
            this.players.Add(player);
        }

        public void RemovePlayer(string playerName)
        {
            if(!this.Players.Any(x => x.Name == playerName))
            {
                throw new ArgumentException($"Player {playerName} is not in {this.Name} team.");
            }

            Player player = this.Players.FirstOrDefault(x => x.Name == playerName);
            this.players.Remove(player);
        }

        public override string ToString()
        {
            return $"{this.Name} - {this.Rating}";
        }
    }
}
