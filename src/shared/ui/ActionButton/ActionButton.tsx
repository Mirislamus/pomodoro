import * as React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { ActionButtonProps } from './types';
import { ease } from '../../../theme/foundations/transitions';

const sizes = {
  xs: { boxSize: '40px', iconSize: '24px' },
  sm: { boxSize: '42px', iconSize: '24px' },
  md: { boxSize: { base: '44px', md: '50px' }, iconSize: '28px' },
  lg: { boxSize: { base: '50px', md: '60px' }, iconSize: '28px' },
};

const variants = {
  fill: {
    bgColor: 'button.fill.default',
    _hover: { bgColor: 'button.fill.hover' },
    _active: { bgColor: 'button.fill.active', transform: 'scale(0.94)' },
  },
  stroke: {
    border: '2px solid',
    borderColor: 'button.stroke.default',
    _hover: { borderColor: 'button.stroke.hover' },
    _active: { bgColor: 'button.stroke.active', transform: 'scale(0.94)' },
  },
};

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(function ActionButton(
  { icon, onClick, variant = 'stroke', size = 'md', isDisabled = false, children, ...rest },
  ref
) {
  const { boxSize, iconSize } = sizes[size];

  return (
    <Button
      ref={ref}
      type="button"
      unstyled
      display="inline-flex"
      flexShrink="0"
      transition={ease}
      alignItems="center"
      justifyContent="center"
      borderRadius="50%"
      color="primary"
      boxSize={boxSize}
      disabled={isDisabled}
      onClick={onClick}
      _disabled={{ cursor: 'not-allowed', opacity: 0.5, pointerEvents: 'none' }}
      {...variants[variant]}
      {...rest}
    >
      {icon && <Icon as={icon} boxSize={iconSize} />}
      {children}
    </Button>
  );
});

export default ActionButton;
