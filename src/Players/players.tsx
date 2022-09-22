import { useEffect, useState } from "react";
import NavBar from "../nav/nav";
import PlayerSearch from "./playersearch";
import "./players.scss";

export default function Players() {
  const [players, setPlayers] = useState<any[]>([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/players`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
      });
  };

  const calculate_age = (dob: string | number | Date) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <body>
      <NavBar />
      <div className='players-container'>
        <h1>Players</h1>
        {/* <PlayerSearch /> */}
        <table className='players-table'>
          <thead>
            <th>Name</th>
            <th>Team</th>
            <th>Role</th>
            <th>Age</th>
            <th>Country</th>
          </thead>
          <tbody>
            {players.length > 0 &&
              players.map((player) => (
                <tr>
                  <td>
                    <a href={`/players/${player?.nickName}`}>
                      {player["nickName"]}
                    </a>
                  </td>
                  {
                    <td>
                      {player?.team ? (
                        <a href={`/teams/${player?.team?.slug}`}>
                          {player["team"]["teamName"]}
                        </a>
                      ) : (
                        "Free Agent"
                      )}
                    </td>
                  }
                  <td>
                    {player?.primaryWeapon ? player["primaryWeapon"] : ""}
                  </td>
                  <td>{calculate_age(player["birthDate"])}</td>
                  <td>{player["country"]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}
