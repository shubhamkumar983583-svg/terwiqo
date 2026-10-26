import React, { useState, useEffect } from 'react';
import {
  Key,
  Webhook,
  Cpu,
  CheckCircle2,
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Shield,
  Layers,
  Send,
  Database,
  Radio,
  Server,
  Zap
} from 'lucide-react';
import { supabase, SUPABASE_PROJECT_META } from '../utils/supabaseClient.ts';

export const IntegrationsApiView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supabase' | 'api_keys' | 'webhooks' | 'hardware' | 'accounting'>('supabase');
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_live_901', name: 'Turnstile Edge Daemon (Gate 1)', prefix: 'wp_live_9a...71c', created: '2026-09-12', scope: 'attendance:write' },
    { id: 'key_live_902', name: 'Hikvision CCTV RTSP Stream Connector', prefix: 'wp_live_4b...88e', created: '2026-10-01', scope: 'camera:events' },
    { id: 'key_live_903', name: 'SAP Payroll Integration Sync', prefix: 'wp_live_1c...99a', created: '2026-10-14', scope: 'payroll:read' }
  ]);

  const [webhookUrl, setWebhookUrl] = useState('https://api.workpulse.company.internal/webhooks/attendance');
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);

  // Supabase live status state
  const [supabaseLoading, setSupabaseLoading] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean;
    latencyMs: number;
    message: string;
    checkedAt?: string;
  } | null>(null);

  const checkSupabaseStatus = async () => {
    setSupabaseLoading(true);
    try {
      const res = await fetch('/api/supabase/status');
      const data = await res.json();
      setSupabaseStatus(data);
    } catch (err: any) {
      setSupabaseStatus({
        connected: false,
        latencyMs: 0,
        message: err.message || 'Network error pinging Supabase'
      });
    } finally {
      setSupabaseLoading(false);
    }
  };

  useEffect(() => {
    checkSupabaseStatus();
  }, []);

  const handleGenerateKey = () => {
    const newId = `key_live_${Date.now().toString().slice(-4)}`;
    setApiKeys([
      ...apiKeys,
      {
        id: newId,
        name: `Production Service Token #${apiKeys.length + 1}`,
        prefix: `wp_live_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 5)}`,
        created: 'Today',
        scope: 'full:access'
      }
    ]);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const handleTestWebhook = () => {
    setWebhookStatus('Dispatching mock event `punch.biometric_verified` (HTTP 200 OK, Latency: 42ms)...');
  };

  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/30 font-bold">
              SECTION 15 &middot; SUPABASE CONNECTED
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Enterprise Integrations &amp; Cloud Database
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Connected Supabase PostgreSQL project (<span className="text-[#3ECF8E] font-mono font-bold">yogadwjqfmdehuddwxaf</span>), turnstiles, CCTV RTSP stream processors, and developer APIs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#101524] rounded-xl border border-neutral-800 text-xs font-bold overflow-x-auto">
          {(['supabase', 'api_keys', 'webhooks', 'hardware', 'accounting'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer shrink-0 ${
                activeTab === t
                  ? t === 'supabase'
                    ? 'bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]/40'
                    : 'bg-neutral-800 text-[#FFA069]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t === 'supabase' ? '⚡ Supabase Cloud' : t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 0: Supabase Cloud Database */}
      {activeTab === 'supabase' && (
        <div className="space-y-6">
          {/* Main Supabase Project Card */}
          <div className="p-6 rounded-3xl bg-[#121622] border border-[#3ECF8E]/30 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/40 flex items-center justify-center text-[#3ECF8E] shrink-0 shadow-lg">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-white tracking-tight">
                      Supabase Cloud PostgreSQL
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3ECF8E]/20 text-[#3ECF8E] border border-[#3ECF8E]/40 font-bold">
                      ACTIVE &middot; CONNECTED
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                    Project ID: <strong className="text-white">{SUPABASE_PROJECT_META.projectId}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={checkSupabaseStatus}
                  disabled={supabaseLoading}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#3ECF8E] hover:bg-[#34b27b] text-black transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${supabaseLoading ? 'animate-spin' : ''}`} />
                  <span>{supabaseLoading ? 'Pinging...' : 'Test Connection'}</span>
                </button>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_META.projectId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                >
                  <span>Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </div>
            </div>

            {/* Connection Telemetry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#0B0E17] border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-mono uppercase">API Endpoint</div>
                <div className="text-xs font-mono text-white font-bold truncate">
                  {SUPABASE_PROJECT_META.url}
                </div>
                <div className="text-[10px] text-[#3ECF8E] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
                  <span>HTTPS REST &amp; GraphQL</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0E17] border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-mono uppercase">API Key (Publishable)</div>
                <div className="text-xs font-mono text-white font-bold truncate">
                  {SUPABASE_PROJECT_META.keyPrefix}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  Anonymous client access
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0B0E17] border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 font-mono uppercase">Connection Latency</div>
                <div className="text-xs font-mono text-white font-bold">
                  {supabaseStatus ? `${supabaseStatus.latencyMs} ms` : 'Testing...'}
                </div>
                <div className="text-[10px] font-mono text-[#3ECF8E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
                  <span>{supabaseStatus?.message || 'Realtime connected'}</span>
                </div>
              </div>
            </div>

            {/* Active Features Checklist */}
            <div className="p-4 rounded-2xl bg-[#0B0E17] border border-neutral-800 space-y-2.5">
              <div className="text-xs font-bold text-neutral-300 font-mono uppercase tracking-wider">
                Integrated Supabase Capabilities
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" />
                  <span>PostgreSQL 15+</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" />
                  <span>Row Level Security (RLS)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" />
                  <span>Realtime WebSockets</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" />
                  <span>Multi-Tenant Auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: API Keys */}
      {activeTab === 'api_keys' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-white">Active Service Credentials</div>
            <button
              onClick={handleGenerateKey}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate API Key</span>
            </button>
          </div>

          <div className="space-y-2">
            {apiKeys.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-2xl bg-[#101524] border border-neutral-800 flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-white">{k.name}</div>
                  <div className="font-mono text-neutral-400 flex items-center gap-2">
                    <span className="text-[#E6FF00]">{k.prefix}</span>
                    <span className="text-neutral-600">&middot;</span>
                    <span className="text-[10px] text-neutral-500">Created: {k.created}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-[10px] text-neutral-300">
                    {k.scope}
                  </span>
                  <button
                    onClick={() => handleRevokeKey(k.id)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Revoke Key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Webhooks */}
      {activeTab === 'webhooks' && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Webhook className="w-4 h-4 text-[#E6FF00]" />
            <span>Real-time Event Webhook Gateway</span>
          </div>

          <p className="text-xs text-neutral-400">
            Send signed HMAC-SHA256 payloads to your internal endpoint whenever employees check in, CCTV detects a tailgating event, or overtime is triggered.
          </p>

          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">Target Endpoint URL</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#0A0D17] border border-neutral-800 focus:border-[#E6FF00] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none"
            />
          </div>

          {webhookStatus && (
            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              {webhookStatus}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleTestWebhook}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Test Webhook Event</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Hardware Connectors */}
      {activeTab === 'hardware' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Hikvision / Dahua ONVIF Edge Agent', status: 'ONLINE', count: '6 Cameras Linked', protocol: 'RTSP / ONVIF Profile S' },
            { name: 'ZKTeco ProCapture Turnstile Controller', status: 'ONLINE', count: '4 Gates Active', protocol: 'Wiegand 26 / TCP/IP' },
            { name: 'Honeywell HF680 High-Speed QR Scanner', status: 'ONLINE', count: '2 Kiosks Active', protocol: 'HID USB Keyboard Emulation' }
          ].map((h) => (
            <div key={h.name} className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <Cpu className="w-5 h-5 text-[#E6FF00]" />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
                  {h.status}
                </span>
              </div>
              <div className="text-sm font-bold text-white">{h.name}</div>
              <div className="text-xs text-neutral-400">{h.count}</div>
              <div className="text-[10px] font-mono text-neutral-500">{h.protocol}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Accounting Integrations */}
      {activeTab === 'accounting' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'SAP SuccessFactors', desc: 'Direct two-way biometric attendance sync and payroll ledger export.', connected: true },
            { name: 'QuickBooks Payroll', desc: 'Automatic calculation of overtime hours, gross pay, and deductions.', connected: true },
            { name: 'Workday HRMS', desc: 'Automated employee lifecycle sync, onboarding, and department roster updates.', connected: false }
          ].map((acc) => (
            <div key={acc.name} className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white">{acc.name}</div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    acc.connected
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      : 'bg-neutral-900 text-neutral-500'
                  }`}
                >
                  {acc.connected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
              <p className="text-xs text-neutral-400">{acc.desc}</p>
              <button
                onClick={() => alert(`Configuring ${acc.name} OAuth credentials...`)}
                className="w-full py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              >
                {acc.connected ? 'Manage Sync Rules' : 'Connect Account'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
