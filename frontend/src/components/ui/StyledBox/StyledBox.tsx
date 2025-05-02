import { Box, BoxProps } from '@mui/material';
import { COLORS } from '../../../constants';

export const StyledBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.lightColor,
        border: `1px solid ${COLORS.primaryColor}`,
        borderRadius: 8,
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        p: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
