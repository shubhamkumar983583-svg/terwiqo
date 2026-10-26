import React, { useState } from "react";
import { Sparkles, Code, Play, Sliders, Check, Copy, RefreshCw, Terminal, Layers } from "lucide-react";
import { MorphText, MyHero, CustomMorph } from "@/components/ui/morph-text";

export const MorphTextShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"myhero" | "custom" | "playground">("myhero");
  const [copied, setCopied] = useState(false);

  // Playground state
  const [customWordsInput, setCustomWordsInput] = useState("AI-FIRST, EDGE-CCTV, HIGH-SPEED, HYPER-ACCURATE");
  const [customInterval, setCustomInterval] = useState(2500);
  const [customSubtext, setCustomSubtext] = useState("Enterprise grade intelligence at sub-15ms latency.");
  const [customFontSize, setCustomFontSize] = useState("clamp(2rem, 8vw, 5rem)");

  const parsedCustomWords = customWordsInput
    .split(",")
    .map((w) => w.trim().toUpperCase())
    .filter((w) => w.length > 0);

  const getActiveCode = () => {
    if (activeTab === "myhero") {
      return `import { MorphText } from "@/components/ui/morph-text"

// Default — cycles CREATE / DESIGN / DEVELOP
export function MyHero() {
  return (
    <MorphText subtext="The Art of Code" />
  )
}`;
    }
    if (activeTab === "custom") {
      return `import { MorphText } from "@/components/ui/morph-text"

// Custom words and interval
export function CustomMorph() {
  return (
    <MorphText
      words={["INNOVATE", "BUILD", "SHIP"]}
      interval={2500}
      subtext="Move fast. Break things."
      fontSize="clamp(2rem, 10vw, 8rem)"
    />
  )
}`;
    }
    return `import { MorphText } from "@/components/ui/morph-text"

export function PlaygroundMorph() {
  return (
    <MorphText
      words={${JSON.stringify(parsedCustomWords)}}
      interval={${customInterval}}
      subtext="${customSubtext}"
      fontSize="${customFontSize}"
    />
  )
}`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="morph-text-showcase" className="relative z-10 py-16 px-4 sm:px-8 border-b border-white/5 bg-[#090C1A]/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Header Badge & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-[#FFA069]/30 text-[#FFA069] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE UI/UX COMPONENT &middot; MORPH TEXT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Fluid Liquid <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA069] via-amber-200 to-[#C7F238]">MorphText</span> Component
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              Organic SVG feColorMatrix threshold filter animation with sub-pixel blur curves. Cycles words smoothly with customizable intervals, responsive typography, and reactive subtext.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("myhero")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "myhero"
                  ? "bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-lg shadow-orange-500/20"
                  : "text-neutral-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>MyHero (Default)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("custom")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "custom"
                  ? "bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-lg shadow-orange-500/20"
                  : "text-neutral-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>CustomMorph</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("playground")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "playground"
                  ? "bg-gradient-to-r from-[#FFA069] to-[#E8713C] text-black shadow-lg shadow-orange-500/20"
                  : "text-neutral-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Live Studio</span>
            </button>
          </div>
        </div>

        {/* Live Visual Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visualizer Stage */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-gradient-to-b from-[#0C1024] to-[#080B17] border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl min-h-[380px]">
            {/* Top Stage Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-neutral-300">
                  {activeTab === "myhero" && "MyHero &middot; CREATE / DESIGN / DEVELOP"}
                  {activeTab === "custom" && "CustomMorph &middot; INNOVATE / BUILD / SHIP (2500ms)"}
                  {activeTab === "playground" && "Studio Preset &middot; Interactive Configuration"}
                </span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                SVG Threshold: feColorMatrix
              </span>
            </div>

            {/* Centered Morphing Typography */}
            <div className="my-auto py-8 relative z-10 flex flex-col items-center justify-center">
              {activeTab === "myhero" && <MyHero />}
              {activeTab === "custom" && <CustomMorph />}
              {activeTab === "playground" && (
                <MorphText
                  words={parsedCustomWords.length > 0 ? parsedCustomWords : ["CODE", "BUILD", "SCALE"]}
                  interval={customInterval}
                  subtext={customSubtext}
                  fontSize={customFontSize}
                />
              )}
            </div>

            {/* Bottom Status Tip */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono relative z-10">
              <span>Tip: Hover or touch to pause current frame</span>
              <span className="text-[#C7F238] font-bold">@/components/ui/morph-text</span>
            </div>

            {/* Ambient Background Glow in Stage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[radial-gradient(circle,_rgba(255,160,105,0.12)_0%,_rgba(199,242,56,0.06)_45%,_transparent_70%)] rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Column: Interactive Code & Playground Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Code Box with 1-Click Copy */}
            <div className="bg-[#05070E] border border-white/10 rounded-3xl p-5 shadow-2xl relative flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FFA069]" />
                  <span className="text-xs font-mono font-bold text-neutral-200">React + Tailwind Snippet</span>
                </div>
                <button
                  type="button"
                  onClick={copyCode}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto p-3 bg-black/40 rounded-2xl border border-white/5 flex-1">
                <code>{getActiveCode()}</code>
              </pre>
            </div>

            {/* Playground Controls Panel (Interactive Slider & Inputs) */}
            {activeTab === "playground" ? (
              <div className="bg-[#0C1024] border border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5 text-[#C7F238]">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Real-Time Props Tuning</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomWordsInput("INNOVATE, ACCELERATE, SCALE");
                      setCustomInterval(2200);
                      setCustomSubtext("Engineered for mission-critical operations.");
                    }}
                    className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Words input */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Words (comma separated)
                  </label>
                  <input
                    type="text"
                    value={customWordsInput}
                    onChange={(e) => setCustomWordsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FFA069]"
                    placeholder="E.g. CREATE, DESIGN, DEVELOP"
                  />
                </div>

                {/* Interval slider */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span>Interval Duration</span>
                    <span className="text-[#FFA069] font-bold">{customInterval} ms</span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="5000"
                    step="250"
                    value={customInterval}
                    onChange={(e) => setCustomInterval(Number(e.target.value))}
                    className="w-full accent-[#FFA069] cursor-pointer"
                  />
                </div>

                {/* Subtext input */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                    Subtext
                  </label>
                  <input
                    type="text"
                    value={customSubtext}
                    onChange={(e) => setCustomSubtext(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C7F238]"
                    placeholder="Subtext caption"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[#0C1024]/60 border border-white/10 rounded-3xl p-5 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#FFA069]" />
                  <span>Component Details &amp; Props Spec</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-400">
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-neutral-500 block">Prop:</span>
                    <span className="text-white font-bold">words?: string[]</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-neutral-500 block">Prop:</span>
                    <span className="text-white font-bold">interval?: number</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-neutral-500 block">Prop:</span>
                    <span className="text-white font-bold">subtext?: string</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                    <span className="text-neutral-500 block">Prop:</span>
                    <span className="text-white font-bold">fontSize?: string</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MorphTextShowcaseSection;
