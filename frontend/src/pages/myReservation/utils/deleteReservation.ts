import { API_BASE_URL } from '../../../../config';
import { ApiRoutes } from '../../../api';

export const deleteReservation = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${ApiRoutes.RESERVATION}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unknown error');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error');
    }
  }
};
