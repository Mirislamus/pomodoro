import { toaster } from '../../../components/ui/toaster';
import { UseToastCustomOptions } from './types';

const toToastOptions = ({ status, isClosable, onUserClose, ...options }: UseToastCustomOptions) => ({
  ...options,
  type: status,
  closable: isClosable,
  meta: { isClosable, onUserClose },
});

export const usePomodoroToast = () => {
  const customToast = (options: UseToastCustomOptions) => {
    toaster.create(toToastOptions(options));
  };

  return Object.assign(customToast, {
    update: (id: string, options: UseToastCustomOptions) => toaster.update(id, toToastOptions(options)),
  });
};
