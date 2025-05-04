import { Box, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getAllSlots, setNewReservation } from './utils';
import { TFetchSlots, TimeSlot } from './types';
import { generateTimeSlots } from './utils/generateTimeSlots';
import {
  StyledBox,
  StyledTitle,
  StyledTypography,
  StyledButton,
  StyledSubtitle,
} from '@/components/ui';
import { ParkingSlotIdStorage, UserIdStorage, COLORS } from '@/constants';
import { AppRoutes } from '@/routes/path';

export const AvailableSlotsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date') || '';
  const formatCurrentDay = dayjs(dateParam).format('MMM D');
  const isToday = dayjs().isSame(dayjs(dateParam), 'day');
  const parkingSlotID = localStorage.getItem(ParkingSlotIdStorage) || '';
  const userId = localStorage.getItem(UserIdStorage) || '';

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [fetchSlots, setFetchSlots] = useState<TFetchSlots[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const firstSelectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!parkingSlotID || !dateParam || !userId) return;

      try {
        const slots: TFetchSlots[] = await getAllSlots(parkingSlotID, dateParam);
        setFetchSlots(slots);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchSlots();
  }, []);

  useEffect(() => {
    setSlots(generateTimeSlots(fetchSlots, isToday));
  }, [fetchSlots]);

  const handleSelect = (time: string) => {
    setSelectedSlots(prev => [...prev, time]);
  };

  const handleDeselect = (time: string) => {
    setSelectedSlots(prev => prev.filter(item => item !== time));
  };

  const handleBookSlots = async () => {

    try {
      await setNewReservation(selectedSlots, dateParam);

      const updated = await getAllSlots(parkingSlotID, dateParam);
      setFetchSlots(updated);
      setSelectedSlots([]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const isSelected = (time: string) => selectedSlots.includes(time);

  const handleGoToDataPickerClick = () => {
    navigate(AppRoutes.DATES);
  };

  return (
    <StyledBox>
      <StyledTitle>{`Available slots for ${formatCurrentDay}:`}</StyledTitle>

      <Box
        ref={scrollContainerRef}
        sx={{
          maxHeight: 5 * 60,
          overflowY: 'auto',
          border: `1px solid ${COLORS.primaryColor}`,
          borderRadius: 2,
          backgroundColor: `${COLORS.lightColor}`,
          mb: 2,
        }}
      >
        <Stack spacing={0.5} p={1}>
          {slots.map(({ time, available }) => {
            const selected = isSelected(time);
            const ref =
              selectedSlots.length > 0 && selectedSlots[0] === time ? firstSelectedRef : null;

            return (
              <Box
                key={time}
                ref={ref}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
                borderRadius={1}
                bgcolor={`${COLORS.whiteColor}`}
                border={`1px solid ${COLORS.primaryColor}`}
              >
                <StyledTypography color={available ? 'inherit' : 'error'}>
                  {`${time}${!available ? ' (Reserved)' : ''}`}
                </StyledTypography>

                {available && (
                  <StyledButton
                    variant={selected ? 'outlined' : 'contained'}
                    fullWidth={false}
                    onClick={() => (selected ? handleDeselect(time) : handleSelect(time))}
                  >
                    {selected ? 'Cancel' : 'Select'}
                  </StyledButton>
                )}

                {!available && (
                  <StyledButton disabled fullWidth={false}>
                    Reserved
                  </StyledButton>
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>

      <StyledSubtitle>
        {`Successfully selected: ${selectedSlots.length > 0 ? selectedSlots.join(', ') : 'Nothing selected'}`}
      </StyledSubtitle>

      <StyledButton onClick={handleBookSlots}>Book slots</StyledButton>

      <StyledButton onClick={handleGoToDataPickerClick}>Change date</StyledButton>
    </StyledBox>
  );
};
