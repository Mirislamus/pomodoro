import { FC } from 'react';
import { PercentSliderProps } from './types';
import { Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const PercentSlider: FC<PercentSliderProps> = ({ onChange, title, defaultValue }) => {
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
        <Slider
          onChange={value => {
            onChange(convertToPercent(value));
          }}
          defaultValue={convertToNumber(defaultValue)}
        >
          <SliderTrack>
            <SliderFilledTrack h="6px" bgColor="accent.red" />
          </SliderTrack>
          <SliderThumb boxSize="16px" />
        </Slider>
        <Text>{convertToNumber(defaultValue)}%</Text>
      </Flex>
    </Flex>
  );
};

export default PercentSlider;
