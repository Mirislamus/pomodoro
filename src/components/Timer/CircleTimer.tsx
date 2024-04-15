import { FC } from 'react';
import { Stage } from '../../typings/enums';
import { Box, Fade, chakra } from '@chakra-ui/react';

interface CircleTimerProps {
  fillPercentage: number;
  stage: Stage;
}

const _CircleTimer: FC<CircleTimerProps> = ({ fillPercentage, ...props }) => {
  const radius = 230;
  const strokeWidth = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - fillPercentage) / 100) * circumference;

  return (
    <Box {...props}>
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
        <circle
          cx="250"
          cy="250"
          r={radius}
          fill="none"
          stroke="#222222"
          strokeOpacity="0.08"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform="rotate(-90 250 250)"
        />
        <Fade in={fillPercentage > 0} unmountOnExit>
          <circle
            cx="250"
            cy="250"
            r={radius}
            fill="none"
            stroke="#ED4455"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 250 250)"
            style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
          />
        </Fade>
      </svg>
    </Box>
  );
};

const CircleTimer = chakra(_CircleTimer);
export default CircleTimer;
