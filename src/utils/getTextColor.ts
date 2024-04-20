import { Stage } from '../typings/enums';

const getTextColor = (stage: Stage) => {
  if (stage !== Stage.Pomodoro) {
    return '#222';
  }
  return 'white';
};

export default getTextColor;
