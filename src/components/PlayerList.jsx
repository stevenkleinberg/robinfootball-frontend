// src/components/PlayerList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function PlayerList({ initialPlayers = [] }) {
    const [players, setPlayers] = useState(initialPlayers);
    const [portfolio, setPortfolio] = useState([]);
    const totalValue = portfolio.reduce((sum, player) => sum + player.currentValue, 0);


    useEffect(() => {
        axios.get('http://localhost:5049/api/Players')
            .then(res => setPlayers(res.data))
            .catch(err => console.error('Failed to fetch players:', err));
    }, []);

    const buyPlayer = (player) => {
        const alreadyOwned = portfolio.some(p => p.id === player.id);
        if (alreadyOwned) {
            alert(`${player.name} is already in your portfolio.`);
            return;
        }
        setPortfolio((prev) => [...prev, player]);
    };

    const sellPlayer = (playerId) => {
        setPortfolio((prev) => prev.filter(p => p.id !== playerId));
    };

    const adjustValue = (id, delta) => {
        setPortfolio(prev =>
            prev.map(p =>
                p.id === id ? { ...p, currentValue: p.currentValue + delta } : p
            )
        );
    };

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
                <h2>Available Players</h2>
                {players.length === 0 ? (
                    <p>No players found.</p>
                ) : (
                    players.map(player => (
                        <div key={player.id}>
                            <strong>{player.name}</strong> – {player.team} – ${player.currentValue}
                            <button
                                onClick={() => buyPlayer(player)}
                                disabled={portfolio.some(p => p.id === player.id)}
                            >
                                {portfolio.some(p => p.id === player.id) ? 'Owned' : 'Buy'}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div>
                <h2>Your Portfolio</h2>
                <p>Total Value: ${totalValue.toLocaleString()}</p>
                {portfolio.length === 0 ? (
                    <p>No players owned.</p>
                ) : (
                    portfolio.map(player => (
                        <div key={player.id}>
                            <strong>{player.name}</strong> — ${player.currentValue.toLocaleString()}
                            <div>
                                <button onClick={() => adjustValue(player.id, 10)}>📈 +10</button>
                                <button onClick={() => adjustValue(player.id, -10)}>📉 -10</button>
                                <button onClick={() => sellPlayer(player.id)}>🗑️ Sell</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PlayerList;
