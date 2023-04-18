import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import callOpenAi from "../common";
import Thinking from "./Thinking";
import SettingsModal from "./SettingsModal";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "messenger_1012"
  );
  const [thinking, setThinking] = useState(false);
  const userPrompt = `${username}@tgpt ~ %`;
  const message = `${userPrompt} ${inputValue}`;
  const errorMessage = "API key not found. The request will fail with a status code of 401. Please set the API key in the settings.";
  const inputRef = useRef(null);
  const { TextArea } = Input;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const addUserMessage = useCallback((message, sender) => {
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { id: Date.now(), text: message, sender },
    ]);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    if (inputValue.trim() !== "") {
      setThinking(true);
      addUserMessage(message, "user");
      const response = await callOpenAi(inputValue);
      if (response) {
        setInputValue("");
        addUserMessage(response, "bot");
        setThinking(false);
      }
    }
  }, [inputValue, userPrompt]);

  const messageComponents = useMemo(
    () =>
      chatLog.map((message) => (
        <TextArea
          autoSize
          key={message.id}
          className={`message ${message.sender}`}
          value={message.text}
          bordered={false}
          readOnly
        />
      )),
    [chatLog]
  );
  const settingsModal = () => {
    setSettingsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="terminal-chat">
        <SettingOutlined className="btn-settings" onClick={settingsModal} />
        <div className="terminal-window">
          {messageComponents}
          {thinking ? (
            <Thinking />
          ) : (
            <>
              <p className="warning">
                {localStorage.getItem("token")
                  ? null
                  : errorMessage}
              </p>
              <div className="main">
                <span className="prompt">{userPrompt}</span>
                <TextArea
                  className="inputArea"
                  value={inputValue}
                  onChange={handleInputChange}
                  autoFocus
                  autoSize
                  bordered={false}
                  onPressEnter={handleFormSubmit}
                  ref={inputRef}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <SettingsModal
        settingsModalOpen={settingsModalOpen}
        setSettingsModalOpen={setSettingsModalOpen}
        setUsername={setUsername}
      />
    </>
  );
}

export default App;
