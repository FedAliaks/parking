import { Box, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
  StyledBox,
  StyledButton,
  StyledSubtitle,
  StyledTitle,
  StyledTypography,
} from '../../components/ui';
import { COLORS } from '../../constants';

interface TimeSlot {
  time: string;
  available: boolean;
}

// Генерация слотов от 00:00 до 23:00 (по часу)
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const start = hour.toString().padStart(2, '0') + ':00';
    const end = (hour + 1).toString().padStart(2, '0') + ':00';
    slots.push({
      time: `${start}–${end}`,
      available: Math.random() > 0.3,
    });
  }
  return slots;
};

export const AvailableSlotsPage = () => {
  const [slots, setSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const firstSelectedRef = useRef<HTMLDivElement>(null);

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
      <StyledTitle>Available slots for May 2:</StyledTitle>

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
          {slots.map(({ time, available }, index) => {
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
