import React, { useState, useEffect } from "react";
import wordBank from "../../wordBank"; // Ensure the correct import path

const Game = () => {
  const [currentParagraph, setCurrentParagraph] = useState("");
  const [typedText, setTypedText] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0); // Timer for WPM calculation
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctWords, setCorrectWords] = useState(0); // Track correct words
  const [startTime, setStartTime] = useState(null); // Track game start time
  const [hasStartedTyping, setHasStartedTyping] = useState(false); // Flag to check if typing started

  // Generate a random paragraph
  const generateParagraph = () => {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    setCurrentParagraph(wordBank[randomIndex]);
  };

  // Handle user input and letter-by-letter comparison
  const handleInputChange = (e) => {
    if (isGameOver) return; // Prevent changes if the game is already over

    const input = e.target.value;
    setTypedText(input);

    // Start timing when the user types the first letter
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      setStartTime(Date.now()); // Set the start time
    }

    // Check if the input matches the paragraph
    if (input === currentParagraph) {
      setCorrectWords(currentParagraph.split(" ").length); // Count correct words
      setIsGameOver(true); // End the game when the paragraph is completed
      setElapsedTime((Date.now() - startTime) / 1000); // Set elapsed time
    }
  };

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

  // Calculate words per minute (WPM)
  const calculateWPM = () => {
    if (elapsedTime > 0) {
      const wordsPerMinute = ((correctWords / (elapsedTime / 60)) || 0).toFixed(2);
      return wordsPerMinute;
    }
    return 0; // Return 0 if elapsedTime is not set
  };

  // Calculate accuracy (optional metric)
  const calculateAccuracy = () => {
    return typedText.length > 0
      ? ((typedText.split(" ").length / currentParagraph.split(" ").length) * 100).toFixed(2)
      : 0;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!isGameOver ? (
        <>
          <h2>TypeKita: Play as Guest</h2>

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

          <input
            type="text"
            value={typedText}
            onChange={handleInputChange}
            style={{
                opacity: 0, // Make it invisible
                position: "absolute", // Position it absolutely
                left: "-9999px", // Push it out of view
            }}
            placeholder="Type the paragraph here"
            disabled={isGameOver}
            autoFocus // Automatically focus on the input
            />

        </>
      ) : (
        <>
          <h2>Game Over!</h2>
          <p>Your Final Score:</p>
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

          {/* Show metrics only when game is over */}
          <div style={{ marginTop: "20px" }}>
            <p>Words Per Minute (WPM): {calculateWPM()}</p>
            <p>Accuracy: {calculateAccuracy()}%</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
