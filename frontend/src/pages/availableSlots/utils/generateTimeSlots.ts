import dayjs from 'dayjs';
import { TFetchSlots, TimeSlot } from '../types';

export const generateTimeSlots = (fetchSlots: TFetchSlots[], isToday: boolean): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  const reservedMap = new Map<string, string>();

  fetchSlots.forEach(slot => {
    const hour = slot.reserved_time.slice(0, 5);
    reservedMap.set(hour, slot.user_id);
  });

  console.log(reservedMap);
  const currentHour = dayjs().hour();

  for (let hour = 0; hour < 24; hour++) {
    const start = hour.toString().padStart(2, '0') + ':00';
    const end = (hour + 1).toString().padStart(2, '0') + ':00';

    const isReserved = reservedMap.has(start);
    
    const isPast = isToday && hour < currentHour;

    slots.push({
      time: `${start}–${end}`,
      available: !isReserved && !isPast,
      user_id_reserved: isPast
        ? 'PAST_TIME_USER_ID'
        : isReserved
          ? reservedMap.get(start)
          : undefined,
    });
  }

  return slots;
};
