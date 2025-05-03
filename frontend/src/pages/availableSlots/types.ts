export type TimeSlot = {
  time: string;
  available: boolean;
  user_id_reserved?: string;
};

export type TFetchSlots = {
  id: string;
  parking_spot_id: string;
  reserved_date: string;
  reserved_time: string;
  status: boolean;
  user_id: string;
};
