import { ChatMessage } from "./ChatMessage.interface.constant";

export interface UserChats {
  [userId: number]: ChatMessage[];
}
