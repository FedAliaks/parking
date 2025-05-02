import { TextField } from '@mui/material';
import { COLORS } from '../../../constants';

interface IStyledTextField {
  label: string;
  type?: string;
}

export const StyledTextField: React.FC<IStyledTextField> = ({ label, type = 'text' }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: COLORS.primaryColor,
          },
        },
        '& label.Mui-focused': {
          color: COLORS.primaryColor,
        },
      }}
    />
  );
};
