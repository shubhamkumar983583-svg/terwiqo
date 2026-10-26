import React, { useState } from 'react';
import { Camera, Plus, ArrowLeft, Edit2, Trash2, Save, AlertTriangle } from 'lucide-react';
import { CameraConfig } from '../data/mockData.ts';

interface PngCameraConfigViewProps {
  cameras: CameraConfig[];
  onSaveCamera: (cam: CameraConfig) => void;
  onDeleteCamera: (id: string) => void;
  onBackToHome: () => void;
}

export const PngCameraConfigView: React.FC<PngCameraConfigViewProps> = ({
  cameras,
  onSaveCamera,
  onDeleteCamera,
  onBackToHome
}) => {
  const [editingCamera, setEditingCamera] = useState<CameraConfig | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state
  const [formName, setFormName] = useState('CP PLUS');
  const [formLocation, setFormLocation] = useState('Gate 1');
  const [formSource, setFormSource] = useState('rtsp://192.168.0.11:554/stream0');
  const [formActive, setFormActive] = useState(true);

  const startEdit = (cam: CameraConfig) => {
    setEditingCamera(cam);
    setFormName(cam.name);
    setFormLocation(cam.location);
    setFormSource(cam.source);
    setFormActive(cam.status === 'Active');
    setIsAddingNew(false);
  };

  const startAdd = () => {
    setEditingCamera(null);
    setFormName('CP PLUS');
    setFormLocation('Gate 3');
    setFormSource('rtsp://192.168.0.13:554/stream0');
    setFormActive(true);
    setIsAddingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CameraConfig = {
      id: editingCamera?.id || `cam-${Date.now()}`,
      name: formName,
      location: formLocation,
      source: formSource,
      status: formActive ? 'Active' : 'No Source',
      fps: 30,
      roiSaved: true,
      model: 'Default Model',
      alertEnabled: true
    };
    onSaveCamera(updated);
    setEditingCamera(null);
    setIsAddingNew(false);
  };

  // If in Edit / Add mode, render the screen matching screenshot 6
  if (editingCamera || isAddingNew) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-white">
        <div className="bg-[#12141A] rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-[#FACC15] tracking-wide inline-flex items-center gap-2">
              <span>✏️</span>
              <span>Edit Camera Configuration</span>
            </h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#FACC15] mb-1.5">Camera Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#0A0C10] border border-neutral-700 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#FACC15] mb-1.5">Location</label>
              <input
                type="text"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#0A0C10] border border-neutral-700 rounded-xl text-white text-xs font-semibold focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#FACC15] mb-1.5">Camera Source</label>
              <input
                type="text"
                value={formSource}
                onChange={(e) => setFormSource(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#0A0C10] border border-neutral-700 rounded-xl text-white text-xs font-mono font-medium focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="activeCamCheck"
                checked={formActive}
                onChange={(e) => setFormActive(e.target.checked)}
                className="w-4 h-4 rounded text-yellow-400 focus:ring-yellow-400"
              />
              <label htmlFor="activeCamCheck" className="text-xs font-bold text-white cursor-pointer select-none">
                Active Camera
              </label>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-black text-black bg-[#FACC15] hover:bg-yellow-300 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💾</span>
                <span>Save Camera</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingCamera(null);
                  setIsAddingNew(false);
                }}
                className="w-full py-2.5 px-4 text-xs font-bold text-[#FACC15] hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>&larr; Back To Camera List</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Camera List screen matching screenshot 6 exactly
  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white select-none">
      {/* Title */}
      <div className="text-center pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#FACC15] tracking-wide inline-flex items-center gap-2">
          <span>📷</span>
          <span>Camera Configurations</span>
        </h2>
      </div>

      {/* Table with Green Header matching screenshot 6 */}
      <div className="bg-[#121829] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#48BB78] text-white text-xs font-bold tracking-wider uppercase">
              <th className="py-3 px-4">NAME</th>
              <th className="py-3 px-4">LOCATION</th>
              <th className="py-3 px-4">CAMERA SOURCE</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-neutral-800 bg-[#0F1424] text-neutral-200">
            {cameras.map((cam) => (
              <tr key={cam.id} className="hover:bg-[#1A2238] transition-colors">
                <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{cam.name}</td>
                <td className="py-3.5 px-4 font-semibold text-neutral-300">{cam.location}</td>
                <td className="py-3.5 px-4 font-mono text-cyan-300">{cam.source}</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{cam.status}</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="inline-flex items-center gap-2 text-yellow-400 font-bold">
                    <button
                      onClick={() => startEdit(cam)}
                      className="hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>✏️</span> Edit
                    </button>
                    <span className="text-neutral-500">|</span>
                    <button
                      onClick={() => onDeleteCamera(cam.id)}
                      className="text-yellow-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                    >
                      <span>🗑️</span> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons: + Add Camera | ← Back To Home */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={startAdd}
          className="px-5 py-2.5 rounded-xl text-xs font-black text-black bg-[#FACC15] hover:bg-yellow-300 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>+ Add Camera</span>
        </button>
        <button
          onClick={onBackToHome}
          className="px-5 py-2.5 rounded-xl text-xs font-black text-black bg-[#FACC15] hover:bg-yellow-300 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>&larr; Back To Home</span>
        </button>
      </div>

      {/* Yellow Outlined Box: Important Notes matching screenshot 6 */}
      <div className="p-6 rounded-2xl bg-[#12161A] border-2 border-yellow-500/80 text-yellow-300 text-xs space-y-2.5 shadow-xl">
        <div className="flex items-center gap-2 font-black text-sm text-yellow-400 uppercase">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span>Important Notes</span>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-200">
          <li>Use <span className="text-yellow-400 font-bold">0</span> for default laptop webcam</li>
          <li>Use <span className="text-yellow-400 font-bold">1</span> for USB camera</li>
          <li>Use full <span className="text-yellow-400 font-bold">RTSP / HTTP URL</span> for IP cameras</li>
          <li>Test camera stream in browser or VLC before saving</li>
          <li>Restart system engine after changing cameras</li>
        </ul>
      </div>
    </div>
  );
};
