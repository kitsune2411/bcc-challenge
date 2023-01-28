export interface IUser {
  id?: number;
  username: string;
  password: string;
}

export interface IProfile extends IUser {
  fullname: string;
  age: number;
  gender: "male" | "female";
}
