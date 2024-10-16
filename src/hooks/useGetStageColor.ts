import useSessionStore from '../stores/useSessionStore';
import { Stage, StageColor } from '../typings/enums';

const useGetStageColor = (): StageColor => {
  const session = useSessionStore(state => state.session);

  if (session.stage === Stage.ShortBreak) {
    return StageColor.ShortBreak;
  }

  if (session.stage === Stage.LongBreak) {
    return StageColor.LongBreak;
  }

  return StageColor.Pomodoro;
};

export default useGetStageColor;
