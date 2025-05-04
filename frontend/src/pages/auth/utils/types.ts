export type TRequestEndpoint = 'register' | 'login';

export type TAuthResponse = {
  access_token: string;
  user_id: string;
};
