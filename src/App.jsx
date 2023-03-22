/**
 * Author: Messenger_1012
 */

import React, { useState } from "react";

import callOpenAi from "../common";
import Thinking from "./Thinking";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [username, setUsername] = useState("messenger_1012");
  const [thinking, setThinking] = useState(false);
  const userPrompt = `${username}@tgpt ~ %`;
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    setThinking(true);
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { text: `${userPrompt} ${inputValue}`, sender: "user" },
      ]);
      const response = await callOpenAi(inputValue);
      if (response) {
        setInputValue("");
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { text: response, sender: "bot" },
        ]);
        setThinking(false);
      }
    }
  };

  return (
    <div className="terminal-chat">
      <div className="terminal-window">
        {chatLog.map((message, index) => (
          <p key={index} className={`message ${message.sender}`}>
            {message.text}
          </p>
        ))}
        <form onSubmit={handleFormSubmit}>
          {thinking ? (
            <Thinking />
          ) : (
            <>
              <span className="prompt">{userPrompt}</span>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
