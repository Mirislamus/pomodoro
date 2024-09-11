import { Session } from '../../typings/types';

export interface StageSelectProps {
  stage: Session['stage'];
  isActive?: boolean;
  onClick: () => void;
}
