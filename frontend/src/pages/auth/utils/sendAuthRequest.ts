import Cookies from 'js-cookie';

type TRequestEndpoint = 'register' | 'login';

export const sendAuthRequest = async (
  endpoint: TRequestEndpoint,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`http://localhost:3000/api/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unknown error');
    }

    const token: string = data.access_token;
    Cookies.set('token', token, { expires: 7 });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error');
    }
  }
};
