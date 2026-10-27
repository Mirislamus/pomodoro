import { Stage } from '../../typings/enums';

export interface TimerControlsProps {
  stage: Stage;
  isPlaying: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
  onResetCycle: () => void;
}
