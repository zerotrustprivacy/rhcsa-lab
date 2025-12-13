import React, { useState, useEffect, useRef } from 'react';

// --- 1. ICONS (Inline SVGs) ---
const TerminalIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);
const CpuIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
);
const HardDriveIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>
);
const SettingsIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const ShieldIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const MenuIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const FileTextIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const CopyIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const CheckIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const CrosshairIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>
);
const BookOpenIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const LockIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const EyeIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const NetworkIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
);
const TimerIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const ZapIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const PaletteIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
);
const AlertTriangleIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const LinkIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
);
const UnlinkIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"></path><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"></path><line x1="8" y1="2" x2="8" y2="5"></line><line x1="2" y1="8" x2="5" y2="8"></line><line x1="16" y1="19" x2="16" y2="22"></line><line x1="19" y1="16" x2="22" y2="16"></line></svg>
);
const LayersIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
);

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
                    <div className={`text-5xl font-mono font-bold ${score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                        {score}%
                    </div>
                    <p className="text-slate-500 text-sm mt-2">
                        {score >= 70 ? "PASSED! You're ready for the real deal." : "FAILED. Review the pillars below."}
                    </p>
                </div>
                {Object.keys(missedCategories).length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <AlertTriangleIcon size={14} /> Weak Points Detected
                        </h4>
                        <div className="space-y-2">
                            {Object.entries(missedCategories).map(([cat, count]) => (
                                <div key={cat} className="flex justify-between items-center bg-red-50 p-2 rounded border border-red-100 text-sm">
                                    <span className="font-semibold text-slate-700">{cat}</span>
                                    <span className="bg-red-200 text-red-800 text-xs px-2 py-0.5 rounded-full">
                                        Missed {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={onClose} className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 transition-colors">
                    Close Report
                </button>
            </div>
        </div>
    );
};

// --- 3. CONSTANTS & DATA ---
const MAX_INPUT_LENGTH = 256; 
const ILLEGAL_CHARS = /<script\b[^>]*>([\s\S]*?)<\/script>/gm; 
const UTILITY_COMMANDS = ['clear', 'help', 'ls', 'pwd', 'whoami', 'history', 'id', 'exit', 'man', 'cat', 'touch', 'mkdir', 'rm', 'cd', 'cp', 'mv'];

const THEMES = [
    { id: 'rhel', name: 'RHEL (Default)', bg: 'bg-slate-900', text: 'text-slate-300', prompt: 'text-green-400', cursor: 'bg-green-400' },
    { id: 'matrix', name: 'Hacker Green', bg: 'bg-black', text: 'text-green-500', prompt: 'text-green-400', cursor: 'bg-green-500' },
    { id: 'dracula', name: 'Dracula', bg: 'bg-[#282a36]', text: 'text-[#f8f8f2]', prompt: 'text-[#ff79c6]', cursor: 'bg-[#bd93f9]' },
    { id: 'amber', name: 'Retro Amber', bg: 'bg-[#1a1200]', text: 'text-[#ffb000]', prompt: 'text-[#ffb000]', cursor: 'bg-[#ffb000]' }
];

const MAN_PAGES = {
    useradd: "NAME\n  useradd - create a new user\nSYNOPSIS\n  useradd [options] LOGIN\nOPTIONS\n  -u UID\n  -g GID\n  -G GROUPS",
    tar: "NAME\n  tar - archive utility\nOPTIONS\n  -c Create\n  -x Extract\n  -f File\n  -v Verbose\n  -z Gzip",
    chmod: "NAME\n  chmod - change file mode bits\nEXAMPLES\n  chmod 755 file",
    default: "No manual entry found. Try 'help'."
};

const INITIAL_FS = {
    '/root': { type: 'dir', children: { 'anaconda-ks.cfg': { type: 'file' }, 'original-ks.cfg': { type: 'file' } } },
    '/home': { type: 'dir', children: { 'student': { type: 'dir', children: {} } } },
    '/etc': { type: 'dir', children: { 'passwd': { type: 'file' }, 'hosts': { type: 'file' } } },
};

// FULL MISSION LIST (MAPPED TO 64 OBJECTIVES)
const MISSIONS = [
  // --- ESSENTIAL TOOLS ---
  { id: 1, category: "Tools", tool: "ls", title: "Input/Output", desc: "Redirect output of 'ls' to 'file.txt'.", lesson: "Redirection: > overwrites, >> appends.", hint: "ls > file.txt", check: (cmd) => /^ls\s+>\s+file\.txt$/.test(cmd) },
  { id: 2, category: "Tools", tool: "grep", title: "Analyze Text", desc: "Use grep to find 'root' in '/etc/passwd'.", lesson: "Regex: ^ starts with, $ ends with.", hint: "grep root /etc/passwd", check: (cmd) => /^grep\s+root\s+\/etc\/passwd$/.test(cmd) },
  { id: 3, category: "Tools", tool: "ssh", title: "Remote Access", desc: "SSH into 'serverb' as 'student'.", lesson: "Secure remote shell.", hint: "ssh student@serverb", check: (cmd) => /^ssh\s+student@serverb$/.test(cmd) },
  { id: 4, category: "Tools", tool: "tar", title: "Archive Files", desc: "Create a gzip archive 'backup.tar.gz' of '/home'.", lesson: "tar -czvf (Create, Gzip, Verbose, File).", hint: "tar -czvf backup.tar.gz /home", check: (cmd) => /^tar\s+/.test(cmd) && /-[a-zA-Z]*z/.test(cmd) && /-[a-zA-Z]*c/.test(cmd) },
  { id: 5, category: "Tools", tool: "touch", title: "Create Files", desc: "Create a new file named 'new.txt'.", lesson: "touch creates empty files or updates timestamps.", hint: "touch new.txt", check: (cmd) => /^touch\s+new\.txt$/.test(cmd) },
  { id: 6, category: "Tools", tool: "cp", title: "Copy Files", desc: "Copy 'file1' to '/tmp/file1'.", lesson: "cp copies files/dirs.", hint: "cp file1 /tmp/file1", check: (cmd) => /^cp\s+file1\s+\/tmp\/file1$/.test(cmd) },
  { id: 7, category: "Tools", tool: "ln", title: "Hard Links", desc: "Create a hard link 'hlink' to 'file1'.", lesson: "Hard links share the same inode.", hint: "ln file1 hlink", check: (cmd) => /^ln\s+file1\s+hlink$/.test(cmd) },
  { id: 8, category: "Tools", tool: "ln", title: "Soft Links", desc: "Create a soft link 'slink' to '/etc/hosts'.", lesson: "Soft links point to the file path.", hint: "ln -s /etc/hosts slink", check: (cmd) => /^ln\s+-s\s+\/etc\/hosts\s+slink$/.test(cmd) },
  { id: 9, category: "Tools", tool: "chmod", title: "Permissions", desc: "Set 'script.sh' to rwxr-x--- (750).", lesson: "Octal: 4=r, 2=w, 1=x.", hint: "chmod 750 script.sh", check: (cmd) => /^chmod\s+750\s+script\.sh$/.test(cmd) },
  { id: 10, category: "Tools", tool: "man", title: "Documentation", desc: "Open the manual for 'grep'.", lesson: "man pages are your best friend in the exam.", hint: "man grep", check: (cmd) => /^man\s+grep$/.test(cmd) },
  
  // --- SCRIPTING ---
  { id: 11, category: "Tools", tool: "touch", title: "Create Script", desc: "Create a file named 'myscript.sh'.", lesson: "Scripts automate tasks.", hint: "touch myscript.sh", check: (cmd) => /^touch\s+myscript\.sh$/.test(cmd) },
  { id: 12, category: "Tools", tool: "chmod", title: "Make Executable", desc: "Make 'myscript.sh' executable.", lesson: "chmod +x adds execution bit.", hint: "chmod +x myscript.sh", check: (cmd) => /^chmod\s+\+x\s+myscript\.sh$/.test(cmd) },
  { id: 13, category: "Tools", tool: "echo", title: "Script Inputs", desc: "Echo the first argument ($1).", lesson: "$1, $2 are positional arguments.", hint: "echo $1", check: (cmd) => /^echo\s+\$1$/.test(cmd) },
  
  // --- SYSTEMS ---
  { id: 14, category: "Systems", tool: "systemctl", title: "Reboot System", desc: "Reboot the machine.", lesson: "System power state.", hint: "systemctl reboot", check: (cmd) => /^systemctl\s+reboot$/.test(cmd) },
  { id: 15, category: "Systems", tool: "systemctl", title: "Boot Target", desc: "Isolate 'multi-user.target' now.", lesson: "Switch to text mode without rebooting.", hint: "systemctl isolate multi-user.target", check: (cmd) => /^systemctl\s+isolate\s+multi-user\.target$/.test(cmd) },
  { id: 16, category: "Systems", tool: "touch", title: "Root Pass Reset", desc: "Create the autorelabel file (Simulated).", lesson: "Essential for resetting root pass.", hint: "touch /.autorelabel", check: (cmd) => /^touch\s+\/\.autorelabel$/.test(cmd) },
  { id: 17, category: "Systems", tool: "kill", title: "Kill Process", desc: "Force kill PID 1234.", lesson: "-9 sends SIGKILL.", hint: "kill -9 1234", check: (cmd) => /^kill\s+-9\s+1234$/.test(cmd) },
  { id: 18, category: "Systems", tool: "renice", title: "Scheduling", desc: "Renice PID 1234 to priority 10.", lesson: "Adjust running process priority.", hint: "renice -n 10 1234", check: (cmd) => /^renice\s+-n\s+10\s+1234$/.test(cmd) },
  { id: 19, category: "Systems", tool: "tuned-adm", title: "Tuning", desc: "Set 'virtual-guest' profile.", lesson: "System performance profiles.", hint: "tuned-adm profile virtual-guest", check: (cmd) => /^tuned-adm\s+profile\s+virtual-guest$/.test(cmd) },
  { id: 20, category: "Systems", tool: "journalctl", title: "Logs", desc: "View logs for 'sshd'.", lesson: "Systemd journal.", hint: "journalctl -u sshd", check: (cmd) => /^journalctl\s+/.test(cmd) && /-u\s+sshd/.test(cmd) },
  { id: 21, category: "Systems", tool: "mkdir", title: "Preserve Logs", desc: "Create '/var/log/journal'.", lesson: "Makes journald logs persistent.", hint: "mkdir /var/log/journal", check: (cmd) => /^mkdir\s+(\/var\/log\/journal)/.test(cmd) },
  { id: 22, category: "Systems", tool: "systemctl", title: "Network Svc", desc: "Check status of 'NetworkManager'.", lesson: "Service management.", hint: "systemctl status NetworkManager", check: (cmd) => /^systemctl\s+status\s+NetworkManager$/.test(cmd) },
  { id: 23, category: "Systems", tool: "scp", title: "Transfer File", desc: "Copy 'file' to 'serverb:/tmp'.", lesson: "Secure Copy.", hint: "scp file serverb:/tmp", check: (cmd) => /^scp\s+file\s+serverb:\/tmp$/.test(cmd) },

  // --- STORAGE ---
  { id: 24, category: "Storage", tool: "fdisk", title: "Partitioning", desc: "Manage partitions on '/dev/vdb'.", lesson: "MBR/GPT management.", hint: "fdisk /dev/vdb", check: (cmd) => /^fdisk\s+\/dev\/vdb$/.test(cmd) },
  { id: 25, category: "Storage", tool: "pvcreate", title: "Create PV", desc: "Init '/dev/vdb1' as PV.", lesson: "LVM Layer 1.", hint: "pvcreate /dev/vdb1", check: (cmd) => /^pvcreate\s+\/dev\/vdb1$/.test(cmd) },
  { id: 26, category: "Storage", tool: "vgcreate", title: "Create VG", desc: "Create VG 'myvg' on '/dev/vdb1'.", lesson: "LVM Layer 2.", hint: "vgcreate myvg /dev/vdb1", check: (cmd) => /^vgcreate\s+myvg\s+\/dev\/vdb1$/.test(cmd) },
  { id: 27, category: "Storage", tool: "lvcreate", title: "Create LV", desc: "Create 1GB LV 'mylv' in 'myvg'.", lesson: "LVM Layer 3.", hint: "lvcreate -L 1G -n mylv myvg", check: (cmd) => /^lvcreate\s+/.test(cmd) && /-L\s+1G/.test(cmd) && /-n\s+mylv/.test(cmd) },
  { id: 28, category: "Storage", tool: "blkid", title: "UUID", desc: "Find UUIDs for block devices.", lesson: "Persistent mounting identifier.", hint: "blkid", check: (cmd) => /^blkid$/.test(cmd) },
  { id: 29, category: "Storage", tool: "mkswap", title: "Format Swap", desc: "Format '/dev/vdb2' as swap.", lesson: "Swap creation.", hint: "mkswap /dev/vdb2", check: (cmd) => /^mkswap\s+\/dev\/vdb2$/.test(cmd) },
  { id: 30, category: "Storage", tool: "swapon", title: "Enable Swap", desc: "Activate swap on '/dev/vdb2'.", lesson: "Enable swap.", hint: "swapon /dev/vdb2", check: (cmd) => /^swapon\s+\/dev\/vdb2$/.test(cmd) },
  { id: 31, category: "Storage", tool: "mkfs.xfs", title: "Format XFS", desc: "Format '/dev/myvg/mylv' as XFS.", lesson: "Filesystem creation.", hint: "mkfs.xfs /dev/myvg/mylv", check: (cmd) => /^mkfs\.xfs\s+\/dev\/myvg\/mylv$/.test(cmd) },
  { id: 32, category: "Storage", tool: "mkfs.ext4", title: "Format Ext4", desc: "Format '/dev/myvg/mylv' as Ext4.", lesson: "Filesystem creation.", hint: "mkfs.ext4 /dev/myvg/mylv", check: (cmd) => /^mkfs\.ext4\s+\/dev\/myvg\/mylv$/.test(cmd) },
  { id: 33, category: "Storage", tool: "mount", title: "Mount FS", desc: "Mount '/dev/myvg/mylv' to '/mnt'.", lesson: "Manual mounting.", hint: "mount /dev/myvg/mylv /mnt", check: (cmd) => /^mount\s+\/dev\/myvg\/mylv\s+\/mnt$/.test(cmd) },
  { id: 34, category: "Storage", tool: "mount", title: "Mount NFS", desc: "Mount 'server:/share' to '/mnt'.", lesson: "Network filesystem.", hint: "mount -t nfs server:/share /mnt", check: (cmd) => /^mount\s+/.test(cmd) && /-t\s+nfs/.test(cmd) },
  { id: 35, category: "Storage", tool: "dnf", title: "AutoFS", desc: "Install 'autofs'.", lesson: "Automounting utility.", hint: "dnf install autofs", check: (cmd) => /^dnf\s+install\s+autofs$/.test(cmd) },
  { id: 36, category: "Storage", tool: "lvextend", title: "Extend LV", desc: "Add 100M to 'mylv' and resize FS.", lesson: "Resize fs flag is critical.", hint: "lvextend -L +100M -r /dev/myvg/mylv", check: (cmd) => /^lvextend\s+/.test(cmd) && /-r/.test(cmd) && /-L\s+\+100M/.test(cmd) },
  
  // --- DEPLOY & CONFIGURE ---
  { id: 37, category: "Deploy", tool: "crontab", title: "Cron Job", desc: "Edit current user's cron.", lesson: "Task scheduling.", hint: "crontab -e", check: (cmd) => /^crontab\s+-e$/.test(cmd) },
  { id: 38, category: "Deploy", tool: "systemctl", title: "Enable Boot", desc: "Enable 'httpd' to start at boot.", lesson: "Service persistence.", hint: "systemctl enable httpd", check: (cmd) => /^systemctl\s+enable\s+httpd$/.test(cmd) },
  { id: 39, category: "Deploy", tool: "systemctl", title: "Set Target", desc: "Set default boot target to 'multi-user'.", lesson: "Boot level config.", hint: "systemctl set-default multi-user.target", check: (cmd) => /^systemctl\s+set-default\s+multi-user\.target$/.test(cmd) },
  { id: 40, category: "Deploy", tool: "chronyc", title: "Time Sync", desc: "Check NTP sources.", lesson: "Time management.", hint: "chronyc sources", check: (cmd) => /^chronyc\s+sources\b/.test(cmd) },
  { id: 41, category: "Deploy", tool: "dnf", title: "Install Pkg", desc: "Install 'httpd'.", lesson: "Package management.", hint: "dnf install httpd", check: (cmd) => /^dnf\s+install\s+httpd$/.test(cmd) },
  { id: 42, category: "Deploy", tool: "dnf", title: "Update Pkg", desc: "Update all packages.", lesson: "System maintenance.", hint: "dnf update", check: (cmd) => /^dnf\s+update$/.test(cmd) },
  { id: 43, category: "Deploy", tool: "grub2-mkconfig", title: "Bootloader", desc: "Regenerate GRUB config.", lesson: "Bootloader updates.", hint: "grub2-mkconfig -o /boot/grub2/grub.cfg", check: (cmd) => /^grub2-mkconfig\s+/.test(cmd) },
  { id: 44, category: "Deploy", tool: "nmcli", title: "Configure IP", desc: "Add 'static-eth0' connection.", lesson: "Networking.", hint: "nmcli con add con-name static-eth0 type ethernet ifname eth0", check: (cmd) => /^nmcli\s+con\s+add\s+/.test(cmd) },
  { id: 45, category: "Deploy", tool: "hostnamectl", title: "Hostname", desc: "Set hostname to 'server1'.", lesson: "System identity.", hint: "hostnamectl set-hostname server1", check: (cmd) => /^hostnamectl\s+set-hostname\s+server1$/.test(cmd) },
  { id: 46, category: "Deploy", tool: "firewall-cmd", title: "Firewall Service", desc: "Allow 'http' permanently.", lesson: "Network security.", hint: "firewall-cmd --add-service=http --permanent", check: (cmd) => /^firewall-cmd\s+/.test(cmd) && /--add-service=http/.test(cmd) && /--permanent/.test(cmd) },

  // --- USERS & GROUPS ---
  { id: 47, category: "Users", tool: "useradd", title: "Add User", desc: "Create user 'harry'.", lesson: "User mgmt.", hint: "useradd harry", check: (cmd) => /^useradd\s+harry$/.test(cmd) },
  { id: 48, category: "Users", tool: "userdel", title: "Delete User", desc: "Delete user 'harry'.", lesson: "User mgmt.", hint: "userdel harry", check: (cmd) => /^userdel\s+harry$/.test(cmd) },
  { id: 49, category: "Users", tool: "usermod", title: "Mod User", desc: "Lock user 'harry'.", lesson: "User mgmt.", hint: "usermod -L harry", check: (cmd) => /^usermod\s+-L\s+harry$/.test(cmd) },
  { id: 50, category: "Users", tool: "chage", title: "Pass Aging", desc: "Set max age 90 for 'harry'.", lesson: "Password policy.", hint: "chage -M 90 harry", check: (cmd) => /^chage\s+-M\s+90\s+harry$/.test(cmd) },
  { id: 51, category: "Users", tool: "groupadd", title: "Add Group", desc: "Create group 'sales'.", lesson: "Group mgmt.", hint: "groupadd sales", check: (cmd) => /^groupadd\s+sales$/.test(cmd) },
  { id: 52, category: "Users", tool: "groupdel", title: "Del Group", desc: "Delete group 'sales'.", lesson: "Group mgmt.", hint: "groupdel sales", check: (cmd) => /^groupdel\s+sales$/.test(cmd) },
  { id: 53, category: "Users", tool: "gpasswd", title: "Group Admin", desc: "Add 'harry' to 'sales'.", lesson: "Group membership.", hint: "gpasswd -a harry sales", check: (cmd) => /^gpasswd\s+-a\s+harry\s+sales$/.test(cmd) },
  { id: 54, category: "Users", tool: "visudo", title: "Sudo", desc: "Edit sudoers file.", lesson: "Privilege escalation.", hint: "visudo", check: (cmd) => /^visudo$/.test(cmd) },

  // --- SECURITY ---
  { id: 55, category: "Security", tool: "firewall-cmd", title: "Firewall Port", desc: "Open port 8080/tcp permanently.", lesson: "Port security.", hint: "firewall-cmd --add-port=8080/tcp --permanent", check: (cmd) => /^firewall-cmd\s+/.test(cmd) && /--add-port=8080\/tcp/.test(cmd) },
  { id: 56, category: "Security", tool: "umask", title: "Umask", desc: "Set umask to 027.", lesson: "Default permissions.", hint: "umask 027", check: (cmd) => /^umask\s+027$/.test(cmd) },
  { id: 57, category: "Security", tool: "ssh-keygen", title: "SSH Key", desc: "Generate SSH keys.", lesson: "Authentication.", hint: "ssh-keygen", check: (cmd) => /^ssh-keygen/.test(cmd) },
  { id: 58, category: "Security", tool: "setenforce", title: "Enforcing", desc: "Set SELinux to Enforcing.", lesson: "MAC mode.", hint: "setenforce 1", check: (cmd) => /^setenforce\s+1$/.test(cmd) },
  { id: 59, category: "Security", tool: "ls", title: "List Context", desc: "List file contexts.", lesson: "SELinux labels.", hint: "ls -Z", check: (cmd) => /^ls\s+-[a-zA-Z]*Z/.test(cmd) },
  { id: 60, category: "Security", tool: "restorecon", title: "Restore Context", desc: "Fix context on '/var/www'.", lesson: "SELinux fix.", hint: "restorecon -R /var/www", check: (cmd) => /^restorecon\s+/.test(cmd) && /-R/.test(cmd) },
  { id: 61, category: "Security", tool: "semanage", title: "Port Label", desc: "Add port 81 to http_port_t.", lesson: "SELinux ports.", hint: "semanage port -a -t http_port_t -p tcp 81", check: (cmd) => /^semanage\s+port\s+/.test(cmd) && /-a/.test(cmd) },
  { id: 62, category: "Security", tool: "setsebool", title: "Boolean", desc: "Enable httpd home dirs.", lesson: "SELinux booleans.", hint: "setsebool -P httpd_enable_homedirs 1", check: (cmd) => /^setsebool\s+/.test(cmd) && /-P/.test(cmd) },
  { id: 63, category: "Software", tool: "dnf", title: "Repo Config", desc: "Add a repo from URL.", lesson: "Software sources.", hint: "dnf config-manager --add-repo http://example.com/repo", check: (cmd) => /^dnf\s+config-manager\s+--add-repo/.test(cmd) },
  { id: 64, category: "Software", tool: "flatpak", title: "Flatpak", desc: "Install 'gedit' from flathub.", lesson: "Application streams.", hint: "flatpak install flathub org.gnome.gedit", check: (cmd) => /^flatpak\s+install/.test(cmd) }
];

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

  // PRO STATE
  const [completedMissions, setCompletedMissions] = useState([]);
  const [examMode, setExamMode] = useState(false);
  const [examTimeLeft, setExamTimeLeft] = useState(0);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examResults, setExamResults] = useState([]); 
  const [showReportCard, setShowReportCard] = useState(false);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load progress
  useEffect(() => {
      const saved = localStorage.getItem('rhcsa_progress');
      if (saved) setCompletedMissions(JSON.parse(saved));
  }, []);

  // Save progress
  useEffect(() => {
      localStorage.setItem('rhcsa_progress', JSON.stringify(completedMissions));
  }, [completedMissions]);

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

  // Auto-scroll
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

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

  // Process Logic
  const processCommand = (cmd) => {
    const cleanCmd = sanitizeInput(cmd.trim());
    if (!cleanCmd) return;

    addToTerm(`[root@server ${cwd === '/root' ? '~' : cwd.split('/').pop()}]# ${cleanCmd}`, 'input');
    setInputHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const args = cleanCmd.split(' ');
    const base = args[0];

    // MAN PAGE
    if (base === 'man') {
        const page = MAN_PAGES[args[1]] || MAN_PAGES['default'];
        addToTerm(page);
        return;
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
    switch (base) {
      case 'clear': setTerminalHistory([]); break;
      case 'exit': 
        if (examMode) {
            setExamMode(false);
            addToTerm("Exam aborted.", 'error');
            setCurrentMissionId(0);
        } else {
            setCurrentMissionId(0);
            setMissionComplete(false);
            addToTerm("Session reset.", 'system');
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
      case 'id': addToTerm("uid=0(root) gid=0(root) groups=0(root)"); break;
      case 'nmcli': addToTerm("Connection successfully added."); break;
      case 'systemctl': addToTerm("Active: active (running)"); break;
      case 'dnf': addToTerm("Complete!"); break;
      case 'grep': if(cleanCmd.includes('^root')) addToTerm("root:x:0:0:root:/root:/bin/bash"); break;
      case 'nmtui': addToTerm("Opening NetworkManager TUI... [Graphic Interface Simulated]", 'success'); break;
      case 'flatpak': if (args[1] === 'install') addToTerm("Installing... Complete."); else addToTerm("Flatpak remote added."); break;
      case 'hostnamectl': addToTerm("Hostname set."); break;
      case 'semanage': addToTerm("Port label added."); break;
      case 'restorecon': addToTerm("Relabeled."); break;
      default: 
        if (!['useradd','groupadd','usermod','tar','chmod','ln','find','setfacl','tuned-adm','nice','chronyc','journalctl','pvcreate','vgcreate','lvcreate','lvextend','mkfs.xfs','mkswap','mount','crontab','firewall-cmd','ssh-keygen','chage','fdisk','scp','kill'].includes(base)) {
             addToTerm(`bash: ${base}: command not found`, 'error');
        } else {
             addToTerm("Command executed (Simulated).");
        }
    }
  };

  const handleKeyDown = (e) => {
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

          <button onClick={startExamMode} disabled={examMode} className="w-full flex items-center justify-center gap-2 mb-6 px-3 py-2 rounded-md bg-red-600 text-white font-bold hover:bg-red-700 text-sm transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
             <TimerIcon size={16}/> {examMode ? "Exam in Progress" : "Start Mock Exam"}
          </button>
          
          <button onClick={cycleTheme} className="w-full flex items-center justify-center gap-2 mb-6 px-3 py-2 rounded-md bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 text-sm transition-colors border border-slate-700">
             <PaletteIcon size={16}/> {currentTheme.name}
          </button>

          <ul className="space-y-1 overflow-y-auto flex-1 scrollbar-hide">
            <li><button onClick={() => { setExamMode(false); setCurrentMissionId(0); }} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors w-full text-left"><TerminalIcon size={16}/> Practice Lab</button></li>
            <div className="my-2 border-t border-slate-800"></div>
            <li className="text-xs text-slate-500 uppercase tracking-wider mt-4 mb-2 px-3">Quick Links</li>
            <li><a href="#pillar-1" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors"><FileTextIcon size={16}/> Tools & Scripting</a></li>
            <li><a href="#pillar-2" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors"><CpuIcon size={16}/> Running Systems</a></li>
            <li><a href="#pillar-3" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors"><HardDriveIcon size={16}/> Storage</a></li>
            <li><a href="#pillar-4" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors"><SettingsIcon size={16}/> Deploy & Maintain</a></li>
            <li><a href="#pillar-5" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors"><ShieldIcon size={16}/> Users & Security</a></li>
          </ul>
        </div>
      </nav>

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

            {/* PILLARS CONTENT */}
            <section id="pillar-1" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><TerminalIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 1: Tools & Scripting</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Key Commands</h3>
                  <CodeBlock>tar -czvf archive.tar.gz /path</CodeBlock>
                  <CodeBlock>chmod 750 script.sh</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">IO Redirection</h3>
                  <CodeBlock>ls &gt; file.txt</CodeBlock>
                  <CodeBlock>ls 2&gt; error.log</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Shell Scripting</h3>
                   <div className="text-xs text-slate-600 space-y-2">
                       <CodeBlock>#!/bin/bash</CodeBlock>
                       <CodeBlock>for i in $(cat list); do echo $i; done</CodeBlock>
                       <CodeBlock>if [ -f file ]; then echo "Exists"; fi</CodeBlock>
                   </div>
                </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Regular Expressions</h3>
                   <div className="text-xs text-slate-600 space-y-2">
                       <p><b>^</b> Start of line</p>
                       <p><b>$</b> End of line</p>
                       <p><b>.</b> Any single char</p>
                       <CodeBlock>grep "^root" /etc/passwd</CodeBlock>
                   </div>
                </div>
              </div>
            </section>
            
            <section id="pillar-2" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg"><CpuIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 2: Operate Running Systems</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Boot Targets</h3>
                  <CodeBlock>systemctl isolate multi-user.target</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Root Password Reset</h3>
                   <div className="text-xs text-slate-600 space-y-1">
                      <p>1. Interrupt GRUB</p>
                      <p>2. Add <code>rw init=/bin/bash</code> to linux line</p>
                      <p>3. <code>passwd</code></p>
                      <p>4. <code>touch /.autorelabel</code></p>
                      <p>5. <code>exec /sbin/init</code></p>
                   </div>
                </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Systemd Units</h3>
                   <CodeBlock>systemctl enable --now httpd</CodeBlock>
                   <CodeBlock>systemctl list-units --type=service</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Logging</h3>
                   <CodeBlock>journalctl -u sshd</CodeBlock>
                   <CodeBlock>journalctl --since "1 hour ago"</CodeBlock>
                </div>
              </div>
            </section>

             <section id="pillar-3" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><HardDriveIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 3: Storage</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">LVM Logic</h3>
                   <div className="text-xs font-mono space-y-2">
                        <div className="bg-slate-50 p-2 rounded border border-slate-200">1. Physical Volume (PV)</div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-200">2. Volume Group (VG)</div>
                        <div className="bg-slate-50 p-2 rounded border border-slate-200">3. Logical Volume (LV)</div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">AutoFS</h3>
                   <CodeBlock>/shares /etc/auto.shares</CodeBlock>
                </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Partitions</h3>
                   <p className="text-xs text-slate-600 mb-2">Use <code>fdisk</code> or <code>parted</code> for GPT/MBR.</p>
                   <CodeBlock>mkswap /dev/vdb2</CodeBlock>
                   <CodeBlock>swapon /dev/vdb2</CodeBlock>
                </div>
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Stratis & VDO</h3>
                   <p className="text-xs text-slate-600 mb-2">Advanced storage layers.</p>
                   <CodeBlock>stratis pool create mypool /dev/sdb</CodeBlock>
                   <CodeBlock>stratis fs create mypool myfs</CodeBlock>
                </div>
              </div>
            </section>

             <section id="pillar-4" className="mb-16 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><SettingsIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 4: Deploy & Maintain</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Containerized Apps</h3>
                   <p className="text-xs text-slate-600 mb-2">Flatpak is used for desktop applications.</p>
                   <CodeBlock>flatpak remote-add --if-not-exists flathub ...</CodeBlock>
                   <CodeBlock>flatpak install flathub org.gnome.gedit</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Cron</h3>
                   <CodeBlock>*/5 * * * * /script.sh</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Repositories</h3>
                   <p className="text-xs text-slate-600 mb-2">Config in <code>/etc/yum.repos.d/</code></p>
                   <CodeBlock>[repo_id]</CodeBlock>
                   <CodeBlock>baseurl=http://server/repo</CodeBlock>
                   <CodeBlock>gpgcheck=0</CodeBlock>
                </div>
              </div>
            </section>

             <section id="pillar-5" className="mb-24 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><ShieldIcon size={24} /></div>
                <div><h2 className="text-2xl font-bold text-slate-900">Pillar 5: Security</h2></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">SELinux</h3>
                   <CodeBlock>restorecon -R /var/www/html</CodeBlock>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <h3 className="font-bold text-lg mb-4 text-slate-800">Firewall</h3>
                   <CodeBlock>firewall-cmd --permanent --add-service=http</CodeBlock>
                </div>
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
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">Network & Identity</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                        <p className="text-xs font-bold text-slate-600 mb-1 flex items-center gap-1"><NetworkIcon size={12}/> NetworkManager:</p>
                        <CodeBlock>nmcli con add type ethernet con-name ...</CodeBlock>
                        <p className="text-[10px] text-slate-500 mt-1">Tip: Use <code>nmtui</code> for a visual menu.</p>
                    </div>
                    <div className="text-sm">
                        <p className="text-xs font-bold text-slate-600 mb-1">User Aging:</p>
                        <CodeBlock>chage -M 90 user</CodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* EXAM TIPS */}
            <section className="mb-24 scroll-mt-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
                 <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><BookOpenIcon size={24} /></div>
                 <div><h2 className="text-2xl font-bold text-slate-900">Exam Strategy & Tips</h2></div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                   <div className="grid md:grid-cols-2 gap-6">
                       <div>
                           <h4 className="font-bold text-indigo-600 mb-2">During the Exam</h4>
                           <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
                               <li><b>Reboot Often:</b> Verify your changes survive a reboot. If you break boot, fix it immediately using the recovery console.</li>
                               <li><b>Read Carefully:</b> Does the question ask for a logical volume of 500MB or 500 extents?</li>
                               <li><b>Use Man Pages:</b> Don't memorize flags. Type <code>man &lt;command&gt;</code> and search with <code>/</code>.</li>
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
                           </ul>
                       </div>
                   </div>
              </div>
            </section>

          </div>
        </main>

        {/* BOTTOM FIXED TERMINAL SECTION */}
        <section id="practice-lab" className="shrink-0 bg-slate-200 border-t border-slate-300 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="max-w-5xl mx-auto flex gap-4 h-64">
            
            {/* Terminal Container */}
            <div className={`flex-1 rounded-lg overflow-hidden flex flex-col shadow-lg border border-slate-700 relative ${currentTheme.bg} ${successFlash ? 'animate-success-pulse' : ''}`} style={currentTheme.id === 'amber' || currentTheme.id === 'matrix' ? { textShadow: `0 0 5px ${currentTheme.id === 'amber' ? '#ffb000' : '#4ade80'}` } : {}}>
              {/* Exam Timer Overlay */}
              {examMode && (
                  <div className="absolute top-2 right-2 bg-red-900/80 text-red-100 text-xs px-2 py-1 rounded font-mono z-10 border border-red-500 animate-pulse">
                      TIME LEFT: {Math.floor(examTimeLeft / 60)}:{(examTimeLeft % 60).toString().padStart(2, '0')}
                  </div>
              )}
              {/* Report Card Overlay */}
              {showReportCard && (
                  <ReportCard results={examResults} total={examQuestions.length} onClose={() => setShowReportCard(false)} />
              )}

              <div className={`p-2 flex items-center justify-between border-b border-slate-700 shrink-0 ${currentTheme.id === 'rhel' ? 'bg-slate-800' : 'bg-opacity-50 bg-black'}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className={`ml-2 text-xs font-mono ${currentTheme.text}`}>root@localhost:~</span>
                </div>
                <div className={`text-xs font-mono flex items-center gap-2 ${currentTheme.text}`}>
                   <ShieldIcon size={12} className={currentTheme.prompt}/>
                   <span className="text-[10px] uppercase">SSH Active</span>
                </div>
              </div>
              
              <div 
                className={`flex-1 p-3 font-mono text-sm overflow-y-auto ${currentTheme.bg} ${currentTheme.text}`}
                onClick={() => inputRef.current?.focus()}
              >
                <div className="mb-2 opacity-70">Welcome to the RHCSA Practice Terminal v2.1</div>
                
                {terminalHistory.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap mb-1 break-words ${
                    line.type === 'input' ? `${currentTheme.text} font-bold` : 
                    line.type === 'success' ? 'text-green-400 font-bold' :
                    line.type === 'error' ? 'text-red-400' : 
                    line.type === 'system' ? 'text-yellow-400' : 'opacity-90'
                  }`}>
                    {line.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
                
                <div className={`flex items-center mt-2 ${currentTheme.prompt}`}>
                  <span className="mr-2">[root@server ~]#</span>
                  <input 
                    ref={inputRef}
                    type="text" 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`bg-transparent border-none outline-none flex-1 ${currentTheme.text}`}
                    autoComplete="off" 
                    spellCheck="false"
                    maxLength={MAX_INPUT_LENGTH}
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

                <div className="flex items-center gap-2 mb-2">
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
                <p className="text-[10px] text-amber-900 leading-relaxed">
                  {currentMissionId === 0 
                    ? "Lessons appear here." 
                    : examMode 
                      ? "No lessons during exam mode!"
                      : (activeMission ? activeMission.lesson : "")
                  }
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
