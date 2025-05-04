import { ApiRoutes } from '@/api';
import { StyledBox, StyledTitle, StyledSubtitle, StyledTypography } from '@/components/ui';
import { API_BASE_URL } from '@/config';
import { ParkingSlotIdStorage, COLORS } from '@/constants';
import { AppRoutes } from '@/routes/path';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TSpot = {
  id: string;
  name: string;
  location: string;
};

export const ParkingSpotsPage = () => {
  const [spots, setSpots] = useState<TSpot[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${ApiRoutes.PARKING_SLOTS}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to load parking spots');
        }

        const data = await response.json();
        setSpots(data);
      } catch (err: any) {
        console.error('Fetch error:', err.message);
        setError(err.message || 'Unknown error');
      }
    };

    fetchSpots();
  }, []);

  const handleChooseParkingPost = (id: string) => {
    localStorage.setItem(ParkingSlotIdStorage, id);
    navigate(AppRoutes.DATES);
  };

  return (
    <StyledBox>
      <StyledTitle>PARKING</StyledTitle>
      <StyledSubtitle>List of parking slots</StyledSubtitle>
      <TableContainer component={Paper} sx={{ maxHeight: 240, overflowY: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Parking place</TableCell>
              <TableCell align="center">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spots.map(spot => (
              <TableRow
                key={spot.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.6s ease',
                  '&:hover': {
                    backgroundColor: COLORS.hoverPrimaryColor,
                  },
                }}
                onClick={() => handleChooseParkingPost(spot.id)}
              >
                <TableCell align="center">{spot.name}</TableCell>
                <TableCell align="center">{spot.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledTypography>{`All places: ${spots.length}`}</StyledTypography>
      <StyledTypography>{error}</StyledTypography>
    </StyledBox>
  );
};
