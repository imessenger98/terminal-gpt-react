import { React, Input, errorMessage } from "../imports";
import "../styles/App.css";

function Terminal(props) {
  const {
    userPrompt,
    inputValue,
    handleInputChange,
    handleFormSubmit,
    inputRef,
  } = props;

  const { TextArea } = Input;
  const textAreaFocus = () => inputRef.current.focus();

  return (
    <>
      <p className="warning">
        {localStorage.getItem("token") ? null : errorMessage}
      </p>
      <div className="terminal" onClick={textAreaFocus}>
        <div className="terminal-chat">
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
      </div>
    </>
  );
}

export default Terminal;
