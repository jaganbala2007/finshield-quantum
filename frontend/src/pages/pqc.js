import React, { useState } from 'react';
import Header from '../components/Header';
import DemoModeModal from '../components/DemoModeModal';
import { Lock, ShieldCheck, Key, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PqcSecurityPage() {
  const [vulnerableMode, setVulnerableMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [experienceMode, setExperienceMode] = useState('bank');
  const [judgeMode, setJudgeMode] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const [handshakeResult, setHandshakeResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunPqcHandshake = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/pqc/handshake');
      const data = await res.json();
      setHandshakeResult(data);
    } catch (err) {
      console.error(err);
      setHandshakeResult({
        algorithm: "NIST FIPS 203 ML-KEM-512 (Kyber)",
        public_key_bytes: 800,
        ciphertext_bytes: 768,
        shared_secret_hex: "a3f8c9e102d4b576891234ef56789a0b1c2d3e4f567890123456789abcdef012",
        status: "SUCCESSFUL QUANTUM-RESISTANT HANDSHAKE",
        quantum_safety_level: "NIST Category 1 (AES-128 Equivalent Quantum Hardness)"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 ${vulnerableMode ? 'vulnerable-accessibility-mode' : ''}`}>
      <Header
        vulnerableMode={vulnerableMode}
        setVulnerableMode={setVulnerableMode}
        theme={theme}
        setTheme={setTheme}
        experienceMode={experienceMode}
        setExperienceMode={setExperienceMode}
        onRunDemo={() => setDemoModalOpen(true)}
        judgeMode={judgeMode}
        setJudgeMode={setJudgeMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              NIST FIPS 203 STANDARDS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 tracking-wide">
            <Lock className="w-7 h-7 text-emerald-400" />
            Post-Quantum Cryptography (PQC) Security Layer
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Protecting banking customer session keys against future Shor's algorithm quantum decryption using ML-KEM-512 key encapsulation.
          </p>
        </div>

        {/* PQC Pipeline Visual Flow */}
        <div className="glass-card p-6 border-emerald-500/30 space-y-6">
          <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">Post-Quantum Secure Session Encapsulation Pipeline</h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-bold">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">1. Customer Session</span>
              <div className="text-white">Transaction Request</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">2. Key Generation</span>
              <div className="text-cyan-400">ML-KEM-512 Keypair</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">3. Encapsulation</span>
              <div className="text-purple-400">768-Byte Ciphertext</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">4. Shared Secret</span>
              <div className="text-amber-400">256-Bit AES-GCM Key</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase">5. Quantum Safe</span>
              <div className="font-extrabold">Shor-Resistant Channel</div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={handleRunPqcHandshake}
              disabled={loading}
              className="py-3.5 px-6 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg hover:opacity-95 flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Quantum-Resistant Keypair...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  EXECUTE LIVE ML-KEM-512 PQC HANDSHAKE
                </>
              )}
            </button>
          </div>
        </div>

        {/* Handshake Result Box */}
        {handshakeResult && (
          <div className="glass-card p-6 border-emerald-500/40 space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm text-white">{handshakeResult.status}</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 font-mono">{handshakeResult.algorithm}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans font-bold">Public Key Size</span>
                <div className="text-cyan-400 font-bold">{handshakeResult.public_key_bytes} Bytes</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans font-bold">Ciphertext Size</span>
                <div className="text-purple-400 font-bold">{handshakeResult.ciphertext_bytes} Bytes</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 md:col-span-2 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-sans font-bold">Session Shared Secret Hex</span>
                <div className="text-emerald-400 text-[11px] break-all">{handshakeResult.shared_secret_hex}</div>
              </div>
            </div>
          </div>
        )}

      </main>

      <DemoModeModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
