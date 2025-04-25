import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import ChatWebsocket from "./services/ChatWebsocket";
import type { Contact, Message } from "./types";
import "./App.css";

const App = () => {
  const [userId, setUserId] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>("Global");
  const [websocket, setWebsocket] = useState<ChatWebsocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleLogin = async (userId: string) => {
    try {
      const ws = new ChatWebsocket(userId);

      // Adiciona listener antes de conectar
      ws.addListener((message: Message) => {
        if (message.type === "contacts") {
          setContacts(message.contacts || []);
        } else if (message.type === "message" || message.type === "system") {
          setMessages((prev) => [...prev, message]);
        }
      });

      await ws.connect();
      setWebsocket(ws);
      setUserId(userId);
      setIsConnected(true);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar");
    }
  };

  const handleSendMessage = (text: string) => {
    if (websocket) {
      websocket.sendMessage(text);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup ao desmontar o componente
      if (websocket) {
        websocket.disconnect();
      }
    };
  }, [websocket]);

  if (!isConnected) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="app">
      <Sidebar contacts={contacts} onSelectContact={setSelectedContact} />
      <ChatWindow
        selectedContact={selectedContact}
        messages={messages}
        onSendMessage={handleSendMessage}
        currentUser={userId}
      />
    </div>
  );
};

export default App;
