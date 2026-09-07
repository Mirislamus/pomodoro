import { Switch, Text } from '@chakra-ui/react';
import { SwitchInputProps } from './types';

const SwitchInput = ({ title, isChecked, isDisabled, onChange, ...props }: SwitchInputProps) => {
  return (
    <Switch.Root
      w="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      checked={isChecked}
      disabled={isDisabled}
      onCheckedChange={({ checked }) => onChange(checked)}
      _disabled={{ cursor: 'not-allowed' }}
      {...props}
    >
      <Switch.HiddenInput />
      <Switch.Label m="0">
        <Text fontSize="16px" fontWeight="500" color="primary">
          {title}
        </Text>
      </Switch.Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  );
};

export default SwitchInput;
