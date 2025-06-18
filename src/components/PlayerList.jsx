// src/components/PlayerList.jsx
import { useEffect, useState } from 'react';
import { getPlayers } from '../api/playerApi';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers()
      .then((res) => {
        setPlayers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch players:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading players...</p>;

  return (
    <div>
      <h2>Players</h2>
      {players.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.name} — {player.position} — {player.team}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerList;
