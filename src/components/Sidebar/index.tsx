import type React from "react";
import type { Contact } from "../../types";
import styles from "./styles.module.css";
import avatarImg from "../../assets/avatar.jpg";

interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contactName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ contacts, onSelectContact }) => {
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
            onClick={() => onSelectContact(contact.name)}
          >
            <img src={avatarImg} alt="Avatar" className={styles.avatar} />
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
