import useSessionStore from '../stores/useSessionStore';
import { stageConfig } from '../consts/stages';

/** Current stage together with its visual config (colors, label). */
const useActiveStage = () => {
  const stage = useSessionStore(state => state.session.stage);
  return { stage, ...stageConfig[stage] };
};

export default useActiveStage;
