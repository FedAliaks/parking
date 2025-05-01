import { Box, BoxProps } from '@mui/material';

export const CenteredBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        p: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
