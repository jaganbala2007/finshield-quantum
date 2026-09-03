import React, { useState } from 'react';
import { UserCheck, PhoneCall, ShieldAlert, CheckCircle2, X } from 'lucide-react';

export default function TrustedContactModal({ isOpen, onClose, payee, amount, riskScore }) {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSendNotification = () => {
    setSent(true);
    setTimeout(() => {
      // Auto close after 3s
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-card max-w-md w-full p-6 border border-cyan-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Trusted Contact Verification</h3>
            <p className="text-xs text-slate-400">Notify family or caregiver before sending money</p>
          </div>
        </div>

        {!sent ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Beneficiary:</span>
                <span className="font-semibold text-white">{payee}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Amount:</span>
                <span className="font-semibold text-amber-400">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>FinShield Risk Score:</span>
                <span className="font-bold text-rose-400">{riskScore}/100</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Registered Contact:</span>
                <span className="font-semibold text-cyan-400">Son (Anish - +91 98765 43210)</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Sending this alert will dispatch an SMS containing payment details to your trusted contact for a quick double-check.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/20 hover:opacity-95"
              >
                Send SMS Alert Now
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 animate-bounce" />
            </div>
            <h4 className="font-bold text-emerald-400 text-base">Alert Sent to Trusted Contact!</h4>
            <p className="text-xs text-slate-300">
              Anish has received an SMS alert regarding the ₹{amount.toLocaleString('en-IN')} payment request to {payee}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
