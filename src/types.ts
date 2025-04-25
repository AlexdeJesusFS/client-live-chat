export type Message = {
  type: "message" | "system" | "contacts";
  sender?: string;
  text?: string;
  timestamp?: string;
  contacts?: Contact[];
};

export type Contact = {
  id: number;
  name: string;
  last_message: string;
  avatar: string;
};
