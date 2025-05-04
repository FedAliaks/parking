import { COLORS } from '@/constants';
import { Typography } from '@mui/material';

interface IStyledTypography {
  children: string;
  color?: string;
}

export const StyledTypography: React.FC<IStyledTypography> = ({
  children,
  color = COLORS.primaryColor,
}) => (
  <Typography variant="body2" color={color} m={2}>
    {children}
  </Typography>
);
