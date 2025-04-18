import { useSprings, animated, SpringValue } from '@react-spring/web';
import { useRef, useEffect, useState } from 'react';

const AnimatedSpan = animated.span;

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  const defaultFrom = {
    filter: 'blur(10px)',
    opacity: 0,
    transform: direction === 'top' ? 'translateY(-50px)' : 'translateY(50px)',
  };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translateY(5px)' : 'translateY(-5px)',
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      transform: 'translateY(0px)',
    },
  ];

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: defaultFrom,
      to: async (next) => {
        if (inView) {
          for (const step of defaultTo) {
            await next(step);
          }
          animatedCount.current += 1;
          if (animatedCount.current === elements.length && onAnimationComplete) {
            onAnimationComplete();
          }
        }
      },
      delay: i * delay,
      config: { mass: 1, tension: 280, friction: 60 },
    }))
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {springs.map((styles, index) => (
        <AnimatedSpan
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
            ...styles,
          }}
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
        </AnimatedSpan>
      ))}
    </span>
  );
};

export default BlurText;