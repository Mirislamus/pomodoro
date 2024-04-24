import { Stage } from '../typings/enums';

export const getTextColor = (stage: Stage) => {
  if (stage !== Stage.Pomodoro) {
    return '#222';
  }
  return 'white';
};
