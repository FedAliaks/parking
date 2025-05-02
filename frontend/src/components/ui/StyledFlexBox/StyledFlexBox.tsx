import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface IStyledFlexBoxProps {
  children: ReactNode;
  flexDirection?: BoxProps['flexDirection'];
  gap?: BoxProps['gap'];
  justifyContent?: BoxProps['justifyContent'];
  alignItems?: BoxProps['alignItems'];
  m?: BoxProps['m'];
}

export const StyledFlexBox: React.FC<IStyledFlexBoxProps> = ({
  children,
  flexDirection = 'column',
  gap = 3,
  justifyContent = 'space-between',
  alignItems = 'center',
  m = 2,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      gap={gap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      m={m}
    >
      {children}
    </Box>
  );
};
