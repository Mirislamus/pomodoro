import { FormControl, FormLabel, Switch, Text, chakra } from '@chakra-ui/react';
import { ChangeEvent, FC, useId } from 'react';
import { SwitchInputProps } from './types';

const _SwitchInput: FC<SwitchInputProps> = ({ title, isChecked, onChange, ...props }) => {
  const id = useId();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControl display="flex" alignItems="center" justifyContent="space-between" {...props}>
      <FormLabel m="0" htmlFor={`switch-${id}`}>
        <Text fontSize="16px" fontWeight="500" color="primary">
          {title}
        </Text>
      </FormLabel>
      <Switch onChange={onChangeHandler} id={`switch-${id}`} isChecked={isChecked} />
    </FormControl>
  );
};

const SwitchInput = chakra(_SwitchInput);
export default SwitchInput;
