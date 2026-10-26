import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const CONCEPTS_LIST = [
  { id: 'hero-reveal', num: '01', title: 'Hero reveal', anchor: '#hero-reveal' },
  { id: 'word-rotator', num: '02', title: 'Word rotator', anchor: '#hero-two-slider' },
  { id: 'sale-pings', num: '03', title: 'Sale pings', anchor: '#sale-pings' },
  { id: 'review-shuffle', num: '04', title: 'Review shuffle', anchor: '#review-shuffle' },
  { id: 'count-up', num: '05', title: 'Count-up stats', anchor: '#count-up' },
  { id: 'bento-build', num: '06', title: 'Bento build', anchor: '#bento-build' },
  { id: 'cursor-tour', num: '07', title: 'Cursor tour', anchor: '#hero-reveal' },
  { id: 'process-draw', num: '08', title: 'Process draw', anchor: '#process-draw' },
  { id: 'before-after', num: '09', title: 'Before / after', anchor: '#before-after' },
  { id: 'price-roll', num: '10', title: 'Price roll', anchor: '#price-roll' },
  { id: 'us-vs-them', num: '11', title: 'Us vs them', anchor: '#us-vs-them' },
  { id: 'click-success', num: '12', title: 'Click → success', anchor: '#click-success' }
];

interface ConceptEnhancementsHeaderBarProps {
  className?: string;
}

export const ConceptEnhancementsHeaderBar: React.FC<ConceptEnhancementsHeaderBarProps> = ({
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToAnchor = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add brief highlight flash
      el.classList.add('ring-2', 'ring-[#FFA069]', 'ring-offset-2', 'ring-offset-black');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#FFA069]', 'ring-offset-2', 'ring-offset-black');
      }, 2000);
    }
  };

  return (
    <div className={`w-full bg-[#080B16]/95 backdrop-blur-2xl border-b border-orange-500/25 sticky top-0 z-40 transition-all ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-8 flex items-center justify-between gap-3 text-xs">
        {/* Left: Indicator title */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFA069] animate-pulse" />
          <span className="font-bold text-white tracking-tight flex items-center gap-1.5 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA069]" />
            <span className="hidden sm:inline">12 Interactive UI/UX Conversion Concepts:</span>
            <span className="text-[#FFA069]">Active on Website</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10 hidden md:inline">
            12 of 12 Live
          </span>
        </div>

        {/* Center: Quick horizontal ticker or expand button */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CONCEPTS_LIST.slice(0, 6).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => scrollToAnchor(c.anchor)}
              className="px-2 py-0.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-orange-500/40 text-[10px] font-mono text-neutral-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
            >
              <span className="text-[#FFA069] font-bold">{c.num}</span> {c.title}
            </button>
          ))}
          <span className="text-neutral-500 text-[10px]">+6 more</span>
        </div>

        {/* Right: Expand / Collapse Toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-[10px] font-mono font-bold text-[#FFA069] transition-all cursor-pointer"
        >
          <span>{isExpanded ? 'Hide All 12' : 'View All 12 Concepts'}</span>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Expanded Grid of All 12 Concepts */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto px-4 pb-4 sm:px-8 border-t border-white/5 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {CONCEPTS_LIST.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  scrollToAnchor(c.anchor);
                  setIsExpanded(false);
                }}
                className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/40 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#FFA069] font-bold">{c.num}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-semibold text-neutral-200 group-hover:text-white mt-1 capitalize truncate">
                  {c.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
