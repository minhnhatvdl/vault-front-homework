import React, { useEffect, useRef } from 'react';

interface CryptoIconWithCutoutProps {
  cryptoIcon: string;
  cryptoCurrency: string;
  circleSize?: number;
  circleOffsetX?: number;
  circleOffsetY?: number;
  className?: string;
}

const CryptoIconWithCutout: React.FC<CryptoIconWithCutoutProps> = ({
  cryptoIcon,
  cryptoCurrency,
  circleSize = 20,
  circleOffsetX = 10,
  circleOffsetY = 10,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = cryptoIcon;

    img.onload = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, 0, 0, width, height);

      const circleX = width - circleOffsetX;
      const circleY = circleOffsetY;
      const radius = circleSize / 2;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
    };
  }, [cryptoIcon, circleSize, circleOffsetX, circleOffsetY]);

  return (
    <canvas
      ref={canvasRef}
      width={100}
      height={100}
      className={`h-full w-full rounded-full object-contain ${className}`}
      aria-label={`${cryptoCurrency} icon`}
    />
  );
};

export default CryptoIconWithCutout;
