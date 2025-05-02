import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { COLORS } from '../../constants';
import { StyledBox, StyledSubtitle, StyledTitle, StyledTypography } from '../../components/ui';

const parkingSpots = [
  { name: 'A–01', address: 'Street 1' },
  { name: 'A–02', address: 'Street 2' },
  { name: 'B–01', address: 'Street 3' },
  { name: 'C–05', address: 'Street 4' },
  { name: 'A–02', address: 'Street 2' },
  { name: 'B–01', address: 'Street 3' },
  { name: 'C–05', address: 'Street 4' },
  { name: 'A–02', address: 'Street 2' },
  { name: 'B–01', address: 'Street 3' },
  { name: 'C–05', address: 'Street 4' },
  { name: 'B–01', address: 'Street 3' },
  { name: 'C–05', address: 'Street 4' },
  { name: 'A–02', address: 'Street 2' },
  { name: 'B–01', address: 'Street 3' },
  { name: 'C–05', address: 'Street 4' },
];

export const ParkingSpotsPage = () => {
  const handleChooseParkingPost = (id: string) => {
    console.log(id);
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
            {parkingSpots.map((spot, index) => (
              <TableRow
                key={index}
                sx={{
                  cursor: 'pointer',
                  transition: 'background-color 0.6s ease',
                  '&:hover': {
                    backgroundColor: COLORS.hoverPrimaryColor,
                  },
                }}
                onClick={() => handleChooseParkingPost(spot.name)}
              >
                <TableCell align="center">{spot.name}</TableCell>
                <TableCell align="center">{spot.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StyledTypography>{`All places: ${parkingSpots.length + 1}`}</StyledTypography>
    </StyledBox>
  );
};
