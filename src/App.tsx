import { useNavigate } from "react-router-dom";
import coinIcon from "./assets/coin.png";
import diceIcon from "./assets/dice-logo.png";
import { Typography } from "@mui/material";

function App() {
  const navigate = useNavigate();

  const handleCoinClick = () => {
    navigate("/coinflip");
  };

  const handleDiceClick = () => {
    navigate("/dice");
  };

  return (
    <>
      <div>
        <img
          onClick={handleCoinClick}
          src={coinIcon}
          className="logo"
          alt="coin"
        />
        <img
          onClick={handleDiceClick}
          src={diceIcon}
          className="logo"
          alt="dice"
        />
      </div>
      <Typography variant="button" display="block">
        Choose your Game
      </Typography>
      <Typography sx={{ margin: "10px" }} variant="h5">
        Click on the Game Icon to start
      </Typography>
    </>
  );
}

export default App;
