import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, chakra, Flex, Box } from '@chakra-ui/react';
import { StageSwitcherProps } from './types';
import { ease, easeOutQuint } from '../../theme/foundations/transitions';
import { STAGES, stageConfig } from '../../consts/stages';

const _StageSwitcher = ({ activeStage, isVisible = true, onSelect, ...rest }: StageSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ width: number; offset: number } | null>(null);
  const activeIndex = STAGES.indexOf(activeStage);
  const { color, textColor } = stageConfig[activeStage];

  // Labels differ in width per language and font, so the indicator follows the real button box.
  // A ResizeObserver would be simpler, but it crashes WebKit when the hidden timer view is shown again.
  useLayoutEffect(() => {
    const activeButton = buttonRefs.current[activeIndex];
    if (!activeButton) return;

    const update = () => {
      // Skip while the timer view is hidden (settings page) to keep the last real measurement
      if (activeButton.offsetWidth === 0) return;
      setIndicator({ width: activeButton.offsetWidth, offset: activeButton.offsetLeft });
    };

    update();
    document.fonts?.ready.then(update);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeIndex, isVisible, i18n.language]);

  return (
    <Flex
      role="group"
      aria-label={t('stage_select')}
      pos="relative"
      zIndex="1"
      p="3px"
      w={{ md: '580px', lg: 'fit-content' }}
      gap="2px"
      borderRadius="100px"
      bgColor="background.stageSwitcher"
      {...rest}
    >
      {STAGES.map((stage, index) => {
        const isActive = stage === activeStage;
        return (
          <Button
            key={stage}
            ref={el => {
              buttonRefs.current[index] = el;
            }}
            w={{ md: 'calc(100% / 3)', lg: 'fit-content' }}
            size="xs"
            variant="ghost"
            fontWeight="600"
            color={isActive ? textColor : 'primary'}
            aria-pressed={isActive}
            onClick={() => onSelect(stage)}
          >
            {t(stageConfig[stage].labelKey)}
          </Button>
        );
      })}
      <Box
        aria-hidden
        pos="absolute"
        zIndex="-1"
        top="3px"
        bottom="3px"
        left="0"
        borderRadius="100px"
        bgColor={color}
        pointerEvents="none"
        opacity={indicator ? 1 : 0}
        transition={`transform 0.45s ${easeOutQuint}, width 0.45s ${easeOutQuint}, background-color ${ease}, opacity ${ease}`}
        style={indicator ? { width: indicator.width, transform: `translateX(${indicator.offset}px)` } : undefined}
      />
    </Flex>
  );
};

const StageSwitcher = chakra(_StageSwitcher);
export default StageSwitcher;
