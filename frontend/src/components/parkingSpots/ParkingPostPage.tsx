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
import { CenteredBox } from '../general/CenteredBox/CenteredBox';
import { COLORS } from '../../constants';

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

export const ParkingPostPage = () => {
  const handleChooseParkingPost = (id: string) => {
    console.log(id);
  };

  return (
    <CenteredBox>
      <Box sx={{ bgcolor: COLORS.primaryBackground, p: 2, borderRadius: '10px' }}>
        <Typography variant="h6" align="center" color="white" fontWeight="bold">
          PARKING
        </Typography>
      </Box>

      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          List of parking slots
        </Typography>

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
                        backgroundColor: COLORS.hoverPrimaryBackground,
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
    </CenteredBox>
  );
};
