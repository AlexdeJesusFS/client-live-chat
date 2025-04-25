import type { Message } from "../types";

type MessageListener = (message: Message) => void;

class ChatWebsocket {
  private socket: WebSocket | null = null;
  private listeners: MessageListener[] = [];
  private userId: string;
  private urlSocket = "ws://localhost:8000/ws?userId=";

  constructor(userId: string) {
    this.userId = userId;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${this.urlSocket}${this.userId}`);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        resolve();
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data) as Message;
        this.notifyListeners(message);
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
        reject(error);
      };

      this.socket.onclose = (event) => {
        console.log(`Closed WebSocket: ${event.code} - ${event.reason}`);
        if (event.code === 1008) {
          reject(new Error(event.reason));
        }
      };
    });
  }

  sendMessage(text: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(text);
    } else {
      console.error("WebSocket isn't connected");
    }
  }

  addListener(listener: MessageListener): void {
    this.listeners.push(listener);
  }

  removeListener(listener: MessageListener): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners(message: Message): void {
    for (const listener of this.listeners) {
      listener(message);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default ChatWebsocket;
