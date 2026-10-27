import { Stage } from '../../typings/enums';

export interface StageSwitcherProps {
  activeStage: Stage;
  /** The switcher can only measure its buttons while the timer view is displayed. */
  isVisible?: boolean;
  onSelect: (stage: Stage) => void;
}
