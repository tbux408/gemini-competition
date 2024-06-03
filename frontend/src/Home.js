// import './App.css';
import "./Home.css";
import React from "react";
import { Typography, Button } from "@mui/material";
import Clock from "./Clock.js";
import Game from "./Game.js";
import Divider from "@mui/material/Divider";

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
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);

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

      if (
        data.length > 0 &&
        data[data.length - 1].type === "model" &&
        data[data.length - 1].content.includes("DONE")
      ) {
        setSuccess(true);
      }
      if (data.length >= 40) {
        setFailure(true);
      }
      console.log(messageArray);
      setMessages(messageArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.error("Error fetching messages:", error);
    }
  };

  React.useEffect(() => {
    const user_id = localStorage.getItem("USERID");
    if (user_id === null) {
      fetchNewUser();
    } else {
      fetchMessages();
    }
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

      fetchMessages();
    } catch (error) {
      console.error("fail");
    }
  };

  const sendMessage = async (message, setDisabled) => {
    console.log(messages);
    try {
      const response = await fetch("http://localhost:8000/api/message", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("USERID"),
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages([...messages, { content: message, type: "user" }, data]);

      if (data.content.includes("DONE")) {
        setSuccess(true);
        setOpenSuccess(true);
      }
      if (messages.length >= 38) {
        setFailure(true);
        setOpenFailure(true);
      }

      setDisabled(false);
      console.log(data);
    } catch (error) {
      console.error("fail");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          backgroundImage: "linear-gradient(#90caf9, #FFFFB3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          cursor: "pointer",
        }}
        onClick={() => setStart(false)}
      >
        Questle?
      </Typography>

      <Clock />

      {loading ? (
        <div style={{ padding: "2.5rem" }}>
          <CircularProgress />
        </div>
      ) : null}

      {failure && !loading ? (
        <div style={{ padding: "2.5rem" }}>
          <Typography variant="subtitle1" color="secondary">
            {" "}
            Better luck next time.
          </Typography>
        </div>
      ) : null}

      {success && !loading ? (
        <div style={{ padding: "2.5rem" }}>
          <Typography variant="subtitle1" color="secondary">
            {" "}
            You completed today's puzzle in {Math.floor(
              messages.length / 2
            )}{" "}
            questions.
          </Typography>
        </div>
      ) : null}

      {!loading ? (
        start ? (
          <Game
            messages={messages}
            sendMessage={sendMessage}
            setMessages={setMessages}
            success={success}
            failure={failure}
          />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "2.5rem" }}
            onClick={handleStart}
          >
            {success || failure
              ? "View Today's challenge"
              : "Play today's challenge"}
          </Button>
        )
      ) : null}

      {/* help dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"How to play Questle?"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6">Basics:</Typography>
            <Typography variant="body1">
              A simple game of 20 questions. Ask yes or no questions until you
              think you have found the word. When ready to guess the word, just
              ask if the word is...? Every 5 questions a hint is provided. A new
              challenge is released daily at midnight.
            </Typography>
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6">Example Questions:</Typography>
            <Typography variant="body1">Is the word an animal?</Typography>
            <Typography variant="body1">Is the word edible?</Typography>
            <Typography variant="body1">Is todays word Questle?</Typography>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6">Controls:</Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", alignItems: "center" }}
            >
              Type in the{" "}
              <div
                style={{
                  border: "solid",
                  borderRadius: "5px",
                  marginLeft: "6px",
                  marginRight: "6px",
                  padding: "1px",
                }}
              >
                Ask question #...
              </div>{" "}
              box
            </Typography>
            <Typography
              variant="body1"
              style={{ display: "flex", alignItems: "center" }}
            >
              Press
              <div
                style={{
                  border: "solid",
                  borderRadius: "5px",
                  marginLeft: "6px",
                  marginRight: "6px",
                  padding: "1px",
                }}
              >
                Enter
              </div>
              key to send question
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* SuccessDialog */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Wow! Great Job!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed today's puzzle in {Math.floor(messages.length / 2)}{" "}
            questions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuccess(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* FailureDialog */}
      <Dialog
        open={openFailure}
        onClose={() => setOpenFailure(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Wow better luck next time!"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpenFailure(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
