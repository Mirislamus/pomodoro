import { Field, HStack, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useId } from 'react';
import { NumericInputProps } from './types';
import ActionButton from '../ActionButton/ActionButton';
import { IconMinus, IconPlus } from '../../../theme/foundations/icons';
import { t } from 'i18next';

const NumericInput = ({
  value,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  title,
  hasMinutes,
  onChange,
  ...props
}: NumericInputProps) => {
  const id = useId();

  const clampValue = (value: number) => Math.min(Math.max(value, min), max);

  const onChangeHandler = (value: number) => {
    const clampedValue = clampValue(value);
    onChange(clampedValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = Number(inputValue);
    if (!isNaN(numericValue)) {
      onChangeHandler(numericValue);
    }
  };

  const handleIncrease = () => {
    onChangeHandler(value + step);
  };

  const handleDecrease = () => {
    onChangeHandler(value - step);
  };

  return (
    <Field.Root display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" {...props}>
      <Field.Label display="block" m="0" htmlFor={`input-${id}`}>
        <Text fontSize="16px" fontWeight="500" color="primary">
          {title}
        </Text>
        <Text textStyle="text.md" fontWeight="400" color="grey.3">
          {t('up_to')} {max} {hasMinutes && t('minutes')}
        </Text>
      </Field.Label>
      <HStack gap="gap.8">
        <ActionButton isDisabled={value <= min} size="sm" variant="fill" icon={IconMinus} onClick={handleDecrease} />
        <Input
          id={`input-${id}`}
          variant="numeric"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={handleInputChange}
          onBlur={() => onChangeHandler(value)}
        />
        <ActionButton isDisabled={value >= max} size="sm" variant="fill" icon={IconPlus} onClick={handleIncrease} />
      </HStack>
    </Field.Root>
  );
};

export default NumericInput;
