// import './App.css';
import "./Home.css";
import React from "react";
import { Typography, Button } from "@mui/material";
import Clock from "./Clock.js";
import Game from "./Game.js";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState([]);

  const handleStart = () => {
    setStart(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/today", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("USERID"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();

      const messageArray = data || [];

      setMessages(messageArray);
    } catch (error) {
      console.log(error);
      console.error("Error fetching messages:", error);
    }
  };

  React.useEffect(() => {
    const user_id = localStorage.getItem("USERID");
    if (user_id === null) {
      fetchNewUser();
    }

    fetchMessages();
    setLoading(false);
  }, []);

  const fetchNewUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/new-user", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      localStorage.setItem("USERID", data.id);
    } catch (error) {
      console.error("fail");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="help-button">
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          onClick={handleClickOpen}
        >
          <QuestionMarkIcon />
        </IconButton>
      </div>

      <Typography
        variant="h1"
        style={{
          backgroundImage: "linear-gradient(#e66465, #9198e5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Questionle?
      </Typography>

      <Clock />

      {start ? (
        <Game messages={messages} />
      ) : loading ? (
        <div style={{ padding: "1.2rem" }}>
          <CircularProgress />
        </div>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "10rem" }}
          onClick={handleStart}
        >
          Play today's challenge
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"How to play Questionle?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A simple game of 20 questions. Each day a different word is chosen
            for everyone around the world to guess. You goal is to ask questions
            to find that word. That is it! Have fun!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
