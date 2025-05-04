import { Button } from '@mui/material';
import { COLORS } from '../../../constants';

export interface IStyledButtonProps {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  children: string;
  onClick?: () => void;
}

export const StyledButton: React.FC<IStyledButtonProps> = ({
  children,
  size = 'small',
  fullWidth = true,
  variant = 'contained',
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      disabled={disabled}
      onClick={onClick}
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
          backgroundColor: COLORS.disabledColor,
        },
      }}
    >
      {children}
    </Button>
  );
};
