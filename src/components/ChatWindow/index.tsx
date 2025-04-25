import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import styles from "./styles.module.css";
import type { ChatWindowProps } from "./types";

const ChatWindow = ({ selectedContact, messages, onSendMessage, currentUser }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim()) {
        onSendMessage(newMessage);
        setNewMessage("");
      }
    }
  };

  // Rolagem automática para baixo quando novas mensagens chegam
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h3>{selectedContact}</h3>
      </div>
      <div className={styles.chatBody}>
        {messages.map((message, index) => {
          if (message.type === "system") {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={index} className={styles.systemMessage}>
                <p>
                  {message.text} {message.timestamp}
                </p>
              </div>
            );
          }

          const isCurrentUser = message.sender === currentUser;

          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className={`${styles.message} ${
                isCurrentUser ? styles.messageSent : styles.messageReceived
              }`}
            >
              {!isCurrentUser && <span className={styles.sender}>{message.sender}</span>}
              <p>{message.text}</p>
              <span className={styles.timestamp}>{message.timestamp}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.chatFooter} onSubmit={handleSubmit}>
        <textarea
          onKeyDown={handleKeyDown}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
