import { Typography } from '@mui/material';
import { COLORS } from '../../../constants';

interface IStyledTitleProps {
  children: string;
}

export const StyledTitle = ({ children }: IStyledTitleProps) => (
  <Typography variant="h6" fontWeight="bold" sx={{ color: COLORS.primaryColor }} mb={2}>
    {children}
  </Typography>
);
