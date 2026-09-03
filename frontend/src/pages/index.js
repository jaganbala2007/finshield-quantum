import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AiAnalysisAnimationModal from '../components/AiAnalysisAnimationModal';
import DemoModeModal from '../components/DemoModeModal';
import { Send, ShieldCheck, AlertCircle, AlertTriangle, Phone, MessageSquare, User, Zap, RefreshCw, Smartphone, ShieldAlert, ArrowRight, XCircle } from 'lucide-react';

export default function CustomerApp() {
  const [vulnerableMode, setVulnerableMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [experienceMode, setExperienceMode] = useState('customer');
  const [judgeMode, setJudgeMode] = useState(false);
  
  // User Profile
  const [userProfile, setUserProfile] = useState('senior'); // senior or standard
  
  // Payment Form Inputs
  const [payee, setPayee] = useState('Rahul Traders (Unverified)');
  const [payeeId, setPayeeId] = useState('PAY-6350');
  const [amount, setAmount] = useState('85000');
  const [messageText, setMessageText] = useState('SECURITY ALERT: Account frozen. Transfer funds immediately to safe vault account PAY-6350.');
  const [callTranscript, setCallTranscript] = useState('Hello, I am Officer Sharma from Bank Security. We detected unauthorized access. Transfer your funds now to temporary safe account PAY-6350. Do not hang up!');

  // Modal states
  const [evaluating, setEvaluating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [customerWarningOpen, setCustomerWarningOpen] = useState(false);

  const handleAnalyzeAndPay = async (e) => {
    e.preventDefault();
    setEvaluating(true);

    const payload = {
      user_id: userProfile === 'senior' ? 7701 : 1205,
      amount: parseFloat(amount) || 1000.0,
      payee: payee,
      payee_id: payeeId,
      message: messageText,
      call_transcript: callTranscript,
      is_new_payee: true,
      is_new_device: true,
      hour_of_day: 23
    };

    try {
      const res = await fetch('http://localhost:8080/api/transaction/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setAnalysisResult(data);
      setAnalysisModalOpen(true);
    } catch (err) {
      console.error("API error:", err);
      // Fallback mock response for offline frontend demo
      const fallback = {
        policy_decision: "HOLD",
        action_code: 3,
        manipulation_risk_score: 94.2,
        user_title: "⛔ PAYMENT HELD: HIGH FRAUD RISK",
        user_message: "FinShield detected high human manipulation cues (authority impersonation call, high urgency SMS, first-time payee).",
        recommendation: "Payment held. Customer verification required.",
        risk_breakdown: { social_risk: 96.5, transaction_risk: 91.0, behavior_risk: 87.0, graph_risk: 92.0 },
        reasons: [
          "Urgency & fear language detected in incoming message",
          "Authority impersonation detected in call transcript (Officer Sharma)",
          "Transfer amount is 8.5x higher than normal average",
          "First-time beneficiary transfer to unverified merchant PAY-6350"
        ],
        shap_explanation: [
          { feature: "Scam Urgency Language", shap_impact: 34.5 },
          { feature: "Transaction Amount Ratio", shap_impact: 28.2 },
          { feature: "First-Time Beneficiary", shap_impact: 18.0 }
        ],
        payee: payee,
        amount: parseFloat(amount)
      };
      setAnalysisResult(fallback);
      setAnalysisModalOpen(true);
    } finally {
      setEvaluating(false);
    }
  };

  const loadNormalPreset = () => {
    setPayee('Electric Utility Corp');
    setPayeeId('PAY-1020');
    setAmount('2500');
    setMessageText('');
    setCallTranscript('');
  };

  const loadScamPreset = () => {
    setPayee('Rahul Traders (Unverified)');
    setPayeeId('PAY-6350');
    setAmount('85000');
    setMessageText('SECURITY ALERT: Account frozen. Transfer funds immediately to safe vault account PAY-6350.');
    setCallTranscript('Hello, Officer Sharma here from Bank Security. Transfer your funds to safe vault account PAY-6350 immediately!');
  };

  return (
    <div className={`min-h-screen ${vulnerableMode ? 'vulnerable-accessibility-mode' : ''}`}>
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
        
        {/* Top Pitch & Hero Banner */}
        <div className="glass-card p-6 border-cyan-500/30 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  CUSTOMER BANKING PROTECTION EXPERIENCE
                </span>
                <span className="text-xs text-slate-400 font-medium">FinShield Client Safeguard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                FinShield Quantum Mobile Banking
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
                Protected by bank-integrated AI that detects <span className="text-cyan-400 font-extrabold">human manipulation</span> before funds leave your account.
              </p>
            </div>

            {/* Quick Demo Presets */}
            <div className="flex items-center gap-2">
              <button
                onClick={loadNormalPreset}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Normal Payment Preset
              </button>
              <button
                onClick={loadScamPreset}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Scam Attack Preset
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Transaction Simulator Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 border-slate-800">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-white">Initiate Instant Transfer</h2>
                    <p className="text-xs text-slate-400">FinShield will analyze signals before money leaves your account</p>
                  </div>
                </div>

                {/* Customer Profile Selector */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <button
                    onClick={() => setUserProfile('senior')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      userProfile === 'senior' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400'
                    }`}
                  >
                    Senior User (72y)
                  </button>
                  <button
                    onClick={() => setUserProfile('standard')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      userProfile === 'standard' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400'
                    }`}
                  >
                    Standard User
                  </button>
                </div>
              </div>

              <form onSubmit={handleAnalyzeAndPay} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Payee Name</label>
                    <input
                      type="text"
                      value={payee}
                      onChange={(e) => setPayee(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-medium focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1">Payee Account / ID</label>
                    <input
                      type="text"
                      value={payeeId}
                      onChange={(e) => setPayeeId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-medium focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1">Transfer Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-lg font-extrabold text-cyan-400 focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                {/* Multimodal Context Inputs */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      Incoming Phishing SMS / Message Context
                    </span>
                    <span className="text-[10px] text-slate-400">Scam NLP Signal</span>
                  </div>
                  <textarea
                    rows={2}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="e.g. URGENT: Your account is blocked..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-medium focus:border-cyan-500 focus:outline-none"
                  />

                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                      Phone Call Transcript Context (Vishing)
                    </span>
                    <span className="text-[10px] text-slate-400">Coercion Signal</span>
                  </div>
                  <textarea
                    rows={2}
                    value={callTranscript}
                    onChange={(e) => setCallTranscript(e.target.value)}
                    placeholder="e.g. Hello, I am Officer Sharma from bank security..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-medium focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={evaluating}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        FinShield Multimodal AI Evaluating...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        ANALYZE & AUTHORIZE TRANSFER
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Customer Protection & Profile */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-5 border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-extrabold text-white">
                  {userProfile === 'senior' ? 'S' : 'U'}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    {userProfile === 'senior' ? 'Sunita Sharma (Age 72)' : 'Anish Patel (Age 34)'}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {userProfile === 'senior' ? 'Vulnerable Customer Profile' : 'Standard Digital Banking User'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Digital Skill Level:</span>
                  <div className="font-bold text-amber-400 mt-0.5">
                    {userProfile === 'senior' ? '3 / 10 (Low)' : '8 / 10 (High)'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Avg Transaction:</span>
                  <div className="font-bold text-white mt-0.5">₹5,000</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Trusted Contact:</span>
                  <div className="font-bold text-cyan-400 mt-0.5">
                    {userProfile === 'senior' ? 'Son (Anish Patel)' : 'None'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">FinShield Protection:</span>
                  <div className="font-bold text-emerald-400 mt-0.5">Human Manipulation Layer</div>
                </div>
              </div>
            </div>

            {/* Customer Protection Dialog Preview */}
            <div className="glass-card p-5 border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Customer Safety Interstitial Preview</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                When Bank Fraud Ops triggers a hold, the customer receives an unambiguous warning:
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs space-y-2">
                <div className="font-bold text-amber-300">⚠ PAYMENT PAUSED</div>
                <div className="text-slate-300">"We paused this payment to help keep you safe."</div>
                <div className="flex gap-2 pt-1">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">VERIFY RECIPIENT</span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">CONTACT BANK</span>
                  <span className="px-2 py-1 rounded bg-rose-500/20 border border-rose-500/30 text-[10px] font-bold text-rose-300">CANCEL PAYMENT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Sequential AI Analysis Animation WOW Moment Modal */}
      <AiAnalysisAnimationModal
        isOpen={analysisModalOpen}
        onClose={() => setAnalysisModalOpen(false)}
        result={analysisResult}
        vulnerableMode={vulnerableMode}
        onSwitchToCustomerView={() => setCustomerWarningOpen(true)}
      />

      {/* Demo Mode Modal */}
      <DemoModeModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onRunScamScenario={handleAnalyzeAndPay}
        onResetDemo={() => {
          setAnalysisResult(null);
          loadNormalPreset();
        }}
      />
    </div>
  );
}
