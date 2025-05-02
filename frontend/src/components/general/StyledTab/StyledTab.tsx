import { Tab, TabProps } from '@mui/material';
import { COLORS } from '../../../constants';

export const StyledTab: React.FC<TabProps> = ({ label, ...props }) => {
  return (
    <Tab
      label={label}
      color="black"
      sx={{
        '&.Mui-selected': {
          color: COLORS.primaryColor,
          fontWeight: 'bold',
        },
      }}
      {...props}
    />
  );
};
