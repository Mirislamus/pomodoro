import { Stage } from '../typings/enums';

const getTextColor = (stage: Stage) => {
  if (stage !== Stage.Pomodoro) {
    return 'black.1';
  }
  return 'white';
};

export default getTextColor;
