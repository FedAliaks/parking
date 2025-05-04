import { useNavigate } from 'react-router-dom';
import { StyledBox, StyledButton, StyledTitle } from '../../components/ui';
import { AppRoutes } from '../../routes/path';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoToTheMainPage = () => {
    navigate(AppRoutes.ROOT);
  };
  return (
    <StyledBox>
      <StyledTitle>Page not found</StyledTitle>
      <StyledButton onClick={handleGoToTheMainPage}> Go to the main page</StyledButton>
    </StyledBox>
  );
};
