using System;
using System.Collections.Generic;
using System.Linq;

namespace _05_FootballTeamGenerator
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            List<Team> teamlist = new List<Team>();
            while (true)
            {
                string[] input = Console.ReadLine().Split(";");
                if (input[0] == "END") { break; }
                string command = input[0];
                string teamname = input[1];
                try
                {
                    switch (command)
                    {
                        case "Team":
                            teamlist.Add(new Team(teamname));
                            break;
                        case "Add":
                            if (!teamlist.Any(x => x.Name == teamname))
                            {
                                throw new ArgumentException($"Team {teamname} does not exist.");
                            }
                            else
                            {
                                Team currentTeam = teamlist.First(x => x.Name == teamname);
                                string playerName = input[2];
                                int endurance = int.Parse(input[3]);
                                int sprint = int.Parse(input[4]);
                                int dribble = int.Parse(input[5]);
                                int passing = int.Parse(input[6]);
                                int shooting = int.Parse(input[7]);

                                Player player = new Player(playerName, endurance, sprint, dribble, passing, shooting);
                                currentTeam.AddPlayer(player);
                            }

                            break;
                        case "Remove":
                            Team currentTeamToRemove = teamlist.First(x => x.Name == teamname);
                            currentTeamToRemove.RemovePlayer(input[2]);
                            break;
                        case "Rating":
                            if (!teamlist.Any(t => t.Name == teamname))
                            {
                                throw new ArgumentException($"Team {teamname} does not exist.");
                            }
                            else
                            {
                                Console.WriteLine(teamlist.First(t => t.Name == teamname).ToString());
                            }
                            break;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
