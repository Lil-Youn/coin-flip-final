import CasinoIcon from "@mui/icons-material/Casino";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import diceLogo from "./assets/dice/dice-logo.png";
import dice1Icon from "./assets/dice/dice1.png";
import dice2Icon from "./assets/dice/dice2.png";
import dice3Icon from "./assets/dice/dice3.png";
import dice4Icon from "./assets/dice/dice4.png";
import dice5Icon from "./assets/dice/dice5.png";
import dice6Icon from "./assets/dice/dice6.png";

import HomeIcon from "@mui/icons-material/Home";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router";
import GenericModal from "./components/generic-modal";

function Dice() {
  const [modalOpenDice, setModalOpenDice] = useState(false);
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
              onClick={() => setModalOpenDice(true)}
              src={diceLogo}
              className="logo "
              alt="logo"
            />
          </a>
        </div>
        <Typography variant="button" display="block">
          Roll the dice
        </Typography>

        <div className="card">
          <Button
            startIcon={<MonetizationOnIcon />}
            onClick={() => setModalOpenDice(true)}
            variant="contained"
          >
            Start game
          </Button>
        </div>
        <Typography variant="h5">Click on the Dice to start</Typography>
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
      <DiceGame
        open={modalOpenDice}
        close={() => {
          setModalOpenDice(false);
        }}
      />
    </>
  );
}

function DiceGame({ open, close }: { open: boolean; close: () => void }) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [showGIF, setShowGIF] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const diceIcons = [
    dice1Icon,
    dice2Icon,
    dice3Icon,
    dice4Icon,
    dice5Icon,
    dice6Icon,
  ];

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setShowGIF(false);
    }, 2000);
    return () => clearTimeout(timeoutID);
  }, [showGIF]);

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
  };

  const handlePlayClick = () => {
    if (!selectedNumber) {
      alert("Please choose a number to roll.");
      return;
    }

    setShowGIF(true);
    setDiceRoll(null);

    // Wait for 2 seconds and then roll the dice
    setTimeout(() => {
      const diceRollValue = Math.floor(Math.random() * 6) + 2;
      setDiceRoll(diceRollValue);

      // Update win/loss counter
      if (diceRollValue === selectedNumber) {
        setWins(wins + 1);
      } else {
        setLosses(losses + 1);
      }

      setShowGIF(false);
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
    <GenericModal header="Roll the dice" open={open} close={close}>
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
            <img
              src={showGIF ? diceIcons[Math.floor(Math.random() * 6)] : ""}
              className={`dice-image ${showGIF ? "rolling" : ""}`}
              alt="dice"
            />
          </div>
          <div>
            {diceRoll && (
              <div style={{ textAlign: "center" }}>
                <Typography variant="h6">You rolled a {diceRoll}</Typography>
                <Typography variant="h6">
                  {diceRoll === selectedNumber ? "You won!" : "You lost!"}
                </Typography>
              </div>
            )}
            {!diceRoll && (
              <div style={{ textAlign: "center" }}>
                <Typography variant="h6">Choose a number to roll</Typography>
                <div className="dice-buttons">
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <Button
                      key={number}
                      variant="contained"
                      color={selectedNumber === number ? "primary" : "success"}
                      onClick={() => handleNumberClick(number)}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePlayClick}
                >
                  Roll the Dice
                </Button>
              </div>
            )}
          </div>
          <Button onClick={handlePlayClick} variant="contained" color="primary">
            {diceRoll ? "Roll again" : "Roll the dice"}
          </Button>
          <Typography variant="h6" style={{ marginTop: 24 }}>
            Select a number to bet on:
          </Typography>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
              <IconButton
                key={number}
                onClick={() => handleNumberClick(number)}
                style={{
                  backgroundColor: selectedNumber === number ? "#f50057" : "",
                }}
              >
                <CasinoIcon fontSize="large" />
                <Typography variant="h6">{number}</Typography>
              </IconButton>
            ))}
          </div>
          <Typography variant="h6" style={{ marginTop: 24 }}>
            Statistics:
          </Typography>

          <Typography variant="body1">Wins: {wins}</Typography>
          <Typography variant="body1">Losses: {losses}</Typography>
        </Box>
      </div>
    </GenericModal>
  );
}

export default Dice;
