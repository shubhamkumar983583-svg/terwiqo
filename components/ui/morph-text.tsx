import React, { useEffect, useRef, useState, useId } from "react";
import { cn } from "@/lib/utils";

export interface MorphTextProps {
  /** Array of words to cycle through. Defaults to ["CREATE", "DESIGN", "DEVELOP"] */
  words?: string[];
  /** Total cycle interval per word in milliseconds. Defaults to 3000ms */
  interval?: number;
  /** Subtext rendered underneath the morphing text */
  subtext?: string;
  /** Font size CSS expression. Defaults to "clamp(2.5rem, 8vw, 6.5rem)" */
  fontSize?: string;
  /** Additional container class names */
  className?: string;
  /** Custom classes for morphing text */
  textClassName?: string;
  /** Custom classes for subtext */
  subtextClassName?: string;
}

const DEFAULT_WORDS = ["CREATE", "DESIGN", "DEVELOP"];

export const MorphText: React.FC<MorphTextProps> = ({
  words = DEFAULT_WORDS,
  interval = 3000,
  subtext,
  fontSize = "clamp(2.5rem, 8vw, 6.5rem)",
  className,
  textClassName,
  subtextClassName,
}) => {
  const filterId = useId().replace(/:/g, "_");
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const [textIndex, setTextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Normalize words list
  const cleanWords = words && words.length > 0 ? words : DEFAULT_WORDS;

  useEffect(() => {
    let animationFrameId: number;
    let morphStartTime: number | null = null;
    let isMorphing = false;
    let nextIndex = (textIndex + 1) % cleanWords.length;
    let currentIndex = textIndex;

    const morphDuration = Math.min(800, Math.max(350, interval * 0.3));
    const pauseDuration = Math.max(400, interval - morphDuration);

    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!text1 || !text2) return;

    // Set initial text
    text1.textContent = cleanWords[currentIndex];
    text2.textContent = cleanWords[nextIndex];
    text1.style.filter = "";
    text1.style.opacity = "1";
    text2.style.filter = "";
    text2.style.opacity = "0";

    let pauseTimer: ReturnType<typeof setTimeout>;

    const setMorphFraction = (fraction: number) => {
      if (!text1 || !text2) return;

      // Lucas Bebber threshold morph formula:
      // High-order non-linear blur curve designed for SVG feColorMatrix threshold filter
      const blur1 = Math.min(8 / (1 - fraction + 0.001) - 8, 100);
      const blur2 = Math.min(8 / (fraction + 0.001) - 8, 100);

      text1.style.filter = `blur(${blur1}px)`;
      text1.style.opacity = `${Math.pow(1 - fraction, 0.4) * 100}%`;

      text2.style.filter = `blur(${blur2}px)`;
      text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    };

    const startMorph = () => {
      if (isPaused) {
        pauseTimer = setTimeout(startMorph, 200);
        return;
      }
      isMorphing = true;
      morphStartTime = performance.now();
      stepMorph(performance.now());
    };

    const stepMorph = (now: number) => {
      if (!morphStartTime) morphStartTime = now;
      const elapsed = now - morphStartTime;
      const fraction = Math.min(1, elapsed / morphDuration);

      setMorphFraction(fraction);

      if (fraction < 1) {
        animationFrameId = requestAnimationFrame(stepMorph);
      } else {
        // Complete current cycle
        isMorphing = false;
        morphStartTime = null;
        currentIndex = nextIndex;
        nextIndex = (currentIndex + 1) % cleanWords.length;
        setTextIndex(currentIndex);

        if (text1 && text2) {
          text1.textContent = cleanWords[currentIndex];
          text2.textContent = cleanWords[nextIndex];
          text1.style.filter = "";
          text1.style.opacity = "1";
          text2.style.filter = "";
          text2.style.opacity = "0";
        }

        pauseTimer = setTimeout(startMorph, pauseDuration);
      }
    };

    pauseTimer = setTimeout(startMorph, pauseDuration);

    return () => {
      clearTimeout(pauseTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [cleanWords, interval, isPaused]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-center select-none py-6",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Click or hover to pause morphing"
    >
      {/* SVG Threshold Filter for organic gooey morph effect */}
      <svg
        className="absolute -top-[9999px] -left-[9999px] w-0 h-0 pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter id={`morph-threshold-${filterId}`}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* Morphing Word Container */}
      <div
        className="relative flex items-center justify-center w-full min-h-[1.3em] font-black tracking-tight"
        style={{
          fontSize,
          filter: `url(#morph-threshold-${filterId})`,
        }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inset-x-0 mx-auto text-center font-black tracking-tighter text-white inline-block transition-transform",
            "drop-shadow-[0_0_35px_rgba(255,160,105,0.35)]",
            textClassName
          )}
        >
          {cleanWords[0]}
        </span>
        <span
          ref={text2Ref}
          className={cn(
            "absolute inset-x-0 mx-auto text-center font-black tracking-tighter text-white inline-block transition-transform opacity-0",
            "drop-shadow-[0_0_35px_rgba(199,242,56,0.35)]",
            textClassName
          )}
        >
          {cleanWords[1 % cleanWords.length]}
        </span>
      </div>

      {/* Subtext */}
      {subtext && (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base md:text-lg text-neutral-400 font-mono tracking-wide max-w-xl",
            subtextClassName
          )}
        >
          {subtext}
        </p>
      )}

      {/* Subtle indicator dots */}
      <div className="flex items-center gap-1.5 mt-3 opacity-60 hover:opacity-100 transition-opacity">
        {cleanWords.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === textIndex
                ? "w-6 bg-gradient-to-r from-[#FFA069] to-[#C7F238]"
                : "w-1.5 bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
};

// Default — cycles CREATE / DESIGN / DEVELOP
export function MyHero() {
  return (
    <MorphText subtext="The Art of Code" />
  );
}

// Custom words and interval
export function CustomMorph() {
  return (
    <MorphText
      words={["INNOVATE", "BUILD", "SHIP"]}
      interval={2500}
      subtext="Move fast. Break things."
      fontSize="clamp(2rem, 10vw, 8rem)"
    />
  );
}

export default MorphText;
