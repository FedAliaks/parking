import { ApiRoutes } from '../../../api';

export const getAllReservationBySlotsId = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/${ApiRoutes.PARKING_SLOTS}/${id}/available-dates`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unknown error');
    }

    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error');
    }
  }
};
