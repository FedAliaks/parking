import { API_BASE_URL } from '../../../../config';
import { ApiRoutes } from '../../../api';

export const getAllSlots = async (parkingSlotID: string, dateParam: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${ApiRoutes.PARKING_SLOTS}/${parkingSlotID}/available-times?date=${dateParam}`,
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
