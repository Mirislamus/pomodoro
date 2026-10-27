import { Stage } from '../../typings/enums';

export interface TimerDisplayProps {
  stage: Stage;
  countdown: number;
  sessionCount: number;
  sessionTotal: number;
}
