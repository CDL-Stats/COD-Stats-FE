import NavBar from "../nav/nav";
import "../global.scss";
import "./team.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Team() {
  const [teams, getTeams] = useState([]);
  const [team, setTeam] = useState();
  const [roster, setRoster] = useState([]);
  const [schedule, getSchedule] = useState<any[]>([]);
  const [stats, getStats] = useState([]);
  const { slug } = useParams();

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeam(data);
      });
  };

  const calculate_age = (dob: string | number | Date) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const fetchPlayers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/players/team/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRoster(data);
      });
  };

  const fetchSchedule = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams/schedule/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getSchedule(data);
      });
  };

  const fetchStats = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams/stats/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getStats(data);
      });
  };

  useEffect(() => {
    fetchData();
    fetchPlayers();
    fetchSchedule();
    fetchStats();
    console.log(typeof schedule[0]?.startDate);
  }, []);

  return (
    <body>
      <NavBar />
      <div className='teams-container'>
        {team && (
          <div className='team-header'>
            <div className='team-header__picture-container'>
              <img src={team["pictureURL"]}></img>
            </div>
            <h1> {team["teamName"]}</h1>
          </div>
        )}

        {roster && (
          <div className='team-roster'>
            <h2 className='team-roster__header'>Roster</h2>
            <table className='team-roster__table'>
              <thead>
                <th>Name</th>
                <th>Role</th>
                <th>Age</th>
                <th>Country</th>
              </thead>
              <tbody>
                {roster.map((player: any) => (
                  <tr>
                    <td>
                      <a href={`/players/${player["nickName"]}`}>
                        {player["nickName"]}
                      </a>
                    </td>
                    <td>{player["primaryWeapon"]}</td>
                    <td>{calculate_age(player["birthDate"])}</td>
                    <td>{player["country"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {schedule && (
          <div className='team-schedule'>
            <h2>Schedule</h2>
            <table className='team-schedule__table'>
              <thead>
                <th>Event</th>
                <th>Date</th>
                <th>Placement</th>
              </thead>
              <tbody>
                {schedule.map((tournament) => (
                  <tr>
                    <td>{tournament["name"]}</td>
                    <td>
                      {tournament["startDate"].slice(0, 10)} -{" "}
                      {tournament["endDate"].slice(0, 10)}
                    </td>
                    <td>2nd</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {stats.length > 1 && (
          <div className='team-stats'>
            <h2>Stats</h2>
            <table className='team-stats__table'>
              <thead>
                <th>Game Mode</th>
                <th>Win Pct</th>
              </thead>
              {stats.map((s) => (
                <tr>
                  <td>{s["game"]}</td>
                  <td>{(s["win_pct"] * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </body>
  );
}
