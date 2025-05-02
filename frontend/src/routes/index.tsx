import { AuthPage, AvailableSlotsPage, DataPickerPage, ParkingSpotsPage } from '../pages';

export const routes = [
  { path: '/', element: <AuthPage /> },
  { path: '/parking', element: <ParkingSpotsPage /> },
  { path: '/slots', element: <AvailableSlotsPage /> },
  { path: '/dates', element: <DataPickerPage /> },
];
