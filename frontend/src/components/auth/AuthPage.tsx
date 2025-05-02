import { Box, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants';
import { StyledBox, StyledButton, StyledTab, StyledTextField } from '../general';

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [error] = useState(true);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClick = () => {
    console.log('click button');
  };

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <StyledBox>
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
            backgroundColor: COLORS.primaryColor,
          },
        }}
      >
        <StyledTab label="Login" />
        <StyledTab label="Registration" />
      </Tabs>

      <Box mt={2} display="flex" flexDirection="column" gap={3}>
        <StyledTextField label="Email" />
        <StyledTextField label="Password" type="password" />
        <StyledButton onClick={handleClick}>{tab ? 'Sign Up' : 'Log In'}</StyledButton>
      </Box>
      {error && (
        <Typography color="error" variant="body2" mt={2}>
          {'Check login and password'}
        </Typography>
      )}
    </StyledBox>
  );
};
