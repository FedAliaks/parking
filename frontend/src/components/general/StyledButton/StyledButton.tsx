import { Button, ButtonProps } from "@mui/material";
import { COLORS } from "../../../constants";

export const StyledButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: COLORS.primaryBackground,
            '&:hover': {
              backgroundColor: COLORS.hoverPrimaryBackground,
            },
          }}
          {...props}
        >
          {children}
        </Button>
  );
};







