import { COLORS } from '@/constants';
import { Tab } from '@mui/material';

interface IStyledTabProps {
  label: string;
}

export const StyledTab: React.FC<IStyledTabProps> = ({ label, ...props }) => {
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
