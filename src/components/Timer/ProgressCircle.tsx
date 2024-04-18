import { FC } from 'react';
import { Box, chakra, useToken } from '@chakra-ui/react';
import useGetStageColor from '../../hooks/useGetStageColor';

interface ProgressCircleProps {
  fillPercentage: number;
  isActive?: boolean;
}

const _ProgressCircle: FC<ProgressCircleProps> = ({ fillPercentage, isActive = false, ...props }) => {
  const radius = 230;
  const strokeWidth = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - fillPercentage) / 100) * circumference;
  const stageColor = useGetStageColor();

  const [circlePrimary, circleSecondary, currentStageColor] = useToken('colors', [
    'circle.primary',
    'circle.secondary',
    stageColor,
  ]);

  return (
    <Box boxSize={{ base: '300px', md: '500px' }} __css={{ svg: { maxW: '100%', h: 'auto' } }} {...props}>
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
        <circle
          cx="250"
          cy="250"
          r={radius}
          fill="none"
          stroke={circlePrimary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform="rotate(-90 250 250)"
        />
        <circle
          cx="250"
          cy="250"
          r={radius}
          fill="none"
          stroke={fillPercentage > 0 && isActive ? currentStageColor : circleSecondary}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 250 250)"
          style={{
            transition: 'stroke-dashoffset 0.3s linear',
            opacity: fillPercentage > 0 ? 1 : 0,
            visibility: fillPercentage > 0 ? 'visible' : 'hidden',
          }}
        />
      </svg>
    </Box>
  );
};

const ProgressCircle = chakra(_ProgressCircle);
export default ProgressCircle;
