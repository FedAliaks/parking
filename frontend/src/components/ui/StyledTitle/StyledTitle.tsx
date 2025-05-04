import { COLORS } from '@/constants';
import { Typography } from '@mui/material';

interface IStyledTitleProps {
  children: string;
}

export const StyledTitle: React.FC<IStyledTitleProps> = ({ children }) => (
  <Typography variant="h6" fontWeight="bold" sx={{ color: COLORS.primaryColor }} mb={2}>
    {children}
  </Typography>
);
