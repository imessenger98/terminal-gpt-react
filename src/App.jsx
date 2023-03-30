import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import callOpenAi from "../common";
import Thinking from "./Thinking";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [username, setUsername] = useState("messenger_1012");
  const [thinking, setThinking] = useState(false);
  const userPrompt = `${username}@tgpt ~ %`;
  const inputRef = useRef(null);

  useEffect(() => {
    const terminalChat = document.querySelector(".terminal-chat");
    terminalChat.addEventListener("click", () => {
      inputRef.current.focus();
    });
  }, []);

  const handleInputChange = useCallback((event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setInputValue(textarea.value);
  }, []);

  const handlePaste = useCallback((event) => {
    const pastedText = event.clipboardData.getData("text");
    const modifiedText = pastedText.replace(/(\r\n|\n|\r)/gm, "\n"); // Replace any line breaks with newline characters
    setInputValue(modifiedText);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    setThinking(true);
    if (inputValue.trim() !== "") {
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { id: Date.now(), text: `${userPrompt} ${inputValue}`, sender: "user" },
      ]);
      const response = await callOpenAi(inputValue);
      if (response) {
        setInputValue("");
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { id: Date.now(), text: response, sender: "bot" },
        ]);
        setThinking(false);
      }
    }
  }, [inputValue, userPrompt]);

  const messageComponents = useMemo(
    () =>
      chatLog.map((message) => (
        <p key={message.id} className={`message ${message.sender}`}>
          {message.text}
        </p>
      )),
    [chatLog]
  );

  return (
    <div className="terminal-chat">
      <div className="terminal-window">
        {messageComponents}
        {thinking ? (
          <Thinking />
        ) : (
          <>
            <div className="main">
              <span className="prompt">{userPrompt}</span>
              <textarea
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
                onKeyDown={(event) => {
                  const key = event.key || event.which; // Use key if available, fallback to which event.which deprecated
                  if (key === "Enter" || key === 13) {
                    handleFormSubmit();
                  }
                }}
                onPaste={handlePaste}
                ref={inputRef}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
