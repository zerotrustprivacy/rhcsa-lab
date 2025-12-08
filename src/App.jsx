import React, { useState, useEffect, useRef } from 'react';

// --- ICONS (Inline SVGs to prevent dependency issues) ---
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
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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

// --- SECURITY CONSTANTS ---
const MAX_INPUT_LENGTH = 256; 
const ILLEGAL_CHARS = /<script\b[^>]*>([\s\S]*?)<\/script>/gm; 

// --- DATA: Missions (Strict Validation) ---
const MISSIONS = [
  {
    id: 1,
    title: "User Management",
    desc: "Create a new user named 'student' with UID 2000.",
    lesson: "In RHEL, `useradd` creates new accounts. The `-u` flag specifies a custom UID. Managing UIDs is critical for NFS compatibility.",
    hint: "useradd -u 2000 student",
    check: (cmd) => /^useradd\s+/.test(cmd) && /\s-u\s+2000\b/.test(cmd) && /\sstudent\b/.test(cmd)
  },
  {
    id: 2,
    title: "Service Check",
    desc: "Check the status of the 'httpd' service.",
    lesson: "`systemctl` controls systemd. `status` shows runtime info and recent logs.",
    hint: "systemctl status httpd",
    check: (cmd) => /^systemctl\s+status\s+httpd$/.test(cmd)
  },
  {
    id: 3,
    title: "Archiving",
    desc: "Create a gzip archive named 'backup.tar.gz' of the '/home' directory.",
    lesson: "`tar` flags: -c (create), -z (gzip), -v (verbose), -f (file).",
    hint: "tar -czvf backup.tar.gz /home",
    check: (cmd) => /^tar\s+/.test(cmd) && /-[a-zA-Z]*z[a-zA-Z]*/.test(cmd) && /-[a-zA-Z]*c[a-zA-Z]*/.test(cmd) && /\sbackup\.tar\.gz\b/.test(cmd) && /\s\/home\b/.test(cmd)
  },
  {
    id: 4,
    title: "File Permissions",
    desc: "Set permissions on 'script.sh': User=All(7), Group=Read/Exec(5), Others=None(0).",
    lesson: "Octal math: Read=4, Write=2, Exec=1. User(4+2+1=7), Group(4+0+1=5), Other(0).",
    hint: "chmod 750 script.sh",
    check: (cmd) => /^chmod\s+750\s+script\.sh$/.test(cmd)
  },
  {
    id: 5,
    title: "Text Search (Grep)",
    desc: "Search for lines starting with 'root' in '/etc/passwd'.",
    lesson: "The caret `^` is a regex anchor for 'start of line'.",
    hint: "grep \"^root\" /etc/passwd",
    check: (cmd) => /^grep\s+/.test(cmd) && (/["']\^root["']/.test(cmd) || /\^root/.test(cmd)) && /\s\/etc\/passwd$/.test(cmd)
  },
  {
    id: 6,
    title: "SELinux Contexts",
    desc: "List SELinux contexts for files in the current directory.",
    lesson: "Use the `-Z` flag with `ls`, `ps`, or `id` to see security labels.",
    hint: "ls -Z",
    check: (cmd) => /^ls\s+/.test(cmd) && /-[a-zA-Z]*Z/.test(cmd)
  },
  {
    id: 7,
    title: "Soft Linking",
    desc: "Create a soft link named 'mylink' pointing to '/etc/hosts'.",
    lesson: "`ln -s` creates symbolic links. Without `-s`, it creates a hard link.",
    hint: "ln -s /etc/hosts mylink",
    check: (cmd) => /^ln\s+/.test(cmd) && /\s-s\s/.test(cmd) && /\s\/etc\/hosts\s+mylink$/.test(cmd)
  },
  {
    id: 8,
    title: "Firewall Configuration",
    desc: "Permanently add the 'ftp' service to the firewall.",
    lesson: "Changes are lost on reboot unless you use `--permanent`. Reload afterwards.",
    hint: "firewall-cmd --add-service=ftp --permanent",
    check: (cmd) => /^firewall-cmd\s+/.test(cmd) && /--add-service=ftp/.test(cmd) && /--permanent/.test(cmd)
  },
  {
    id: 9,
    title: "LVM: PV Creation",
    desc: "Initialize '/dev/vdb1' as a Physical Volume.",
    lesson: "`pvcreate` labels a partition for LVM use. It's the first step of the LVM chain.",
    hint: "pvcreate /dev/vdb1",
    check: (cmd) => /^pvcreate\s+\/dev\/vdb1$/.test(cmd)
  },
  {
    id: 10,
    title: "System Tuning",
    desc: "Set the tuning profile to 'virtual-guest'.",
    lesson: "`tuned-adm` applies kernel presets optimized for specific workloads.",
    hint: "tuned-adm profile virtual-guest",
    check: (cmd) => /^tuned-adm\s+profile\s+virtual-guest$/.test(cmd)
  },
  {
    id: 11,
    title: "Networking",
    desc: "Add a new ethernet connection named 'static-eth0'.",
    lesson: "NetworkManager (nmcli) is the standard for RHEL networking.",
    hint: "nmcli con add con-name static-eth0 type ethernet ifname eth0",
    check: (cmd) => /^nmcli\s+con\s+add\s+/.test(cmd) && /con-name\s+static-eth0/.test(cmd)
  },
  {
    id: 12,
    title: "SSH Keys",
    desc: "Generate a new SSH key pair.",
    lesson: "`ssh-keygen` creates the public/private key pair for passwordless auth.",
    hint: "ssh-keygen",
    check: (cmd) => /^ssh-keygen\b/.test(cmd)
  }
];

// --- COMPONENT: CopyButton ---
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Ensure text is string to avoid crashes if children is an object
    const textToCopy = typeof text === 'string' ? text : String(text);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

// --- COMPONENT: CodeBlock ---
const CodeBlock = ({ children, color = "blue" }) => {
  const textColor = color === "green" ? "text-green-300" : "text-blue-200";
  return (
    <div className={`bg-slate-900 rounded-lg p-3 text-xs ${textColor} font-mono relative group mb-2`}>
      <CopyButton text={children} />
      <pre>{children}</pre>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [currentMissionId, setCurrentMissionId] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);
  const [inputHistory, setInputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const currentMission = MISSIONS.find(m => m.id === currentMissionId);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const addToTerm = (text, type = 'output') => {
    // Check type of text to prevent Object errors
    if (typeof text !== 'string') {
        console.error("Attempted to render non-string in terminal:", text);
        return;
    }
    setTerminalHistory(prev => [...prev, { text, type }]);
  };

  // --- SECURITY: INPUT SANITIZATION ---
  const sanitizeInput = (input) => {
    if (input.length > MAX_INPUT_LENGTH) {
      return input.substring(0, MAX_INPUT_LENGTH);
    }
    // Remove script tags or dangerous html-like structures just in case
    return input.replace(ILLEGAL_CHARS, "");
  };

  const processCommand = (cmd) => {
    // 1. Sanitize
    const cleanCmd = sanitizeInput(cmd.trim());
    
    if (!cleanCmd) return;

    addToTerm(`[root@server ~]# ${cleanCmd}`, 'input');
    setInputHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const args = cleanCmd.split(' ');
    const base = args[0];

    // Mission Logic
    if (currentMissionId > 0 && !missionComplete) {
      if (currentMission && currentMission.check(cleanCmd)) {
        addToTerm(`SUCCESS: Mission ${currentMissionId} Complete!`, 'success');
        if (currentMissionId < MISSIONS.length) {
          setTimeout(() => {
            setCurrentMissionId(prev => prev + 1);
            const nextMission = MISSIONS.find(m => m.id === currentMissionId + 1);
            addToTerm(`\n--- STARTING MISSION ${nextMission.id} ---`, 'system');
            addToTerm(`Objective: ${nextMission.desc}`, 'system');
          }, 1500);
        } else {
          setMissionComplete(true);
          addToTerm("ALL MISSIONS COMPLETE! You are ready.", 'success');
        }
        return;
      } 
    }

    // Simulation Logic
    switch (base) {
      case 'help':
        addToTerm("Available commands: help, clear, start, useradd, systemctl, nmcli, tar, ls, pwd, whoami, chmod, grep, ln, firewall-cmd, pvcreate, tuned-adm, ssh-keygen");
        break;
      case 'clear':
        setTerminalHistory([]);
        break;
      case 'start':
        setCurrentMissionId(1);
        setMissionComplete(false);
        addToTerm(`\n--- STARTING MISSION 1 ---`, 'system');
        addToTerm(`Objective: ${MISSIONS[0].desc}`, 'system');
        break;
      case 'ls':
        if (cleanCmd.includes('-Z')) {
           addToTerm("-rw-r--r--. root root unconfined_u:object_r:admin_home_t:s0 anaconda-ks.cfg\ndrwxr-xr-x. root root unconfined_u:object_r:admin_home_t:s0 Documents");
        } else {
          addToTerm("anaconda-ks.cfg  original-ks.cfg  Documents  Downloads  script.sh");
        }
        break;
      case 'pwd':
        addToTerm("/root");
        break;
      case 'whoami':
        addToTerm("root");
        break;
      case 'useradd':
        addToTerm(currentMissionId === 1 && !cleanCmd.includes('2000') ? "User created, but did you check the UID?" : "Done.");
        break;
      case 'grep':
        if (cleanCmd.includes('^root')) {
          addToTerm("root:x:0:0:root:/root:/bin/bash", 'error'); 
        } else {
          addToTerm("No matches found.");
        }
        break;
      case 'systemctl':
        if (args[1] === 'status') {
          addToTerm(`● ${args[2] || 'service'} - The Apache HTTP Server\n   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)\n   Active: active (running) since Mon 2023-10-02 10:00:00 EDT; 1h ago`, 'success');
        } else {
          addToTerm("Command executed.");
        }
        break;
      default:
        if (['nmcli', 'tar', 'chown', 'chmod', 'ln', 'firewall-cmd', 'pvcreate', 'tuned-adm', 'ssh-keygen'].includes(base)) {
          addToTerm("Command executed (Simulation).");
        } else {
          addToTerm(`bash: ${base}: command not found`, 'error');
        }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = historyIndex === -1 ? inputHistory.length - 1 : historyIndex - 1;
      if (idx >= 0) {
        setHistoryIndex(idx);
        setInputVal(inputHistory[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = historyIndex + 1;
      if (idx < inputHistory.length) {
        setHistoryIndex(idx);
        setInputVal(inputHistory[idx]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <nav className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-2">RHCSA<span className="text-white">Lab</span></h1>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-6">Interactive Study Guide</p>
          
          <ul className="space-y-1">
            <li><a href="#practice-lab" className="flex items-center gap-3 px-3 py-2 rounded-md bg-red-900/30 text-red-400 font-bold hover:bg-red-900/50 text-sm transition-colors border border-red-900/50"><TerminalIcon size={16}/> Practice Lab</a></li>
            <div className="my-2 border-t border-slate-800"></div>
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto scroll-smooth">
        
        {/* INTERACTIVE LAB */}
        <section id="practice-lab" className="mb-12 scroll-mt-8 pt-8 md:pt-0 max-w-5xl mx-auto">
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Terminal Header */}
            <div className="bg-slate-800 p-3 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-slate-400 font-mono">root@localhost:~</span>
              </div>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                 <ShieldIcon size={12} className="text-green-500"/>
                 <span className="text-green-500 text-[10px] uppercase">Secure Shell Active</span>
              </div>
            </div>

            {/* Terminal Output */}
            <div 
              className="p-4 h-[300px] overflow-y-auto font-mono text-sm bg-slate-900" 
              onClick={() => inputRef.current?.focus()}
            >
              <div className="text-slate-400 mb-2">Welcome to the RHCSA Practice Terminal v1.3 (Hardened)</div>
              <div className="text-slate-400 mb-4">Type <span className="text-white bg-slate-700 px-1 rounded">start</span> to begin.</div>
              
              {terminalHistory.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap mb-1 ${
                  line.type === 'input' ? 'text-white font-bold' : 
                  line.type === 'success' ? 'text-green-400 font-bold' :
                  line.type === 'error' ? 'text-red-400' : 
                  line.type === 'system' ? 'text-yellow-400' : 'text-slate-300'
                }`}>
                  {line.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
              
              <div className="flex items-center text-green-400 mt-2">
                <span className="mr-2">[root@server ~]#</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white" 
                  autoComplete="off" 
                  spellCheck="false"
                  maxLength={MAX_INPUT_LENGTH} // Input Length Limit
                />
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0">
                <CrosshairIcon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">
                  {currentMissionId === 0 
                    ? "Ready to Train?" 
                    : missionComplete 
                      ? "Training Complete" 
                      : `Mission ${currentMissionId}: ${currentMission ? currentMission.title : ''}`
                  }
                </h3>
                <p className="text-sm text-slate-600 font-mono">
                  {currentMissionId === 0 
                    ? <span>Type <span className="bg-slate-100 px-1 py-0.5 rounded text-red-500 font-bold">start</span> in the terminal.</span>
                    : missionComplete
                      ? "You have finished all scenarios."
                      : (currentMission ? currentMission.desc : "")
                  }
                </p>
                {currentMissionId > 0 && !missionComplete && currentMission && (
                   <p className="text-xs text-slate-400 italic mt-1">Hint: {currentMission.hint}</p>
                )}
              </div>
            </div>
            
            <div className="md:col-span-1 bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <BookOpenIcon size={12} /> Quick Lesson
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {currentMissionId === 0 
                  ? "Concepts and explanations will appear here." 
                  : missionComplete 
                    ? "Good luck on the exam!"
                    : (currentMission ? currentMission.lesson : "")
                }
              </p>
            </div>
          </div>
        </section>

        {/* STATIC CONTENT HEADER */}
        <header className="mb-12 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">The RHCSA Blueprint</h1>
          <p className="text-lg text-slate-600">Study the concepts below, then test them in the terminal above.</p>
        </header>

        {/* PILLAR 1 */}
        <section id="pillar-1" className="mb-16 scroll-mt-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><TerminalIcon size={24} /></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Pillar 1: Tools & Scripting</h2>
              <p className="text-sm text-slate-500">File Manipulation & Scripts</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><LockIcon size={16} className="text-blue-500"/> Permissions</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-bold text-slate-700">Special Bits:</span>
                  <CodeBlock>chmod u+s file     # SUID (4)</CodeBlock>
                  <CodeBlock>chmod g+s dir      # SGID (2)</CodeBlock>
                  <CodeBlock>chmod 2770 dir     # Octal SGID</CodeBlock>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2"><FileTextIcon size={16} className="text-blue-500"/> Grep & Regex</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-xs text-slate-600 mb-1">Start of line:</p>
                  <CodeBlock>grep "^root" /etc/passwd</CodeBlock>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-slate-600 mb-1">Invert match:</p>
                  <CodeBlock>grep -v "nologin" /etc/passwd</CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILLAR 2 */}
        <section id="pillar-2" className="mb-16 scroll-mt-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><CpuIcon size={24} /></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Pillar 2: Operate Running Systems</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-lg mb-4 text-slate-800">Boot Targets</h3>
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr><th className="p-2">Target</th><th className="p-2">Description</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td className="p-2 font-mono text-xs">multi-user.target</td><td className="p-2 text-xs">Text Mode</td></tr>
                    <tr><td className="p-2 font-mono text-xs">graphical.target</td><td className="p-2 text-xs">GUI Mode</td></tr>
                    <tr><td className="p-2 font-mono text-xs">emergency.target</td><td className="p-2 text-xs">Read-only root</td></tr>
                  </tbody>
               </table>
               <div className="mt-4">
                 <p className="text-xs font-bold mb-1">Isolate Target:</p>
                 <CodeBlock>systemctl isolate multi-user.target</CodeBlock>
               </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg mb-4 text-slate-800">Tuned Profiles</h3>
              <ul className="space-y-2 font-mono text-xs">
                 <li className="bg-slate-50 p-2 rounded flex justify-between"><span>List</span><span className="text-red-500">tuned-adm list</span></li>
                 <li className="bg-slate-50 p-2 rounded flex justify-between"><span>Active</span><span className="text-red-500">tuned-adm active</span></li>
                 <li className="bg-slate-50 p-2 rounded flex justify-between"><span>Set</span><span className="text-red-500">tuned-adm profile virtual-guest</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* PILLAR 3 */}
        <section id="pillar-3" className="mb-16 scroll-mt-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><HardDriveIcon size={24} /></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Pillar 3: Storage</h2>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-slate-800">FSTAB Anatomy</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-2 border border-slate-700">UUID/Device</th>
                    <th className="p-2 border border-slate-700">Mount</th>
                    <th className="p-2 border border-slate-700">Type</th>
                    <th className="p-2 border border-slate-700">Options</th>
                    <th className="p-2 border border-slate-700">Dump</th>
                    <th className="p-2 border border-slate-700">Fsck</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                   <tr className="bg-amber-50">
                     <td className="p-2 border border-amber-200">UUID="5b...a2"</td>
                     <td className="p-2 border border-amber-200">/data</td>
                     <td className="p-2 border border-amber-200">xfs</td>
                     <td className="p-2 border border-amber-200">defaults</td>
                     <td className="p-2 border border-amber-200">0</td>
                     <td className="p-2 border border-amber-200">0</td>
                   </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PILLAR 5 */}
        <section id="pillar-5" className="mb-24 scroll-mt-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><ShieldIcon size={24} /></div>
            <div>
               <h2 className="text-2xl font-bold text-slate-900">Pillar 5: Security</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-lg mb-4 text-slate-800">SELinux Booleans</h3>
               <CodeBlock>getsebool -a | grep http</CodeBlock>
               <CodeBlock>setsebool -P httpd_enable_homedirs on</CodeBlock>
               <p className="text-xs text-slate-500 mt-2">Flag -P makes it persistent.</p>
             </div>
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
               <h3 className="font-bold text-lg mb-4 text-slate-800">FirewallD</h3>
               <CodeBlock>firewall-cmd --get-default-zone</CodeBlock>
               <CodeBlock>firewall-cmd --permanent --add-service=http</CodeBlock>
               <CodeBlock>firewall-cmd --reload</CodeBlock>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
             }
