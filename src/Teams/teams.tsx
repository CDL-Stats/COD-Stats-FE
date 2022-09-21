import NavBar from "../nav/nav";
import "../global.scss";
import "./teams.scss";
import { useEffect, useState } from "react";

export default function Teams() {
  const [teams, getTeams] = useState([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/teams`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getTeams(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <body>
      <NavBar />
      <div className='teams-container'>
        <h1>Teams</h1>
        <div className='team-grid'>
          {teams.map((team) => (
            <div className='team-tile'>
              <a href={`teams/${team["slug"]}`}>
                <div className='team-tile__image'>
                  <img src={team["pictureURL"]}></img>
                </div>
              </a>
              <div className='team-tile__text'> {team["teamName"]}</div>
            </div>
          ))}
        </div>
      </div>
    </body>
  );
}
