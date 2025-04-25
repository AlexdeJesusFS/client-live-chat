import type { Message } from "../../types";

export interface ChatWindowProps {
  selectedContact: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
  currentUser: string;
}
