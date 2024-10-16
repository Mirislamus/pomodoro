import { FC } from 'react';
import { StageModalProps } from './types';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import { IconClose } from '../../theme/foundations/icons';
import ActionButton from '../../shared/ui/ActionButton/ActionButton';
import { t } from 'i18next';
import StageItem from './StageItem/StageItem';
import { Stage } from '../../typings/enums';
import useSessionStore from '../../stores/useSessionStore';

const StageModal: FC<StageModalProps> = ({ isOpen, onClose, ...props }) => {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);

  const stages = [
    {
      stage: Stage.Pomodoro,
      isActive: session.stage === Stage.Pomodoro,
      onClick: () => setSession('stage', Stage.Pomodoro),
    },
    {
      stage: Stage.ShortBreak,
      isActive: session.stage === Stage.ShortBreak,
      onClick: () => setSession('stage', Stage.ShortBreak),
    },
    {
      stage: Stage.LongBreak,
      isActive: session.stage === Stage.LongBreak,
      onClick: () => setSession('stage', Stage.LongBreak),
    },
  ];

  return (
    <Modal variant="default" isOpen={isOpen} onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent p="24px 24px 30px" borderRadius="20px" bgColor="background.secondary" maxW="328px">
        <ModalHeader display="flex" alignItems="center" justifyContent="space-between" p="0" paddingBlockEnd="16px">
          <Text fontWeight="600" textStyle="text.xl">
            {t('stage_select')}
          </Text>
          <ActionButton boxSize="40px" variant="fill" onClick={onClose}>
            <IconClose mt="-2px" boxSize="20px" />
          </ActionButton>
        </ModalHeader>
        <ModalBody p="0">
          <VStack spacing="gap.10">
            {stages.map(stage => (
              <StageItem key={stage.stage} {...stage} />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StageModal;
