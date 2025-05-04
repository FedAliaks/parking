import { ApiRoutes } from "@/api";
import { API_BASE_URL } from "@/config";


export const getParkingSlotById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${ApiRoutes.PARKING_SLOTS}/${id}`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Unknown error');
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error');
    }
  }
};
