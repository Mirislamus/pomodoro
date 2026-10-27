import { Flex, Text, Slider } from '@chakra-ui/react';
import { PercentSliderProps } from './types';

const toPercent = (fraction: number) => Math.round(fraction * 100);
const toFraction = (percent: number) => Number((percent / 100).toFixed(2));

const PercentSlider = ({ id, title, value, onChange }: PercentSliderProps) => {
  const percent = toPercent(value);

  return (
    <Slider.Root
      display="flex"
      flexDir="column"
      gap={{ base: 'gap.4', md: 'gap.10' }}
      mb="gap.10"
      value={[percent]}
      getAriaValueText={({ value }) => `${value}%`}
      onValueChange={({ value }) => onChange(toFraction(value[0]))}
    >
      <Slider.Label id={id} fontSize="16px" fontWeight="500" color="primary">
        {title}
      </Slider.Label>
      <Flex gap="20px" alignItems="center">
        <Slider.Control flex="1" h="24px">
          <Slider.Track h="4px" overflow="visible" borderRadius="2px" bgColor="slider.track" boxShadow="none">
            <Slider.Range h="6px" top="50%" transform="translateY(-50%)" borderRadius="2px" bgColor="accent.red" />
          </Slider.Track>
          <Slider.Thumb
            index={0}
            boxSize="16px"
            bgColor="white"
            border="1px solid transparent"
            boxShadow="0 1px 3px rgba(0, 0, 0, .1), 0 1px 2px rgba(0, 0, 0, .06)"
          >
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
        <Text minW="4ch" textAlign="end" fontVariantNumeric="tabular-nums">
          {percent}%
        </Text>
      </Flex>
    </Slider.Root>
  );
};

export default PercentSlider;
