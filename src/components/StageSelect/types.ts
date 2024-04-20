import { Session } from '../../contexts/SessionContext/types';

export interface StageSelectProps {
  stage: Session['stage'];
  isActive?: boolean;
  onClick: () => void;
}
