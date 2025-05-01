import { Box, Button, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CenteredBox } from '../general/CenteredBox/CenteredBox';
import { COLORS } from '../../constants';

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [error] = useState(true);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <CenteredBox>
      <Typography variant="h3" align="center" fontWeight="bold" mb={2}>
        PARKING
      </Typography>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: COLORS.primaryBackground,
          },
        }}
      >
        <Tab
          label="LogIn"
          color="black"
          sx={{
            '&.Mui-selected': {
              color: COLORS.primaryBackground,
              fontWeight: 'bold',
            },
          }}
        />
        <Tab
          label="Registration"
          color="black"
          sx={{
            '&.Mui-selected': {
              color: COLORS.primaryBackground,
              fontWeight: 'bold',
            },
          }}
        />
      </Tabs>

      <Box mt={2} display="flex" flexDirection="column" gap={3}>
        <TextField label="Email" variant="outlined" size="small" fullWidth />
        <TextField label="Password" type="password" variant="outlined" size="small" fullWidth />
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: COLORS.primaryBackground,
            '&:hover': {
              backgroundColor: COLORS.hoverPrimaryBackground,
            },
          }}
        >
          {tab ? 'Sign Up' : 'Log In'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" variant="body2" mt={2}>
          {'Check login and password'}
        </Typography>
      )}
    </CenteredBox>
  );
};
