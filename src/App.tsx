import { Box, Button, IconButton, Typography } from "@mui/material";
import "./App.css";
import tailIcon from "./assets/tail-coin.png";
import headIcon from "./assets/head-coin.png";
import coinIcon from "./assets/coin.png";
import GenericModal from "./components/generic-modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [modalOpenCoin, setModalOpenCoin] = useState(false);
  return (
    <>
      <Box>
        <div>
          <a>
            <img
              onClick={() => setModalOpenCoin(true)}
              src={coinIcon}
              className="logo "
              alt="logo"
            />
          </a>
        </div>
        <Typography variant="h1">Coin flip</Typography>
        <div className="card">
          <Button onClick={() => setModalOpenCoin(true)} variant="contained">
            Start game
          </Button>
        </div>
        <Typography variant="h5">Click on the Coin to start</Typography>
      </Box>
      <CoinFlipGame
        open={modalOpenCoin}
        close={() => {
          setModalOpenCoin(false);
        }}
      />
    </>
  );
}

function CoinFlipGame({ open, close }: { open: boolean; close: () => void }) {
  const [head, setHead] = useState(false);
  const [tail, setTail] = useState(false);
  const [result, setResult] = useState<"head" | "tail" | "">("");
  const handleHeadClick = () => {
    setHead(true);
    setTail(false);
  };

  const handleTailClick = () => {
    setHead(false);
    setTail(true);
  };

  const handlePlayClick = () => {
    if (!head && !tail) {
      setResult("");
      alert("Please choose head or tail");
      return;
    }

    const randomResult = Math.random() < 0.5 ? "head" : "tail";
    setResult(randomResult);
    console.log(randomResult);

    // Wait for 5 seconds and then reset the game
    setTimeout(() => {
      setHead(false);
      setTail(false);
      setResult("");
    }, 5000);
  };

  return (
    <GenericModal header="Choose head or tail" open={open} close={close}>
      <div>
        <IconButton
          style={{ position: "absolute", top: -3, right: 150, color: "white" }}
          onClick={() => {
            close();
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <img
                onClick={handleHeadClick}
                src={headIcon}
                className="logo "
                alt="logo"
              />
              <Typography>Head</Typography>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                onClick={handleTailClick}
                src={tailIcon}
                className="logo "
                alt="logo"
              />
              <Typography>Tail</Typography>
            </div>
          </div>
        </Box>
        <div style={{ textAlign: "center" }}>
          <Typography>
            You chose {head ? "Head" : tail ? "Tail" : ""}
          </Typography>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            sx={{ margin: "15px" }}
            variant="contained"
            onClick={handlePlayClick}
          >
            Play
          </Button>
        </div>

        <div>
          {result && (
            <Typography
              variant="h5"
              style={{ marginTop: "50px", textAlign: "center" }}
            >
              {result === "head"
                ? "The coin landed on Head"
                : "The coin landed on Tail"}
              {head && result === "head"
                ? ", you win!"
                : tail && result === "tail"
                ? ", you win!"
                : ", you lose!"}
            </Typography>
          )}
        </div>
      </div>
    </GenericModal>
  );
}
export default App;
