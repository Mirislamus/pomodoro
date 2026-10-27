import { Stage } from '../../../typings/enums';

export interface StageItemProps {
  stage: Stage;
  isActive?: boolean;
  onClick: () => void;
}
