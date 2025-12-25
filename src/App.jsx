import React, { useState, useEffect, useRef } from 'react';

// --- 1. ICONS (Inline SVGs) ---
const TerminalIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>);
const CpuIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>);
const HardDriveIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>);
const SettingsIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>);
const ShieldIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const MenuIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const FileTextIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>);
const CopyIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>);
const CheckIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>);
const CrosshairIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>);
const BookOpenIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);
const LockIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const EyeIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const NetworkIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>);
const TimerIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const ZapIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const PaletteIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>);
const AlertTriangleIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const LinkIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>);
const UnlinkIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"></path><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"></path><line x1="8" y1="2" x2="8" y2="5"></line><line x1="2" y1="8" x2="5" y2="8"></line><line x1="16" y1="19" x2="16" y2="22"></line><line x1="19" y1="16" x2="22" y2="16"></line></svg>);
const LayersIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>);
const StarIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);
const CardIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>);
const ListIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>);
const WrenchIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>);
const TrashIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const SearchIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const UserPlusIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>);
const ChevronDownIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>);
const ChevronUpIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"></polyline></svg>);
const RotateCcwIcon = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>);

// --- 2. COMPONENTS ---

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = text ? String(text) : "";
    try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        // Fallback
        try {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Copy failed", e);
        }
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className="absolute top-2 right-2 p-1 bg-slate-700 hover:bg-slate-600 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
    </button>
  );
};

const CodeBlock = ({ children, color = "blue" }) => {
  const textColor = color === "green" ? "text-green-300" : "text-blue-200";
  return (
    <div className={`bg-slate-900 rounded-lg p-3 text-xs ${textColor} font-mono relative group mb-2`}>
      <CopyButton text={children} />
      <pre>{children}</pre>
    </div>
  );
};

const ProgressBar = ({ completed, total }) => {
    const percentage = Math.round((completed / total) * 100) || 0;
    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
            <div className="bg-green-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

// --- VISUALIZERS ---

const LVMVisualizer = ({ lvmState }) => {
    const getVgForPv = (pvName) => lvmState.vgs.find(vg => vg.pvs.includes(pvName));
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><LayersIcon size={16} className="text-amber-500"/> Live LVM Stack</h3>
                <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded" onClick={() => alert("Type commands like 'pvcreate /dev/vdb1' in the terminal to see this update!")}>Info</button>
            </div>
            <div className="bg-slate-100 p-3 rounded-lg border border-slate-300 relative">
                <div className="absolute top-0 right-0 bg-slate-300 text-slate-600 text-[9px] px-1 rounded-bl">Physical Disks</div>
                <div className="flex gap-2 mt-2">
                    {['/dev/vdb1', '/dev/vdb2'].map(disk => {
                        const isPv = lvmState.pvs.includes(disk);
                        const assignedVg = getVgForPv(disk);
                        return (
                            <div key={disk} className={`flex-1 p-2 rounded transition-all duration-500 border-2 ${isPv ? 'bg-amber-50 border-amber-400' : 'bg-slate-200 border-slate-300'}`}>
                                <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700"><HardDriveIcon size={12}/> {disk}</div>
                                <div className="text-[10px] text-center text-slate-500">{isPv ? "PV Initialized" : "Raw Partition"}</div>
                                {assignedVg && (
                                    <div className="mt-2 bg-amber-100 border border-amber-500 rounded p-1 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="text-[10px] font-bold text-amber-800 text-center">VG: {assignedVg.name}</div>
                                        <div className="mt-1 flex flex-col gap-1">
                                            {lvmState.lvs.filter(lv => lv.vg === assignedVg.name).map(lv => (
                                                <div key={lv.name} className="bg-amber-200 border border-amber-600 rounded px-1 py-1 relative group">
                                                     <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-amber-900">LV: {lv.name}</span><span className="text-[9px] text-amber-800">{lv.size}</span></div>
                                                     {lv.fs && <div className="mt-1 bg-green-500 text-white text-[9px] font-bold text-center rounded shadow-sm">FS: {lv.fs.toUpperCase()}</div>}
                                                </div>
                                            ))}
                                            {lvmState.lvs.filter(lv => lv.vg === assignedVg.name).length === 0 && <div className="text-[9px] text-amber-600 text-center italic py-1">Free Space</div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PermissionsCalculator = () => {
    const [perms, setPerms] = useState({ u: { r: true, w: true, x: true }, g: { r: true, w: false, x: true }, o: { r: true, w: false, x: true } });
    const toggle = (who, what) => setPerms(p => ({ ...p, [who]: { ...p[who], [what]: !p[who][what] } }));
    const calcOctal = (p) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
    const octal = `${calcOctal(perms.u)}${calcOctal(perms.g)}${calcOctal(perms.o)}`;
    const sym = (p) => `${p.r ? 'r' : '-'}${p.w ? 'w' : '-'}${p.x ? 'x' : '-'}`;
    const symbolic = `${sym(perms.u)}${sym(perms.g)}${sym(perms.o)}`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><LockIcon size={16} className="text-blue-500"/> Permission Calculator</h3>
            <div className="flex justify-between mb-6">
                {['u', 'g', 'o'].map(who => (
                    <div key={who} className="flex flex-col gap-2 items-center w-1/3 border-r last:border-0 border-slate-100">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">{who === 'u' ? 'User' : who === 'g' ? 'Group' : 'Other'}</div>
                        {['r', 'w', 'x'].map(what => (
                            <label key={what} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded w-full justify-center">
                                <input type="checkbox" checked={perms[who][what]} onChange={() => toggle(who, what)} className="accent-blue-600"/>
                                <span className="font-mono font-bold text-slate-700">{what.toUpperCase()}</span>
                            </label>
                        ))}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100 p-2 rounded text-center"><div className="text-[10px] text-slate-500 uppercase">Octal</div><div className="font-mono text-xl font-bold text-blue-600">{octal}</div></div>
                <div className="bg-slate-100 p-2 rounded text-center"><div className="text-[10px] text-slate-500 uppercase">Symbolic</div><div className="font-mono text-xl font-bold text-blue-600">{symbolic}</div></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-center"><CodeBlock color="blue">{`chmod ${octal} filename`}</CodeBlock></div>
        </div>
    );
};

const RegexPlayground = () => {
    const [pattern, setPattern] = useState('^root');
    const sampleText = "root:x:0:0:root:/root:/bin/bash\nbin:x:1:1:bin:/bin:/sbin/nologin\ndaemon:x:2:2:daemon:/sbin:/sbin/nologin\nadm:x:3:4:adm:/var/adm:/sbin/nologin\nlp:x:4:7:lp:/var/spool/lpd:/sbin/nologin";
    const getHighlightedText = () => {
        if (!pattern) return sampleText;
        try {
            const regex = new RegExp(pattern, 'gm');
            const parts = sampleText.split(regex);
            const matches = sampleText.match(regex);
            if (!matches) return sampleText;
            return parts.reduce((acc, part, i) => i < parts.length - 1 ? [...acc, part, <span key={i} className="bg-yellow-200 text-black font-bold">{matches[i]}</span>] : [...acc, part], []);
        } catch (e) { return sampleText; }
    };
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><SearchIcon size={16} className="text-pink-500"/> Regex Playground (grep)</h3>
            <div className="mb-4"><input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex (e.g. ^root, nologin$)" className="w-full border rounded p-2 font-mono text-sm border-slate-300 focus:border-pink-500 outline-none"/></div>
            <div className="bg-slate-900 p-3 rounded text-slate-300 font-mono text-xs whitespace-pre-wrap">{getHighlightedText()}</div>
            <p className="text-[10px] text-slate-400 mt-2">Try: <code>^root</code>, <code>nologin$</code>, <code>[0-9]</code></p>
        </div>
    );
};

const CronBuilder = () => {
    const [val, setVal] = useState({ m: '0', h: '2', dom: '*', mon: '*', dow: '*' });
    const update = (k, v) => setVal(p => ({ ...p, [k]: v }));
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
             <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><TimerIcon size={16} className="text-purple-500"/> Cron Builder</h3>
            <div className="grid grid-cols-5 gap-2 mb-4 text-center">
                {['m','h','dom','mon','dow'].map(k => (
                    <div key={k}><input value={val[k]} onChange={(e) => update(k, e.target.value)} className="w-full border border-slate-300 rounded p-1 text-center font-mono text-sm focus:border-purple-500 outline-none"/><div className="text-[9px] text-slate-400 mt-1 uppercase font-bold">{k}</div></div>
                ))}
            </div>
            <CodeBlock>{`${val.m} ${val.h} ${val.dom} ${val.mon} ${val.dow} /path/to/script`}</CodeBlock>
        </div>
    )
};

const FindBuilder = () => {
    const [path, setPath] = useState('/var');
    const [name, setName] = useState('*.log');
    const [user, setUser] = useState('');
    const [size, setSize] = useState('+10M');
    const [action, setAction] = useState('print');
    let cmd = `find ${path}`;
    if (name) cmd += ` -name "${name}"`;
    if (user) cmd += ` -user ${user}`;
    if (size) cmd += ` -size ${size}`;
    if (action === 'delete') cmd += ` -exec rm -f {} \\;`;
    if (action === 'exec') cmd += ` -exec cp {} /tmp \\;`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><SearchIcon size={16} className="text-blue-500"/> Find Command Builder</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Path</label><input value={path} onChange={e=>setPath(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Name Pattern</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">User (Optional)</label><input value={user} onChange={e=>setUser(e.target.value)} placeholder="root" className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Size (Optional)</label><input value={size} onChange={e=>setSize(e.target.value)} placeholder="+10M" className="w-full border rounded p-1 text-sm"/></div>
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">Action</label><select value={action} onChange={e=>setAction(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="print">Print (Default)</option><option value="delete">Delete (-exec rm)</option><option value="exec">Copy to /tmp (-exec cp)</option></select></div>
            </div>
            <CodeBlock>{cmd}</CodeBlock>
        </div>
    );
};

const NetworkBuilder = () => {
    const [con, setCon] = useState('static-eth0');
    const [iface, setIface] = useState('eth0');
    const [ip, setIp] = useState('172.25.250.10');
    const [gw, setGw] = useState('172.25.250.254');
    const [dns, setDns] = useState('172.25.250.220');
    const cmd = `nmcli con add con-name ${con} ifname ${iface} type ethernet ipv4.method manual ipv4.addresses ${ip}/24 ipv4.gateway ${gw} ipv4.dns ${dns}`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><NetworkIcon size={16} className="text-emerald-500"/> Network Configurator</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Connection Name</label><input value={con} onChange={e=>setCon(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Interface</label><input value={iface} onChange={e=>setIface(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">IP Address</label><input value={ip} onChange={e=>setIp(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Gateway</label><input value={gw} onChange={e=>setGw(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">DNS</label><input value={dns} onChange={e=>setDns(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
            </div>
            <CodeBlock color="green">{cmd}</CodeBlock>
            <p className="text-[10px] text-slate-400 mt-2">Don't forget: <code className="bg-slate-100 px-1 rounded">nmcli con up {con}</code> afterwards.</p>
        </div>
    );
};

const FstabBuilder = () => {
    const [uuid, setUuid] = useState('5b327b...a2');
    const [mount, setMount] = useState('/data');
    const [type, setType] = useState('xfs');
    const [opts, setOpts] = useState('defaults');
    const [dump, setDump] = useState('0');
    const [pass, setPass] = useState('0');
    const line = `UUID=${uuid}  ${mount}  ${type}  ${opts}  ${dump}  ${pass}`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><HardDriveIcon size={16} className="text-amber-500"/> FSTAB Generator</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">UUID (blkid)</label><input value={uuid} onChange={e=>setUuid(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Type</label><select value={type} onChange={e=>setType(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="xfs">xfs</option><option value="ext4">ext4</option><option value="vfat">vfat</option><option value="swap">swap</option></select></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Mount Point</label><input value={mount} onChange={e=>setMount(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Options</label><input value={opts} onChange={e=>setOpts(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Dump / Pass</label><div className="flex gap-1"><input value={dump} onChange={e=>setDump(e.target.value)} className="w-1/2 border rounded p-1 text-sm font-mono text-center"/><input value={pass} onChange={e=>setPass(e.target.value)} className="w-1/2 border rounded p-1 text-sm font-mono text-center"/></div></div>
            </div>
            <CodeBlock color="blue">{line}</CodeBlock>
            <p className="text-[10px] text-slate-400 mt-2">Add this to <code>/etc/fstab</code>. Use <code>mount -a</code> to test.</p>
        </div>
    );
};

const SwapBuilder = () => {
    const [device, setDevice] = useState('/dev/vdb2');
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><HardDriveIcon size={16} className="text-amber-500"/> Swap Space Manager</h3>
            <div className="mb-4"><label className="text-[10px] uppercase font-bold text-slate-500">Swap Partition/Device</label><input value={device} onChange={e=>setDevice(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
            <div className="space-y-2"><div className="text-[10px] uppercase font-bold text-slate-400">1. Initialize</div><CodeBlock color="green">{`mkswap ${device}`}</CodeBlock><div className="text-[10px] uppercase font-bold text-slate-400">2. Activate (Temporary)</div><CodeBlock color="green">{`swapon ${device}`}</CodeBlock><div className="text-[10px] uppercase font-bold text-slate-400">3. Persist (/etc/fstab)</div><CodeBlock color="blue">{`${device}  none  swap  defaults  0  0`}</CodeBlock></div>
        </div>
    );
};

const UserBuilder = () => {
    const [user, setUser] = useState('alex');
    const [uid, setUid] = useState('');
    const [gid, setGid] = useState('');
    const [groups, setGroups] = useState('');
    const [shell, setShell] = useState('/bin/bash');
    let cmd = `useradd`;
    if (uid) cmd += ` -u ${uid}`;
    if (gid) cmd += ` -g ${gid}`;
    if (groups) cmd += ` -G ${groups}`;
    if (shell !== '/bin/bash') cmd += ` -s ${shell}`;
    cmd += ` ${user}`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><UserPlusIcon size={16} className="text-blue-500"/> User Wizard</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Username</label><input value={user} onChange={e=>setUser(e.target.value)} className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Shell</label><select value={shell} onChange={e=>setShell(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="/bin/bash">/bin/bash</option><option value="/sbin/nologin">/sbin/nologin</option><option value="/bin/sh">/bin/sh</option></select></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">UID (Optional)</label><input value={uid} onChange={e=>setUid(e.target.value)} placeholder="1001" className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Primary GID (Optional)</label><input value={gid} onChange={e=>setGid(e.target.value)} placeholder="1001" className="w-full border rounded p-1 text-sm font-mono"/></div>
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">Secondary Groups (Comma sep)</label><input value={groups} onChange={e=>setGroups(e.target.value)} placeholder="wheel,devops" className="w-full border rounded p-1 text-sm font-mono"/></div>
            </div>
            <CodeBlock color="green">{cmd}</CodeBlock>
        </div>
    );
};

const SELinuxReference = () => {
    const [service, setService] = useState('httpd');
    const data = { httpd: { file: 'httpd_sys_content_t', port: 'http_port_t', bool: 'httpd_enable_homedirs' }, samba: { file: 'samba_share_t', port: 'smbd_port_t', bool: 'samba_enable_home_dirs' }, ssh: { file: 'ssh_home_t', port: 'ssh_port_t', bool: 'N/A' }, ftp: { file: 'public_content_t', port: 'ftp_port_t', bool: 'ftpd_anon_write' } };
    const ctx = data[service];
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><ShieldIcon size={16} className="text-emerald-500"/> SELinux Quick Ref</h3>
            <div className="mb-4"><label className="text-[10px] uppercase font-bold text-slate-500">Select Service</label><select value={service} onChange={e=>setService(e.target.value)} className="w-full border rounded p-2 text-sm bg-white font-bold text-slate-700"><option value="httpd">Apache Web Server (httpd)</option><option value="samba">Samba File Share (smb)</option><option value="ssh">SSH Server</option><option value="ftp">FTP Server</option></select></div>
            <div className="space-y-2 text-sm"><div className="flex justify-between border-b pb-1"><span className="text-slate-600">File Context:</span><span className="font-mono text-emerald-600 font-bold">{ctx.file}</span></div><div className="flex justify-between border-b pb-1"><span className="text-slate-600">Port Type:</span><span className="font-mono text-emerald-600 font-bold">{ctx.port}</span></div><div className="flex justify-between pb-1"><span className="text-slate-600">Common Boolean:</span><span className="font-mono text-emerald-600 font-bold">{ctx.bool}</span></div></div>
            <div className="mt-4 pt-4 border-t border-slate-100"><div className="text-[9px] text-slate-400 font-bold uppercase mb-1">Fix Context</div><CodeBlock>semanage fcontext -a -t {ctx.file} "/dir(/.*)?"</CodeBlock><CodeBlock>restorecon -Rv /dir</CodeBlock></div>
        </div>
    );
};

const RepoBuilder = () => {
    const [repoId, setRepoId] = useState('appstream');
    const [name, setName] = useState('AppStream');
    const [url, setUrl] = useState('http://content.example.com/rhel8.0/x86_64/appstream/os');
    const [gpg, setGpg] = useState('0');
    const [enabled, setEnabled] = useState('1');
    const content = `[${repoId}]\nname=${name}\nbaseurl=${url}\nenabled=${enabled}\ngpgcheck=${gpg}`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><SettingsIcon size={16} className="text-purple-500"/> Repo File Generator</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Repo ID (No spaces)</label><input value={repoId} onChange={e=>setRepoId(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">Base URL</label><input value={url} onChange={e=>setUrl(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">GPG Check</label><select value={gpg} onChange={e=>setGpg(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="0">0 (Disabled)</option><option value="1">1 (Enabled)</option></select></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Enabled</label><select value={enabled} onChange={e=>setEnabled(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="1">1 (Yes)</option><option value="0">0 (No)</option></select></div>
            </div>
            <div className="mt-2"><p className="text-[10px] text-slate-500 mb-1 font-bold">/etc/yum.repos.d/{repoId}.repo</p><CodeBlock color="green">{content}</CodeBlock></div>
        </div>
    );
};

const ScriptBuilder = () => {
    const [name, setName] = useState('myscript.sh');
    const [shebang, setShebang] = useState('/bin/bash');
    const [desc, setDesc] = useState('My awesome script');
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><FileTextIcon size={16} className="text-blue-500"/> Script Starter</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Filename</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Interpreter</label><select value={shebang} onChange={e=>setShebang(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="/bin/bash">/bin/bash</option><option value="/usr/bin/python3">/usr/bin/python3</option></select></div>
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">Description</label><input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
            </div>
            <div className="space-y-2"><CodeBlock>{`#!${shebang}\n# ${desc}\n\necho "Starting script..."\n# Your code here\nexit 0`}</CodeBlock><CodeBlock color="green">{`chmod +x ${name}`}</CodeBlock></div>
        </div>
    );
};

const NTPBuilder = () => {
    const [server, setServer] = useState('time.google.com');
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><TimerIcon size={16} className="text-blue-500"/> NTP (Chrony) Config</h3>
            <div className="mb-4"><label className="text-[10px] uppercase font-bold text-slate-500">NTP Server Address</label><input value={server} onChange={e=>setServer(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
            <div className="space-y-2"><div className="text-[10px] uppercase font-bold text-slate-400">1. Edit Config</div><CodeBlock color="blue">{`echo "server ${server} iburst" >> /etc/chrony.conf`}</CodeBlock><div className="text-[10px] uppercase font-bold text-slate-400">2. Restart Service</div><CodeBlock color="green">{`systemctl restart chronyd`}</CodeBlock><div className="text-[10px] uppercase font-bold text-slate-400">3. Verify</div><CodeBlock color="green">{`chronyc sources`}</CodeBlock></div>
        </div>
    );
};

const JournalctlBuilder = () => {
    const [unit, setUnit] = useState('sshd');
    const [since, setSince] = useState('1 hour ago');
    const [priority, setPriority] = useState('err');
    const [follow, setFollow] = useState(false);
    let cmd = `journalctl -u ${unit}`;
    if (since) cmd += ` --since "${since}"`;
    if (priority) cmd += ` -p ${priority}`;
    if (follow) cmd += ` -f`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><ListIcon size={16} className="text-slate-600"/> Log Hunter (journalctl)</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Service Unit</label><input value={unit} onChange={e=>setUnit(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Since</label><input value={since} onChange={e=>setSince(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Priority</label><select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="">(All)</option><option value="err">Error (err)</option><option value="warning">Warning (warning)</option><option value="info">Info (info)</option></select></div>
                <div className="flex items-end pb-2"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={follow} onChange={e=>setFollow(e.target.checked)} className="accent-blue-600"/><span className="text-sm font-bold text-slate-600">Follow Live (-f)</span></label></div>
            </div>
            <CodeBlock>{cmd}</CodeBlock>
        </div>
    );
};

const UmaskCalculator = () => {
    const [umask, setUmask] = useState('022');
    const [type, setType] = useState('dir');
    const calculate = (base, mask) => {
        const b = parseInt(base, 8); const m = parseInt(mask, 8);
        if (isNaN(b) || isNaN(m)) return '---';
        return (b & ~m).toString(8).padStart(3, '0');
    };
    const base = type === 'dir' ? '777' : '666';
    const result = calculate(base, umask);
    const toSymbolic = (octal) => { const map = ['---','--x','-w-','-wx','r--','r-x','rw-','rwx']; return octal.split('').map(d => map[parseInt(d)]).join(''); }
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><LockIcon size={16} className="text-pink-500"/> Umask Calculator</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Type</label><div className="flex gap-2 mt-1"><button onClick={() => setType('dir')} className={`px-2 py-1 text-xs rounded ${type === 'dir' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>Directory (777)</button><button onClick={() => setType('file')} className={`px-2 py-1 text-xs rounded ${type === 'file' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>File (666)</button></div></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Umask (Octal)</label><input value={umask} onChange={e => setUmask(e.target.value)} maxLength={3} className="w-full border rounded p-1 text-sm font-mono text-center mt-1"/></div>
            </div>
            <div className="bg-slate-100 p-3 rounded text-center"><div className="text-xs text-slate-500 mb-1">Resulting Permissions</div><div className="text-2xl font-mono font-bold text-slate-800">{result}</div><div className="text-sm font-mono text-pink-600">{toSymbolic(result)}</div></div>
            <CodeBlock color="blue">{`umask ${umask}`}</CodeBlock>
        </div>
    )
}

const FirewallBuilder = () => {
    const [zone, setZone] = useState('public');
    const [type, setType] = useState('service');
    const [value, setValue] = useState('http');
    const [perm, setPerm] = useState(true);
    let cmd = `firewall-cmd`;
    if (zone !== 'default') cmd += ` --zone=${zone}`;
    if (perm) cmd += ` --permanent`;
    if (type === 'service') cmd += ` --add-service=${value}`;
    else cmd += ` --add-port=${value}`;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><ShieldIcon size={16} className="text-red-500"/> Firewall Rule Builder</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Zone</label><select value={zone} onChange={e=>setZone(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="public">public (Default)</option><option value="home">home</option><option value="work">work</option><option value="trusted">trusted</option></select></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-500">Type</label><select value={type} onChange={e=>setType(e.target.value)} className="w-full border rounded p-1 text-sm bg-white"><option value="service">Service Name</option><option value="port">Port/Proto</option></select></div>
                <div className="col-span-2"><label className="text-[10px] uppercase font-bold text-slate-500">{type === 'service' ? 'Service (e.g. http, nfs)' : 'Port (e.g. 80/tcp)'}</label><input value={value} onChange={e=>setValue(e.target.value)} className="w-full border rounded p-1 text-sm"/></div>
                <div className="col-span-2 flex items-center gap-2"><input type="checkbox" checked={perm} onChange={e=>setPerm(e.target.checked)} className="accent-red-500"/><span className="text-sm font-bold text-slate-600">Permanent (Survives Reboot)</span></div>
            </div>
            <CodeBlock color="green">{cmd}</CodeBlock>
            {perm && <div className="text-[10px] text-slate-400 mt-1">Don't forget: <code className="bg-slate-100 px-1 rounded">firewall-cmd --reload</code></div>}
        </div>
    );
};

const ReportCard = ({ results, total, onClose }) => {
    const score = Math.round((results.filter(r => r.success).length / total) * 100);
    const missed = results.filter(r => !r.success);
    const missedCategories = missed.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border-4 border-slate-700 animate-in fade-in zoom-in duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Exam Results</h2>
                    <div className={`text-5xl font-mono font-bold ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>{score}%</div>
                    <p className="text-slate-500 text-sm mt-2">{score >= 70 ? "PASSED! You're ready for the real deal." : "FAILED. Review the pillars below."}</p>
                </div>
                {Object.keys(missedCategories).length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><AlertTriangleIcon size={14} /> Weak Points Detected</h4>
                        <div className="space-y-2">
                            {Object.entries(missedCategories).map(([cat, count]) => (
                                <div key={cat} className="flex justify-between items-center bg-red-50 p-2 rounded border border-red-100 text-sm">
                                    <span className="font-semibold text-slate-700">{cat}</span>
                                    <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded-full">Missed {count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={onClose} className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 transition-colors">Close Report</button>
            </div>
        </div>
    );
};

const FlashcardDrill = ({ cards, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 150);
    };

    const prevCard = () => {
         setIsFlipped(false);
         setTimeout(() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length), 150);
    };

    return (
        <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
             <div className="relative w-full max-w-lg h-96" style={{ perspective: '1000px' }}>
                <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-red-400">Close</button>
                 <div className="relative w-full h-full text-center transition-transform duration-500 cursor-pointer" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }} onClick={() => setIsFlipped(!isFlipped)}>
                    <div className="absolute w-full h-full bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                        <h3 className="text-slate-400 text-sm uppercase tracking-widest mb-4">Concept</h3>
                        <p className="text-2xl font-bold text-slate-800">{cards[currentIndex].front}</p>
                        <p className="text-xs text-slate-400 mt-8">(Click to flip)</p>
                    </div>
                    <div className="absolute w-full h-full bg-slate-800 rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                         <h3 className="text-slate-500 text-sm uppercase tracking-widest mb-4">Solution</h3>
                         <div className="bg-black p-4 rounded w-full overflow-x-auto"><code className="text-green-400 font-mono text-lg">{cards[currentIndex].back}</code></div>
                    </div>
                 </div>
                 <div className="absolute -bottom-16 w-full flex justify-between items-center text-white">
                     <button onClick={prevCard} className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600">Previous</button>
                     <span>{currentIndex + 1} / {cards.length}</span>
                     <button onClick={nextCard} className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600">Next</button>
                 </div>
             </div>
        </div>
    );
};

const CheatSheetModal = ({ bookmarks, missions, onClose }) => {
    const bookmarkedMissions = missions.filter(m => bookmarks.includes(m.id));
    return (
        <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><StarIcon className="text-yellow-400 fill-yellow-400" size={24}/> My Cheat Sheet</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">Close</button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {bookmarkedMissions.length === 0 ? (
                        <div className="text-center text-slate-500 py-12"><p>No commands bookmarked yet.</p></div>
                    ) : (
                        <div className="space-y-4">
                            {bookmarkedMissions.map(mission => (
                                <div key={mission.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                    <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-slate-800">{mission.title}</h3><span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">{mission.category}</span></div>
                                    <p className="text-sm text-slate-600 mb-3">{mission.desc}</p>
                                    <div className="bg-slate-900 p-2 rounded text-green-400 font-mono text-xs">{mission.hint}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50 text-center"><button onClick={() => window.print()} className="text-blue-600 text-sm font-bold hover:underline">Print / Save as PDF</button></div>
            </div>
        </div>
    );
};

const TroubleshootingModal = ({ onClose }) => {
    const [currentNode, setCurrentNode] = useState(null);
    const [treeType, setTreeType] = useState(null);

    const TROUBLESHOOTING_TREES = {
        service: {
            title: "Service Won't Start",
            startNode: 'status',
            nodes: {
                status: { text: "Check the service status. Is it active (running)?", cmd: "systemctl status <service>", yes: 'firewall', no: 'start' },
                start: { text: "Try starting the service. Did it fail?", cmd: "systemctl start <service>", yes: 'logs', no: 'enable' },
                logs: { text: "Check the system logs for specific error messages.", cmd: "journalctl -u <service> -e", action: "Fix configuration error based on logs." },
                firewall: { text: "Is the firewall allowing the service port?", cmd: "firewall-cmd --list-all", yes: 'selinux', no: 'open_port' },
                open_port: { text: "Open the port permanently and reload.", cmd: "firewall-cmd --permanent --add-service=<service> && firewall-cmd --reload", action: "Retry connection." },
                selinux: { text: "Check for SELinux denials.", cmd: "grep AVC /var/log/audit/audit.log", yes: 'restorecon', no: 'network' },
                restorecon: { text: "Restore default file contexts.", cmd: "restorecon -Rv /var/www/html", action: "Retry connection." },
                enable: { text: "Service started successfully. Ensure it's enabled.", cmd: "systemctl enable <service>", action: "Done." },
                network: { text: "Verify network connectivity.", cmd: "ping -c 4 <gateway>", action: "Check routing table." }
            }
        },
        ssh: {
            title: "Cannot SSH to Server",
            startNode: 'ping',
            nodes: {
                ping: { text: "Can you ping the server IP?", cmd: "ping <ip_address>", yes: 'ssh_port', no: 'local_ip' },
                local_ip: { text: "Do you have a valid IP address?", cmd: "ip a", yes: 'route', no: 'nmcli' },
                nmcli: { text: "Configure static IP.", cmd: "nmcli con add ...", action: "Retry ping." },
                route: { text: "Check IP route.", cmd: "ip route", action: "Fix gateway." },
                ssh_port: { text: "Is the SSH service running on the target?", cmd: "systemctl status sshd", yes: 'firewall_ssh', no: 'start_ssh' },
                firewall_ssh: { text: "Is port 22 open on the firewall?", cmd: "firewall-cmd --list-all", yes: 'perm_denied', no: 'open_ssh' },
                start_ssh: { text: "Start SSH service on target.", cmd: "systemctl start sshd", action: "Retry connection." },
                open_ssh: { text: "Allow SSH service.", cmd: "firewall-cmd --permanent --add-service=ssh && firewall-cmd --reload", action: "Retry connection." },
                perm_denied: { text: "Permission Denied? Check root login settings.", cmd: "grep PermitRootLogin /etc/ssh/sshd_config", action: "Edit config to 'yes' or use user account." }
            }
        }
    };

    const startTree = (type) => { setTreeType(type); setCurrentNode(TROUBLESHOOTING_TREES[type].startNode); };
    const node = treeType && currentNode ? TROUBLESHOOTING_TREES[treeType].nodes[currentNode] : null;

    return (
        <div className="absolute inset-0 bg-slate-900/95 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl border-4 border-slate-700 p-6">
                 <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2"><WrenchIcon className="text-blue-500" size={24}/> Troubleshooter</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">Close</button>
                </div>
                {!treeType ? (
                    <div className="grid grid-cols-1 gap-4">
                        <p className="text-slate-600 text-center mb-2">Select a scenario to troubleshoot:</p>
                        <button onClick={() => startTree('service')} className="p-4 bg-slate-100 hover:bg-slate-200 rounded text-left font-semibold text-slate-700">🚀 Service Won't Start</button>
                        <button onClick={() => startTree('ssh')} className="p-4 bg-slate-100 hover:bg-slate-200 rounded text-left font-semibold text-slate-700">🔒 Cannot SSH to Server</button>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="mb-4">
                             <h3 className="font-bold text-lg text-blue-600 mb-2">{TROUBLESHOOTING_TREES[treeType].title}</h3>
                             <p className="text-slate-700 text-lg mb-4">{node.text}</p>
                             {node.cmd && <div className="bg-slate-900 p-3 rounded text-green-400 font-mono text-sm mb-4">&gt; {node.cmd}</div>}
                        </div>
                        {node.action ? (
                             <div className="bg-green-100 p-4 rounded text-green-800 font-bold text-center border border-green-200">✅ Solution: {node.action}<button onClick={() => setTreeType(null)} className="block mx-auto mt-4 text-sm font-normal underline">Start Over</button></div>
                        ) : (
                             <div className="grid grid-cols-2 gap-4">
                                 <button onClick={() => setCurrentNode(node.yes)} className="p-3 bg-green-500 hover:bg-green-600 text-white rounded font-bold">YES</button>
                                 <button onClick={() => setCurrentNode(node.no)} className="p-3 bg-red-500 hover:bg-red-600 text-white rounded font-bold">NO</button>
                             </div>
                        )}
                        <button onClick={() => setTreeType(null)} className="mt-4 text-xs text-slate-400 hover:text-slate-600">← Back to Menu</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- NEW: FILE EDITOR (VI/NANO SIMULATOR) ---
const FileEditor = ({ filename, initialContent, onSave, onClose }) => {
    const [content, setContent] = useState(initialContent || "");
    const textareaRef = useRef(null);

    useEffect(() => {
        if(textareaRef.current) textareaRef.current.focus();
    }, []);

    return (
        <div className="absolute inset-0 bg-black/95 z-50 flex flex-col font-mono text-green-400 p-2">
            <div className="flex justify-between items-center border-b border-green-800 pb-2 mb-2">
                <span className="font-bold uppercase tracking-widest text-xs">VIM - {filename}</span>
                <div className="flex gap-2">
                    <button onClick={() => onSave(content)} className="bg-green-700 text-black px-3 py-1 rounded text-xs font-bold hover:bg-green-600">Write & Quit (:wq)</button>
                    <button onClick={onClose} className="bg-red-900 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-800">Quit! (:q!)</button>
                </div>
            </div>
            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none resize-none text-sm p-2 w-full h-full text-slate-300 focus:ring-0"
                spellCheck="false"
            />
            <div className="mt-2 text-xs text-slate-500 border-t border-slate-800 pt-2 flex justify-between">
                <span>INSERT MODE</span>
                <span>{content.length} characters</span>
            </div>
        </div>
    );
};


// --- 4. MAIN APP COMPONENT ---
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [currentMissionId, setCurrentMissionId] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);
  const [inputHistory, setInputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHint, setShowHint] = useState(false); 
  const [missions] = useState(MISSIONS);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [successFlash, setSuccessFlash] = useState(false);
  const [fs, setFs] = useState(INITIAL_FS);
  const [cwd, setCwd] = useState('/root');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  
  // NEW: Editor State
  const [editorState, setEditorState] = useState({ open: false, filename: '', content: '' });
  // NEW: Processing State for long commands
  const [isProcessing, setIsProcessing] = useState(false);

  // NEW: System State for Realism
  const [systemState, setSystemState] = useState({
      users: ['root', 'student'],
      groups: ['root', 'student', 'wheel'],
      services: { 
          'httpd': 'inactive', 
          'sshd': 'active', 
          'crond': 'active',
          'firewalld': 'active'
      }
  });
  
  // New Paging State
  const [isPaging, setIsPaging] = useState(false);
  
  // New Context Switching State
  const [currentServer, setCurrentServer] = useState('servera');

  // PRO STATE
  const [completedMissions, setCompletedMissions] = useState([]);
  const [examMode, setExamMode] = useState(false);
  const [examTimeLeft, setExamTimeLeft] = useState(0);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examResults, setExamResults] = useState([]); 
  const [showReportCard, setShowReportCard] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showTroubleshoot, setShowTroubleshoot] = useState(false); 
  const [bookmarkedMissions, setBookmarkedMissions] = useState([]);
  
  const [activeTab, setActiveTab] = useState('pillar-1');
  
  // --- LVM STATE ---
  const [lvmState, setLvmState] = useState({
    pvs: [], 
    vgs: [], 
    lvs: [], 
    mounts: []
  });

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Helper to format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Load state from local storage
  useEffect(() => {
      const savedProgress = localStorage.getItem('rhcsa_progress');
      if (savedProgress) setCompletedMissions(JSON.parse(savedProgress));
      
      const savedBookmarks = localStorage.getItem('rhcsa_bookmarks');
      if (savedBookmarks) setBookmarkedMissions(JSON.parse(savedBookmarks));
  }, []);

  // Save state to local storage
  useEffect(() => {
      localStorage.setItem('rhcsa_progress', JSON.stringify(completedMissions));
  }, [completedMissions]);

  useEffect(() => {
      localStorage.setItem('rhcsa_bookmarks', JSON.stringify(bookmarkedMissions));
  }, [bookmarkedMissions]);

  // Exam Timer
  useEffect(() => {
      let interval;
      if (examMode && examTimeLeft > 0) {
          interval = setInterval(() => {
              setExamTimeLeft((prev) => prev - 1);
          }, 1000);
      } else if (examMode && examTimeLeft === 0) {
          endExam();
      }
      return () => clearInterval(interval);
  }, [examMode, examTimeLeft]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory, isPaging]); 

  // Reset hint when mission changes
  useEffect(() => {
    setShowHint(false);
  }, [currentMissionId]);

  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setCurrentTheme(THEMES[nextIndex]);
  };

  const addToTerm = (text, type = 'output') => {
    if (typeof text !== 'string') return;
    setTerminalHistory(prev => [...prev, { text, type }]);
  };

  const sanitizeInput = (input) => {
    if (input.length > MAX_INPUT_LENGTH) return input.substring(0, MAX_INPUT_LENGTH);
    return input.replace(ILLEGAL_CHARS, "");
  };

  const startExamMode = () => {
      const shuffled = [...MISSIONS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 15);
      
      setExamQuestions(selected);
      setExamResults([]); 
      setExamMode(true);
      setShowReportCard(false);
      setExamTimeLeft(20 * 60); 
      setCurrentMissionId(selected[0].id);
      setTerminalHistory([]);
      addToTerm("--- MOCK EXAM STARTED ---", 'system');
      addToTerm("You have 20 minutes to complete 15 random tasks.", 'system');
      addToTerm(`Task 1: ${selected[0].desc}`, 'system');
  };

  const endExam = () => {
      setExamMode(false);
      setShowReportCard(true);
      addToTerm("EXAM FINISHED. Generating report...", 'system');
      setCurrentMissionId(0);
  };

  const toggleBookmark = (id) => {
      if (bookmarkedMissions.includes(id)) {
          setBookmarkedMissions(prev => prev.filter(bId => bId !== id));
      } else {
          setBookmarkedMissions(prev => [...prev, id]);
      }
  };

  const resolvePath = (cwd, target) => {
      if (target.startsWith('/')) {
          // Absolute path - simplified for root level
          return target === '/' ? '/' : target; // In our flat structure, keys are like '/home'
      }
      // Relative path - simplified
      return cwd === '/' ? `/${target}` : `${cwd}/${target}`;
  };

  const resetLab = () => {
      if(window.confirm("Are you sure you want to reset all progress and file system changes?")) {
          setCompletedMissions([]);
          setBookmarkedMissions([]);
          setFs(INITIAL_FS);
          setLvmState({ pvs: [], vgs: [], lvs: [], mounts: [] });
          setSystemState({ users: ['root', 'student'], groups: ['root', 'student', 'wheel'], services: { 'httpd': 'inactive', 'sshd': 'active', 'crond': 'active', 'firewalld': 'active' } });
          setTerminalHistory([]);
          addToTerm("Lab environment reset to factory defaults.", 'system');
      }
  };

  // Process Logic
  const processCommand = (cmd) => {
    const cleanCmd = sanitizeInput(cmd.trim());
    if (!cleanCmd) return;

    addToTerm(`[root@${currentServer} ${cwd === '/root' ? '~' : cwd.split('/').pop()}]# ${cleanCmd}`, 'input');
    setInputHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const args = cleanCmd.split(/\s+/); // Robust splitting
    const base = args[0];

    // MAN PAGE with Paging
    if (base === 'man') {
        const page = MAN_PAGES[args[1]] || MAN_PAGES['default'];
        addToTerm(page);
        setIsPaging(true); 
    }

    // MISSION LOGIC
    const activeMissionList = examMode ? examQuestions : missions;
    const currentMission = activeMissionList.find(m => m.id === currentMissionId);

    if (currentMissionId > 0 && currentMission) {
      let success = false;
      try { success = currentMission.check(cleanCmd); } catch(e) {}

      if (success) {
        addToTerm(`SUCCESS`, 'success');
        setSuccessFlash(true);
        setTimeout(() => setSuccessFlash(false), 800);
        
        // Track Result for Report Card
        if (examMode) {
             setExamResults(prev => [...prev, { ...currentMission, success: true }]);
        }
        
        if (!examMode && !completedMissions.includes(currentMission.id)) {
            setCompletedMissions(prev => [...prev, currentMission.id]);
        }

        if (examMode) {
            const currentIndex = examQuestions.findIndex(m => m.id === currentMissionId);
            if (currentIndex < examQuestions.length - 1) {
                const nextMission = examQuestions[currentIndex + 1];
                setCurrentMissionId(nextMission.id);
                setTimeout(() => {
                    addToTerm(`\n--- EXAM TASK ${currentIndex + 2}/${examQuestions.length} ---`, 'system');
                    addToTerm(`Objective: ${nextMission.desc}`, 'system');
                }, 1000);
            } else {
                endExam();
            }
        } else {
            // Normal
             const currentIndex = missions.findIndex(m => m.id === currentMissionId);
            if (currentIndex < missions.length - 1) {
                const nextMission = missions[currentIndex + 1];
                 setTimeout(() => {
                    setCurrentMissionId(nextMission.id);
                    addToTerm(`\n--- MISSION ${nextMission.id} ---`, 'system');
                    addToTerm(`Objective: ${nextMission.desc}`, 'system');
                }, 1500);
            } else {
                setMissionComplete(true);
                addToTerm("ALL MISSIONS COMPLETE!", 'success');
            }
        }
        return;
      }
      
      // Feedback
      if (!examMode) {
          if (cleanCmd.startsWith(currentMission.tool) && base === currentMission.tool) {
              addToTerm(`> Correct command '${base}', check flags.`, 'error');
          } else if (!UTILITY_COMMANDS.includes(base) && base !== currentMission.tool) {
              addToTerm(`> Wrong tool. Try again.`, 'error');
          }
      }
    }

    // SIMULATION
    if (base !== 'man') {
        switch (base) {
          case 'clear': setTerminalHistory([]); break;
          case 'history': addToTerm(inputHistory.map((c,i) => `${i+1}  ${c}`).join('\n')); break;
          case 'exit': 
             if (currentServer !== 'servera') {
                 setCurrentServer('servera');
                 addToTerm("logout", 'system');
                 addToTerm("Connection to serverb closed.", 'system');
             } else if (examMode) {
                setExamMode(false);
                addToTerm("Exam aborted.", 'error');
                setCurrentMissionId(0);
            } else {
                setCurrentMissionId(0);
                setMissionComplete(false);
                addToTerm("Session reset.", 'system');
                setLvmState({ pvs: [], vgs: [], lvs: [], mounts: [] }); // Reset LVM on logout
            }
            break;
          // --- EDITOR SIMULATION ---
          case 'vi':
          case 'vim':
          case 'nano':
              if (args[1]) {
                  const path = resolvePath(cwd, args[1]);
                  const existingFile = fs[path] || (fs[cwd] && fs[cwd].children && fs[cwd].children[args[1]]);
                  let initialContent = "";
                  if (existingFile && existingFile.type === 'file') {
                      initialContent = existingFile.content;
                  }
                  setEditorState({ open: true, filename: args[1], content: initialContent });
              } else {
                  addToTerm(`Usage: ${base} filename`, 'error');
              }
              break;
          case 'crontab':
              if (args[1] === '-e') {
                  setEditorState({ open: true, filename: 'crontab', content: '# Edit cron jobs here\n' });
              } else if (args[1] === '-l') {
                  addToTerm('no crontab for root', 'error'); 
              }
              break;
          // --- USER MGMT SIMULATION ---
          case 'useradd':
              const newUser = args[args.length - 1];
              if (newUser && !newUser.startsWith('-')) {
                  if (systemState.users.includes(newUser)) {
                      addToTerm(`useradd: user '${newUser}' already exists`, 'error');
                  } else {
                      setSystemState(prev => ({ ...prev, users: [...prev.users, newUser] }));
                      addToTerm(""); // Success silent
                  }
              } else {
                  addToTerm("Usage: useradd [options] LOGIN", 'error');
              }
              break;
          case 'groupadd':
              const newGroup = args[args.length - 1];
              if (newGroup && !newGroup.startsWith('-')) {
                  if (systemState.groups.includes(newGroup)) {
                      addToTerm(`groupadd: group '${newGroup}' already exists`, 'error');
                  } else {
                      setSystemState(prev => ({ ...prev, groups: [...prev.groups, newGroup] }));
                      addToTerm(""); // Success silent
                  }
              }
              break;
          // --- SERVICE SIMULATION ---
          case 'systemctl':
              const action = args[1];
              const svc = args[2];
              if (['start', 'stop', 'restart', 'enable', 'disable'].includes(action)) {
                  if (svc) {
                      const newState = (action === 'start' || action === 'restart' || action === 'enable') ? 'active' : 'inactive';
                      setSystemState(prev => ({ ...prev, services: { ...prev.services, [svc]: newState } }));
                      if (action === 'enable' || action === 'disable') {
                          addToTerm(action === 'enable' ? `Created symlink /etc/systemd/system/multi-user.target.wants/${svc}.service -> ...` : `Removed /etc/systemd/system/multi-user.target.wants/${svc}.service.`);
                      } else {
                          addToTerm(""); // silent success for start/stop
                      }
                  } else {
                      addToTerm("systemctl: missing argument", 'error');
                  }
              } else if (action === 'status') {
                  if (svc) {
                      const status = systemState.services[svc] || 'inactive';
                      // const color = status === 'active' ? 'text-green-400' : 'text-slate-400';
                      addToTerm(`● ${svc}.service - The ${svc} service`);
                      addToTerm(`   Loaded: loaded (/usr/lib/systemd/system/${svc}.service; disabled; vendor preset: disabled)`);
                      addToTerm(`   Active: ${status} (running) since ...`, status === 'active' ? 'success' : 'system');
                  }
              }
              break;
          // --- FILESYSTEM SIMULATION ---
          case 'cat':
              if (args[1]) {
                  const target = args[1];
                  // Handle virtual files
                  if (target === '/etc/passwd') {
                      addToTerm(systemState.users.map(u => `${u}:x:100${systemState.users.indexOf(u)}:100${systemState.users.indexOf(u)}::/home/${u}:/bin/bash`).join('\n'));
                  } else if (target === '/etc/group') {
                      addToTerm(systemState.groups.map(g => `${g}:x:100${systemState.groups.indexOf(g)}:`).join('\n'));
                  } else {
                      // Handle FS files
                      let found = false;
                      if (target.startsWith('/')) {
                          if (fs[target] && fs[target].type === 'file') {
                              addToTerm(fs[target].content || "");
                              found = true;
                          }
                      } else {
                          if (fs[cwd] && fs[cwd].children && fs[cwd].children[target] && fs[cwd].children[target].type === 'file') {
                              addToTerm(fs[cwd].children[target].content || "");
                              found = true;
                          }
                      }
                      if (!found) addToTerm(`cat: ${target}: No such file or directory`, 'error');
                  }
              }
              break;
          case 'touch':
              if (args[1]) {
                  const targetDir = fs[cwd];
                  if (targetDir) {
                      setFs(prev => ({
                          ...prev,
                          [cwd]: {
                              ...prev[cwd],
                              children: { ...prev[cwd].children, [args[1]]: { type: 'file', content: '' } }
                          }
                      }));
                      addToTerm(""); // Success is silent in unix
                  }
              }
              break;
          case 'mkdir':
              if (args[1]) {
                  const newPath = resolvePath(cwd, args[1]);
                  // Add as a root key for simple navigation in this sim
                  if (!fs[newPath]) {
                      setFs(prev => ({ ...prev, [newPath]: { type: 'dir', children: {} } }));
                      // Also add to current children for visibility
                      if(fs[cwd]) {
                           setFs(prev => ({
                              ...prev,
                              [cwd]: { ...prev[cwd], children: { ...prev[cwd].children, [args[1]]: { type: 'dir' } } },
                              [newPath]: { type: 'dir', children: {} } // Add absolute path entry
                          }));
                      }
                  }
                  addToTerm("");
              }
              break;
          case 'rm':
              if (args[1]) {
                  if (fs[cwd] && fs[cwd].children[args[1]]) {
                      const newChildren = { ...fs[cwd].children };
                      delete newChildren[args[1]];
                      setFs(prev => ({
                          ...prev,
                          [cwd]: { ...prev[cwd], children: newChildren }
                      }));
                      addToTerm("");
                  } else {
                      addToTerm(`rm: cannot remove '${args[1]}': No such file or directory`, 'error');
                  }
              }
              break;
          // --- LVM SIMULATION ---
          case 'pvcreate':
             const pvDev = args[args.length - 1];
             if (pvDev && (pvDev === '/dev/vdb1' || pvDev === '/dev/vdb2')) {
                 if (!lvmState.pvs.includes(pvDev)) {
                     setLvmState(prev => ({ ...prev, pvs: [...prev.pvs, pvDev] }));
                     addToTerm(`Physical volume "${pvDev}" successfully created.`);
                 } else {
                     addToTerm(`Physical volume "${pvDev}" already exists.`, 'system');
                 }
             } else {
                 addToTerm("Device not found (Try /dev/vdb1 or /dev/vdb2)", 'error');
             }
             break;
          case 'vgcreate':
             const vgName = args[1];
             const vgPv = args[2];
             if (vgName && vgPv) {
                 if (!lvmState.pvs.includes(vgPv)) {
                      addToTerm(`Physical volume "${vgPv}" not initialized.`, 'error');
                 } else if (lvmState.vgs.find(v => v.name === vgName)) {
                      addToTerm(`Volume group "${vgName}" already exists.`, 'error');
                 } else {
                      setLvmState(prev => ({ ...prev, vgs: [...prev.vgs, { name: vgName, pvs: [vgPv] }] }));
                      addToTerm(`Volume group "${vgName}" successfully created`);
                 }
             }
             break;
          case 'lvcreate':
             let lvName, lvSize, lvVg;
             const nIdx = args.indexOf('-n');
             const lIdx = args.indexOf('-L');
             if (nIdx !== -1) lvName = args[nIdx + 1];
             if (lIdx !== -1) lvSize = args[lIdx + 1];
             lvVg = args[args.length - 1];
             if (lvName && lvVg && lvmState.vgs.find(v => v.name === lvVg)) {
                 setLvmState(prev => ({ ...prev, lvs: [...prev.lvs, { name: lvName, vg: lvVg, fs: null, size: lvSize || 'Unknown' }] }));
                 addToTerm(`Logical volume "${lvName}" created.`);
             } else {
                 addToTerm("Invalid arguments or VG not found.", 'error');
             }
             break;
          case 'mkfs.xfs':
             const targetDev = args[1];
             if (targetDev) {
                 const parts = targetDev.split('/');
                 const potentialLvName = parts[parts.length - 1];
                 const lvExists = lvmState.lvs.find(l => l.name === potentialLvName);
                 if (lvExists) {
                     setLvmState(prev => ({
                        ...prev,
                        lvs: prev.lvs.map(l => l.name === potentialLvName ? { ...l, fs: 'xfs' } : l)
                    }));
                    addToTerm(`meta-data=${targetDev} isize=512...`);
                 } else {
                     addToTerm(`Could not access ${targetDev}: No such file or directory`, 'error');
                 }
             }
             break;
          case 'ssh':
              if (args[1] === 'serverb' || args[1] === 'student@serverb') {
                  setCurrentServer('serverb');
                  addToTerm(`root@${args[1]}'s password:`, 'system'); 
                  setTimeout(() => {
                      addToTerm(`Last login: ${new Date().toString()} from 192.168.1.1`);
                  }, 500);
              } else {
                  addToTerm(`ssh: Could not resolve hostname ${args[1]}: Name or service not known`, 'error');
              }
              break;
          case 'start':
            if (!examMode) {
                setCurrentMissionId(1);
                setMissionComplete(false);
                addToTerm(`\n--- MISSION 1 ---`, 'system');
                addToTerm(`Objective: ${MISSIONS[0].desc}`, 'system');
            }
            break;
          case 'ls':
              const dir = fs[cwd];
              if (dir && dir.children) {
                 const items = Object.keys(dir.children).join('  ');
                 addToTerm(items || '(empty)');
              } else {
                 addToTerm(`ls: cannot access '${cwd}': No such file or directory`, 'error');
              }
              break;
          case 'pwd': addToTerm(cwd); break;
          case 'cd':
              const target = args[1];
              if (!target) setCwd('/root'); 
              else if (target === '..') {
                 const parts = cwd.split('/').filter(p => p);
                 parts.pop();
                 setCwd(parts.length === 0 ? '/' : '/' + parts.join('/'));
              } else {
                 if (target.startsWith('/') && fs[target]) {
                     setCwd(target);
                 } 
                 else if (fs[cwd].children[target] && fs[cwd].children[target].type === 'dir') {
                     addToTerm(`cd: ${target}: Not fully supported in this demo structure`, 'error');
                 } else {
                     addToTerm(`cd: ${target}: No such file or directory`, 'error');
                 }
              }
              break;
          case 'id': 
              const idUser = args[1] || 'root';
              if (systemState.users.includes(idUser)) {
                  const uid = 1000 + systemState.users.indexOf(idUser);
                  addToTerm(`uid=${uid}(${idUser}) gid=${uid}(${idUser}) groups=${uid}(${idUser})`); 
              } else {
                  addToTerm(`id: ${idUser}: no such user`, 'error');
              }
              break;
          case 'nmcli': addToTerm("Connection successfully added."); break;
          // --- UPDATED DNF SIMULATION ---
          case 'dnf':
              if (args[1] === 'install' || args[1] === 'update') {
                  setIsProcessing(true);
                  addToTerm("Updating Subscription Management repositories...", 'system');
                  addToTerm("Dependencies resolved.", 'system');
                  
                  setTimeout(() => {
                      addToTerm("Downloading packages...", 'system');
                      
                      setTimeout(() => {
                          addToTerm("Running transaction check...");
                          addToTerm("Installing: " + (args[2] || "updates"));
                          addToTerm("Complete!", 'success');
                          setIsProcessing(false);
                          
                          // Focus back on input and scroll
                          setTimeout(() => {
                            inputRef.current?.focus();
                            terminalEndRef.current?.scrollIntoView();
                          }, 50);
                      }, 800); // Shorter duration
                  }, 600); // Shorter duration
              } else if (args[1] === 'search') {
                  addToTerm(`Searching for ${args[2] || 'packages'}... found matches.`);
              } else if (args[1] === 'history') {
                  addToTerm("ID | Command line | Date and time");
                  addToTerm("1  | dnf install httpd | 2023-10-01 10:00");
              } else {
                  addToTerm("Complete!");
              }
              break;
          case 'grep': 
              // Improved Grep Simulation
              const pattern = args[1] ? args[1].replace(/['"]/g, '') : '';
              const target = args[2];
              
              if (!pattern) {
                  addToTerm("Usage: grep [OPTION]... PATTERN [FILE]...", 'error');
              } else if (target === '/etc/passwd' || !target) {
                  const mockLines = [
                      "root:x:0:0:root:/root:/bin/bash",
                      "bin:x:1:1:bin:/bin:/sbin/nologin",
                      "daemon:x:2:2:daemon:/sbin:/sbin/nologin",
                      "adm:x:3:4:adm:/var/adm:/sbin/nologin",
                      "lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin",
                      "student:x:1000:1000:Student User:/home/student:/bin/bash"
                  ];
                  
                  const cleanPat = pattern.replace('^','').replace('$','');
                  
                  const matches = mockLines.filter(line => {
                      if (pattern.startsWith('^')) return line.startsWith(cleanPat);
                      if (pattern.endsWith('$')) return line.endsWith(cleanPat);
                      return line.includes(cleanPat);
                  });
                  
                  if (matches.length > 0) {
                      matches.forEach(m => addToTerm(m));
                  }
                  // Silent on no match (standard grep behavior)
              } else {
                  addToTerm(`grep: ${target}: No such file or directory`, 'error');
              }
              break;
          case 'nmtui': addToTerm("Opening NetworkManager TUI... [Graphic Interface Simulated]", 'success'); break;
          case 'flatpak': if (args[1] === 'install') addToTerm("Installing... Complete."); else addToTerm("Flatpak remote added."); break;
          case 'hostnamectl': addToTerm("Hostname set."); break;
          case 'semanage': addToTerm("Port label added."); break;
          case 'restorecon': addToTerm("Relabeled."); break;
          default: 
            if (!['usermod','tar','chmod','ln','find','setfacl','tuned-adm','nice','chronyc','journalctl','lvextend','mkswap','mount','crontab','firewall-cmd','ssh-keygen','chage','fdisk','scp','kill'].includes(base)) {
                 addToTerm(`bash: ${base}: command not found`, 'error');
            } else {
                 addToTerm("Command executed (Simulated).");
            }
        }
    }
  };

  // Handle saving file from the editor
  const handleEditorSave = (newContent) => {
      const path = resolvePath(cwd, editorState.filename);
      // Determine if we are updating a child of CWD or a root path
      if (path.startsWith('/')) {
          setFs(prev => ({
              ...prev,
              [path]: { type: 'file', content: newContent }
          }));
      } else {
          // Relative to CWD
          setFs(prev => ({
              ...prev,
              [cwd]: {
                  ...prev[cwd],
                  children: { ...prev[cwd].children, [editorState.filename]: { type: 'file', content: newContent } }
              }
          }));
      }
      setEditorState({ open: false, filename: '', content: '' });
      addToTerm(`"${editorState.filename}" [New] ${newContent.length}L, ${newContent.length}C written`, 'success');
  };

  const handleKeyDown = (e) => {
    if (isPaging) {
        e.preventDefault();
        if (e.key === 'q' || e.key === 'Q' || (e.key === 'c' && e.ctrlKey)) {
            setIsPaging(false);
            addToTerm("End of manual page", 'system');
        }
        return;
    }

    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setTerminalHistory([]);
        return;
    }
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        addToTerm(`[root@server ~]# ${inputVal}^C`, 'input');
        setInputVal('');
        return;
    }

    // --- STOP INPUT DURING PROCESSING ---
    if (isProcessing) {
        e.preventDefault();
        return;
    }

    if (e.key === 'Tab') {
        e.preventDefault();
        const cleanCmd = inputVal.trim();
        const possibleCommands = [...UTILITY_COMMANDS, ...missions.map(m => m.tool), 'systemctl', 'dnf', 'flatpak'];
        const matches = possibleCommands.filter(cmd => cmd.startsWith(cleanCmd));
        if (matches.length === 1) setInputVal(matches[0] + ' ');
        else if (matches.length > 1) addToTerm(matches.join('  '), 'system');
    }
    else if (e.key === 'Enter') { 
        processCommand(inputVal); 
        setInputVal(''); 
    } else if (e.key === 'ArrowUp') { 
        e.preventDefault(); 
        if (historyIndex === -1) {
             const newIndex = inputHistory.length - 1;
             if(newIndex >= 0) {
                 setHistoryIndex(newIndex);
                 setInputVal(inputHistory[newIndex]);
             }
        } else if (historyIndex > 0) {
             const newIndex = historyIndex - 1;
             setHistoryIndex(newIndex);
             setInputVal(inputHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') { 
        e.preventDefault(); 
        if (historyIndex !== -1 && historyIndex < inputHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInputVal(inputHistory[newIndex]);
        } else if (historyIndex === inputHistory.length - 1) {
            setHistoryIndex(-1);
            setInputVal('');
        }
    }
  };

  const activeMission = examMode 
    ? examQuestions.find(m => m.id === currentMissionId) 
    : missions.find(m => m.id === currentMissionId);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <nav className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <h1 className="text-2xl font-bold text-red-500 mb-2">RHCSA<span className="text-white">Lab</span></h1>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-6">Interactive Study Guide</p>
          
          <div className="mb-6">
             <div className="flex justify-between text-xs mb-1 text-slate-400">
                 <span>Progress</span>
                 <span>{completedMissions.length}/{MISSIONS.length}</span>
             </div>
             <ProgressBar completed={completedMissions.length} total={MISSIONS.length} />
          </div>

          <button 
            onClick={!examMode ? startExamMode : undefined} 
            className={`w-full flex items-center justify-center gap-2 mb-6 px-3 py-2 rounded-md font-bold text-sm transition-colors shadow-lg ${examMode ? 'bg-slate-800 text-red-400 cursor-default ring-2 ring-red-500/50' : 'bg-red-600 text-white hover:bg-red-700'}`}
          >
             <TimerIcon size={16}/> {examMode ? `Time Left: ${formatTime(examTimeLeft)}` : "Start Mock Exam"}
          </button>
          
          <div className="grid grid-cols-2 gap-2 mb-6">
             <button onClick={() => setShowTroubleshoot(true)} disabled={examMode} className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-teal-600 text-white font-bold hover:bg-teal-700 text-sm transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <WrenchIcon size={16}/> Troubleshooter
             </button>
             <button onClick={() => setShowFlashcards(true)} disabled={examMode} className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white font-bold hover:bg-indigo-700 text-sm transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <CardIcon size={16}/> Cards
             </button>
             <button onClick={() => setShowCheatSheet(true)} disabled={examMode} className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-slate-700 text-white font-bold hover:bg-slate-600 text-sm transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <ListIcon size={16}/> Cheat Sheet
             </button>
          </div>
          
          <ul className="space-y-1 overflow-y-auto flex-1 scrollbar-hide">
            <li><button onClick={() => { setExamMode(false); setCurrentMissionId(0); }} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors w-full text-left"><TerminalIcon size={16}/> Practice Lab</button></li>
            <div className="my-2 border-t border-slate-800"></div>
            <li className="text-xs text-slate-500 uppercase tracking-wider mt-4 mb-2 px-3">Quick Links</li>
            
            <li><button onClick={() => setActiveTab('pillar-1')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-1' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><FileTextIcon size={16}/> Tools & Scripting</button></li>
            <li><button onClick={() => setActiveTab('pillar-2')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-2' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><CpuIcon size={16}/> Running Systems</button></li>
            <li><button onClick={() => setActiveTab('pillar-3')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-3' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><HardDriveIcon size={16}/> Storage</button></li>
            <li><button onClick={() => setActiveTab('pillar-4')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-4' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><SettingsIcon size={16}/> Deploy & Maintain</button></li>
            <li><button onClick={() => setActiveTab('pillar-5')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-5' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><ShieldIcon size={16}/> Users & Security</button></li>
          </ul>

          <div className="mt-auto pt-4 border-t border-slate-800">
             <button onClick={resetLab} disabled={examMode} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-rose-400 font-bold hover:bg-slate-800 text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <RotateCcwIcon size={14}/> Reset Lab Environment
            </button>
          </div>

        </div>
      </nav>

      {/* MODALS */}
      {showFlashcards && (
          <FlashcardDrill cards={FLASHCARDS} onClose={() => setShowFlashcards(false)} />
      )}
      {showCheatSheet && (
          <CheatSheetModal bookmarks={bookmarkedMissions} missions={MISSIONS} onClose={() => setShowCheatSheet(false)} />
      )}
      {showTroubleshoot && (
        <TroubleshootingModal onClose={() => setShowTroubleshoot(false)} />
      )}
      {/* Report Card Overlay */}
      {showReportCard && (
        <ReportCard results={examResults} total={examQuestions.length} onClose={() => setShowReportCard(false)} />
      )}
      
      {/* FILE EDITOR MODAL */}
      {editorState.open && (
          <FileEditor 
            filename={editorState.filename} 
            initialContent={editorState.content} 
            onSave={handleEditorSave} 
            onClose={() => setEditorState({ open: false, filename: '', content: '' })} 
          />
      )}

      {/* MOBILE MENU TOGGLE */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 right-4 z-50 p-2 bg-slate-900 text-white rounded-md md:hidden shadow-lg">
        <MenuIcon size={24} />
      </button>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-5xl mx-auto pb-6">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">The RHCSA Blueprint</h1>
              <p className="text-lg text-slate-600">Study the concepts below, then test them in the terminal below.</p>
            </header>

            {/* TAB NAVIGATION */}
            <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
                {['pillar-1', 'pillar-2', 'pillar-3', 'pillar-4', 'pillar-5', 'tips'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-red-500 text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {tab === 'tips' ? 'Exam Tips' : tab.replace('-', ' ').toUpperCase().replace('PILLAR', 'PILLAR ')}
                    </button>
                ))}
            </div>

            {/* PILLARS CONTENT (CONDITIONAL RENDERING) */}
            
            {activeTab === 'pillar-1' && (
            <section id="pillar-1" className="mb-16 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><TerminalIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 1: Tools & Scripting</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Visual: Tar Flags */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Command Anatomy: Tar</h3>
                   <div className="flex flex-col gap-2 font-mono text-sm">
                       <div className="flex items-center gap-2"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">-c</span> <span>Create Archive</span></div>
                       <div className="flex items-center gap-2"><span className="bg-green-100 text-green-700 px-2 py-1 rounded">-z</span> <span>Gzip Compression</span></div>
                       <div className="flex items-center gap-2"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">-v</span> <span>Verbose (Show files)</span></div>
                       <div className="flex items-center gap-2"><span className="bg-red-100 text-red-700 px-2 py-1 rounded">-f</span> <span>File Name (Required Last!)</span></div>
                   </div>
                   <div className="mt-4 pt-4 border-t border-slate-100">
                      <CodeBlock>tar -czvf archive.tar.gz /path</CodeBlock>
                   </div>
                </div>

                {/* Visual: Links */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Hard vs. Soft Links</h3>
                   <div className="grid grid-cols-2 gap-4 text-center text-xs mb-4">
                       <div className="bg-slate-50 p-2 rounded">
                           <div className="font-bold text-slate-700 mb-1 flex items-center justify-center gap-1"><LinkIcon size={14}/> Hard Link</div>
                           <p className="text-slate-500">Mirror Copy</p>
                           <p className="text-[10px] text-slate-400 mt-1">Same Inode. Deleting original keeps link alive.</p>
                       </div>
                       <div className="bg-slate-50 p-2 rounded">
                           <div className="font-bold text-slate-700 mb-1 flex items-center justify-center gap-1"><UnlinkIcon size={14}/> Soft Link</div>
                           <p className="text-slate-500">Shortcut</p>
                           <p className="text-[10px] text-slate-400 mt-1">Different Inode. Breaks if original moves.</p>
                       </div>
                   </div>
                   <CodeBlock>ln -s /source /shortcut</CodeBlock>
                </div>

                <RegexPlayground />
                <PermissionsCalculator />
                <UserBuilder />
                <FindBuilder />
                <ScriptBuilder />

              </div>
            </section>
            )}
            
            {activeTab === 'pillar-2' && (
            <section id="pillar-2" className="mb-16 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg"><CpuIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 2: Operate Running Systems</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Visual: Boot Reset */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:col-span-2">
                   <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><SettingsIcon size={16} className="text-red-500"/> Root Password Reset Workflow</h3>
                   <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-xs text-center font-mono">
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 w-full">
                            <span className="block font-bold text-red-700 mb-1">1. GRUB</span>
                            Hit 'e' to edit
                        </div>
                        <div className="text-slate-300">→</div>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 w-full">
                            <span className="block font-bold text-red-700 mb-1">2. Edit Line</span>
                            Append <code>rw init=/bin/bash</code>
                        </div>
                        <div className="text-slate-300">→</div>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 w-full">
                            <span className="block font-bold text-red-700 mb-1">3. Reset</span>
                            <code>passwd</code> root
                        </div>
                        <div className="text-slate-300">→</div>
                        <div className="bg-red-50 p-3 rounded-lg border border-red-100 w-full">
                            <span className="block font-bold text-red-700 mb-1">4. Relabel</span>
                            <code>touch /.autorelabel</code>
                        </div>
                   </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Boot Targets</h3>
                  <CodeBlock>systemctl isolate multi-user.target</CodeBlock>
                </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Systemd Units</h3>
                   <CodeBlock>systemctl enable --now httpd</CodeBlock>
                   <CodeBlock>systemctl list-units --type=service</CodeBlock>
                </div>
                <JournalctlBuilder />
              </div>
            </section>
            )}

            {activeTab === 'pillar-3' && (
             <section id="pillar-3" className="mb-16 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><HardDriveIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 3: Storage</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Dynamic LVM Visualizer - Replaced Static Component */}
                <LVMVisualizer lvmState={lvmState} />

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">FSTAB Anatomy</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-900 text-white">
                        <tr>
                          <th className="p-2 border border-slate-700">UUID/Device</th>
                          <th className="p-2 border border-slate-700">Mount</th>
                          <th className="p-2 border border-slate-700">Type</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        <tr className="bg-amber-50">
                          <td className="p-2 border border-amber-200">UUID="5b...a2"</td>
                          <td className="p-2 border border-amber-200">/data</td>
                          <td className="p-2 border border-amber-200">xfs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">AutoFS</h3>
                   <CodeBlock>/shares /etc/auto.shares</CodeBlock>
                </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Stratis & VDO</h3>
                   <p className="text-xs text-slate-600 mb-2">Advanced storage layers.</p>
                   <CodeBlock>stratis pool create mypool /dev/sdb</CodeBlock>
                   <CodeBlock>stratis fs create mypool myfs</CodeBlock>
                </div>
                <FstabBuilder />
                <SwapBuilder />
              </div>
            </section>
            )}

            {activeTab === 'pillar-4' && (
             <section id="pillar-4" className="mb-16 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><SettingsIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 4: Deploy & Maintain</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Software & Time</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-xs text-slate-600 mb-1 font-bold">DNF (Package Manager):</p>
                      <CodeBlock>dnf install httpd</CodeBlock>
                      <CodeBlock>dnf update</CodeBlock>
                    </div>
                    <div className="text-sm">
                      <p className="text-xs text-slate-600 mb-1 font-bold">Chrony (NTP):</p>
                      <CodeBlock>chronyc sources</CodeBlock>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Containerized Apps</h3>
                   <p className="text-xs text-slate-600 mb-2">Flatpak is used for desktop applications.</p>
                   <CodeBlock>flatpak remote-add --if-not-exists flathub ...</CodeBlock>
                   <CodeBlock>flatpak install flathub org.gnome.gedit</CodeBlock>
                </div>
                
                <CronBuilder />
                <RepoBuilder />
                <NTPBuilder />

                 {/* NEW CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Repositories</h3>
                   <p className="text-xs text-slate-600 mb-2">Config in <code>/etc/yum.repos.d/</code></p>
                   <CodeBlock>[repo_id]</CodeBlock>
                   <CodeBlock>baseurl=http://server/repo</CodeBlock>
                   <CodeBlock>gpgcheck=0</CodeBlock>
                </div>
              </div>
            </section>
            )}

            {activeTab === 'pillar-5' && (
             <section id="pillar-5" className="mb-24 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><ShieldIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 5: Security & Networking</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Visual: Security Layers */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><ShieldIcon size={16} className="text-emerald-500"/> Defense Layers</h3>
                   <div className="relative flex items-center justify-center h-32">
                        <div className="absolute w-32 h-32 bg-red-100 rounded-full flex items-center justify-center border-2 border-red-200 z-10">
                            <span className="text-[10px] font-bold text-red-800 mt-[-20px]">Firewall</span>
                        </div>
                        <div className="absolute w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-200 z-20">
                            <span className="text-[10px] font-bold text-emerald-800 mt-[-10px]">SELinux</span>
                        </div>
                        <div className="absolute w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200 z-30">
                            <span className="text-[8px] font-bold text-blue-800">rwx</span>
                        </div>
                   </div>
                   <div className="text-xs text-center text-slate-500 mt-1">If Firewall opens, SELinux can still block.</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">SELinux</h3>
                   <CodeBlock>restorecon -R /var/www/html</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Firewall</h3>
                   <CodeBlock>firewall-cmd --permanent --add-service=http</CodeBlock>
                </div>
                 {/* NEW CARDS */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Access Control Lists</h3>
                   <CodeBlock>setfacl -m u:student:rw file</CodeBlock>
                   <CodeBlock>getfacl file</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">System Identity</h3>
                   <p className="text-xs text-slate-600 mb-2">Set hostname persistently.</p>
                   <CodeBlock>hostnamectl set-hostname name</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Privilege Escalation</h3>
                   <p className="text-xs text-slate-600 mb-2">Configure sudo access.</p>
                   <CodeBlock>/etc/sudoers.d/custom</CodeBlock>
                   <CodeBlock>user ALL=(ALL) ALL</CodeBlock>
                </div>
                 
                 <NetworkBuilder />
                 <SELinuxReference />
                 <UmaskCalculator />
                 <FirewallBuilder />

              </div>
            </section>
            )}
            
            {activeTab === 'tips' && (
            <section className="mb-24 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                 <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><BookOpenIcon size={24} /></div>
                 <div><h2 className="text-2xl font-bold text-slate-900">Exam Strategy & Tips</h2></div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                       <div>
                           <h4 className="font-bold text-indigo-600 mb-2">During the Exam</h4>
                           <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                               <li><b>Reboot Often:</b> Verify your changes survive a reboot. If you break boot, fix it immediately using the recovery console.</li>
                               <li><b>Read Carefully:</b> Does the question ask for a logical volume of 500MB or 500 extents?</li>
                               <li><b>Use Man Pages:</b> Don't memorize flags. Type <code>man &lt;command&gt;</code> and search with <code>/</code>.</li>
                               <li><b>Keyword Search:</b> Forgot a command? Use <code>man -k &lt;keyword&gt;</code> or <code>apropos &lt;keyword&gt;</code> to find it.</li>
                               <li><b>Copy/Paste:</b> Mistyping a UUID in fstab is fatal. Use copy/paste from terminal output.</li>
                           </ul>
                       </div>
                       <div>
                           <h4 className="font-bold text-indigo-600 mb-2">Common Pitfalls</h4>
                           <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                               <li><b>Firewall:</b> Forgetting <code>--permanent</code> or <code>--reload</code>.</li>
                               <li><b>SELinux:</b> Moving files instead of copying (preserves wrong context). Always use <code>restorecon</code>.</li>
                               <li><b>Scripting:</b> Forgetting <code>chmod +x</code> to make scripts executable.</li>
                               <li><b>LVM:</b> Forgetting to format the new logical volume before mounting (<code>mkfs</code>).</li>
                               <li><b>Chronyd:</b> Forgetting to enable the service so it starts on boot.</li>
                           </ul>
                       </div>
                   </div>
                   
                   <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                       <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2"><AlertTriangleIcon size={18}/> Critical Failures (Zero Score Risks)</h4>
                       <ul className="list-disc pl-4 text-sm text-red-800 space-y-1">
                           <li><b>System Not Booting:</b> If your VM doesn't boot when the examiners restart it, you get a 0 for the entire exam. Test your reboots!</li>
                           <li><b>Root Password:</b> If you cannot reset the root password successfully, they cannot grade your exam.</li>
                           <li><b>Network Down:</b> If you mess up the network interface so the system is unreachable, they cannot grade it.</li>
                       </ul>
                   </div>
              </div>
            </section>
            )}

          </div>
        </main>

        {/* BOTTOM FIXED TERMINAL SECTION */}
        <section id="practice-lab" className={`shrink-0 bg-slate-200 border-t border-slate-300 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out flex flex-col ${isTerminalOpen ? 'h-80' : 'h-10'}`}>
          <div 
              className="h-10 bg-slate-300 border-b border-slate-400 flex items-center justify-between px-4 cursor-pointer hover:bg-slate-400 transition-colors shrink-0"
              onClick={() => setIsTerminalOpen(!isTerminalOpen)}
          >
              <div className="flex items-center gap-2 font-bold text-slate-700 text-xs uppercase tracking-wider">
                  <TerminalIcon size={16} /> Practice Lab & Missions
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                  {isTerminalOpen ? "Minimize" : "Restore"}
                  {isTerminalOpen ? <ChevronDownIcon size={16}/> : <ChevronUpIcon size={16}/>}
              </div>
          </div>

          <div className={`flex-1 p-4 pt-0 overflow-hidden flex gap-4 ${!isTerminalOpen && 'invisible'}`}>
            <div className="max-w-5xl mx-auto flex gap-4 w-full h-full pt-4">
            
            {/* Terminal Container */}
            <div className={`flex-1 rounded-lg overflow-hidden flex flex-col shadow-lg border border-slate-700 relative bg-slate-900 ${successFlash ? 'animate-success-pulse' : ''}`}>
              <div className={`p-2 flex items-center justify-between border-b border-slate-700 shrink-0 bg-slate-800`}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className={`ml-2 text-xs font-mono text-slate-300`}>root@localhost:~</span>
                </div>
                <div className={`text-xs font-mono flex items-center gap-2 text-slate-300`}>
                   <ShieldIcon size={12} className="text-green-400"/>
                   <span className="text-[10px] uppercase">SSH Active</span>
                </div>
              </div>
              
              <div 
                className={`flex-1 p-3 font-mono text-sm overflow-y-auto bg-slate-900 text-slate-300`}
                onClick={() => inputRef.current?.focus()}
              >
                <div className="mb-2 opacity-70">Welcome to the RHCSA Practice Terminal v2.1</div>
                <div className="mb-2 opacity-50 text-xs">Type 'help' for commands. Try 'vi &lt;filename&gt;' to edit files!</div>
                
                {terminalHistory.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap mb-1 break-words ${
                    line.type === 'input' ? `text-slate-300 font-bold` : 
                    line.type === 'success' ? 'text-green-400 font-bold' :
                    line.type === 'error' ? 'text-red-400' : 
                    line.type === 'system' ? 'text-yellow-400' : 'opacity-90'
                  }`}>
                    {line.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
                
                <div className={`flex items-center mt-2 text-green-400`}>
                  <span className="mr-2">[root@server ~]#</span>
                  <input 
                    ref={inputRef}
                    type="text" 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`bg-transparent border-none outline-none flex-1 text-slate-300 ${isProcessing ? 'cursor-wait' : ''}`}
                    autoComplete="off" 
                    spellCheck="false"
                    maxLength={MAX_INPUT_LENGTH}
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            {/* Mission/Lesson Side Panel */}
            <div className="w-80 flex flex-col gap-3 shrink-0">
              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-sm flex-1 overflow-y-auto relative">
                {/* Visual indicator for completed missions */}
                {activeMission && completedMissions.includes(activeMission.id) && !examMode && (
                    <div className="absolute top-2 right-2 text-green-500"><CheckIcon size={16} /></div>
                )}
                
                {/* Bookmark Button (New Feature) */}
                 {activeMission && !examMode && (
                    <button 
                        onClick={() => toggleBookmark(activeMission.id)}
                        className={`absolute top-2 left-2 ${bookmarkedMissions.includes(activeMission.id) ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
                        title={bookmarkedMissions.includes(activeMission.id) ? "Remove Bookmark" : "Bookmark this Mission"}
                    >
                        <StarIcon size={18} className={bookmarkedMissions.includes(activeMission.id) ? "fill-current" : ""} />
                    </button>
                )}

                <div className="flex items-center gap-2 mb-2 ml-6">
                  <CrosshairIcon size={18} className={examMode ? "text-red-600 animate-pulse" : "text-blue-600"}/>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {currentMissionId === 0 ? "Ready?" : examMode ? `Exam Task ${examQuestions.indexOf(activeMission) + 1}/15` : `Mission ${currentMissionId}`}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  {currentMissionId === 0 
                    ? <span>Type <span className="bg-slate-100 px-1 rounded text-red-500 font-bold">start</span> to begin or click Mock Exam.</span>
                    : missionComplete
                      ? "All scenarios finished."
                      : (activeMission ? activeMission.desc : "")
                  }
                </p>

                {/* HINT TOGGLE (Disabled in Exam Mode) */}
                {currentMissionId > 0 && !missionComplete && activeMission && !examMode && (
                   <div className="mt-2">
                     {!showHint ? (
                       <button 
                         onClick={() => setShowHint(true)} 
                         className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded w-full justify-center"
                       >
                         <EyeIcon size={12} /> Reveal Hint
                       </button>
                     ) : (
                       <p className="text-xs text-blue-600 italic bg-blue-50 p-2 rounded border border-blue-100">
                         Hint: {activeMission.hint}
                       </p>
                     )}
                   </div>
                )}
              </div>
              
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 shadow-sm h-24 overflow-y-auto">
                <div className="flex items-center gap-2 mb-1 text-amber-700 font-bold text-[10px] uppercase tracking-wider">
                  <BookOpenIcon size={10} /> Quick Lesson
                </div>
                {/* HIDE LESSON IF FLASHCARD MODE IS ON */}
                {!showFlashcards && (
                    <p className="text-[10px] text-amber-900 leading-relaxed">
                    {currentMissionId === 0 
                        ? "Lessons appear here." 
                        : examMode 
                        ? "No lessons during exam mode!"
                        : (activeMission ? activeMission.lesson : "")
                    }
                    </p>
                )}
              </div>
            </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
