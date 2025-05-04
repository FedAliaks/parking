import { COLORS } from '@/constants';
import { Typography } from '@mui/material';

interface IStyledSubtitleProps {
  children: string;
}

export const StyledSubtitle: React.FC<IStyledSubtitleProps> = ({ children }) => (
  <Typography variant="subtitle1" color={COLORS.primaryColor} m={2}>
    {children}
  </Typography>
);
