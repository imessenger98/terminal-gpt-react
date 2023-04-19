import { React, useMemo, Input, ReactMarkdown } from "../imports";

const { TextArea } = Input;

/**
 * Renders a list of messages with different styles based on the sender.
 */
function MessageList({ chatLog }) {
  const messageComponents = useMemo(
    () =>
      chatLog.map((message) =>
        message.sender === "user" ? (
          <TextArea
            autoSize
            key={message.id}
            className={`message ${message.sender}`}
            value={message.text}
            bordered={false}
            readOnly
          />
        ) : (
          <ReactMarkdown
            key={message.id}
            children={message.text}
            className={`message ${message.sender}`}
          />
        )
      ),
    [chatLog]
  );

  return <div>{messageComponents}</div>;
}

export default MessageList;
