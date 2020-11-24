export interface UserType {
  _id: string;
  data: { full_name: string };
  objectId: string;
}

export interface ConfigType {
  app_name: string;
  requireSignIn?: boolean;
  allowPeople?: boolean;
  allowPeopleWithTypes?: string[];
  configVersion: number;
}

export interface PersonType {
  _id: string;
  data: {
    types: string[];
  };
}
