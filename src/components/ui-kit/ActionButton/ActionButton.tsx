import { FC } from 'react';
import { ActionButtonProps } from './types';
import { Flex, Icon, chakra, useStyleConfig } from '@chakra-ui/react';
import { ease } from '../../../theme/foundations/transitions';

const _ActionButton: FC<ActionButtonProps> = ({ icon, onClick, variant, ...rest }) => {
  const styles = useStyleConfig('ActionButtonStyles', { variant });

  return (
    <Flex as="button" transition={ease} onClick={onClick} __css={styles} {...rest}>
      <Icon as={icon} boxSize="24px" color="primary" />
    </Flex>
  );
};

const ActionButton = chakra(_ActionButton);
export default ActionButton;
