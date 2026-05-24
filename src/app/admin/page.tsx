"use client";

import { useEffect, useState } from "react";
import { Key, ShieldAlert, RefreshCw, LogOut, Terminal, Users, Layers, Activity, Search, Calendar, Mail, Trash2 } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

interface Inquiry {
  id?: string;
  name: string;
  email: string;
  product: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [loginError, setLoginError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);

  // System stats
  const [stats, setStats] = useState({
    total: 0,
    general: 0,
    competition: 0,
    appointment: 0,
    race: 0,
    custom: 0,
  });

  // Load token from sessionStorage on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem("admin-api-key");
    if (savedKey) {
      verifyAndLoad(savedKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter logic
  useEffect(() => {
    let result = inquiries;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (inq) =>
          inq.name.toLowerCase().includes(term) ||
          inq.email.toLowerCase().includes(term) ||
          inq.message.toLowerCase().includes(term)
      );
    }

    if (filterProduct !== "all") {
      result = result.filter((inq) => inq.product === filterProduct);
    }

    setFilteredInquiries(result);
  }, [searchTerm, filterProduct, inquiries]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setSystemLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 19)]);
  };

  const verifyAndLoad = async (key: string) => {
    setIsLoading(true);
    setLoginError("");
    addLog("Initiating database connection fetch request...");
    try {
      const res = await fetch("/api/contact", {
        method: "GET",
        headers: {
          "x-api-key": key,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid API Key. Unauthorized access.");
        }
        throw new Error("Server returned an error status.");
      }

      const body = await res.json();
      sessionStorage.setItem("admin-api-key", key);
      setApiKey(key);
      setIsAuthenticated(true);
      setInquiries(body.data || []);
      setFilteredInquiries(body.data || []);
      
      const fallback = body.message && body.message.toLowerCase().includes("fallback");
      setIsFallbackMode(!!fallback);
      
      addLog(
        fallback 
          ? "Connected successfully. Database is in local Console Fallback mode." 
          : `Connected successfully. Fetched ${body.data?.length || 0} active Firestore records.`
      );

      // Compute statistics
      computeStats(body.data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setLoginError(errorMessage);
      sessionStorage.removeItem("admin-api-key");
      addLog(`Authentication failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const computeStats = (data: Inquiry[]) => {
    const s = {
      total: data.length,
      general: 0,
      competition: 0,
      appointment: 0,
      race: 0,
      custom: 0,
    };
    data.forEach((inq) => {
      if (inq.product === "competition-scheduler") s.competition++;
      else if (inq.product === "appointment-engine") s.appointment++;
      else if (inq.product === "race-communicator") s.race++;
      else if (inq.product === "custom-integration") s.custom++;
      else s.general++;
    });
    setStats(s);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      verifyAndLoad(apiKey.trim());
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    addLog("Refreshing Firestore documents snapshot...");
    try {
      const res = await fetch("/api/contact", {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });
      if (res.ok) {
        const body = await res.json();
        setInquiries(body.data || []);
        computeStats(body.data || []);
        addLog(`Sync completed. Total records: ${body.data?.length || 0}.`);
      } else {
        addLog("Sync failed: API returned error status.");
      }
    } catch {
      addLog("Sync failed: Network timeout.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-api-key");
    setIsAuthenticated(false);
    setApiKey("");
    setInquiries([]);
    setFilteredInquiries([]);
    addLog("Session closed. Logging out.");
  };

  const handleDelete = async (id: string) => {
    addLog(`Initiating document delete request for ID: ${id}...`);
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (!res.ok) {
        throw new Error("API returned failure status.");
      }

      // Update state
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      computeStats(updated);
      addLog(`Document ${id} successfully deleted.`);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      addLog(`Delete failed: ${errMsg}`);
    }
  };

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <>
        <SiteNav />
        <main className="min-h-screen bg-bg text-fg flex items-center justify-center p-6 pt-24 relative overflow-hidden">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="w-full max-w-md rounded-2xl glass p-8 relative overflow-hidden z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-border hover:bg-iridescent transition-colors" />
            
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/12 border border-brand-500/20">
                <Key className="text-brand-500 w-6 h-6" />
              </div>
              <h1 className="font-display text-2xl font-semibold">Tymora Portal</h1>
              <p className="text-xs text-fg-muted max-w-xs">
                Enter your system `CONTACTS_API_KEY` credential to access database telemetry and inquiries.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="token" className="text-xs font-mono uppercase tracking-wider text-fg-dim">
                  System API Key
                </label>
                <input
                  id="token"
                  type="password"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="••••••••••••••••••••••••••••••••"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-bg border border-border text-fg outline-none focus:border-brand-500/60 transition-colors disabled:opacity-50 font-mono"
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-xs text-danger font-medium font-mono p-3 rounded-lg bg-danger/10 border border-danger/20">
                  <ShieldAlert size={14} />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-brand-500 text-fg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Validating key..." : "Open Dashboard"}
              </button>
            </form>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  // ─── DASHBOARD PORTAL ───
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-bg text-fg px-6 py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 z-10 relative">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-500">Internal Console</span>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">System & Inquiry Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-surface border border-border text-fg hover:bg-surface-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
                Sync Data
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-danger/12 border border-danger/20 text-danger hover:bg-danger/20 transition-colors cursor-pointer"
              >
                <LogOut size={12} />
                Disconnect
              </button>
            </div>
          </div>

          {/* Core Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Health Telemetry widget */}
            <div className="glass rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase tracking-wider">
                <Activity size={14} className="text-brand-500" />
                <span>Health Telemetry</span>
              </div>
              
              <div className="flex flex-col gap-3.5 mt-2">
                {/* Instance Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-fg-muted">App Server:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-success">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Healthy
                  </span>
                </div>
                
                {/* Firestore Status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-fg-muted">Firestore:</span>
                  {isFallbackMode ? (
                    <span className="flex items-center gap-1.5 font-semibold text-warning">
                      <span className="w-2 h-2 rounded-full bg-warning" />
                      Fallback (Log)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-semibold text-success">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      Connected (Cloud)
                    </span>
                  )}
                </div>

                {/* API Auth status */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-fg-muted">Gate Keeper:</span>
                  <span className="flex items-center gap-1.5 font-semibold text-success">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    Token Active
                  </span>
                </div>
              </div>
            </div>

            {/* Inquiries Counter widget */}
            <div className="glass rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase tracking-wider">
                <Users size={14} className="text-brand-500" />
                <span>Submissions</span>
              </div>
              <div className="mt-2 flex flex-col">
                <span className="text-4xl font-display font-bold text-fg tracking-tight">
                  {stats.total}
                </span>
                <span className="text-[11px] text-fg-muted mt-1 font-mono">
                  Total client records retrieved.
                </span>
              </div>
            </div>

            {/* Product Interest distribution bar graph */}
            <div className="glass rounded-xl p-5 col-span-1 lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase tracking-wider">
                <Layers size={14} className="text-brand-500" />
                <span>Product Interest Distribution</span>
              </div>

              <div className="flex flex-col gap-2.5 mt-1 font-mono text-[11px]">
                {/* Competition Scheduler */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-fg-muted">Competition Scheduler</span>
                    <span className="font-semibold text-fg">{stats.competition}</span>
                  </div>
                  <div className="w-full h-1.5 bg-border/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-500 transition-all duration-500" 
                      style={{ width: `${stats.total > 0 ? (stats.competition / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Appointment Engine */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-fg-muted">Appointment Engine</span>
                    <span className="font-semibold text-fg">{stats.appointment}</span>
                  </div>
                  <div className="w-full h-1.5 bg-border/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-500 transition-all duration-500" 
                      style={{ width: `${stats.total > 0 ? (stats.appointment / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Race Communicator */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-fg-muted">Race-Day Communicator</span>
                    <span className="font-semibold text-fg">{stats.race}</span>
                  </div>
                  <div className="w-full h-1.5 bg-border/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-500 transition-all duration-500" 
                      style={{ width: `${stats.total > 0 ? (stats.race / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Tables & Console Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col: Messages Table list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">Client Inquiry Feed</h3>
                
                {/* Filters */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-dim" size={12} />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-lg text-xs bg-surface border border-border text-fg outline-none focus:border-brand-500/60 transition-colors"
                    />
                  </div>

                  {/* Product Filter */}
                  <select
                    value={filterProduct}
                    onChange={(e) => setFilterProduct(e.target.value)}
                    className="px-2 py-1.5 rounded-lg text-xs bg-surface border border-border text-fg outline-none focus:border-brand-500/60 transition-colors cursor-pointer"
                  >
                    <option value="all">All Topics</option>
                    <option value="general">General</option>
                    <option value="competition-scheduler">Scheduler</option>
                    <option value="appointment-engine">Appt Engine</option>
                    <option value="race-communicator">Race-Day</option>
                    <option value="custom-integration">Custom</option>
                  </select>
                </div>
              </div>

              {/* Inquiry Cards List */}
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
                {filteredInquiries.length === 0 ? (
                  <div className="glass rounded-xl p-8 text-center text-xs text-fg-muted">
                    No inquiries found matching your filters.
                  </div>
                ) : (
                  filteredInquiries.map((inq, index) => (
                    <div key={inq.id || index} className="glass rounded-xl p-5 relative overflow-hidden hover:bg-white/[0.05] transition-colors group">
                      <div className="absolute inset-y-0 left-0 w-[3px] bg-brand-500" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-fg">{inq.name}</h4>
                            <button
                              type="button"
                              onClick={() => inq.id && handleDelete(inq.id)}
                              className="p-1 rounded hover:bg-danger/10 text-fg-dim hover:text-danger opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                              title="Delete Inquiry"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                          <a 
                            href={`mailto:${inq.email}`} 
                            className="inline-flex items-center gap-1.5 text-xs text-brand-500 hover:underline mt-0.5"
                          >
                            <Mail size={10} />
                            {inq.email}
                          </a>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-1 text-[10px] font-mono text-fg-dim">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-brand-500/10 border border-brand-500/15 text-brand-500 font-sans font-medium uppercase tracking-wide">
                            {inq.product.replace("-", " ")}
                          </span>
                          <span className="flex items-center gap-1 mt-0.5">
                            <Calendar size={10} />
                            {new Date(inq.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-fg-muted leading-relaxed bg-surface/50 border border-border/20 rounded-lg p-3 whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Col: Console Live Stream */}
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-semibold">Console Logs</h3>
              
              <div className="glass rounded-xl p-4 flex-1 flex flex-col min-h-[300px] max-h-[600px] overflow-hidden">
                <div className="flex items-center gap-2 text-fg-dim text-xs font-mono uppercase tracking-wider border-b border-border/40 pb-3 mb-3">
                  <Terminal size={14} className="text-brand-500" />
                  <span>Transaction Stream</span>
                </div>
                
                <div className="flex-1 overflow-y-auto font-mono text-[10px] text-fg-muted space-y-2.5 pr-1 max-h-[500px]">
                  {systemLogs.length === 0 ? (
                    <div className="text-fg-dim/40 text-center py-8">
                      Awaiting connections...
                    </div>
                  ) : (
                    systemLogs.map((log, idx) => (
                      <div 
                        key={idx} 
                        className={`leading-relaxed whitespace-pre-wrap ${
                          log.includes("failed") || log.includes("Error") 
                            ? "text-danger" 
                            : log.includes("Success") || log.includes("complete") 
                              ? "text-success" 
                              : "text-fg-muted"
                        }`}
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
