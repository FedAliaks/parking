import { ApiRoutes } from "@/api";
import { API_BASE_URL } from "@/config";


export const getAllReservationForUserById = async (userId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${ApiRoutes.RESERVATION}/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });

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
