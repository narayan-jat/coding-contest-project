import React from "react";
import "./Leaderboard.css";
import profile1 from "./leaderboard assets/profile1.jpeg"; // Corrected the path

const data = [
  { rank: 1, name: "Wade Warren", points: 1280, prize: "$5000", img: profile1 },
  {
    rank: 2,
    name: "Kristin Watson",
    points: 1140,
    prize: "$2500",
    img: profile1,
  },
  {
    rank: 3,
    name: "Savannah Nguyen",
    points: 1030,
    prize: "$1000",
    img: profile1,
  },
  { rank: 4, name: "Courtney Henry", points: 960, prize: "$0", img: profile1 },
  { rank: 5, name: "Marvin McKinney", points: 940, prize: "$0", img: profile1 },
  { rank: 6, name: "Robert Fox", points: 890, prize: "$0", img: profile1 },
  { rank: 7, name: "Bessie Cooper", points: 880, prize: "$0", img: profile1 },
  { rank: 8, name: "Jerome Bell", points: 790, prize: "$0", img: profile1 },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <h1 className="title">LEADERBOARD</h1>
      <table className="tableName">
        <thead>
          <tr className="tableRow">
            <th className="tableHeader">Rank</th>
            <th className="tableHeader">Player</th>
            <th className="tableHeader">Points</th>
            <th className="tableHeader">Prize</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <tr className="tableRow" key={index}>
              <td className="tableData">{player.rank}</td>
              <td className="tableData" id="player-info">
                <img src={player.img} alt={player.name} id="player-img" />
                {player.name}
              </td>
              <td className="tableData">{player.points}</td>
              <td className="tableData">{player.prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
