import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'zoom' | 'drag'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (not touch)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, input, textarea, select, [role="button"], [data-cursor]');
      
      if (interactiveEl) {
        const customCursor = interactiveEl.getAttribute('data-cursor');
        const customLabel = interactiveEl.getAttribute('data-cursor-label');
        if (customCursor) {
          setCursorType(customCursor as any);
        } else {
          setCursorType('pointer');
        }
        setCursorLabel(customLabel || '');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Tiny precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full bg-[#5C1D24]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: cursorType === 'pointer' ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 450, mass: 0.1 }}
      />

      {/* Trailing artistic ring with label */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border transition-colors duration-200 ${
          cursorType === 'pointer'
            ? 'border-[#5C1D24] bg-[#5C1D24]/10 backdrop-blur-[1px]'
            : cursorType === 'zoom'
            ? 'border-[#8A8E3E] bg-[#8A8E3E]/20'
            : 'border-[#5C1D24]/40 bg-transparent'
        }`}
        animate={{
          x: mousePos.x - (cursorType === 'pointer' ? (cursorLabel ? 45 : 24) : 16),
          y: mousePos.y - (cursorType === 'pointer' ? (cursorLabel ? 45 : 24) : 16),
          width: cursorType === 'pointer' ? (cursorLabel ? 90 : 48) : 32,
          height: cursorType === 'pointer' ? (cursorLabel ? 90 : 48) : 32,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 260, mass: 0.2 }}
      >
        {cursorLabel && (
          <span className="text-[10px] font-mono-meta uppercase tracking-widest text-[#5C1D24] font-bold text-center px-1">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </>
  );
};
