import { PersonType, UserType, ConfigType } from "../Types";

export default class API {
  key: string;
  url = process.env.REACT_APP_URL;
  appCode = process.env.REACT_APP_SECRET;
  appName = process.env.REACT_APP_NAME;
  token;
  auth;
  user: UserType;
  person: PersonType;
  config: ConfigType;

  // Sign in
  signIn = (user: { username: string; password: string }) =>
    new Promise((resolve, reject) => {
      post(`${this.url}/api/system/signIn`, {
        user,
        appName: this.appName,
        standAloneCode: this.appCode,
      }).then((res: any) => {
        console.log("API feedback", res);

        if (res.success) {
          this.setToken(res.token, res.username);
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
          resolve(res.token);
        } else {
          reject(res.reason);
        }
      });
    });

  setToken = (token, username) => {
    this.token = token;
    this.auth = { token, username, signInAs: "person" };
  };

  // Get user
  // Get people
  getPerson = () =>
    new Promise((resolve, reject) => {
      post(`${this.url}/api/people/read?email=${this.auth.username}`, {
        auth: this.auth,
      }).then((res) => {
        resolve(res[0]);
        this.person = res[0];
      });
    });

  // Get objects
  getObjects = (modelId: string, filter: string) =>
    new Promise((resolve, reject) => {
      post(`${this.url}/api/${modelId}/read?${filter}`, {
        auth: this.auth,
      }).then((res) => {
        resolve(res);
      });
    });
}

const post = (url, body?) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body || {}), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      });
  });
