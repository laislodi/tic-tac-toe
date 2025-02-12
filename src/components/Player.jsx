import { useState } from "react";

export default function Player({ player, isActive, onChangePlayer}) {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ playerName, setPlayerName ] = useState(player.name);

  const handleEditClick = () => {
    setIsEditing(isEditing => !isEditing);
  };

  const handleChangeName = (event) => {
    setPlayerName(event.target.value);
    onChangePlayer(player, event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ?
          <span className="player-name">{player.name}</span>
          : <input type="text" value={playerName} onChange={handleChangeName} required />
        }
        <span className="player-symbol">{player.symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
