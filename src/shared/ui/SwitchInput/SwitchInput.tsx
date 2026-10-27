import { Switch, Text } from '@chakra-ui/react';
import { SwitchInputProps } from './types';

const SwitchInput = ({ title, description, isChecked, isDisabled, onChange, ...props }: SwitchInputProps) => {
  return (
    <Switch.Root
      w="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="gap.16"
      cursor="pointer"
      checked={isChecked}
      disabled={isDisabled}
      onCheckedChange={({ checked }) => onChange(checked)}
      _disabled={{ cursor: 'not-allowed' }}
      {...props}
    >
      <Switch.HiddenInput />
      <Switch.Label m="0">
        <Text as="span" display="block" fontSize="16px" fontWeight="500" color="primary">
          {title}
        </Text>
        {description && (
          <Text as="span" display="block" textStyle="text.md" fontWeight="400" color="grey.3">
            {description}
          </Text>
        )}
      </Switch.Label>
      <Switch.Control flexShrink="0">
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  );
};

export default SwitchInput;
