export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

export interface Contact {
  id: number;
  name: string;
  lastMessage: string;
}
