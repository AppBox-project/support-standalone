import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import API from "../AppBox-Standalone-Helper/API";
import Card from "../AppBox-Standalone-Helper/Components/Card";
import { useHistory } from "react-router-dom";
import { TicketType, ResponseType } from "../Types";
import { Skeleton } from "@material-ui/lab";
import { find } from "lodash";
import Picture from "../AppBox-Standalone-Helper/Components/Picture";
import { UserType } from "../AppBox-Standalone-Helper/Types";

const Layout: React.FC<{ api: API; detailId?: string }> = ({
  api,
  detailId,
}) => {
  // Vars
  const history = useHistory();
  const [tickets, setTickets] = useState<TicketType[]>();
  const [selectedTicket, setSelectedTicket] = useState<TicketType>();

  // Lifecycle
  useEffect(() => {
    api
      .getObjects("support-tickets", `person=${api.person._id}`)
      .then((tickets: TicketType[]) => setTickets(tickets));
  }, [api]);

  useEffect(() => {
    setSelectedTicket(
      tickets && find(tickets, (o: TicketType) => o.data.name === detailId)
    );
  }, [detailId, tickets]);

  // UI
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={selectedTicket ? 3 : 12}>
        <Card withBigMargin withoutPadding>
          {tickets ? (
            <List>
              <ListSubheader>Your open tickets</ListSubheader>
              {tickets.map((ticket: TicketType) => (
                <ListItem
                  key={ticket._id}
                  button
                  onClick={() => {
                    history.push(`/tickets/${ticket.data.name}`);
                  }}
                  selected={detailId === ticket.data.name}
                >
                  <ListItemText>{ticket.data.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          ) : (
            <Skeleton />
          )}
        </Card>
      </Grid>
      {selectedTicket && (
        <ViewSelectedTicket api={api} ticket={selectedTicket} />
      )}
    </Grid>
  );
};

const ViewSelectedTicket: React.FC<{ api: API; ticket: TicketType }> = ({
  api,
  ticket,
}) => {
  // Vars
  const [responses, setResponses] = useState<ResponseType[]>();

  // Lifecycle
  useEffect(() => {
    api
      .getObjects("support-responses", `ticket=${ticket._id}`)
      .then((responses: ResponseType[]) => setResponses(responses));
  }, [ticket, api]);

  // UI
  return (
    <Grid item xs={12} sm={9} className="scrollIndependently">
      <Card withBigMargin>
        <Grid container>
          <Grid item xs={12} sm={3} style={{ textAlign: "center" }}>
            <Picture
              withShadow
              size="sm"
              style={{ margin: "0 auto" }}
              image={`${process.env.REACT_APP_URL}/${api.person.data.picture.url}`}
              fallBackOnLocalhost
            />
            <Typography variant="body1">{api.person.data.full_name}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={8} style={{ paddingLeft: 15 }}>
            <Typography variant="h6">{ticket.data.title}</Typography>
            <div
              dangerouslySetInnerHTML={{
                __html: ticket.data.content,
              }}
            />
          </Grid>
        </Grid>
      </Card>
      {responses ? (
        responses.map((response: ResponseType) => (
          <ResponseCard response={response} key={response._id} api={api} />
        ))
      ) : (
        <Skeleton width="100%" height={150} />
      )}
    </Grid>
  );
};

const ResponseCard: React.FC<{ response: ResponseType; api: API }> = ({
  response,
  api,
}) => {
  // Vars
  const [agent, setAgent] = useState<UserType>();

  // Lifecycle
  useEffect(() => {
    api
      .getObjects("users", `_id=${response.data.agent}`)
      .then((user: UserType[]) => setAgent(user[0]));
  }, [response, api]);

  // UI
  return (
    <Grid container style={{ marginTop: 15 }} spacing={3}>
      <Grid item xs={8}>
        <Card withBigMargin>
          <div dangerouslySetInnerHTML={{ __html: response.data.content }} />
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card withBigMargin>
          {agent ? (
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Picture
                  withShadow
                  size="xs"
                  image={`${process.env.REACT_APP_URL}/${agent.data.picture}`}
                  fallBackOnLocalhost
                />
              </Grid>
              <Grid item xs={9} style={{ textAlign: "center" }}>
                <Typography variant="body1">{agent.data.full_name}</Typography>
              </Grid>
            </Grid>
          ) : (
            <Skeleton width="100%" />
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Layout;
