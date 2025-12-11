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
const EyeIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const NetworkIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
);
const TimerIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const BoxIcon = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);

// --- 2. COMPONENTS (Defined BEFORE App) ---

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

// --- 3. CONSTANTS & DATA ---
const MAX_INPUT_LENGTH = 256; 
const ILLEGAL_CHARS = /<script\b[^>]*>([\s\S]*?)<\/script>/gm; 
const UTILITY_COMMANDS = ['clear', 'help', 'ls', 'pwd', 'whoami', 'history', 'id', 'exit', 'man'];

// FULL MISSION LIST (RHEL 10 Focused + Flatpak)
const MISSIONS = [
  // --- PILLAR 1: TOOLS & SCRIPTING ---
  { id: 1, tool: "useradd", title: "User Management", desc: "Create a new user named 'student' with UID 2000.", lesson: "In RHEL, `useradd` creates new accounts. The `-u` flag specifies a custom UID. Managing UIDs is critical for NFS compatibility.", hint: "useradd -u 2000 student", check: (cmd) => /^useradd\s+/.test(cmd) && /\s-u\s+2000\b/.test(cmd) && /\sstudent\b/.test(cmd) },
  { id: 2, tool: "groupadd", title: "Group Management", desc: "Create a new group named 'devops' with GID 5000.", lesson: "Groups allow permission sharing. `groupadd` creates them. `-g` specifies a static GID.", hint: "groupadd -g 5000 devops", check: (cmd) => /^groupadd\s+/.test(cmd) && /-g\s+5000/.test(cmd) && /\sdevops\b/.test(cmd) },
  { id: 3, tool: "usermod", title: "Modify User Group", desc: "Add existing user 'student' to the 'devops' group.", lesson: "`usermod` changes user properties. `-aG` (Append Groups) adds a secondary group without removing existing ones. Order matters: group first, then user.", hint: "usermod -aG devops student", check: (cmd) => /^usermod\s+/.test(cmd) && /-aG\s+devops/.test(cmd) && /\sstudent\b/.test(cmd) },
  { id: 4, tool: "tar", title: "Archiving", desc: "Create a gzip archive named 'backup.tar.gz' of the '/home' directory.", lesson: "`tar` flags: -c (create), -z (gzip), -v (verbose), -f (file).", hint: "tar -czvf backup.tar.gz /home", check: (cmd) => /^tar\s+/.test(cmd) && /-[a-zA-Z]*z[a-zA-Z]*/.test(cmd) && /-[a-zA-Z]*c[a-zA-Z]*/.test(cmd) && /\sbackup\.tar\.gz\b/.test(cmd) && /\s\/home\b/.test(cmd) },
  { id: 5, tool: "chmod", title: "File Permissions", desc: "Set permissions on 'script.sh': User=All(7), Group=Read/Exec(5), Others=None(0).", lesson: "Octal math: Read=4, Write=2, Exec=1. User(4+2+1=7), Group(4+0+1=5), Other(0).", hint: "chmod 750 script.sh", check: (cmd) => /^chmod\s+750\s+script\.sh$/.test(cmd) },
  { id: 6, tool: "grep", title: "Text Search (Grep)", desc: "Search for lines starting with 'root' in '/etc/passwd'.", lesson: "The caret `^` is a regex anchor for 'start of line'.", hint: "grep \"^root\" /etc/passwd", check: (cmd) => /^grep\s+/.test(cmd) && (/["']\^root["']/.test(cmd) || /\^root/.test(cmd)) && /\s\/etc\/passwd$/.test(cmd) },
  { id: 7, tool: "ln", title: "Soft Linking", desc: "Create a soft link named 'mylink' pointing to '/etc/hosts'.", lesson: "`ln -s` creates symbolic links. Without `-s`, it creates a hard link.", hint: "ln -s /etc/hosts mylink", check: (cmd) => /^ln\s+/.test(cmd) && /\s-s\s/.test(cmd) && /\s\/etc\/hosts\s+mylink$/.test(cmd) },
  { id: 8, tool: "find", title: "Locating Files", desc: "Find all files in '/etc' that end with '.conf'.", lesson: "`find` searches directory trees. Use `-name` for filenames. Quotes around the pattern `*.conf` prevent shell expansion.", hint: "find /etc -name \"*.conf\"", check: (cmd) => /^find\s+\/etc\s+/.test(cmd) && /-name\s+["']\*\.conf["']/.test(cmd) },
  { id: 9, tool: "setfacl", title: "Access Control Lists (ACLs)", desc: "Grant user 'student' read-write access to 'file.txt' using ACLs.", lesson: "`setfacl` allows fine-grained permissions beyond standard UGO. `-m` modifies the ACL. Syntax: `u:user:perms`.", hint: "setfacl -m u:student:rw file.txt", check: (cmd) => /^setfacl\s+/.test(cmd) && /-m\s+/.test(cmd) && /u:student:rw/.test(cmd) && /\sfile\.txt$/.test(cmd) },
  // --- PILLAR 2: OPERATE RUNNING SYSTEMS ---
  { id: 10, tool: "systemctl", title: "Service Check", desc: "Check the status of the 'httpd' service.", lesson: "`systemctl` controls systemd. `status` shows runtime info and recent logs.", hint: "systemctl status httpd", check: (cmd) => /^systemctl\s+status\s+httpd$/.test(cmd) },
  { id: 11, tool: "systemctl", title: "Set Default Target", desc: "Configure the system to boot into text-only mode (multi-user.target) by default.", lesson: "RHEL uses 'targets' instead of runlevels. `set-default` makes the change persistent across reboots.", hint: "systemctl set-default multi-user.target", check: (cmd) => /^systemctl\s+set-default\s+multi-user\.target$/.test(cmd) },
  { id: 12, tool: "tuned-adm", title: "System Tuning", desc: "Set the tuning profile to 'virtual-guest'.", lesson: "`tuned-adm` applies kernel presets optimized for specific workloads.", hint: "tuned-adm profile virtual-guest", check: (cmd) => /^tuned-adm\s+profile\s+virtual-guest$/.test(cmd) },
  { id: 13, tool: "nice", title: "Process Priorities", desc: "Start the 'tar' command with a nice value (priority) of 5.", lesson: "`nice` sets the initial priority. Higher numbers (up to 19) are 'nicer' (lower priority). Lower numbers (down to -20) are higher priority.", hint: "nice -n 5 tar", check: (cmd) => /^nice\s+/.test(cmd) && /-n\s+5/.test(cmd) && /\star/.test(cmd) },
  { id: 14, tool: "chronyc", title: "Time Synchronization", desc: "Verify the list of NTP sources the system is using.", lesson: "`chronyd` is the default time service. Use `chronyc sources` to see which servers you are syncing with.", hint: "chronyc sources", check: (cmd) => /^chronyc\s+sources\b/.test(cmd) },
  { id: 15, tool: "journalctl", title: "System Logging", desc: "Show all log entries for the 'sshd' service.", lesson: "`journalctl` queries the systemd journal. Use `-u` (unit) to filter by a specific service.", hint: "journalctl -u sshd", check: (cmd) => /^journalctl\s+/.test(cmd) && /-u\s+sshd\b/.test(cmd) },
  // --- PILLAR 3: STORAGE ---
  { id: 16, tool: "pvcreate", title: "LVM: PV Creation", desc: "Initialize '/dev/vdb1' as a Physical Volume.", lesson: "`pvcreate` labels a partition for LVM use. It's the first step of the LVM chain.", hint: "pvcreate /dev/vdb1", check: (cmd) => /^pvcreate\s+\/dev\/vdb1$/.test(cmd) },
  { id: 17, tool: "vgcreate", title: "LVM: Volume Group", desc: "Create a volume group named 'myvg' using '/dev/vdb1'.", lesson: "`vgcreate` pools Physical Volumes into a Volume Group. This is your pool of storage.", hint: "vgcreate myvg /dev/vdb1", check: (cmd) => /^vgcreate\s+myvg\s+\/dev\/vdb1$/.test(cmd) },
  { id: 18, tool: "lvcreate", title: "LVM: Logical Volume", desc: "Create a 500MB Logical Volume named 'mylv' in 'myvg'.", lesson: "`lvcreate` carves usable space. Use `-L` for size (e.g., 500M) and `-n` for name.", hint: "lvcreate -L 500M -n mylv myvg", check: (cmd) => /^lvcreate\s+/.test(cmd) && /-L\s+500M/.test(cmd) && /-n\s+mylv/.test(cmd) && /\smyvg\b/.test(cmd) },
  { id: 19, tool: "lvextend", title: "LVM: Extend Volume", desc: "Extend 'mylv' by adding 200MB and resize the filesystem in one step.", lesson: "`lvextend` adds space. The `-r` (resizefs) flag is crucial—it automatically runs `xfs_growfs` or `resize2fs` for you.", hint: "lvextend -L +200M -r /dev/myvg/mylv", check: (cmd) => /^lvextend\s+/.test(cmd) && /-L\s+\+200M/.test(cmd) && /-r\b/.test(cmd) && /\/dev\/myvg\/mylv/.test(cmd) },
  { id: 20, tool: "mkfs.xfs", title: "Filesystem Creation", desc: "Format the logical volume '/dev/myvg/mylv' with the XFS filesystem.", lesson: "Before mounting, you must format. RHEL defaults to XFS (`mkfs.xfs`).", hint: "mkfs.xfs /dev/myvg/mylv", check: (cmd) => /^mkfs\.xfs\s+\/dev\/myvg\/mylv$/.test(cmd) },
  { id: 21, tool: "mkswap", title: "Create Swap", desc: "Format partition '/dev/vdb2' as swap space.", lesson: "Swap is used when RAM is full. `mkswap` prepares the device.", hint: "mkswap /dev/vdb2", check: (cmd) => /^mkswap\s+\/dev\/vdb2$/.test(cmd) },
  { id: 22, tool: "mount", title: "NFS Mounting", desc: "Mount the NFS share 'server:/share' to '/mnt/data'.", lesson: "Mounting connects a remote filesystem to your local tree. Syntax: `mount -t nfs [remote] [local]`.", hint: "mount -t nfs server:/share /mnt/data", check: (cmd) => /^mount\s+/.test(cmd) && /-t\s+nfs/.test(cmd) && /\sserver:\/share/.test(cmd) && /\s\/mnt\/data$/.test(cmd) },
  // --- PILLAR 4: DEPLOY & MAINTAIN ---
  { id: 23, tool: "dnf", title: "Software Install", desc: "Install the 'httpd' package using DNF.", lesson: "`dnf` is the package manager (Dandified YUM). Use it to install, update, and remove software.", hint: "dnf install httpd", check: (cmd) => /^dnf\s+install\s+httpd$/.test(cmd) },
  { id: 24, tool: "crontab", title: "Scheduling Tasks", desc: "List the current user's cron jobs.", lesson: "`cron` schedules recurring tasks. `-e` edits, `-l` lists, `-r` removes. We use `-l` here to verify.", hint: "crontab -l", check: (cmd) => /^crontab\s+-l$/.test(cmd) },
  { id: 25, tool: "flatpak", title: "Flatpak Management", desc: "Install 'gedit' from 'flathub' remote.", lesson: "Flatpak manages containerized desktop apps. Use `flatpak install [remote] [app]`.", hint: "flatpak install flathub org.gnome.gedit", check: (cmd) => /^flatpak\s+install\s+/.test(cmd) && /flathub/.test(cmd) && /gedit/.test(cmd) },
  // --- PILLAR 5: USERS & SECURITY ---
  { id: 26, tool: "nmcli", title: "Networking", desc: "Add a new ethernet connection named 'static-eth0'.", lesson: "NetworkManager (nmcli) is the standard for RHEL networking.", hint: "nmcli con add con-name static-eth0 type ethernet ifname eth0", check: (cmd) => /^nmcli\s+con\s+add\s+/.test(cmd) && /con-name\s+static-eth0/.test(cmd) },
  { id: 27, tool: "firewall-cmd", title: "Firewall Configuration", desc: "Permanently add the 'ftp' service to the firewall.", lesson: "Changes are lost on reboot unless you use `--permanent`. Reload afterwards.", hint: "firewall-cmd --add-service=ftp --permanent", check: (cmd) => /^firewall-cmd\s+/.test(cmd) && /--add-service=ftp/.test(cmd) && /--permanent/.test(cmd) },
  { id: 28, tool: "ssh-keygen", title: "SSH Keys", desc: "Generate a new SSH key pair.", lesson: "`ssh-keygen` creates the public/private key pair for passwordless auth.", hint: "ssh-keygen", check: (cmd) => /^ssh-keygen\b/.test(cmd) },
  { id: 29, tool: "ls", title: "SELinux Contexts", desc: "List SELinux contexts for files in the current directory.", lesson: "Use the `-Z` flag with `ls`, `ps`, or `id` to see security labels.", hint: "ls -Z", check: (cmd) => /^ls\s+/.test(cmd) && /-[a-zA-Z]*Z/.test(cmd) },
  { id: 30, tool: "restorecon", title: "SELinux Restore", desc: "Restore default SELinux contexts on '/var/www/html'.", lesson: "`restorecon` reads the policy and resets file contexts to their defaults. Use `-R` for recursive.", hint: "restorecon -R /var/www/html", check: (cmd) => /^restorecon\s+/.test(cmd) && /-[a-zA-Z]*R/.test(cmd) && /\s\/var\/www\/html$/.test(cmd) },
  { id: 31, tool: "chage", title: "Password Aging", desc: "Set the maximum password age for user 'student' to 90 days.", lesson: "`chage` (Change Age) manages password expiry. `-M` sets the max days before a password change is required.", hint: "chage -M 90 student", check: (cmd) => /^chage\s+/.test(cmd) && /-M\s+90/.test(cmd) && /\sstudent$/.test(cmd) }
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
  
  // --- STATES FOR PRO FEATURES ---
  const [completedMissions, setCompletedMissions] = useState([]);
  const [examMode, setExamMode] = useState(false);
  const [examTimeLeft, setExamTimeLeft] = useState(0);
  const [examQuestions, setExamQuestions] = useState([]);
  
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load progress on mount
  useEffect(() => {
      const saved = localStorage.getItem('rhcsa_progress');
      if (saved) setCompletedMissions(JSON.parse(saved));
  }, []);

  // Save progress on update
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
          setExamMode(false);
          addToTerm("TIME'S UP! Exam finished.", 'error');
          setCurrentMissionId(0);
      }
      return () => clearInterval(interval);
  }, [examMode, examTimeLeft]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Reset hint when mission changes
  useEffect(() => {
    setShowHint(false);
  }, [currentMissionId]);

  const addToTerm = (text, type = 'output') => {
    if (typeof text !== 'string') return;
    setTerminalHistory(prev => [...prev, { text, type }]);
  };

  const sanitizeInput = (input) => {
    if (input.length > MAX_INPUT_LENGTH) return input.substring(0, MAX_INPUT_LENGTH);
    return input.replace(ILLEGAL_CHARS, "");
  };

  const startExamMode = () => {
      // Pick 15 random missions
      const shuffled = [...MISSIONS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 15);
      
      setExamQuestions(selected);
      setExamMode(true);
      setExamTimeLeft(20 * 60); // 20 minutes
      setCurrentMissionId(selected[0].id);
      setTerminalHistory([]);
      addToTerm("--- MOCK EXAM STARTED ---", 'system');
      addToTerm("You have 20 minutes to complete 15 random tasks.", 'system');
      addToTerm(`Objective 1: ${selected[0].desc}`, 'system');
  };

  const processCommand = (cmd) => {
    const cleanCmd = sanitizeInput(cmd.trim());
    if (!cleanCmd) return;

    addToTerm(`[root@server ~]# ${cleanCmd}`, 'input');
    setInputHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const args = cleanCmd.split(' ');
    const base = args[0];

    // --- MISSION LOGIC ---
    const activeMissionList = examMode ? examQuestions : MISSIONS;
    const currentMission = activeMissionList.find(m => m.id === currentMissionId);

    if (currentMissionId > 0 && currentMission) {
      
      // 1. Check Success
      let success = false;
      try { success = currentMission.check(cleanCmd); } catch(e) {}

      if (success) {
        addToTerm(`SUCCESS: Mission Complete!`, 'success');
        
        // Save Progress (Only in normal mode)
        if (!examMode && !completedMissions.includes(currentMission.id)) {
            setCompletedMissions(prev => [...prev, currentMission.id]);
        }

        // Logic for Next Mission
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
                setExamMode(false);
                addToTerm("CONGRATULATIONS! You passed the mock exam.", 'success');
                setCurrentMissionId(0);
            }
        } else {
            // Normal Mode
            if (currentMissionId < MISSIONS.length) {
                setTimeout(() => {
                    setCurrentMissionId(prev => prev + 1);
                    const nextMission = MISSIONS.find(m => m.id === currentMissionId + 1);
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
      
      // 2. Feedback
      if (!examMode) {
          if (cleanCmd.startsWith(currentMission.tool) && base === currentMission.tool) {
              addToTerm(`> Correct command '${base}', check flags.`, 'error');
          } else if (!UTILITY_COMMANDS.includes(base) && base !== currentMission.tool) {
              addToTerm(`> Wrong tool. Try again.`, 'error');
          }
      }
    }

    // --- SIMULATION COMMANDS ---
    switch (base) {
      case 'help': addToTerm("Commands: useradd, groupadd, usermod, tar, chmod, grep, ln, find, setfacl, systemctl, tuned-adm, nice, chronyc, journalctl, pvcreate, vgcreate, lvcreate, lvextend, mkfs.xfs, mkswap, mount, dnf, flatpak, crontab, nmcli, firewall-cmd, ssh-keygen, restorecon, chage, ls, pwd, id, clear, exit"); break;
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
      case 'flatpak':
        if (args[1] === 'install') addToTerm("Installing: org.gnome.gedit... \n[####################] 100%\nComplete.");
        else if (args[1] === 'remote-list') addToTerm("flathub  https://dl.flathub.org/repo/");
        else addToTerm("flatpak: use 'install' or 'remote-list'");
        break;
      case 'ls': if(cleanCmd.includes('-Z')) addToTerm("drwxr-xr-x. root root unconfined_u:object_r:admin_home_t:s0 Documents"); else addToTerm("anaconda-ks.cfg  Documents  Downloads  script.sh"); break;
      case 'pwd': addToTerm("/root"); break;
      case 'whoami': addToTerm("root"); break;
      case 'id': addToTerm("uid=0(root) gid=0(root) groups=0(root)"); break;
      case 'nmcli': addToTerm("Connection 'static-eth0' successfully added."); break;
      case 'systemctl': addToTerm("Active: active (running)"); break;
      case 'dnf': addToTerm("Complete!"); break;
      case 'grep': if(cleanCmd.includes('^root')) addToTerm("root:x:0:0:root:/root:/bin/bash"); break;
      default: 
        if (!['useradd','groupadd','usermod','tar','chmod','ln','find','setfacl','tuned-adm','nice','chronyc','journalctl','pvcreate','vgcreate','lvcreate','lvextend','mkfs.xfs','mkswap','mount','crontab','firewall-cmd','ssh-keygen','restorecon','chage'].includes(base)) {
             addToTerm(`bash: ${base}: command not found`, 'error');
        } else {
             addToTerm("Command executed (Simulated).");
        }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
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
    : MISSIONS.find(m => m.id === currentMissionId);

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
                   </div>
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
              </div>
            </section>
            
          </div>
        </main>

        {/* BOTTOM FIXED TERMINAL SECTION */}
        <section id="practice-lab" className="shrink-0 bg-slate-200 border-t border-slate-300 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="max-w-5xl mx-auto flex gap-4 h-64">
            
            {/* Terminal Container */}
            <div className="flex-1 bg-slate-900 rounded-lg overflow-hidden flex flex-col shadow-lg border border-slate-700 relative">
              {/* Exam Timer Overlay */}
              {examMode && (
                  <div className="absolute top-2 right-2 bg-red-900/80 text-red-100 text-xs px-2 py-1 rounded font-mono z-10 border border-red-500 animate-pulse">
                      TIME LEFT: {Math.floor(examTimeLeft / 60)}:{(examTimeLeft % 60).toString().padStart(2, '0')}
                  </div>
              )}

              <div className="bg-slate-800 p-2 flex items-center justify-between border-b border-slate-700 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-xs text-slate-400 font-mono">root@localhost:~</span>
                </div>
                <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                   <ShieldIcon size={12} className="text-green-500"/>
                   <span className="text-green-500 text-[10px] uppercase">SSH Active</span>
                </div>
              </div>
              
              <div 
                className="flex-1 p-3 font-mono text-sm overflow-y-auto bg-slate-900" 
                onClick={() => inputRef.current?.focus()}
              >
                <div className="text-slate-400 mb-2">Welcome to the RHCSA Practice Terminal v2.1</div>
                
                {terminalHistory.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap mb-1 break-words ${
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
