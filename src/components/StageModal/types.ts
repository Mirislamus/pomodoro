import { Stage } from '../../typings/enums';

export interface StageModalProps {
  isOpen: boolean;
  activeStage: Stage;
  onClose: () => void;
  onSelect: (stage: Stage) => void;
}
