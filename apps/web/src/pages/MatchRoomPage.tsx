import { useNavigate } from "react-router-dom";
import Scoreboard from "../components/matchroom/Scoreboard";
import FanChat from "../components/matchroom/FanChat";
import { TwitterFeed } from "../components/matchroom/TwitterFeed";
import "../styles/matchroom.css";

function MatchRoomPage() {
  const navigate = useNavigate();

  return (
    <div className="match-room">

      <button 
      onClick={() => navigate('/matches')}
      className="close-button"
      aria-label="Cerrar"
      >
        x  
      </button>

      <Scoreboard />

        <div className="match-room-content">
          <FanChat />
          <TwitterFeed />
        </div>

    </div>
  );
}

export default MatchRoomPage;
