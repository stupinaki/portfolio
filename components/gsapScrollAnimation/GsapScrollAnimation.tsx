import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';

import useImagesPaths from '@/hooks/useImagesPaths';

import style from './gsapScrollAnimation.module.scss';

interface Props {
  onImageLoaded: (index: number) => void;
  onAnimationComplete: () => void;
  onAnimationReverse: () => void;
}

const GsapScrollAnimation = ({
  onImageLoaded,
  onAnimationComplete,
  onAnimationReverse,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const { frameCount, imageSize, paths } = useImagesPaths();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    const context = canvas.getContext('2d');
    if (!context) return;

    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = paths[i];

      img.onload = () => {
        images[i] = img;
        onImageLoaded(i);

        if (i === 0) render(context);
      };

      img.onerror = () => {
        onImageLoaded(i);
      };
    }

    const slides = {
      frame: 0,
    };

    function render(context: CanvasRenderingContext2D) {
      if (!images[slides.frame]) return;

      context.clearRect(0, 0, imageSize.width, imageSize.height);
      context.drawImage(images[slides.frame], 0, 0);
    }

    gsap.to(slides, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: canvasContainer,
        start: 'top top',
        end: '+=3500',
        pin: true,
        scrub: 0.5,
      },
      onUpdate: () => {
        if (slides.frame !== frameCount - 1) {
          onAnimationReverse();
        }

        render(context);
      },
      onComplete: onAnimationComplete,
    });
  }, [
    imageSize.height,
    imageSize.width,
    frameCount,
    paths,
    onAnimationComplete,
    onImageLoaded,
    onAnimationReverse,
  ]);

  return (
    <div className={style.root}>
      <div ref={canvasContainerRef}>
        <canvas className={style.canvas} ref={canvasRef} />
      </div>
    </div>
  );
};

export default GsapScrollAnimation;
