import React, { useState, useEffect } from 'react';
import { Zap, Play, Pause, ChevronRight } from 'lucide-react';
import { ROTATING_WORDS, getNextRotatedWord } from '../../utils/concepts12.ts';

interface ConceptWordRotatorProps {
  className?: string;
  onSelectWord?: (word: string) => void;
}

export const ConceptWordRotator: React.FC<ConceptWordRotatorProps> = ({
  className = '',
  onSelectWord
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIdx((prev) => getNextRotatedWord(prev).nextIndex);
        setIsAnimating(false);
      }, 250);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const advanceWord = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const next = getNextRotatedWord(currentIdx).nextIndex;
      setCurrentIdx(next);
      setIsAnimating(false);
      onSelectWord?.(ROTATING_WORDS[next]);
    }, 150);
  };

  const currentWord = ROTATING_WORDS[currentIdx];

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Rotator Pill */}
      <button
        type="button"
        onClick={advanceWord}
        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-yellow-500/20 hover:from-orange-500/30 hover:to-amber-500/25 border border-orange-500/40 hover:border-[#FFA069] backdrop-blur-xl shadow-[0_0_20px_rgba(255,160,105,0.25)] transition-all cursor-pointer text-left"
        title="Click to cycle next headline capability"
      >
        <span className="w-2 h-2 rounded-full bg-[#FFA069] animate-ping" />
        <span
          className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFA069] via-amber-200 to-[#C7F238] transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,160,105,0.4)] ${
            isAnimating ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {currentWord}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-[#FFA069] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </button>

      {/* Mini Controls & Concept 02 indicator */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">
        <Zap className="w-2.5 h-2.5 text-amber-400" />
        <span>Concept 02</span>
        <span className="text-neutral-400">&middot;</span>
        <span>{isPaused ? 'Paused' : 'Auto'}</span>
      </span>
    </div>
  );
};
