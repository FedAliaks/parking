import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { COLORS } from '../../constants';
import { StyledBox, StyledSubtitle, StyledTitle } from '../../components/ui';

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

      <Box p={2}>
        <StyledSubtitle>List of parking slots</StyledSubtitle>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Parking place</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <Box sx={{ maxHeight: 240, overflowY: 'auto', width: '100%' }}>
            <Table size="small">
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
          </Box>
        </TableContainer>

        <Typography mt={2} variant="body2">
          All places: {parkingSpots.length + 1}
        </Typography>
      </Box>
    </StyledBox>
  );
};
