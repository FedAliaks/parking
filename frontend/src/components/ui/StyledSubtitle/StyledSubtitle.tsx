import { Typography } from '@mui/material';
import { COLORS } from '../../../constants';

interface IStyledSubtitleProps {
  children: string;
}

export const StyledSubtitle = ({ children }: IStyledSubtitleProps) => (
  <Typography variant="subtitle1" sx={{ color: COLORS.primaryColor }}>
    {children}
  </Typography>
);
