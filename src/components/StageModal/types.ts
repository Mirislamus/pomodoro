import { ModalProps } from '@chakra-ui/react';

export interface StageModalProps extends Omit<ModalProps, 'children'> {
  isOpen: boolean;
  onClose: () => void;
}
