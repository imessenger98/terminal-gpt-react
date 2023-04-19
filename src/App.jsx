import {
  React,
  useState,
  useRef,
  useCallback,
  SettingOutlined,
  Thinking,
  SettingsModal,
  MessageList,
  Terminal,
  submitForm,
} from "./imports";
import "./styles/App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "terminal"
  );
  const [thinking, setThinking] = useState(false);
  const userPrompt = `${username}@tgpt ~ %`;
  const message = `${userPrompt} ${inputValue}`;
  const inputRef = useRef(null);

  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleFormSubmit = useCallback(async () => {
    await submitForm({
      inputValue,
      message,
      chatLog,
      setThinking,
      setInputValue,
      setChatLog,
    });
  }, [inputValue]);

  const openSettingsModal = () => setSettingsModalOpen((prev) => !prev);

  return (
    <>
      <div className="Main">
        <SettingOutlined className="btn-settings" onClick={openSettingsModal} />
        <div className="messageComponents">
          <MessageList chatLog={chatLog} />
          {thinking ? (
            <Thinking />
          ) : (
            <Terminal
              userPrompt={userPrompt}
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              inputRef={inputRef}
            />
          )}
        </div>
      </div>
      <SettingsModal
        settingsModalOpen={settingsModalOpen}
        setSettingsModalOpen={setSettingsModalOpen}
        setUsername={setUsername}
        username={username}
      />
    </>
  );
}

export default App;
