import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Crosshair,
  User,
  Clock,
  Zap,
  Radio,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Navigation,
  Compass
} from 'lucide-react';
import {
  DEFAULT_CAMPUS_CENTER,
  DEFAULT_PERIMETERS,
  INITIAL_PUNCH_LOCATIONS,
  EmployeePunchLocation,
  GeofencePerimeter,
  calculateGeofenceSummary,
  filterPunchLocations,
  generateSimulatedPunch
} from '../utils/geofenceMapUtils.ts';

interface InteractiveGeofenceMapProps {
  tenantName?: string;
  className?: string;
}

export function InteractiveGeofenceMap({
  tenantName = 'Face Recognition Attendance System',
  className = ''
}: InteractiveGeofenceMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [perimeters, setPerimeters] = useState<GeofencePerimeter[]>(DEFAULT_PERIMETERS);
  const [punches, setPunches] = useState<EmployeePunchLocation[]>(INITIAL_PUNCH_LOCATIONS);
  const [selectedPunch, setSelectedPunch] = useState<EmployeePunchLocation | null>(INITIAL_PUNCH_LOCATIONS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'verified_inside' | 'violation_outside'>('all');
  const [mainRadius, setMainRadius] = useState<number>(250);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite'>('dark');

  // Summary telemetry
  const summary = calculateGeofenceSummary(punches, perimeters);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [DEFAULT_CAMPUS_CENTER.latitude, DEFAULT_CAMPUS_CENTER.longitude],
        zoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      // Add dark tile layer matching applet theme (no watermark, free & reliable)
      const tileUrl =
        mapStyle === 'dark'
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

      L.tileLayer(tileUrl, {
        maxZoom: 18,
        attribution: '&copy; Esri, OpenStreetMap'
      }).addTo(map);

      // Custom zoom control in bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Layer group for dynamic updates
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map tile when mapStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl =
      mapStyle === 'dark'
        ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

    L.tileLayer(tileUrl, {
      maxZoom: 18,
      attribution: '&copy; Esri, OpenStreetMap'
    }).addTo(map);

    // Re-draw layers
    renderMapElements();
  }, [mapStyle]);

  // Update Main Perimeter radius
  useEffect(() => {
    setPerimeters((prev) =>
      prev.map((p) => (p.id === 'perim-main-plant' ? { ...p, radiusMeters: mainRadius } : p))
    );
  }, [mainRadius]);

  // Render Perimeters and Markers
  const renderMapElements = () => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // 1. Draw Geofence Perimeters
    perimeters.forEach((p) => {
      const circle = L.circle([p.center.latitude, p.center.longitude], {
        radius: p.radiusMeters,
        color: p.color,
        fillColor: p.color,
        fillOpacity: 0.15,
        weight: 2,
        dashArray: p.id === 'perim-main-plant' ? undefined : '4, 6'
      });

      circle.bindTooltip(
        `<div style="font-family: monospace; font-size: 11px; font-weight: bold; color: ${p.color};">
          ${p.name} (${p.radiusMeters}m Radius)
        </div>`,
        { permanent: false, direction: 'top', className: 'glass-tooltip' }
      );

      layerGroup.addLayer(circle);
    });

    // 2. Draw Punch Markers
    const filtered = filterPunchLocations(punches, filterMode);

    filtered.forEach((punch) => {
      const isVerified = punch.status === 'verified_inside';
      const markerColor = isVerified ? '#34D399' : '#EF4444';

      // Custom DivIcon with glowing pulse
      const customIcon = L.divIcon({
        className: 'custom-punch-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 9999px;
            background: rgba(10, 14, 26, 0.9);
            border: 2px solid ${markerColor};
            box-shadow: 0 0 14px ${markerColor}80;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
          ">
            <span style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 9999px;
              background: ${markerColor};
              opacity: 0.3;
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></span>
            <span style="font-size: 11px; font-weight: 900; color: #FFF; font-family: monospace; z-index: 10;">
              ${punch.employeeName.charAt(0)}
            </span>
          </div>
        `
      });

      const marker = L.marker([punch.coordinate.latitude, punch.coordinate.longitude], {
        icon: customIcon
      });

      marker.on('click', () => {
        setSelectedPunch(punch);
      });

      marker.bindPopup(
        `<div style="font-family: sans-serif; font-size: 12px; color: #FFF; background: #0E1322; padding: 6px; border-radius: 12px; min-width: 180px;">
          <div style="font-weight: 800; font-size: 13px; color: ${markerColor};">
            ${punch.employeeName}
          </div>
          <div style="color: #94A3B8; font-size: 10px; font-family: monospace; margin-top: 2px;">
            ${punch.department} • ${punch.employeeId}
          </div>
          <div style="margin-top: 6px; font-size: 11px;">
            Status: <strong style="color: ${markerColor};">${isVerified ? 'IN-BOUNDS (VERIFIED)' : 'OUT-OF-BOUNDS (REJECTED)'}</strong>
          </div>
          <div style="color: #CBD5E1; font-size: 10px; margin-top: 2px;">
            Distance: <strong>${punch.distanceFromCenterMeters}m</strong> from facility
          </div>
          <div style="color: #FFA069; font-size: 9px; font-family: monospace; margin-top: 4px;">
            ${punch.source} • ${punch.timestamp}
          </div>
        </div>`,
        { className: 'glass-popup' }
      );

      layerGroup.addLayer(marker);
    });
  };

  // Trigger re-render whenever perimeters, punches, or filter changes
  useEffect(() => {
    renderMapElements();
  }, [perimeters, punches, filterMode]);

  // Reset View to Campus Center
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([DEFAULT_CAMPUS_CENTER.latitude, DEFAULT_CAMPUS_CENTER.longitude], 16, {
      duration: 1.2
    });
  };

  // Simulate new live punch
  const handleSimulateNewPunch = (forceViolation = false) => {
    setIsSimulating(true);
    setTimeout(() => {
      const newPunch = generateSimulatedPunch(DEFAULT_CAMPUS_CENTER, forceViolation);
      setPunches((prev) => [newPunch, ...prev]);
      setSelectedPunch(newPunch);
      setIsSimulating(false);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([newPunch.coordinate.latitude, newPunch.coordinate.longitude]);
      }
    }, 400);
  };

  return (
    <div className={`space-y-4 text-left select-none ${className}`}>
      {/* Header & Telemetry Summary Ribbon */}
      <div className="p-5 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-[#FFA069] border border-orange-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-[#FFA069]" />
              <span>LIVE GEOFENCING PERIMETER</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              Active Tenant: {tenantName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            Campus Boundary &amp; Real-Time Punch Map
          </h2>
          <p className="text-xs text-neutral-300 max-w-xl">
            Live OpenStreetMap visualization of authorized facility geofencing zones, CCTV RTSP turnstiles, and GPS attendance clock-in coordinates.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <div className="text-[10px] text-neutral-400 font-mono">TOTAL PUNCHES</div>
            <div className="text-lg font-black text-white font-mono">{summary.totalPunches}</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <div className="text-[10px] text-emerald-400 font-mono">IN-BOUNDS</div>
            <div className="text-lg font-black text-emerald-400 font-mono">{summary.inBoundsCount}</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-red-500/10 border border-red-500/30 text-center">
            <div className="text-[10px] text-red-400 font-mono">VIOLATIONS</div>
            <div className="text-lg font-black text-red-400 font-mono">{summary.outOfBoundsCount}</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-[#C7F238]/10 border border-[#C7F238]/30 text-center">
            <div className="text-[10px] text-[#C7F238] font-mono">COMPLIANCE</div>
            <div className="text-lg font-black text-[#C7F238] font-mono">{summary.complianceRate}%</div>
          </div>
        </div>
      </div>

      {/* Map Control Bar */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#FFA069] text-black shadow-md shadow-orange-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Punches ({punches.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('verified_inside')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterMode === 'verified_inside'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Verified In-Bounds ({summary.inBoundsCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('violation_outside')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterMode === 'violation_outside'
                ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Violations ({summary.outOfBoundsCount})
          </button>
        </div>

        {/* Radius Adjuster */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400 font-mono">Main Plant Radius:</span>
          <input
            type="range"
            min="100"
            max="500"
            step="25"
            value={mainRadius}
            onChange={(e) => setMainRadius(Number(e.target.value))}
            className="w-28 accent-[#FFA069] cursor-pointer"
          />
          <span className="font-mono font-bold text-[#FFA069] w-12">{mainRadius}m</span>
        </div>

        {/* Map Actions */}
        <div className="flex items-center gap-2">
          {/* Map Style Toggle */}
          <button
            type="button"
            onClick={() => setMapStyle(mapStyle === 'dark' ? 'satellite' : 'dark')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#FFA069]" />
            <span className="capitalize">{mapStyle === 'dark' ? 'Dark Vector' : 'Satellite'}</span>
          </button>

          {/* Recenter */}
          <button
            type="button"
            onClick={handleRecenter}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
            title="Recenter Map to Campus"
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Simulate In-Bounds */}
          <button
            type="button"
            onClick={() => handleSimulateNewPunch(false)}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-400 font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>+ In-Bounds Punch</span>
          </button>

          {/* Simulate Violation */}
          <button
            type="button"
            onClick={() => handleSimulateNewPunch(true)}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 border border-red-500/40 text-red-400 font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>+ Test Violation</span>
          </button>
        </div>
      </div>

      {/* Main Map + Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Leaflet Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#090C16] border border-white/12 overflow-hidden shadow-2xl relative min-h-[460px] h-[460px]">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Map Legend Overlay */}
          <div className="absolute top-4 left-4 z-10 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-[11px] space-y-1.5 max-w-xs shadow-xl pointer-events-none">
            <div className="text-white font-bold font-mono">ACTIVE PERIMETERS</div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFA069] shadow-[0_0_6px_#FFA069]" />
              <span>Main Plant Floor ({mainRadius}m)</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C7F238] shadow-[0_0_6px_#C7F238]" />
              <span>Logistics Dock (120m)</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]" />
              <span>R&amp;D Annex (160m)</span>
            </div>
          </div>
        </div>

        {/* Selected Punch & Recent Activity Ledger (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          {/* Inspection Card */}
          {selectedPunch ? (
            <div className="p-5 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#FFA069] uppercase font-bold tracking-wider">
                  SELECTED PUNCH EVENT
                </span>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                    selectedPunch.status === 'verified_inside'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/15 text-red-400 border-red-500/30'
                  }`}
                >
                  {selectedPunch.status === 'verified_inside' ? 'VERIFIED IN-BOUNDS' : 'OUT-OF-BOUNDS ALERT'}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {selectedPunch.avatar ? (
                  <img
                    src={selectedPunch.avatar}
                    alt={selectedPunch.employeeName}
                    className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-md"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-black text-white text-base">
                    {selectedPunch.employeeName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-base font-bold text-white tracking-tight">
                    {selectedPunch.employeeName}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    {selectedPunch.employeeId} • {selectedPunch.department}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Timestamp:</span>
                  <span className="font-mono text-white">{selectedPunch.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Source:</span>
                  <span className="font-mono text-[#FFA069]">{selectedPunch.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Haversine Distance:</span>
                  <span className="font-mono font-bold text-white">
                    {selectedPunch.distanceFromCenterMeters}m from Plant Center
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">GPS Coordinates:</span>
                  <span className="font-mono text-[10px] text-neutral-300">
                    {selectedPunch.coordinate.latitude}, {selectedPunch.coordinate.longitude}
                  </span>
                </div>
                {selectedPunch.notes && (
                  <div className="pt-1 text-[11px] text-neutral-300 border-t border-white/5">
                    {selectedPunch.notes}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 text-center text-neutral-400 text-xs">
              Click any pin on the map to inspect authentication details.
            </div>
          )}

          {/* Quick List of Recent 4 Clock-ins */}
          <div className="p-4 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_0_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-2">
            <div className="text-xs font-bold text-white flex items-center justify-between pb-1">
              <span>Recent Clock-in Events</span>
              <span className="text-[10px] font-mono text-neutral-400">Live GPS Sync</span>
            </div>

            <div className="space-y-1.5 max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-1">
              {punches.slice(0, 4).map((p) => {
                const isMatch = selectedPunch?.id === p.id;
                const isOk = p.status === 'verified_inside';

                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPunch(p);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.panTo([p.coordinate.latitude, p.coordinate.longitude]);
                      }
                    }}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isMatch
                        ? 'bg-white/[0.08] border-[#FFA069]/60 shadow-sm'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isOk ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-red-500 shadow-[0_0_6px_#ef4444]'
                        }`}
                      />
                      <span className="font-semibold text-white truncate">{p.employeeName}</span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                      {p.distanceFromCenterMeters}m • {p.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
