import { Portal, Toast, Toaster as ChakraToaster, createToaster } from '@chakra-ui/react';
import { RenderToast } from '../../shared/ui/toast/RenderToast';

interface ToastMeta {
  isClosable?: boolean;
  onUserClose?: () => void;
}

export const toaster = createToaster({
  placement: 'top-start',
  pauseOnPageIdle: true,
});

export const Toaster = () => (
  <Portal>
    <ChakraToaster toaster={toaster}>
      {toast => {
        const meta = toast.meta as ToastMeta | undefined;
        return (
          <Toast.Root width="270px" bg="transparent" boxShadow="none">
            <RenderToast
              id={toast.id}
              title={toast.title}
              status={toast.type as 'info' | 'success' | 'warning' | 'error'}
              isClosable={meta?.isClosable}
              onUserClose={meta?.onUserClose}
              onClose={() => toaster.dismiss(toast.id)}
            />
          </Toast.Root>
        );
      }}
    </ChakraToaster>
  </Portal>
);
