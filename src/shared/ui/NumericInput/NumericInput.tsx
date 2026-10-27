import { Field, HStack, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NumericInputProps } from './types';
import ActionButton from '../ActionButton/ActionButton';
import { IconMinus, IconPlus } from '../../../theme/foundations/icons';

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
  const { t } = useTranslation();
  // Free-form text while typing, so intermediate values like "1" on the way to "15" are allowed
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const clamp = (number: number) => Math.min(Math.max(number, min), max);

  const commit = (number: number) => {
    const clamped = clamp(number);
    setDraft(String(clamped));
    if (clamped !== value) onChange(clamped);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value.replace(/\D/g, '');
    setDraft(text);

    const number = Number(text);
    if (text !== '' && number >= min && number <= max && number !== value) {
      onChange(number);
    }
  };

  const handleBlur = () => commit(draft === '' ? value : Number(draft));

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleBlur();
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      commit(value + (event.key === 'ArrowUp' ? step : -step));
    }
  };

  return (
    <Field.Root display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" {...props}>
      <Field.Label display="block" m="0">
        <Text fontSize="16px" fontWeight="500" color="primary">
          {title}
        </Text>
        <Text textStyle="text.md" fontWeight="400" color="grey.3">
          {t('up_to')} {max} {hasMinutes && t('minutes')}
        </Text>
      </Field.Label>
      <HStack gap="gap.8">
        <ActionButton
          aria-label={t('decrease')}
          isDisabled={value <= min}
          size="sm"
          variant="fill"
          icon={IconMinus}
          onClick={() => commit(value - step)}
        />
        <Input
          variant="numeric"
          inputMode="numeric"
          autoComplete="off"
          value={draft}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <ActionButton
          aria-label={t('increase')}
          isDisabled={value >= max}
          size="sm"
          variant="fill"
          icon={IconPlus}
          onClick={() => commit(value + step)}
        />
      </HStack>
    </Field.Root>
  );
};

export default NumericInput;
