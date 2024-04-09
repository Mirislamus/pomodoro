import { FC } from 'react';
import { StageSwitcherProps } from './types';
import { Button, chakra, Flex } from '@chakra-ui/react';

const _StageSwitcher: FC<StageSwitcherProps> = ({ stages, ...rest }) => {
  return (
    <Flex p="3px" bgColor="background.stageSwitcher" {...rest}>
      {stages.map(stage => (
        <Button key={stage.text} bgColor={stage.stageColor} size="xs" onClick={stage.onClick}>
          {stage.text}
        </Button>
      ))}
    </Flex>
  );
};

const StageSwitcher = chakra(_StageSwitcher);
export default StageSwitcher;
