import { TextField, TextFieldProps } from "@mui/material";
import { COLORS } from "../../../constants";


export const StyledTextField: React.FC<TextFieldProps> = ({label, type = 'text', ...props}) => {
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
        borderColor: COLORS.primaryBackground,
      },
    },
    '& label.Mui-focused': {
      color: COLORS.primaryBackground,
    },
  }}
  {...props}
/>
  );
};