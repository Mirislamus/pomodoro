import type { ToastOptions } from '@chakra-ui/react';

export interface UseToastCustomOptions extends Omit<ToastOptions, 'type' | 'meta' | 'closable'> {
  status?: 'info' | 'success' | 'warning' | 'error';
  isClosable?: boolean;
  onUserClose?: () => void;
}
