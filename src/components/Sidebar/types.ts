import type { Contact } from "../../types";

export interface SidebarProps {
  contacts: Contact[];
  onSelectContact: (contactName: string) => void;
}
