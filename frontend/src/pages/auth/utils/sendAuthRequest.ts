import { ApiRoutes } from '@/api';
import { UserIdStorage } from '@/constants';
import Cookies from 'js-cookie';
import { TAuthResponse, TRequestEndpoint } from './types';
import { API_BASE_URL } from '@/config';

export const sendAuthRequest = async (
  endpoint: TRequestEndpoint,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${ApiRoutes.AUTH}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unknown error');
    }

    const data: TAuthResponse = await response.json();

    const token: string = data.access_token;
    Cookies.set('token', token, { expires: 7 });
    const user_id = data.user_id;
    localStorage.setItem(UserIdStorage, user_id);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error');
    }
  }
};
