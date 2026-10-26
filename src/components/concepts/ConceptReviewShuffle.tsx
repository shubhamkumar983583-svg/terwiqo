import React, { useState } from 'react';
import { Star, RotateCcw, ChevronRight, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { REVIEW_CARDS, shuffleReviewDeck, ReviewItem } from '../../utils/concepts12.ts';

interface ConceptReviewShuffleProps {
  className?: string;
}

export const ConceptReviewShuffle: React.FC<ConceptReviewShuffleProps> = ({ className = '' }) => {
  const [deck, setDeck] = useState<ReviewItem[]>(REVIEW_CARDS);
  const [shuffleCount, setShuffleCount] = useState(0);

  const handleShuffle = () => {
    setDeck((prev) => shuffleReviewDeck(prev));
    setShuffleCount((c) => c + 1);
  };

  const topCard = deck[0];
  const nextCard = deck[1];

  return (
    <div
      id="review-shuffle"
      className={`p-6 sm:p-8 rounded-3xl bg-[#0B0F1D]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 text-left relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#FFA069] text-[10px] font-mono font-bold mb-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>Concept 04 · Review Shuffle (Interactive Testimonial Deck)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Verified Enterprise Case Reviews
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Shuffle through real deployment feedback from industrial plant managers and hospital directors.
          </p>
        </div>

        <button
          type="button"
          onClick={handleShuffle}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/15 transition-all cursor-pointer shadow-md hover:border-amber-400/40 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Shuffle Next Review ({shuffleCount + 1}/{REVIEW_CARDS.length})</span>
        </button>
      </div>

      {/* 3D Stacked Review Cards */}
      <div className="relative min-h-[220px]">
        {/* Background Card Preview (Next in deck) */}
        {nextCard && (
          <div className="absolute inset-0 translate-y-3 scale-95 opacity-40 p-6 rounded-2xl bg-white/[0.02] border border-white/10 blur-[1px] pointer-events-none" />
        )}

        {/* Top Active Card */}
        <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/20 shadow-2xl backdrop-blur-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <img
                src={topCard.avatar}
                alt={topCard.author}
                className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-md"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{topCard.author}</h4>
                <div className="text-xs text-neutral-400 font-mono">
                  {topCard.role} &middot; <span className="text-[#FFA069]">{topCard.company}</span>
                </div>
              </div>
            </div>

            {/* Metric Badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: topCard.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#C7F238]/15 text-[#C7F238] border border-[#C7F238]/30 text-xs font-mono font-bold">
                {topCard.metric}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic">
            &ldquo;{topCard.quote}&rdquo;
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Hardware Deployment</span>
            </span>
            <span>Tap card or button to shuffle deck &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
