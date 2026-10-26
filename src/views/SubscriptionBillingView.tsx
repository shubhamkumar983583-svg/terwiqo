import React from 'react';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Download,
  Shield,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const SubscriptionBillingView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#E6FF00]/10 text-[#E6FF00] border border-[#E6FF00]/30 font-bold">
              SECTION 16
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Subscription Plan, Usage &amp; Billing
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Enterprise plan lifecycle: monitor enrolled employee seat limits, computer vision AI credits, edge CCTV streaming tiers, and billing invoices.
          </p>
        </div>

        <button
          onClick={() => alert('Upgrading to Enterprise Dedicated Cluster...')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Manage Plan &amp; Add-ons</span>
        </button>
      </div>

      {/* Plan Overview & Metered Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Plan Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#101524] to-[#0A0D17] border border-neutral-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-400 font-bold">CURRENT ACTIVE TIER</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              ACTIVE &middot; AUTO-RENEWS
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-white">Enterprise AI Dedicated</div>
            <div className="text-xs text-neutral-400">$899 / month billed annually</div>
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-800/80 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-[#E6FF00] shrink-0" />
              <span>Up to 500 Enrolled Employees</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-[#E6FF00] shrink-0" />
              <span>Unlimited Edge CCTV RTSP Streams</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-[#E6FF00] shrink-0" />
              <span>PostgreSQL Multi-Tenant Row Isolation</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-[#E6FF00] shrink-0" />
              <span>Dedicated 99.99% SLA &amp; Anti-Spoofing</span>
            </div>
          </div>
        </div>

        {/* Live Metered Consumption */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-5">
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <span>Metered Usage Quotas</span>
              <span className="text-[11px] font-mono text-neutral-400">Resets in 11 days</span>
            </div>

            {/* Quota 1: Employee Seats */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-bold">Active Employee Seats</span>
                <span className="font-mono text-neutral-400">6 / 500 used (1.2%)</span>
              </div>
              <div className="h-2 rounded-full bg-[#0A0D17] border border-neutral-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '1.2%' }} />
              </div>
            </div>

            {/* Quota 2: Computer Vision Inference */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-bold">CCTV AI Vision Vector Inferences</span>
                <span className="font-mono text-[#E6FF00]">84,200 / 100,000 frames (84.2%)</span>
              </div>
              <div className="h-2 rounded-full bg-[#0A0D17] border border-neutral-800 overflow-hidden">
                <div className="h-full bg-[#E6FF00] rounded-full" style={{ width: '84.2%' }} />
              </div>
            </div>

            {/* Quota 3: CCTV Stream Channels */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-bold">Active RTSP Stream Channels</span>
                <span className="font-mono text-neutral-400">6 / Unlimited channels</span>
              </div>
              <div className="h-2 rounded-full bg-[#0A0D17] border border-neutral-800 overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
        <div className="text-sm font-bold text-white flex items-center justify-between">
          <span>Billing History &amp; VAT Tax Invoices</span>
          <span className="text-xs text-neutral-500 font-mono">Payment Method: Corporate Amex ending in 4018</span>
        </div>

        <div className="space-y-2">
          {[
            { id: 'INV-2026-10', date: 'Oct 01, 2026', amount: '$899.00', status: 'PAID' },
            { id: 'INV-2026-09', date: 'Sep 01, 2026', amount: '$899.00', status: 'PAID' },
            { id: 'INV-2026-08', date: 'Aug 01, 2026', amount: '$899.00', status: 'PAID' }
          ].map((inv) => (
            <div
              key={inv.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#0A0D17] border border-neutral-800 text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold font-mono text-white">{inv.id}</div>
                <div className="text-[10px] text-neutral-500">{inv.date} &middot; Enterprise Monthly</div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-white">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  {inv.status}
                </span>
                <button
                  onClick={() => alert(`Downloading invoice ${inv.id}...`)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#E6FF00] cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
