export interface IAuthentication {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  createdAt?: Date;
  email: string;
  photoUrl: string;
  providerId: string;
  id: string;
}
