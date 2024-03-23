import { useToast } from '@chakra-ui/react';
import { UseToastCustomOptions } from './types';
import { RenderToast } from './RenderToast';
import { toastStyles } from './toast.styles';

export const usePomodoroToast = () => {
  const toast = useToast();

  const customToast = (options: UseToastCustomOptions) => {
    const { ...rest } = options;

    toast({
      ...rest,
      containerStyle: {
        ...toastStyles,
      },
      position: 'bottom',
      render: () => RenderToast(toast, options),
    });
  };

  const updateToast = (id: string, options: UseToastCustomOptions) => {
    const { ...rest } = options;

    toast.update(id, {
      ...rest,
      containerStyle: {
        ...toastStyles,
      },
      render: () => RenderToast(toast, options),
    });
  };

  return Object.assign(customToast, toast, { update: updateToast });
};
