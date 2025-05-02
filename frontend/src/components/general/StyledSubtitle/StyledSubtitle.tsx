import { Typography } from '@mui/material';
import { COLORS } from '../../../constants';


interface SubtitleTextProps {
  textContent: string;
}

export const StyledSubtitle = ({ textContent }: SubtitleTextProps) => (
  <Typography variant="subtitle1" sx={{ color: COLORS.primaryColor }}>
    {textContent}
  </Typography>
);