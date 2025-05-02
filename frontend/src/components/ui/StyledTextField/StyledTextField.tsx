import { TextField } from '@mui/material';
import { COLORS } from '../../../constants';
import { Ref } from 'react';

interface IStyledTextField {
  label: string;
  type?: string;
  inputRef: Ref<HTMLInputElement>;
  onInput?: () => void;
}

export const StyledTextField: React.FC<IStyledTextField> = ({
  label,
  type = 'text',
  inputRef,
  onInput,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      inputRef={inputRef}
      onInput={onInput}
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
