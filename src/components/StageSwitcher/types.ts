import { StageColor } from '../../typings/enums';

export type Stage = {
  text: string;
  stageColor: StageColor;
  onClick: () => void;
};

export interface StageSwitcherProps {
  stages: Stage[];
}
