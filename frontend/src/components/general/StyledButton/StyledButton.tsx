import { Button, ButtonProps } from '@mui/material';
import { COLORS } from '../../../constants';

export const StyledButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        backgroundColor: COLORS.primaryColor,
        '&:hover': {
          backgroundColor: COLORS.hoverPrimaryColor,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
