import { Stage } from '../../typings/enums';

export interface StageSelectProps {
  stage: Stage;
  isOpen?: boolean;
  onClick: () => void;
}
