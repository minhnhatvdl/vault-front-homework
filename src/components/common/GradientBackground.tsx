import { CSSProperties, memo } from 'react';
import { hexToRgba } from '../../utils/color';

interface GradientBackgroundProps {
  color: string;
}

const GradientBackground = memo(({ color }: GradientBackgroundProps) => {
  const style: CSSProperties = {
    background: `linear-gradient(105deg, ${hexToRgba(color, 0.3)} 0%, ${hexToRgba(color, 0)} 25%)`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return <div style={style} />;
});

GradientBackground.displayName = 'GradientBackground';

export default GradientBackground;
