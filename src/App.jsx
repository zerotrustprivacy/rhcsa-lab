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
const StarIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const CardIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
);
const ListIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);
const WrenchIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);
const TrashIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);
const SearchIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const UserPlusIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
);
const ChevronDownIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const ChevronUpIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"></polyline></svg>
);
const RotateCcwIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
);

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
  
  // New Paging State
  const [isPaging, setIsPaging] = useState(false);
  
  // New Context Switching State
  const [currentServer, setCurrentServer] = useState('servera');

  // PRO STATE
  const [completedMissions, setCompletedMissions] = useState([]);
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

    const args = cleanCmd.split(' ');
    const base = args[0];

    // MAN PAGE with Paging
    if (base === 'man') {
        const page = MAN_PAGES[args[1]] || MAN_PAGES['default'];
        addToTerm(page);
        setIsPaging(true); 
    }

    // MISSION LOGIC
    const activeMissionList = missions;
    const currentMission = activeMissionList.find(m => m.id === currentMissionId);

    if (currentMissionId > 0 && currentMission) {
      let success = false;
      try { success = currentMission.check(cleanCmd); } catch(e) {}

      if (success) {
        addToTerm(`SUCCESS`, 'success');
        setSuccessFlash(true);
        setTimeout(() => setSuccessFlash(false), 800);
        
        if (!completedMissions.includes(currentMission.id)) {
            setCompletedMissions(prev => [...prev, currentMission.id]);
        }

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
        return;
      }
      
      // Feedback
      if (cleanCmd.startsWith(currentMission.tool) && base === currentMission.tool) {
          addToTerm(`> Correct command '${base}', check flags.`, 'error');
      } else if (!UTILITY_COMMANDS.includes(base) && base !== currentMission.tool) {
          addToTerm(`> Wrong tool. Try again.`, 'error');
      }
    }

    // SIMULATION
    if (base !== 'man') {
        switch (base) {
          case 'clear': setTerminalHistory([]); break;
          case 'exit': 
             if (currentServer !== 'servera') {
                 setCurrentServer('servera');
                 addToTerm("logout", 'system');
                 addToTerm("Connection to serverb closed.", 'system');
             } else {
                setCurrentMissionId(0);
                setMissionComplete(false);
                addToTerm("Session reset.", 'system');
                setLvmState({ pvs: [], vgs: [], lvs: [], mounts: [] }); // Reset LVM on logout
            }
            break;
          // --- FILESYSTEM SIMULATION ---
          case 'touch':
              if (args[1]) {
                  const targetDir = fs[cwd];
                  if (targetDir) {
                      setFs(prev => ({
                          ...prev,
                          [cwd]: {
                              ...prev[cwd],
                              children: { ...prev[cwd].children, [args[1]]: { type: 'file' } }
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
            setCurrentMissionId(1);
            setMissionComplete(false);
            addToTerm(`\n--- MISSION 1 ---`, 'system');
            addToTerm(`Objective: ${MISSIONS[0].desc}`, 'system');
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
            if (!['useradd','groupadd','usermod','tar','chmod','ln','find','setfacl','tuned-adm','nice','chronyc','journalctl','lvextend','mkswap','mount','crontab','firewall-cmd','ssh-keygen','chage','fdisk','scp','kill'].includes(base)) {
                 addToTerm(`bash: ${base}: command not found`, 'error');
            } else {
                 addToTerm("Command executed (Simulated).");
            }
        }
    }
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

  const activeMission = missions.find(m => m.id === currentMissionId);

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
          
          <ul className="space-y-1 overflow-y-auto flex-1 scrollbar-hide">
            <li><button onClick={() => { setCurrentMissionId(0); }} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-sm transition-colors w-full text-left"><TerminalIcon size={16}/> Practice Lab</button></li>
            <div className="my-2 border-t border-slate-800"></div>
            <li className="text-xs text-slate-500 uppercase tracking-wider mt-4 mb-2 px-3">Quick Links</li>
            
            <li><button onClick={() => setActiveTab('pillar-1')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-1' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><FileTextIcon size={16}/> Tools & Scripting</button></li>
            <li><button onClick={() => setActiveTab('pillar-2')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-2' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><CpuIcon size={16}/> Running Systems</button></li>
            <li><button onClick={() => setActiveTab('pillar-3')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-3' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><HardDriveIcon size={16}/> Storage</button></li>
            <li><button onClick={() => setActiveTab('pillar-4')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-4' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><SettingsIcon size={16}/> Deploy & Maintain</button></li>
            <li><button onClick={() => setActiveTab('pillar-5')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left ${activeTab === 'pillar-5' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-400'}`}><ShieldIcon size={16}/> Users & Security</button></li>
          </ul>

          <div className="mt-auto pt-4 border-t border-slate-800">
             <button onClick={resetLab} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-rose-400 font-bold hover:bg-slate-800 text-xs transition-colors">
                <RotateCcwIcon size={14}/> Reset Lab Environment
            </button>
          </div>

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

                <PermissionsCalculator />
                <UserBuilder />
                <FindBuilder />

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
                    className={`bg-transparent border-none outline-none flex-1 text-slate-300`}
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
                {activeMission && completedMissions.includes(activeMission.id) && (
                    <div className="absolute top-2 right-2 text-green-500"><CheckIcon size={16} /></div>
                )}
                
                {/* Bookmark Button (New Feature) */}
                 {activeMission && (
                    <button 
                        onClick={() => toggleBookmark(activeMission.id)}
                        className={`absolute top-2 left-2 ${bookmarkedMissions.includes(activeMission.id) ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
                        title={bookmarkedMissions.includes(activeMission.id) ? "Remove Bookmark" : "Bookmark this Mission"}
                    >
                        <StarIcon size={18} className={bookmarkedMissions.includes(activeMission.id) ? "fill-current" : ""} />
                    </button>
                )}

                <div className="flex items-center gap-2 mb-2 ml-6">
                  <CrosshairIcon size={18} className="text-blue-600"/>
                  <h3 className="font-bold text-slate-800 text-sm">
                    {currentMissionId === 0 ? "Ready?" : `Mission ${currentMissionId}`}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  {currentMissionId === 0 
                    ? <span>Type <span className="bg-slate-100 px-1 rounded text-red-500 font-bold">start</span> to begin.</span>
                    : missionComplete
                      ? "All scenarios finished."
                      : (activeMission ? activeMission.desc : "")
                  }
                </p>

                {/* HINT TOGGLE (Disabled in Exam Mode) */}
                {currentMissionId > 0 && !missionComplete && activeMission && (
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
                {/* Fixed Lesson Display */}
                <p className="text-[10px] text-amber-900 leading-relaxed">
                {currentMissionId === 0 
                    ? "Lessons appear here." 
                    : (activeMission ? activeMission.lesson : "")
                }
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
