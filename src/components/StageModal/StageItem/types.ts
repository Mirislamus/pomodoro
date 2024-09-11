import { Session } from '../../../typings/types';

export interface StateItemProps {
  stage: Session['stage'];
  isActive?: boolean;
  onClick: () => void;
}
