import { Session } from '../../../contexts/SessionContext/types';

export interface StateItemProps {
  stage: Session['stage'];
  isActive?: boolean;
  onClick: () => void;
}
