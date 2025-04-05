import type React from "react";
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import type { Contact } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string>("Maria");

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Maria",
      lastMessage: "No meu site pessoal",
    },
    {
      id: 2,
      name: "João",
      lastMessage: "Oi, tudo bem?",
    },
  ];

  return (
    <div className="app">
      <Sidebar contacts={contacts} onSelectContact={setSelectedContact} />
      <ChatWindow selectedContact={selectedContact} />
    </div>
  );
};

export default App;
