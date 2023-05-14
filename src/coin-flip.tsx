import CasinoIcon from "@mui/icons-material/Casino";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import coinIcon from "./assets/coinflip/coin.png";
import coinGif from "./assets/coinflip/coinFlip.gif";
import coinWin from "./assets/coinflip/coinWin.gif";
import coinsIcon from "./assets/coinflip/coins-icon.png";
import dollarCoinsIcon from "./assets/coinflip/dollar-coins-icon.png";
import GenericModal from "./components/generic-modal";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

function Coinflip() {
  const [modalOpenCoin, setModalOpenCoin] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
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
        <Typography variant="button" display="block">
          Coin flip
        </Typography>

        <div className="card">
          <Button
            startIcon={<MonetizationOnIcon />}
            onClick={() => setModalOpenCoin(true)}
            variant="contained"
          >
            Start game
          </Button>
        </div>

        <Typography variant="h5">Click on the Coin to start</Typography>
        <div>
          <Button
            startIcon={<HomeIcon />}
            onClick={handleHomeClick}
            variant="contained"
          >
            Home
          </Button>
        </div>
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
  const [showGIF, setShowGIF] = useState(false);
  const [showWinGIF, setShowWinGIF] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setShowGIF(false);
    }, 2000);
    return () => clearTimeout(timeoutID);
  }, [showGIF]);

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

    setResult("");
    setShowGIF(true);

    // Wait for 2 seconds and then show the game result
    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? "head" : "tail";
      setResult(randomResult);
      console.log(randomResult);

      // Update win/loss counter
      if (
        (randomResult === "head" && head) ||
        (randomResult === "tail" && tail)
      ) {
        setWins(wins + 1);
        setShowWinGIF(true);
        setTimeout(() => {
          setShowWinGIF(false);
        }, 2000);
      } else {
        setLosses(losses + 1);
      }

      // Wait for 5 seconds and then reset the game
      setTimeout(() => {
        setHead(false);
        setTail(false);
        setResult("");
        setShowWinGIF(false);
      }, 3000);
    }, 2000);
  };

  useEffect(() => {
    // Save win/loss counter to local storage
    localStorage.setItem("wins", JSON.stringify(wins));
    localStorage.setItem("losses", JSON.stringify(losses));
  }, [wins, losses]);

  useEffect(() => {
    // Retrieve win/loss counter from local storage

    const savedWins = localStorage.getItem("wins");
    const loadedWins = savedWins ? JSON.parse(savedWins) : 0;
    const savedLosses = localStorage.getItem("losses");
    const loadedLosses = savedLosses ? JSON.parse(savedLosses) : 0;

    if (savedWins) {
      setWins(loadedWins);
    }

    if (savedLosses) {
      setLosses(loadedLosses);
    }
  }, []);

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
                src={dollarCoinsIcon}
                className="logo "
                alt="logo"
              />
              <Typography variant="button" display="block">
                Head
              </Typography>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                onClick={handleTailClick}
                src={coinsIcon}
                className="logo "
                alt="logo"
              />
              <Typography variant="button" display="block">
                Tail
              </Typography>
            </div>
          </div>
        </Box>
        <div style={{ textAlign: "center" }}>
          <Typography variant="button" display="block">
            You chose {head ? "Head" : tail ? "Tail" : ""}
          </Typography>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            sx={{ margin: "15px" }}
            startIcon={<CasinoIcon />}
            variant="contained"
            onClick={handlePlayClick}
          >
            Play
          </Button>
        </div>
        <div>
          {showGIF && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
            >
              <img
                src={coinGif}
                alt="coin flip"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
        <div>
          {showWinGIF && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
              }}
            >
              <img
                src={coinWin}
                alt="coin win"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>

        <div>
          {result && (
            <Typography
              variant="button"
              display="block"
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
        <div
          style={{
            border: "1px solid white",
            borderRadius: "5px",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <Typography variant="button" display="block">
            Wins: {wins}
          </Typography>
          <Typography variant="button" display="block">
            Losses: {losses}
          </Typography>
        </div>
      </div>
    </GenericModal>
  );
}
export default Coinflip;
