import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShieldCheck, Cpu, GitMerge, Lock, BarChart3, AlertTriangle, Eye, Sun, Moon, Play, Scale, Building2, Smartphone } from 'lucide-react';

export default function Header({
  vulnerableMode,
  setVulnerableMode,
  theme,
  setTheme,
  experienceMode,
  setExperienceMode,
  onRunDemo,
  judgeMode,
  setJudgeMode
}) {
  const router = useRouter();

  const navItems = [
    { href: '/dashboard', label: 'Fraud Ops Center', icon: BarChart3 },
    { href: '/', label: 'Customer App', icon: Smartphone },
    { href: '/scenarios', label: 'Attack Simulator', icon: AlertTriangle },
    { href: '/quantum', label: 'Quantum Lab', icon: Cpu },
    { href: '/pqc', label: 'PQC Security', icon: Lock },
    { href: '/graph', label: 'Fraud Graph', icon: GitMerge },
    { href: '/evaluation', label: 'Metrics & Eval', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md">
      
      {/* Top Enterprise Tagline & Positioning Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-1.5 text-center text-xs font-semibold text-slate-300 flex items-center justify-center gap-2">
        <span className="text-cyan-400 font-bold">HUMAN-MANIPULATION FRAUD FIREWALL FOR BANKS</span>
        <span className="hidden md:inline text-slate-500">•</span>
        <span className="hidden md:inline text-slate-400">"Detecting the manipulation behind legitimate transactions."</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Experience Badge */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-wide">FinShield</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">QUANTUM</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Enterprise Banking Security Layer</p>
            </div>
          </Link>

          {/* Core Navigation Items */}
          {!judgeMode && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Quick Action Controls: DEMO MODE, JUDGE MODE, EXPERIENCE SWITCHER */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* DEMO MODE AUTO-PRESENTATION BUTTON */}
            {onRunDemo && (
              <button
                onClick={onRunDemo}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-extrabold shadow-md hover:opacity-95 flex items-center gap-1.5"
                title="Run Automated 60-Second Hackathon Demo Sequence"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>DEMO MODE</span>
              </button>
            )}

            {/* JUDGE MODE TOGGLE */}
            <button
              onClick={() => setJudgeMode(!judgeMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                judgeMode
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-900 text-purple-300 border border-purple-500/30 hover:bg-slate-800'
              }`}
              title="Toggle Clean Judge Presentation Interface"
            >
              <Scale className="w-3.5 h-3.5" />
              {judgeMode ? 'JUDGE MODE ON' : 'JUDGE MODE'}
            </button>

            {/* EXPERIENCE MODE SWITCHER */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => {
                  setExperienceMode('bank');
                  router.push('/dashboard');
                }}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  router.pathname === '/dashboard' || experienceMode === 'bank'
                    ? 'bg-cyan-500 text-slate-950 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Ops Center
              </button>
              <button
                onClick={() => {
                  setExperienceMode('customer');
                  router.push('/');
                }}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  router.pathname === '/' || experienceMode === 'customer'
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Customer App
              </button>
            </div>

            {/* Theme & Accessibility Toggles */}
            <button
              onClick={() => setVulnerableMode(!vulnerableMode)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                vulnerableMode
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
              title="Elder Safety Accessibility Mode"
            >
              <Eye className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
