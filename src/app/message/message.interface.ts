
export interface Message {
  authorId: string,
  text: string,
  timestamp: number,
}

export interface IncommingMessage extends Message {
  id: string,
}
