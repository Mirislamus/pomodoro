import { Stage } from "../typings/enums";
import { Session } from "../typings/types";

const defaultSession: Session = {
  sessionCount: 1,
  stage: Stage.Pomodoro,
  pomodoroCurrentTime: 0,
  shortBrakeCurrentTime: 0,
  longBrakeCurrentTime: 0,
};

export default defaultSession;
