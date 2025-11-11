export interface UserLogin {
  user_name:string,
  password:string
}


export interface loginRes {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  user: User;
  token: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}
