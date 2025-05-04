import { StyledBox, StyledTitle, StyledButton } from '@/components/ui';
import { AppRoutes } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

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
