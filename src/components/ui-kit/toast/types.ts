import { UseToastOptions } from '@chakra-ui/react';

export interface UseToastCustomOptions extends Omit<UseToastOptions, 'description'> {
  status?: 'info' | 'success' | 'warning' | 'error';
  onUserClose?: () => void;
}
