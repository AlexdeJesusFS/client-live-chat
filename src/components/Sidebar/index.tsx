import { PiChatsCircleFill } from "react-icons/pi";
import globalAvatarImg from "../../assets/global avatar.png";
import styles from "./styles.module.css";
import type { SidebarProps } from "./types";

const Sidebar = ({ contacts, onSelectContact }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Chats</h2>
        <PiChatsCircleFill size={40} />
      </div>
      <div className={styles.contactList}>
        {contacts.map((contact) => (
          <button
            key={contact.id}
            className={styles.contact}
            onClick={() => onSelectContact(contact.name)}
            type="button"
          >
            <img
              src={globalAvatarImg}
              alt={`Avatar de ${contact.name}`}
              className={styles.avatar}
            />
            <div className={styles.contactInfo}>
              <h4>{contact.name}</h4>
              <p>{contact.last_message}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
