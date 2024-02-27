import { useSettings } from '../contexts/SettingsContext';
import { Stage } from '../typings/enums';

const useGetStageColor = () => {
  const { stage } = useSettings();

  if (stage === Stage.ShortBreak) {
    return 'accent.yellow';
  }

  if (stage === Stage.LongBreak) {
    return 'accent.green';
  }

  return 'accent.red';
};

export default useGetStageColor;
