import React, { useState } from "react";
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [username, setUsername] =useState("messenger_1012");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setChatLog([...chatLog, { text: inputValue, sender: "user" }]);
      setInputValue("");
      // TODO: endo cheyan indu
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
          <span className="prompt">{`${username}@tgpt ~ %`}</span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}

export default App;
