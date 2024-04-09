import { FC } from 'react';
import { StageButtonProps } from './types';
import { Box, chakra } from '@chakra-ui/react';

const _StageButton: FC<StageButtonProps> = ({ text, stageColor, onClick, ...rest }) => {
  return (
    <Box as="button" bgColor={stageColor} onClick={onClick} {...rest}>
      {text}
    </Box>
  );
};

const StageButton = chakra(_StageButton);
export default StageButton;
