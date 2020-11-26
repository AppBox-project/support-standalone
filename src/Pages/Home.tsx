import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import API from "../AppBox-Standalone-Helper/API";
import Card from "../AppBox-Standalone-Helper/Components/Card";
import { TicketType } from "../Types";
import { useHistory } from "react-router-dom";

const Layout: React.FC<{ api: API }> = ({ api }) => {
  // Vars
  const history = useHistory();
  const [tickets, setTickets] = useState<TicketType[]>();

  // Lifecycle
  useEffect(() => {
    api
      .getObjects("support-tickets", `person=${api.person._id}`)
      .then((tickets: TicketType[]) => setTickets(tickets));
  }, [api]);

  // UI
  return (
    <Card title={`Hi ${api.person.data.first_name}`}>
      <Typography variant="body1">Welcome to {api.config.app_name}.</Typography>
      <Typography variant="body1">
        You can view your tickets here and read up on them, or add new tickets.
      </Typography>
      {tickets && (
        <List>
          <ListSubheader>Your open tickets</ListSubheader>
          {tickets.map((ticket: TicketType) => (
            <ListItem
              key={ticket._id}
              button
              onClick={() => {
                history.push(`/tickets/${ticket.data.name}`);
              }}
            >
              <ListItemText>{ticket.data.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
};

export default Layout;
