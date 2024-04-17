import { FC } from 'react';
import { ActionButtonProps } from './types';
import { Flex, Icon, chakra, useStyleConfig } from '@chakra-ui/react';
import { ease } from '../../../theme/foundations/transitions';

const _ActionButton: FC<ActionButtonProps> = ({ icon, onClick, variant, isDisabled = false, ...rest }) => {
  const styles = useStyleConfig('ActionButtonStyles', { variant, isDisabled });

  return (
    <Flex as="button" transition={ease} onClick={onClick} disabled={isDisabled} __css={styles} {...rest}>
      <Icon as={icon} boxSize="24px" color="primary" />
    </Flex>
  );
};

const ActionButton = chakra(_ActionButton);
export default ActionButton;
