import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Scan,
  UserCheck,
  ShieldCheck,
  RefreshCw,
  Search,
  Check,
  FileCheck,
  Copy
} from 'lucide-react';
import { Employee } from '../data/mockData.ts';

interface AiDocumentOnboardingViewProps {
  onEmployeeEnrolled?: (employee: Employee) => void;
}

export const AiDocumentOnboardingView: React.FC<AiDocumentOnboardingViewProps> = ({
  onEmployeeEnrolled
}) => {
  const [docType, setDocType] = useState<'passport' | 'national_id' | 'work_visa' | 'driving_license'>('national_id');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<{
    fullName: string;
    docNumber: string;
    dob: string;
    expiryDate: string;
    nationality: string;
    confidence: number;
    duplicateDetected: boolean;
    verificationStatus: 'verified' | 'flagged' | 'pending';
  } | null>({
    fullName: 'David K. Mensah',
    docNumber: 'GH-890214-A',
    dob: '1992-06-14',
    expiryDate: '2029-08-20',
    nationality: 'Ghanaian',
    confidence: 98.4,
    duplicateDetected: false,
    verificationStatus: 'verified'
  });

  const [onboardingChecklist, setOnboardingChecklist] = useState([
    { id: 'c1', label: 'Identity Document OCR Extraction', done: true },
    { id: 'c2', label: 'Government Registry Checksum Verification', done: true },
    { id: 'c3', label: 'Anti-Spoofing & Liveness Face Match', done: true },
    { id: 'c4', label: 'Automated Duplicate Face & ID Deduplication', done: true },
    { id: 'c5', label: 'Digital Employee Work Wallet Provisioning', done: false },
    { id: 'c6', label: 'CCTV Camera Node Vector Push (512-D)', done: false }
  ]);

  const handleSimulateOcr = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedData({
        fullName: 'Elena Rostova',
        docNumber: 'EU-772910-K',
        dob: '1995-11-23',
        expiryDate: '2031-04-15',
        nationality: 'Austrian',
        confidence: 99.1,
        duplicateDetected: false,
        verificationStatus: 'verified'
      });
      setOnboardingChecklist((prev) =>
        prev.map((item) => ({ ...item, done: true }))
      );
    }, 1000);
  };

  const toggleChecklist = (id: string) => {
    setOnboardingChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="p-6 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#E6FF00]/10 text-[#E6FF00] border border-[#E6FF00]/30 font-bold">
              SECTION 03
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">
              AI Document Onboarding &amp; OCR Engine
            </h1>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Zero-touch biometric onboarding: extract government ID credentials, verify liveness, detect duplicates, and provision digital credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateOcr}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isProcessing ? 'Running AI Vision OCR...' : 'Run Automated OCR Demo'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Upload & Extraction vs Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Upload & Document Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Scan className="w-4 h-4 text-[#E6FF00]" />
                <span>Upload Corporate or Government Credential</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-[#0A0D17] rounded-xl border border-neutral-800 text-xs">
                {(['national_id', 'passport', 'work_visa'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDocType(t)}
                    className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                      docType === t
                        ? 'bg-neutral-800 text-[#E6FF00]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onClick={handleSimulateOcr}
              className="border-2 border-dashed border-neutral-800 hover:border-[#E6FF00]/50 rounded-2xl p-8 text-center bg-[#0A0D17]/60 hover:bg-[#0A0D17] transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-[#E6FF00] flex items-center justify-center mx-auto mb-3 text-neutral-400 group-hover:text-[#E6FF00] transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white mb-1">
                Drop high-resolution scan or click to browse
              </div>
              <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                Supports PDF, PNG, JPG, TIFF up to 25MB. Text extraction and security watermark validation happen in real-time.
              </p>
            </div>

            {/* Extracted Form Fields */}
            {extractedData && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-neutral-300 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    Verified Extracted Fields
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono text-[11px]">
                    OCR Confidence: {extractedData.confidence}%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-medium">Extracted Name</div>
                    <div className="text-xs font-bold text-white truncate">{extractedData.fullName}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-medium">Doc Number</div>
                    <div className="text-xs font-bold font-mono text-[#E6FF00] truncate">{extractedData.docNumber}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-medium">Date of Birth</div>
                    <div className="text-xs font-bold text-neutral-300 font-mono">{extractedData.dob}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-medium">Expiry Date</div>
                    <div className="text-xs font-bold text-neutral-300 font-mono">{extractedData.expiryDate}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-medium">Nationality</div>
                    <div className="text-xs font-bold text-neutral-300">{extractedData.nationality}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A0D17] border border-neutral-800">
                    <div className="text-[10px] text-neutral-500 font-medium">Duplicate Deduplication</div>
                    <div className="text-xs font-bold text-emerald-400">Zero Collisions</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Onboarding Checklist & Compliance */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#101524] border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#E6FF00]" />
                <span>Onboarding Compliance Pipeline</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                {onboardingChecklist.filter((c) => c.done).length} / {onboardingChecklist.length} Complete
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2">
              {onboardingChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    item.done
                      ? 'bg-[#0A0D17] border-neutral-800 text-neutral-200'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        item.done
                          ? 'bg-[#E6FF00] border-[#E6FF00] text-black'
                          : 'border-neutral-700 bg-[#0A0D17]'
                      }`}
                    >
                      {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      item.done
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {item.done ? 'PASSED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-2">
              <button
                onClick={() => alert('Employee successfully onboarded and pushed to edge CCTV nodes!')}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#E6FF00] hover:bg-[#d4eb00] text-black transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Approve &amp; Generate Digital Credential</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
