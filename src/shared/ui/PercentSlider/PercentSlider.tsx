import { PercentSliderProps } from './types';
import { Flex, Text, Slider } from '@chakra-ui/react';

const PercentSlider = ({ onChange, title, defaultValue }: PercentSliderProps) => {
  const convertToNumber = (value: number) => {
    return Number((value * 100).toFixed(0));
  };

  const convertToPercent = (value: number) => {
    return Number((value / 100).toFixed(2));
  };

  return (
    <Flex flexDir="column" gap={{ base: 'gap.5', md: 'gap.10' }} mb="gap.10">
      <Text fontSize="16px" fontWeight="500" color="primary">
        {title}
      </Text>
      <Flex gap="20px" flexGrow="1">
        <Slider.Root
          flex="1"
          value={[convertToNumber(defaultValue)]}
          onValueChange={({ value }) => onChange(convertToPercent(value[0]))}
        >
          <Slider.Control h="24px">
            <Slider.Track h="4px" overflow="visible" borderRadius="2px" bgColor="slider.track" boxShadow="none">
              <Slider.Range
                h="6px"
                top="50%"
                transform="translateY(-50%)"
                borderRadius="2px"
                bgColor="accent.red"
              />
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
        </Slider.Root>
        <Text>{convertToNumber(defaultValue)}%</Text>
      </Flex>
    </Flex>
  );
};

export default PercentSlider;
