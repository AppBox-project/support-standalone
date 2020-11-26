export interface UserType {
  _id: string;
  data: { full_name: string; picture: string };
  objectId: string;
}

export interface ConfigType {
  app_name: string;
  requireSignIn?: boolean;
  signInWith: "people" | "users";
  allowPeopleWithTypes?: string[];
  configVersion: number;
  color: { r: number; g: number; b: number };
  login: { background: string; welcomeText?: string };
}

export interface PersonType {
  _id: string;
  data: {
    types: string[];
    first_name: string;
    last_name: string;
    full_name: string;
    picture: { url: string };
  };
}
