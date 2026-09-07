import { Tooltip } from '../../../components/ui/tooltip';
import { PomodoroTooltipProps } from './types';

const PomodoroTooltip = ({ children, label, placement = 'top' }: PomodoroTooltipProps) => (
  <Tooltip
    content={label}
    disabled={!label}
    showArrow
    positioning={{ placement, gutter: 10 }}
    contentProps={{
      bg: 'background.tooltip',
      color: 'primary',
      textStyle: 'text.md',
      p: '10px',
      borderRadius: '10px',
      fontWeight: 400,
    }}
  >
    {children}
  </Tooltip>
);

export default PomodoroTooltip;
