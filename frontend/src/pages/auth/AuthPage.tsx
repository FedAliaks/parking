import { Tabs } from '@mui/material';
import { useRef, useState } from 'react';
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
import { sendAuthRequest } from './utils/sendAuthRequest';

export const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClick = async () => {
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const endpoint = tab === 0 ? 'login' : 'register';

    try {
      const data = await sendAuthRequest(endpoint, email, password);
      console.log(`${endpoint} successful:`, data);
      setErrorMsg('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        throw new Error('Network error');
      }
    }
  };

  const handleEmailInput = () => {
    const valid = emailRef.current?.checkValidity() ?? false;
    setIsEmailValid(valid);
    setErrorMsg('');
  };

  const handlePasswordInput = () => {
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
        <StyledTextField
          label="Email"
          type="email"
          inputRef={emailRef}
          onInput={handleEmailInput}
        />
        <StyledTextField
          label="Password"
          type="password"
          inputRef={passwordRef}
          onInput={handlePasswordInput}
        />
        <StyledButton onClick={handleClick} disabled={!isEmailValid}>
          {tab ? 'Sign Up' : 'Log In'}
        </StyledButton>
      </StyledFlexBox>

      <StyledTypography color="error">{errorMsg}</StyledTypography>
    </StyledBox>
  );
};
