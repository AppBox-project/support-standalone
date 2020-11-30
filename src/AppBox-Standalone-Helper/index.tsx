export { getAppConfig };

// Functions
const getAppConfig = (respond: (config) => void) => {
  const url = process.env.REACT_APP_URL;
  const appCode = process.env.REACT_APP_SECRET;
  const appName = process.env.REACT_APP_NAME;
  const config = localStorage.getItem("config");

  if (config) {
    // Cached load. First respond with the cached data, then perform a background refresh if needed.
    respond(JSON.parse(config));
    fetch(`${url}/api/system/standalone/${appName}-${appCode}`)
      .then((res) => res.json())
      .then(
        (result) => {
          const oldConfig = JSON.parse(config);
          // If config version has changed, respond anew. Else leave as-is.
          if (oldConfig.configVersion !== result.configVersion) {
            localStorage.setItem("config", JSON.stringify(result));
            respond(result);
          }
        },
        (error) => {
          respond(error);
        }
      );
  } else {
    // First load: first fetch, then resolve.
    fetch(`${url}/api/system/standalone/${appName}-${appCode}`)
      .then((res) => res.json())
      .then(
        (result) => {
          localStorage.setItem("config", JSON.stringify(result));
          respond(result);
        },
        (error) => {
          respond(error);
        }
      );
  }
};
