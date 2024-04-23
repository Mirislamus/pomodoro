import { Box, Flex, HStack, Input, Text, chakra } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';
import { NumericInputProps } from './types';
import ActionButton from '../ActionButton/ActionButton';
import { IconMinus, IconPlus } from '../../../theme/foundations/icons';
import { t } from 'i18next';

const _NumericInput: FC<NumericInputProps> = ({
  value,
  step = 1,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  title,
  hasMinutes,
  onChange,
  ...props
}) => {
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

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Box>
        <Text fontSize="16px" fontWeight="500" color="primary">
          {title}
        </Text>
        <Text textStyle="text.md" fontWeight="400" color="grey.3">
          {t('up_to')} {max} {hasMinutes && t('minutes')}
        </Text>
      </Box>
      <HStack spacing="gap.8" {...props}>
        <ActionButton
          isDisabled={value <= min}
          size="sm"
          variant="fill"
          icon={IconMinus}
          onClick={() => onChangeHandler(value - step)}
        />
        <Input
          variant="numeric"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={handleInputChange}
          onBlur={() => onChangeHandler(value)}
        />
        <ActionButton
          isDisabled={value >= max}
          size="sm"
          variant="fill"
          icon={IconPlus}
          onClick={() => onChangeHandler(value + step)}
        />
      </HStack>
    </Flex>
  );
};

const NumericInput = chakra(_NumericInput);
export default NumericInput;
