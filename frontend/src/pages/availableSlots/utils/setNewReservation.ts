import { ApiRoutes } from '@/api';
import { API_BASE_URL } from '@/config';
import { ParkingSlotIdStorage, UserIdStorage } from '@/constants';
import dayjs from 'dayjs';


export const setNewReservation = async (selectedSlots: string[], dateParam: string) => {
  const user = localStorage.getItem(UserIdStorage) || '';
  const spot = localStorage.getItem(ParkingSlotIdStorage) || '';

  if (!user || !spot || selectedSlots.length === 0 || !dateParam) {
    return;
  }

  try {
    await Promise.all(
      selectedSlots.map(async slotTime => {
        const startHour = slotTime.split('–')[0];
        const fullDate = dayjs(`${dateParam}T${startHour}`);

        const dto = {
          user,
          spot,
          date: fullDate.toISOString(),
        };

        const response = await fetch(`${API_BASE_URL}/${ApiRoutes.RESERVATION}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(dto),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unknown error');
        }
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Network error');
    }
  }
};
