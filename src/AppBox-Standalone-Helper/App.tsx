import React, { useEffect, useState } from "react";
import { getAppConfig } from ".";
import { ConfigType, PersonType } from "./Types";
import { Loading } from "./UI";

const App: React.FC<{ pages: { [pageKey: string]: React.FC } }> = ({
  pages,
}) => {
  const [config, setConfig] = useState<ConfigType>();
  const [person, setPerson] = useState<PersonType>();

  // Lifecycle
  useEffect(() => {
    getAppConfig((config) => setConfig(config));
  }, []);

  return config ? (
    config.requireSignIn ? (
      person ? (
        <pages.Layout />
      ) : (
        <pages.Login />
      )
    ) : (
      <pages.Layout />
    )
  ) : (
    <Loading />
  );
};

export default App;
