import { Box } from '@mui/material';
import { COLORS } from '../../../constants';
import { ReactNode } from 'react';

export interface IStyledBoxProps {
  children: ReactNode;
}

export const StyledBox: React.FC<IStyledBoxProps> = ({ children }) => {
  return (
    <Box
      bgcolor={COLORS.lightColor}
      border={`1px solid ${COLORS.primaryColor}`}
      borderRadius={6}
      maxWidth={400}
      margin="auto"
      mt={8}
      p={2}
      boxShadow={3}
    >
      {children}
    </Box>
  );
};
