import { useEffect, useState } from 'react';
import { StyledBox, StyledButton, StyledSubtitle, StyledTitle } from '../../components/ui';
import { COLORS, UserIdStorage } from '../../constants';
import { getAllReservationForUserById } from './utils';
import { TReservations } from './types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/path';

export const MyReservationPage = () => {
  const [reservations, setReservations] = useState<TReservations[]>([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem(UserIdStorage) || '';

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsArr = await getAllReservationForUserById(userId);
        setReservations(reservationsArr);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservationClick = (id: string) => {
    console.log('delete reservation');
    console.log(id)
  };

  const handleGoToSlots = () => {
    navigate(AppRoutes.DATES);
  };

  return (
    <StyledBox>
      <StyledTitle>My reservations for slot 1</StyledTitle>

      <TableContainer component={Paper} sx={{ maxHeight: 240, overflowY: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <TableRow
                  key={reservation.id}
                  sx={{
                    transition: 'background-color 0.6s ease',
                    '&:hover': {
                      backgroundColor: COLORS.lightColor,
                    },
                  }}
                >
                  <TableCell align="center">{reservation.reserved_date}</TableCell>
                  <TableCell align="center">{reservation.reserved_time}</TableCell>
                  <TableCell>
                    <StyledButton onClick={() => handleDeleteReservationClick(reservation.id)}>Cancel</StyledButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <StyledSubtitle>You don't have any reservation</StyledSubtitle>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButton onClick={handleGoToSlots}>Go to choose date</StyledButton>
    </StyledBox>
  );
};
