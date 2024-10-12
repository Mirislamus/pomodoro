import { FC, useLayoutEffect, useRef, useState } from 'react';
import { StageSwitcherProps } from './types';
import { Button, chakra, Flex, Box } from '@chakra-ui/react';
import { easeIn } from '../../theme/foundations/transitions';
import { getTextColor } from '../../utils';
import useSessionStore from '../../stores/useSessionStore';

const _StageSwitcher: FC<StageSwitcherProps> = ({ stageColor, stages, ...rest }) => {
  const session = useSessionStore(state => state.session);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [boxStyle, setBoxStyle] = useState({ width: 120, transform: '' });

  useLayoutEffect(() => {
    const updateBoxStyle = () => {
      const activeButtonIndex = stages.findIndex(stage => stage.isActive);
      const activeButtonRef = buttonRefs.current[activeButtonIndex];

      if (activeButtonRef) {
        const { offsetLeft, clientWidth } = activeButtonRef;
        setBoxStyle({
          width: clientWidth,
          transform: `translateX(${offsetLeft}px)`,
        });
      }
    };

    setTimeout(updateBoxStyle, 0);

    window.addEventListener('resize', updateBoxStyle);

    return () => {
      window.removeEventListener('resize', updateBoxStyle);
    };
  }, [stages, session.stage]);

  return (
    <Flex
      pos="relative"
      zIndex="1"
      p="3px"
      w={{ md: '580px', lg: 'fit-content' }}
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
          fontWeight="600"
          color={stage.isActive ? getTextColor(session.stage) : 'primary'}
          onClick={stage.onClick}
          ref={el => (buttonRefs.current[index] = el)}
        >
          {stage.text}
        </Button>
      ))}
      <Box
        marginInlineStart="-3px"
        pos="absolute"
        zIndex="-1"
        top="3px"
        bottom="3px"
        width={`${boxStyle.width}px`}
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
