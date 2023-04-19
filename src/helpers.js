import { callOpenAi } from "./imports";

const addUserMessageToChatLog = (message, sender, setChatLog) => {
  setChatLog((prevChatLog) => [
    ...prevChatLog,
    { id: Date.now(), text: message, sender },
  ]);
};
/** The function merges all messages from the user and the bot together.
 * As OpenAPI does not retain conversation history, it is necessary to provide the complete conversation as input to OpenAI.
 * @param {String} chatLog 
 * @param {object} message 
 * @returns {string} Combined Message
 */
const getFullConversation = (chatLog, message) => {
  return (
    chatLog.reduce((conversation, message) => {
      return `${conversation}${message.sender}: ${message.text}\n`;
    }, "") + message
  );
};

export const submitForm = async ({
  inputValue,
  message,
  chatLog,
  setThinking,
  setInputValue,
  setChatLog,
}) => {
  if (inputValue.trim() !== "") {
    setThinking(true);
    addUserMessageToChatLog(message, "user", setChatLog);
    const fullConversation = getFullConversation(chatLog, message);
    const response = await callOpenAi(fullConversation);
    if (response) {
      setInputValue("");
      const filtered = response.replace(/\bbot:\s/g, "");
      addUserMessageToChatLog(filtered, "bot", setChatLog);
      setThinking(false);
    }
  }
};
