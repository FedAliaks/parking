import { Button } from '@mui/material';
import { COLORS } from '../../../constants';
import { ButtonProps } from '@mui/material';

export interface IStyledButtonProps extends ButtonProps {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
}

export const StyledButton: React.FC<IStyledButtonProps> = ({
  children,
  size = 'small',
  fullWidth = true,
  variant = 'contained',
  sx,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      sx={{
        textTransform: 'none',
        minWidth: '100px',

        backgroundColor: variant === 'contained' && !disabled ? COLORS.primaryColor : undefined,

        color: variant === 'outlined' && !disabled ? COLORS.primaryColor : undefined,

        borderColor: variant === 'outlined' && !disabled ? COLORS.primaryColor : undefined,

        '&:hover': {
          backgroundColor:
            variant === 'contained' && !disabled ? COLORS.hoverPrimaryColor : undefined,
          borderColor: variant === 'outlined' && !disabled ? COLORS.hoverPrimaryColor : undefined,
        },

        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          color: '#9e9e9e',
          borderColor: COLORS.primaryColor,
        },

        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
