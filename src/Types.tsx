export interface TicketType {
  _id: string;
  data: {
    name: string;
    title: string;
    content: string;
  };
}

export interface ResponseType {
  _id: string;
  data: {
    ticket: string;
    title: string;
    content: string;
    agent: string;
  };
}
