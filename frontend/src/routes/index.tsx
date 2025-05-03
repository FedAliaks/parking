import { AuthPage, AvailableSlotsPage, DataPickerPage, ParkingSpotsPage } from '../pages';
import { AppRoutes } from './path';

export const routes = [
  { path: AppRoutes.ROOT, element: <AuthPage /> },
  { path: AppRoutes.PARKING, element: <ParkingSpotsPage /> },
  { path: AppRoutes.SLOTS, element: <AvailableSlotsPage /> },
  { path: AppRoutes.DATES, element: <DataPickerPage /> },
];
