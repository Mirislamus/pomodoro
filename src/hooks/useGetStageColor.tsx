import { useSettings } from '../contexts/SettingsContext/SettingsContext';
import { Stage, StageColor } from '../typings/enums';

const useGetStageColor = (): StageColor => {
  const { settings } = useSettings();

  if (settings.stage === Stage.ShortBreak) {
    return StageColor.ShortBreak;
  }

  if (settings.stage === Stage.LongBreak) {
    return StageColor.LongBreak;
  }

  return StageColor.Pomodoro;
};

export default useGetStageColor;
