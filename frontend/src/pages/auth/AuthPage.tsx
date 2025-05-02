import { Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { COLORS } from '../../constants';
import {
  StyledBox,
  StyledButton,
  StyledFlexBox,
  StyledTab,
  StyledTextField,
  StyledTitle,
  StyledTypography,
} from '../../components/ui';

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
      <StyledTitle>PARKING</StyledTitle>
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

      <StyledFlexBox>
        <StyledTextField label="Email" />
        <StyledTextField label="Password" type="password" />
        <StyledButton onClick={handleClick}>{tab ? 'Sign Up' : 'Log In'}</StyledButton>
      </StyledFlexBox>
      {error && <StyledTypography color="error">Check login and password</StyledTypography>}
    </StyledBox>
  );
};
