import { StageColor } from '../../typings/enums';

export type Stage = {
  text: string;
  onClick: () => void;
  isActive: boolean;
};

export interface StageSwitcherProps {
  stageColor: StageColor;
  stages: Stage[];
}
