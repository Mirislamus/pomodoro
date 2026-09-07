import { Button, Icon } from '@chakra-ui/react';
import { ActionButtonProps } from './types';
import { ease } from '../../../theme/foundations/transitions';

const ActionButton = ({
  icon,
  onClick,
  variant = 'stroke',
  size = 'md',
  isDisabled = false,
  children,
  ...rest
}: ActionButtonProps) => {
  const iconSize = size === 'sm' ? '24px' : '28px';
  const boxSize = {
    sm: '42px',
    md: { base: '44px', md: '50px' },
    lg: { base: '50px', md: '60px' },
  }[size];
  const variantStyles =
    variant === 'fill'
      ? {
          bgColor: 'button.fill.default',
          _hover: { bgColor: 'button.fill.hover' },
          _active: { bgColor: 'button.fill.active' },
        }
      : {
          border: '2px solid',
          borderColor: 'button.stroke.default',
          _hover: { borderColor: 'button.stroke.hover' },
          _active: { bgColor: 'button.stroke.active' },
        };

  return (
    <Button
      unstyled
      flexShrink="0"
      transition={ease}
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      boxSize={boxSize}
      disabled={isDisabled}
      onClick={onClick}
      _disabled={{ cursor: 'not-allowed', opacity: 0.7, pointerEvents: 'none' }}
      {...variantStyles}
      {...rest}
    >
      {icon && <Icon as={icon} boxSize={iconSize} color="primary" />}
      {children}
    </Button>
  );
};

export default ActionButton;
