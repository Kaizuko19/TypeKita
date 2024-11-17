import React, { useState, useEffect } from "react";
import wordBank from "../../wordBank";  // Ensure the correct import path

const Game = () => {
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [typedText, setTypedText] = useState("");
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctWords, setCorrectWords] = useState(0); // Track correct words
  const [totalWords, setTotalWords] = useState(0); // Track total words typed

  // Generate a random paragraph
  const generateParagraph = () => {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    setCurrentParagraph(wordBank[randomIndex]);
  };

  // Handle user input and letter-by-letter comparison
  const handleInputChange = (e) => {
    const input = e.target.value;
    setTypedText(input);

 // Check if the input matches the paragraph
 if (input === currentParagraph) {
    setCorrectWords(correctWords + currentParagraph.split(" ").length); // Increase correct words count
    setTotalWords(totalWords + currentParagraph.split(" ").length); // Increase total words count
    setTypedText(""); // Clear input
    generateParagraph(); // Generate a new paragraph
  } else {
    setTotalWords(totalWords + input.split(" ").length); // Increase total words count for each input
  }
};

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsGameOver(true);
    }
  }, [timer]);

  // Start the game with an initial paragraph
  useEffect(() => {
    generateParagraph();
  }, []);

  // Function to highlight text by correctness
  const renderParagraphWithColors = () => {
    return currentParagraph.split("").map((char, index) => {
      const typedChar = typedText[index];
      let color = "#ccc"; // Default color (before typing)
      if (typedChar) {
        if (typedChar === char) {
          color = "green"; // Correct letter
        } else {
          color = "red"; // Incorrect letter
        }
      }
      return (
        <span key={index} style={{ color }}>
          {char}
        </span>
      );
    });
  };

   // Calculate words per second and accuracy
   const calculateWPS = () => {
    const secondsElapsed = 120 - timer; // Total time in seconds
    return secondsElapsed > 0 ? (correctWords / secondsElapsed).toFixed(2) : 0;
  };

  const calculateAccuracy = () => {
    return totalWords > 0 ? ((correctWords / totalWords) * 100).toFixed(2) : 0;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!isGameOver ? (
        <>
          <h2>TypeKita: Play as Guest</h2>
          <p>Time Remaining: {timer} seconds</p>
          <p>Score: {score}</p>
          <div
            style={{
              margin: "20px",
              padding: "10px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {renderParagraphWithColors()}
          </div>
          {/* Invisible input field for typing */}
          <input
            type="text"
            value={typedText}
            onChange={handleInputChange}
            style={{
              width: "80%",
              height: "40px",
              padding: "10px",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              opacity: 0, // Make it invisible
              position: "absolute", // Position it absolutely
              left: "50%", // Center it horizontally
              transform: "translateX(-50%)", // Center it
            }}
            placeholder="Type the paragraph here"
            disabled={isGameOver}
            autoFocus // Automatically focus on the input
          />
        </>
      ) : (
        <>
          <h2>Game Over!</h2>
          <p>Your Final Score: {score}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              background: "#4caf50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default Game;