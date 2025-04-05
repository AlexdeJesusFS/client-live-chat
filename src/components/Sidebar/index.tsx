import type React from "react";
import avatarImg from "../../assets/avatar.jpg";
import type { Contact } from "../../types";
import styles from "./styles.module.css";

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contactName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ contacts, onSelectContact }) => {
  const handleSelectContact = (contactName: string) => {
    onSelectContact(contactName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, contactName: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Evita comportamentos padrão, como rolagem com Space
      handleSelectContact(contactName);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Chats</h2>
      </div>
      <div className={styles.contactList}>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={styles.contact}
            onClick={() => handleSelectContact(contact.name)}
            onKeyDown={(e) => handleKeyDown(e, contact.name)}
          >
            <img src={avatarImg} alt={`Avatar de ${contact.name}`} className={styles.avatar} />
            <div className={styles.contactInfo}>
              <h4>{contact.name}</h4>
              <p>{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
