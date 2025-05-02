import { Typography } from "@mui/material";
import { COLORS } from "../../../constants";



interface ITitleTextProps {
  textContent: string;
}

export const StyledTitle = ({ textContent }: ITitleTextProps) => (
  <Typography variant="h6" fontWeight="bold" sx={{ color: COLORS.primaryColor }} mb={2}>
    {textContent}
  </Typography>
);