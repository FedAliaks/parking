import { Box, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
  StyledBox,
  StyledButton,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../../components/ui';
import { COLORS, ParkingSlotIdStorage, UserIdStorage } from '../../constants';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getAllSlots } from './utils';
import { TFetchSlots, TimeSlot } from './types';
import { generateTimeSlots } from './utils/generateTimeSlots';

export const AvailableSlotsPage = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date') || '';
  const formatCurrentDay = dayjs(dateParam).format('MMM D');
  console.log(dateParam);

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [fetchSlots, setFetchSlots] = useState<TFetchSlots[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const firstSelectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      const parkingSlotID = localStorage.getItem(ParkingSlotIdStorage) || '';
      const userId = localStorage.getItem(UserIdStorage) || '';

      if (!parkingSlotID || !dateParam || !userId) return;
      console.log('asdf');
      console.log(userId);
      console.log(slots);

      try {
        const slots: TFetchSlots[] = await getAllSlots(parkingSlotID, dateParam);
        console.log('slots');
        console.log(slots);
        setFetchSlots(slots);
      } catch (error) {
        console.error('Ошибка при загрузке слотов:', error);
      }
    };

    fetchSlots();
  }, []);

  useEffect(() => {
    console.log('generateTimeSlots');
    setSlots(generateTimeSlots(fetchSlots));
  }, [fetchSlots]);

  // Скроллим к первому выбранному слоту
  useEffect(() => {
    if (firstSelectedRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const offsetTop = firstSelectedRef.current.offsetTop;
      const slotHeight = firstSelectedRef.current.offsetHeight;
      container.scrollTop = offsetTop - slotHeight * 2;
    }
  }, [slots]);

  const handleSelect = (time: string) => {
    setSelectedSlots(prev => [...prev, time]);
  };

  const handleDeselect = (time: string) => {
    setSelectedSlots(prev => prev.filter(t => t !== time));
  };

  const handleBookSlots = () => {
    console.log('book slots');
  };

  const isSelected = (time: string) => selectedSlots.includes(time);

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
    </StyledBox>
  );
};
