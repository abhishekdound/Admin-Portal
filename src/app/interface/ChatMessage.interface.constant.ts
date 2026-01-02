export interface ChatMessage {
  userId: number;
  sender: 'me' | 'user';
  message: string;
  time: string;
}
