import { Tabs } from '@mui/material';
import { useState } from 'react';
import { COLORS, REGEXP_EMAIL } from '../../constants';
import {
  StyledBox,
  StyledButton,
  StyledFlexBox,
  StyledTab,
  StyledTextField,
  StyledTitle,
  StyledTypography,
} from '../../components/ui';
import { sendAuthRequest } from './utils/sendAuthRequest';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/path';

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClick = async () => {
    const endpoint = tab === 0 ? 'login' : 'register';

    try {
      const data = await sendAuthRequest(endpoint, email, password);
      console.log(`${endpoint} successful:`, data);
      setErrorMsg('');
      navigate(AppRoutes.PARKING);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        throw new Error('Network error');
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    const isValidEmail = REGEXP_EMAIL.test(value);
    setIsEmailValid(isValidEmail);
    setErrorMsg('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsPasswordValid(value.length > 6);
    setPassword(event.target.value);
    setErrorMsg('');
  };

  return (
    <StyledBox>
      <StyledTitle>PARKING</StyledTitle>
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: COLORS.primaryColor,
          },
        }}
      >
        <StyledTab label="Login" />
        <StyledTab label="Registration" />
      </Tabs>

      <StyledFlexBox>
        <StyledTextField label="Email" type="email" value={email} onChange={handleEmailChange} />
        <StyledTextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <StyledButton onClick={handleClick} disabled={!isEmailValid || !isPasswordValid}>
          {tab ? 'Sign Up' : 'Log In'}
        </StyledButton>
      </StyledFlexBox>

      <StyledTypography color="error">{errorMsg}</StyledTypography>
    </StyledBox>
  );
};
