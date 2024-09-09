import { Tooltip, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { PomodoroTooltipProps } from './types';

const _PomodoroTooltip: FC<PomodoroTooltipProps> = ({ children, ...rest }) => {
  return (
    <Tooltip
      bg="background.tooltip"
      color="primary"
      fontStyle="text.md"
      hasArrow
      placement="top"
      p="10px"
      borderRadius="10px"
      fontWeight={400}
      arrowSize={8}
      arrowPadding={8}
      gutter={10}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

const PomodoroTooltip = chakra(_PomodoroTooltip);
export default PomodoroTooltip;
