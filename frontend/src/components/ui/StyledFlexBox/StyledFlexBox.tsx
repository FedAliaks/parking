import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface IStyledFlexBoxProps extends BoxProps {
  children: ReactNode;
  flexDirection?: BoxProps['flexDirection'];
  gap?: BoxProps['gap'];
  justifyContent?: BoxProps['justifyContent'];
  alignItems?: BoxProps['alignItems'];
  m?: BoxProps['m'];
}

export const StyledFlexBox = ({
  children,
  flexDirection = 'column',
  gap = 3,
  justifyContent,
  alignItems,
  m = 2,
  ...rest
}: IStyledFlexBoxProps) => {
  return (
    <Box
      display="flex"
      flexDirection={flexDirection}
      gap={gap}
      justifyContent={justifyContent}
      alignItems={alignItems}
      m={m}
      {...rest}
    >
      {children}
    </Box>
  );
};
