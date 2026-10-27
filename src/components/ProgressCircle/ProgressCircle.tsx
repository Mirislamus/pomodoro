import { Box, chakra, useToken } from '@chakra-ui/react';
import useActiveStage from '../../hooks/useActiveStage';
import { ProgressCircleProps } from './types';

const SIZE = 500;
const RADIUS = 230;
const STROKE_WIDTH = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const _ProgressCircle = ({ fillPercentage, isActive = false, ...props }: ProgressCircleProps) => {
  const { color } = useActiveStage();
  const [circlePrimary, circleSecondary, stageColor] = useToken('colors', [
    'circle.primary',
    'circle.secondary',
    color,
  ]);
  const hasProgress = fillPercentage > 0;
  const center = SIZE / 2;

  return (
    <Box boxSize={{ base: '300px', md: '500px' }} css={{ '& svg': { maxW: '100%', h: 'auto' } }} {...props}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none" aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          stroke={circlePrimary}
          strokeWidth={STROKE_WIDTH}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          stroke={hasProgress && isActive ? stageColor : circleSecondary}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={((100 - fillPercentage) / 100) * CIRCUMFERENCE}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{
            transition: 'stroke-dashoffset 0.3s linear, stroke 0.3s ease',
            opacity: hasProgress ? 1 : 0,
            visibility: hasProgress ? 'visible' : 'hidden',
          }}
        />
      </svg>
    </Box>
  );
};

const ProgressCircle = chakra(_ProgressCircle);
export default ProgressCircle;
