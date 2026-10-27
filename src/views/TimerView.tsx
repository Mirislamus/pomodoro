import { Flex, useDisclosure } from '@chakra-ui/react';
import usePomodoroTimer from '../hooks/usePomodoroTimer';
import useSpaceToggle from '../hooks/useSpaceToggle';
import ProgressCircle from '../components/ProgressCircle/ProgressCircle';
import StageSwitcher from '../components/StageSwitcher/StageSwitcher';
import StageSelect from '../components/StageSelect/StageSelect';
import StageModal from '../components/StageModal/StageModal';
import TimerDisplay from '../components/TimerDisplay/TimerDisplay';
import TimerControls from '../components/TimerControls/TimerControls';
import { animations } from '../theme/foundations/transitions';

interface TimerViewProps {
  hidden?: boolean;
}

const TimerView = ({ hidden = false }: TimerViewProps) => {
  const { open: isStageModalOpen, onClose: onStageModalClose, onOpen: onStageModalOpen } = useDisclosure();
  const timer = usePomodoroTimer();

  useSpaceToggle(timer.toggle, !hidden && !isStageModalOpen);

  return (
    // Animations restart whenever the view goes from `display: none` back to visible.
    // The root only fades: a transform would turn it into the containing block of the absolute stage switcher.
    <Flex
      display={hidden ? 'none' : 'flex'}
      flexDirection="column"
      paddingBlockStart={{ md: '170px', lg: 'gap.30' }}
      animation={animations.fadeIn}
    >
      <StageSwitcher
        left="0"
        right="0"
        mx="auto"
        pos={{ md: 'absolute' }}
        top={{ base: '140px', lg: 'gap.30' }}
        display={{ base: 'none', md: 'flex' }}
        activeStage={timer.stage}
        isVisible={!hidden}
        onSelect={timer.selectStage}
      />
      <StageSelect
        display={{ base: 'flex', md: 'none' }}
        maxW="328px"
        mx="auto"
        marginBlockStart="gap.20"
        marginBlockEnd="gap.16"
        stage={timer.stage}
        isOpen={isStageModalOpen}
        onClick={onStageModalOpen}
      />
      <StageModal
        isOpen={isStageModalOpen}
        activeStage={timer.stage}
        onClose={onStageModalClose}
        onSelect={timer.selectStage}
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        pos="relative"
        w="fit-content"
        m="auto"
        paddingBlockEnd={{ base: '96px', md: '0' }}
        animation={animations.viewEnter}
      >
        <ProgressCircle isActive={timer.isPlaying} fillPercentage={timer.progress} />
        <Flex
          pos="absolute"
          w="fit-content"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxSize={{ base: '300px', md: '500px' }}
        >
          <TimerDisplay
            stage={timer.stage}
            countdown={timer.countdown}
            sessionCount={timer.sessionCount}
            sessionTotal={timer.sessionTotal}
          />
          <TimerControls
            left="0"
            right="0"
            bottom="-118px"
            pos={{ base: 'absolute', md: 'static' }}
            stage={timer.stage}
            isPlaying={timer.isPlaying}
            onToggle={timer.toggle}
            onReset={timer.reset}
            onSkip={timer.skip}
            onResetCycle={timer.resetCycle}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TimerView;
