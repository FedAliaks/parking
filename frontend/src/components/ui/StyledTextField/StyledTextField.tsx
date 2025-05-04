import { COLORS } from '@/constants';
import { TextField } from '@mui/material';

interface IStyledTextField {
  label: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StyledTextField: React.FC<IStyledTextField> = ({
  label,
  value,
  type = 'text',
  onChange,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
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
