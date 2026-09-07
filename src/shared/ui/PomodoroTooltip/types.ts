import type { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import type { ReactElement, ReactNode } from 'react';

type Positioning = NonNullable<ChakraTooltip.RootProps['positioning']>;

export interface PomodoroTooltipProps {
  children: ReactElement;
  label?: ReactNode;
  placement?: Positioning['placement'];
}
