import { Dialog, Portal, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { StageModalProps } from './types';
import { IconClose } from '../../theme/foundations/icons';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import StageItem from './StageItem/StageItem';
import { STAGES } from '../../consts/stages';

const StageModal = ({ isOpen, activeStage, onClose, onSelect }: StageModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog.Root
      open={isOpen}
      placement="center"
      lazyMount
      unmountOnExit
      onOpenChange={({ open }) => !open && onClose()}
    >
      <Portal>
        <Dialog.Backdrop bgColor="rgba(0, 0, 0, 0.48)" />
        <Dialog.Positioner alignItems="flex-start">
          <Dialog.Content my="64px" p="24px 24px 30px" borderRadius="20px" bgColor="background.secondary" maxW="328px">
            <Dialog.Header
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="0"
              paddingBlockEnd="16px"
            >
              <Dialog.Title asChild>
                <Text fontWeight="600" textStyle="text.xl" color="primary">
                  {t('stage_select')}
                </Text>
              </Dialog.Title>
              <ActionButton aria-label={t('close')} size="xs" variant="fill" onClick={onClose}>
                <IconClose boxSize="20px" />
              </ActionButton>
            </Dialog.Header>
            <Dialog.Body p="0">
              <VStack gap="gap.10">
                {STAGES.map(stage => (
                  <StageItem
                    key={stage}
                    stage={stage}
                    isActive={activeStage === stage}
                    onClick={() => {
                      onSelect(stage);
                      onClose();
                    }}
                  />
                ))}
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default StageModal;
