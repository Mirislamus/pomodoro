import { FC, useLayoutEffect, useRef, useState } from 'react';
import { StageSwitcherProps } from './types';
import { Button, chakra, Flex, Box } from '@chakra-ui/react';
import { easeIn } from '../../theme/foundations/transitions';
import getTextColor from '../../utils/getTextColor';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';

const _StageSwitcher: FC<StageSwitcherProps> = ({ stageColor, stages, ...rest }) => {
  const { session } = useSettings();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [boxStyle, setBoxStyle] = useState({ width: 0, transform: '' });

  useLayoutEffect(() => {
    const activeButtonIndex = stages.findIndex(stage => stage.isActive);
    const activeButtonRef = buttonRefs.current[activeButtonIndex];

    if (activeButtonRef) {
      const { offsetLeft, clientWidth } = activeButtonRef;
      setBoxStyle({
        width: clientWidth,
        transform: `translateX(${offsetLeft - 2}px)`,
      });
    }
  }, [stages]);

  return (
    <Flex
      pos="relative"
      zIndex="1"
      p="3px"
      w={{ md: '500px', lg: 'fit-content' }}
      gap="2px"
      borderRadius="100px"
      bgColor="background.stageSwitcher"
      {...rest}
    >
      {stages.map((stage, index) => (
        <Button
          key={stage.text}
          w={{ md: 'calc(100% / 3)', lg: 'fit-content' }}
          size="xs"
          variant="ghost"
          color={stage.isActive ? getTextColor(session.stage) : 'primary'}
          onClick={stage.onClick}
          ref={el => (buttonRefs.current[index] = el)}
        >
          {stage.text}
        </Button>
      ))}
      <Box
        pos="absolute"
        zIndex="-1"
        top="3px"
        bottom="3px"
        width={`${boxStyle.width - 2}px`}
        borderRadius="100px"
        bgColor={stageColor}
        style={{ transform: boxStyle.transform }}
        pointerEvents="none"
        transition={easeIn}
      />
    </Flex>
  );
};

const StageSwitcher = chakra(_StageSwitcher);
export default StageSwitcher;
