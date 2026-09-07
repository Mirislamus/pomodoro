import { Dialog, Portal, Text, VStack } from '@chakra-ui/react';
import { t } from 'i18next';
import { StageModalProps } from './types';
import { IconClose } from '../../theme/foundations/icons';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import StageItem from './StageItem/StageItem';
import { Stage } from '../../typings/enums';
import useSessionStore from '../../stores/useSessionStore';

const StageModal = ({ isOpen, onClose }: StageModalProps) => {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const stages = [Stage.Pomodoro, Stage.ShortBreak, Stage.LongBreak];

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
          <Dialog.Content
            my="64px"
            p="24px 24px 30px"
            borderRadius="20px"
            bgColor="background.secondary"
            maxW="328px"
          >
            <Dialog.Header
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p="0"
              paddingBlockEnd="16px"
            >
              <Dialog.Title asChild>
                <Text fontWeight="600" textStyle="text.xl">
                  {t('stage_select')}
                </Text>
              </Dialog.Title>
              <ActionButton boxSize="40px" variant="fill" onClick={onClose}>
                <IconClose mt="-2px" boxSize="20px" />
              </ActionButton>
            </Dialog.Header>
            <Dialog.Body p="0">
              <VStack gap="gap.10">
                {stages.map(stage => (
                  <StageItem
                    key={stage}
                    stage={stage}
                    isActive={session.stage === stage}
                    onClick={() => setSession('stage', stage)}
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
