import { TFetchSlots, TimeSlot } from '../types';

export const generateTimeSlots = (fetchSlots: TFetchSlots[]): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  const reservedMap = new Map<string, string>();

  fetchSlots.forEach(slot => {
    const hour = slot.reserved_time.slice(0, 5);
    reservedMap.set(hour, slot.user_id);
  });

  console.log(reservedMap);

  for (let hour = 0; hour < 24; hour++) {
    const start = hour.toString().padStart(2, '0') + ':00';
    const end = (hour + 1).toString().padStart(2, '0') + ':00';

    const isReserved = reservedMap.has(start);

    slots.push({
      time: `${start}–${end}`,
      available: !isReserved,
      ...(isReserved && { user_id_reserved: reservedMap.get(start) }),
    });
  }

  return slots;
};
