import React, { useEffect, useState } from "react";
import { getAppConfig } from ".";
import API from "./API";
import Login from "./Pages/Login";
import { ConfigType, PersonType, UserType } from "./Types";
import { Loading } from "./UI";
import { map } from "lodash";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const api = new API();

const App: React.FC<{
  pages: {
    default: { [pageKey: string]: React.FC<{ api: API }> };
    layout: React.FC<{ api: API }>;
    home: React.FC<{ api: API }>;
  };
}> = ({ pages }) => {
  const [config, setConfig] = useState<ConfigType>();
  const [user] = useState<UserType>();
  const [person, setPerson] = useState<PersonType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Lifecycle
  useEffect(() => {
    getAppConfig((config) => {
      setConfig(config);
      api.config = config;
    });
    if (!user && !person) {
      api.setToken(
        localStorage.getItem("token"),
        localStorage.getItem("username")
      );
      if (api.token) {
        // Get user or person
        if ((api.config.signInWith || "people") === "people") {
          api.getPerson().then((person: PersonType) => {
            setPerson(person);
            setIsLoading(false);
          });
        } else {
          console.log("Todo: sign in user");
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [user, person]);
  return (
    <ThemeProvider
      theme={createMuiTheme({
        palette: {
          type:
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light",
        },
      })}
    >
      {config ? (
        config.requireSignIn ? (
          user || person ? (
            <pages.layout api={api}>
              <BrowserRouter>
                <Switch>
                  {map(pages.default, (Page, path) => {
                    return (
                      <Route
                        path={`/${path}/:detailId?`}
                        key={path}
                        render={(props) => (
                          <Page
                            {...props}
                            detailId={props.match.params.detailId}
                            api={api}
                          />
                        )}
                      ></Route>
                    );
                  })}
                  <Route path="/">
                    <pages.home api={api} />
                  </Route>
                </Switch>
              </BrowserRouter>
            </pages.layout>
          ) : isLoading ? (
            <Loading />
          ) : (
            <Login config={config} api={api} />
          )
        ) : (
          <pages.layout api={api}>Test</pages.layout>
        )
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  );
};

export default App;
