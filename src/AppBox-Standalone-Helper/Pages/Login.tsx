import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Card from "../Components/Card";
import InputInput from "../Components/Inputs/Input";
import { ConfigType } from "../Types";
import styles from "./styles.module.scss";
import API from "../API";

const Login: React.FC<{ config: ConfigType; api: API }> = ({ config, api }) => {
  // Vars
  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const [signInError, setSignInError] = useState<string>();

  // Lifecycle

  // UI
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={styles.root}
      style={{
        backgroundImage: `url(${config.login.background})`,
        backgroundColor: `rgba(${config.color.r},${config.color.g},${config.color.b},0.6)`,
      }}
    >
      <Grid item xs={12} md={3}>
        <Card title={config.app_name}>
          <Typography variant="body1">
            {config.login.welcomeText ||
              `Log into ${config.app_name} using your appbox credentials.`}
          </Typography>
          {signInError && (
            <>
              <Divider style={{ margin: "5px 0" }} />
              <Typography variant="body2" style={{ color: "red" }}>
                <b>Error: </b>
                {signInError}
              </Typography>
              <Divider style={{ margin: "5px 0" }} />
            </>
          )}
          <InputInput
            label="Username"
            value={user.username}
            onChange={(value) => setUser({ ...user, username: value })}
            style={{ marginTop: 15 }}
          />
          <InputInput
            label="Password"
            value={user.password}
            type="password"
            onChange={(value) => setUser({ ...user, password: value })}
            style={{ marginTop: 15 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
            onClick={() => {
              api.signIn(user).then(
                (success) => window.location.reload(),
                (error) => setSignInError(error)
              );
            }}
          >
            Sign in
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
