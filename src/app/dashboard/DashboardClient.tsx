"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { signOut, updateProfile, updatePassword } from "@/app/actions/auth";
import {
  Zap,
  LayoutDashboard,
  FileText,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  Play,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  Flame,
  Brain,
  GitBranch,
  LogOut,
  Menu,
  X,
  Pencil,
  KeyRound,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "meetings", label: "Meetings", icon: FileText },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "comms", label: "Communications", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATS = [
  {
    label: "Active Tasks",
    value: "24",
    change: "+3",
    trend: "up",
    icon: CheckSquare,
    color: "#00f5ff",
    bg: "rgba(0,245,255,0.08)",
    border: "rgba(0,245,255,0.2)",
  },
  {
    label: "Meetings Analyzed",
    value: "12",
    change: "+2",
    trend: "up",
    icon: FileText,
    color: "#bf00ff",
    bg: "rgba(191,0,255,0.08)",
    border: "rgba(191,0,255,0.2)",
  },
  {
    label: "Jira Tickets",
    value: "38",
    change: "+7",
    trend: "up",
    icon: GitBranch,
    color: "#00ff88",
    bg: "rgba(0,255,136,0.08)",
    border: "rgba(0,255,136,0.2)",
  },
  {
    label: "Blockers",
    value: "3",
    change: "-1",
    trend: "down",
    icon: AlertCircle,
    color: "#ff0080",
    bg: "rgba(255,0,128,0.08)",
    border: "rgba(255,0,128,0.2)",
  },
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "meeting",
    title: "Q1 Marketing Strategy Meeting",
    subtitle: "8 action items extracted · 3 decisions logged",
    time: "2 min ago",
    status: "completed",
    icon: FileText,
    color: "#bf00ff",
  },
  {
    id: 2,
    type: "task",
    title: "Launch campaign for DeFi protocol",
    subtitle: "Jira ticket MKTG-142 created",
    time: "15 min ago",
    status: "in_progress",
    icon: CheckSquare,
    color: "#00f5ff",
  },
  {
    id: 3,
    type: "slack",
    title: "Team approval requested",
    subtitle: "5 tasks pending human review in #marketing",
    time: "1 hr ago",
    status: "pending",
    icon: MessageSquare,
    color: "#ffff00",
  },
  {
    id: 4,
    type: "blocker",
    title: "Blocker detected: Content delay",
    subtitle: "Campaign launch at risk — due Friday",
    time: "3 hr ago",
    status: "blocked",
    icon: AlertCircle,
    color: "#ff0080",
  },
  {
    id: 5,
    type: "ai",
    title: "AI Agent Run Complete",
    subtitle: "Processed 3 documents from Google Drive",
    time: "5 hr ago",
    status: "completed",
    icon: Brain,
    color: "#00ff88",
  },
];

const INTEGRATIONS = [
  { name: "Fireflies", status: "connected", color: "#00f5ff", pulse: true },
  { name: "Google Drive", status: "connected", color: "#00ff88", pulse: true },
  { name: "Jira", status: "connected", color: "#bf00ff", pulse: true },
  { name: "Slack", status: "disconnected", color: "#ff0080", pulse: false },
];

const STATUS_STYLES: Record<string, { color: string; label: string; icon: React.FC<{ size?: number }> }> = {
  completed: { color: "#00ff88", label: "Done", icon: CheckCircle2 },
  in_progress: { color: "#00f5ff", label: "Running", icon: Activity },
  pending: { color: "#ffff00", label: "Pending", icon: Clock },
  blocked: { color: "#ff0080", label: "Blocked", icon: AlertCircle },
};

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentRunning, setAgentRunning] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileDropdownOpen]);

  const displayName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Agent";

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleRunAgent() {
    setAgentRunning(true);
    await new Promise((r) => setTimeout(r, 3000));
    setAgentRunning(false);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#020408" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          background: "#070d17",
          borderRight: "1px solid rgba(0,245,255,0.08)",
        }}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00f5ff, #bf00ff)" }}
            >
              <Zap size={18} className="text-black" />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight neon-text-cyan leading-none">
                DRIZZLE<span className="text-white">HQ</span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5">PM Agent</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-500 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={
                  isActive
                    ? {
                      background: "rgba(0,245,255,0.1)",
                      border: "1px solid rgba(0,245,255,0.2)",
                      color: "#00f5ff",
                      boxShadow: "0 0 12px rgba(0,245,255,0.15)",
                    }
                    : {
                      color: "#64748b",
                      border: "1px solid transparent",
                    }
                }
              >
                <Icon size={16} />
                {item.label}
                {item.id === "tasks" && (
                  <span
                    className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(0,245,255,0.15)",
                      color: "#00f5ff",
                    }}
                  >
                    24
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Integrations status */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-3 px-1">
            Integrations
          </p>
          <div className="space-y-2">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center gap-2.5 px-2 py-1.5"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: integration.color,
                    boxShadow: integration.pulse
                      ? `0 0 6px ${integration.color}`
                      : "none",
                  }}
                />
                <span className="text-xs text-slate-400 flex-1">
                  {integration.name}
                </span>
                <span
                  className="text-xs"
                  style={{
                    color:
                      integration.status === "connected" ? "#00ff88" : "#ff6b9d",
                  }}
                >
                  {integration.status === "connected" ? "●" : "○"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div
          className="p-4"
          style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #00f5ff22, #bf00ff22)",
                border: "1px solid rgba(0,245,255,0.3)",
                color: "#00f5ff",
              }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                {displayName}
              </div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                title="Sign out"
                className="text-slate-600 hover:text-red-400 transition-colors"
              >
                <LogOut size={15} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{
            background: "rgba(7,13,23,0.8)",
            borderBottom: "1px solid rgba(0,245,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">
                {NAV_ITEMS.find((n) => n.id === activeNav)?.label}
              </h1>
              <p className="text-xs text-slate-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Run Agent Button */}
            <button
              onClick={handleRunAgent}
              disabled={agentRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={
                agentRunning
                  ? {
                    background: "rgba(0,255,136,0.1)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    color: "#00ff88",
                  }
                  : {
                    background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                    color: "#000",
                  }
              }
            >
              {agentRunning ? (
                <>
                  <Activity size={14} className="animate-pulse" />
                  Agent Running...
                </>
              ) : (
                <>
                  <Play size={14} />
                  Run Agent
                </>
              )}
            </button>

            {/* Notifications */}
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: "rgba(0,245,255,0.06)",
                border: "1px solid rgba(0,245,255,0.15)",
                color: "#64748b",
              }}
            >
              <Bell size={16} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{
                  background: "#ff0080",
                  boxShadow: "0 0 6px #ff0080",
                }}
              />
            </button>

            {/* User avatar + dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer transition-all hover:opacity-90"
                style={{
                  background: "rgba(0,245,255,0.06)",
                  border: "1px solid rgba(0,245,255,0.15)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                    color: "#000",
                  }}
                >
                  {initials}
                </div>
                <ChevronDown
                  size={12}
                  className={`text-slate-500 transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 py-1 min-w-[160px] rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{
                    background: "#0f172a",
                    border: "1px solid rgba(0,245,255,0.2)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setEditProfileOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Pencil size={14} />
                    Edit profile
                  </button>

                </div>
              )}
            </div>
          </div>
        </header>

        {/* Edit profile modal */}
        {editProfileOpen && (
          <EditProfileModal
            user={user}
            displayName={displayName}
            onClose={() => setEditProfileOpen(false)}
            onSuccess={() => {
              setEditProfileOpen(false);
              router.refresh();
            }}
          />
        )}

        {/* Page body */}
        <main className="flex-1 overflow-y-auto p-6 grid-bg">
          {activeNav === "overview" && (
            <OverviewContent
              displayName={displayName}
              agentRunning={agentRunning}
            />
          )}
          {activeNav !== "overview" && (
            <ComingSoon label={NAV_ITEMS.find((n) => n.id === activeNav)?.label ?? ""} />
          )}
        </main>
      </div>
    </div>
  );
}

function EditProfileModal({
  user,
  displayName,
  onClose,
  onSuccess,
}: {
  user: User;
  displayName: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = (formData.get("fullName") as string)?.trim();
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!fullName) {
      setError("Name is required");
      setPending(false);
      return;
    }

    const profileForm = new FormData();
    profileForm.set("fullName", fullName);
    const profileResult = await updateProfile(profileForm);
    if (profileResult?.error) {
      setError(profileResult.error);
      setPending(false);
      return;
    }

    if (newPassword || confirmPassword) {
      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters");
        setPending(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        setPending(false);
        return;
      }
      const pwdForm = new FormData();
      pwdForm.set("newPassword", newPassword);
      pwdForm.set("confirmPassword", confirmPassword);
      const pwdResult = await updatePassword(pwdForm);
      if (pwdResult?.error) {
        setError(pwdResult.error);
        setPending(false);
        return;
      }
    }

    setSuccess(true);
    setPending(false);
    setTimeout(() => onSuccess(), 800);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
        style={{
          background: "#070d17",
          border: "1px solid rgba(0,245,255,0.2)",
          boxShadow: "0 0 40px rgba(0,245,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Edit profile</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p
              className="text-sm rounded-lg px-3 py-2"
              style={{
                background: "rgba(255,0,128,0.1)",
                border: "1px solid rgba(255,0,128,0.3)",
                color: "#ff6b9d",
              }}
            >
              {error}
            </p>
          )}
          {success && (
            <p
              className="text-sm rounded-lg px-3 py-2"
              style={{
                background: "rgba(0,255,136,0.1)",
                border: "1px solid rgba(0,255,136,0.3)",
                color: "#00ff88",
              }}
            >
              Profile updated successfully.
            </p>
          )}
          <div>
            <label
              htmlFor="edit-fullName"
              className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
            >
              Display name
            </label>
            <input
              id="edit-fullName"
              name="fullName"
              type="text"
              defaultValue={displayName}
              className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 bg-white/5 border border-white/10 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]/50 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="text-xs text-slate-500">{user.email}</div>
          <div
            className="pt-4 border-t"
            style={{ borderColor: "rgba(0,245,255,0.1)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <KeyRound size={14} style={{ color: "#00f5ff" }} />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Change password
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Leave blank to keep your current password.
            </p>
            <div className="space-y-3">
              <input
                name="newPassword"
                type="password"
                autoComplete="new-password"
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 bg-white/5 border border-white/10 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]/50 transition-colors"
                placeholder="New password"
              />
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 bg-white/5 border border-white/10 focus:border-[#00f5ff] focus:outline-none focus:ring-1 focus:ring-[#00f5ff]/50 transition-colors"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                color: "#000",
              }}
            >
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function OverviewContent({
  displayName,
  agentRunning,
}: {
  displayName: string;
  agentRunning: boolean;
}) {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(191,0,255,0.08) 100%)",
          border: "1px solid rgba(0,245,255,0.15)",
        }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #00f5ff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #bf00ff 0%, transparent 50%)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={16} style={{ color: "#ff0080" }} />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                AI Agent Active
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Good morning,{" "}
              <span style={{ color: "#00f5ff" }}>
                {displayName.split(" ")[0]}
              </span>{" "}
              👋
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Your marketing command center is live. 3 new actions require your
              attention.
            </p>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0"
            style={{
              background: agentRunning
                ? "rgba(0,255,136,0.1)"
                : "rgba(0,245,255,0.1)",
              border: `1px solid ${agentRunning ? "rgba(0,255,136,0.3)" : "rgba(0,245,255,0.3)"}`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: agentRunning ? "#00ff88" : "#00f5ff",
                boxShadow: `0 0 8px ${agentRunning ? "#00ff88" : "#00f5ff"}`,
                animation: "pulse 2s infinite",
              }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: agentRunning ? "#00ff88" : "#00f5ff" }}
            >
              {agentRunning ? "Running Analysis..." : "System Nominal"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: stat.bg,
                border: `1px solid ${stat.border}`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${stat.color}18`,
                    border: `1px solid ${stat.color}40`,
                  }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-semibold"
                  style={{
                    color: stat.trend === "up" ? "#00ff88" : "#ff6b9d",
                  }}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {stat.change}
                </div>
              </div>
              <div
                className="text-3xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity + integrations row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            background: "#070d17",
            border: "1px solid rgba(0,245,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Recent Activity</h3>
            <button
              className="text-xs font-semibold transition-colors"
              style={{ color: "#00f5ff" }}
            >
              View all →
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((activity) => {
              const Icon = activity.icon;
              const statusInfo = STATUS_STYLES[activity.status];
              const StatusIcon = statusInfo.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-white/[0.02] cursor-pointer"
                  style={{ border: "1px solid transparent" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: `${activity.color}12`,
                      border: `1px solid ${activity.color}30`,
                    }}
                  >
                    <Icon size={15} style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-white truncate">
                        {activity.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {activity.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div
                      className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${statusInfo.color}12`,
                        color: statusInfo.color,
                        border: `1px solid ${statusInfo.color}30`,
                      }}
                    >
                      <StatusIcon size={10} />
                      {statusInfo.label}
                    </div>
                    <span className="text-xs text-slate-600">
                      {activity.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Agent status */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#070d17",
              border: "1px solid rgba(0,245,255,0.08)",
            }}
          >
            <h3 className="font-bold text-white mb-4">Agent Pipeline</h3>
            <div className="space-y-3">
              {[
                { step: "Extract Meetings", done: true, color: "#00f5ff" },
                { step: "Analyze Documents", done: true, color: "#bf00ff" },
                { step: "Structure Tasks", done: true, color: "#00ff88" },
                { step: "Slack Approval", done: false, color: "#ffff00" },
                { step: "Create Jira Tickets", done: false, color: "#00f5ff" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: step.done ? `${step.color}15` : "transparent",
                      border: `1px solid ${step.done ? step.color : "rgba(100,116,139,0.3)"}`,
                    }}
                  >
                    {step.done ? (
                      <CheckCircle2 size={10} style={{ color: step.color }} />
                    ) : (
                      <Circle size={10} className="text-slate-600" />
                    )}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: step.done ? "#e2e8f0" : "#4b5563",
                    }}
                  >
                    {step.step}
                  </span>
                  {i === 3 && (
                    <span
                      className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        background: "rgba(255,255,0,0.1)",
                        color: "#ffff00",
                        border: "1px solid rgba(255,255,0,0.2)",
                      }}
                    >
                      Waiting
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick metrics */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#070d17",
              border: "1px solid rgba(0,245,255,0.08)",
            }}
          >
            <h3 className="font-bold text-white mb-4">This Week</h3>
            <div className="space-y-3">
              {[
                { label: "Meetings processed", value: 8, max: 10, color: "#bf00ff" },
                { label: "Tasks automated", value: 19, max: 25, color: "#00f5ff" },
                { label: "Team efficiency", value: 78, max: 100, color: "#00ff88" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-slate-500">
                      {metric.label}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: metric.color }}
                    >
                      {metric.value}
                      {metric.max === 100 ? "%" : `/${metric.max}`}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(metric.value / metric.max) * 100}%`,
                        background: metric.color,
                        boxShadow: `0 0 8px ${metric.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] animate-fade-in">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: "rgba(0,245,255,0.06)",
          border: "1px solid rgba(0,245,255,0.2)",
        }}
      >
        <Brain size={36} style={{ color: "#00f5ff" }} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{label}</h2>
      <p className="text-slate-500 text-sm text-center max-w-xs">
        This module is being built. The AI agent integration will be live soon.
      </p>
      <div
        className="mt-6 px-4 py-2 rounded-xl text-xs font-semibold"
        style={{
          background: "rgba(0,245,255,0.08)",
          border: "1px solid rgba(0,245,255,0.2)",
          color: "#00f5ff",
        }}
      >
        Coming in next sprint
      </div>
    </div>
  );
}
