import type React from "react";
import { type FormEvent, useState } from "react";
import type { Message } from "../../types";
import styles from "./styles.module.css";

interface ChatWindowProps {
  selectedContact: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedContact }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Encontre empresas locais, visualize mapas e obtenha rotas de trajeto no Google Maps.",
      sender: "Maria",
      timestamp: "7:10 AM",
    },
    {
      id: 2,
      text: "Aqui na Loft, garantimos um ambiente inclusivo e livre de discriminação...",
      sender: "Maria",
      timestamp: "10:35 AM",
    },
    {
      id: 3,
      text: "No meu site pessoal",
      sender: "You",
      timestamp: "9:34 PM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h3>{selectedContact}</h3>
      </div>
      <div className={styles.chatBody}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === "You" ? styles.messageSent : styles.messageReceived
            }`}
          >
            <p>{message.text}</p>
            <span className={styles.timestamp}>{message.timestamp}</span>
          </div>
        ))}
      </div>
      <form className={styles.chatFooter} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
