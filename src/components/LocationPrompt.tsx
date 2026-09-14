/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LocationPromptProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const LocationPrompt: React.FC<LocationPromptProps> = ({ onAccept, onDecline }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 z-50 w-[calc(100%-2.5rem)] max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xl p-4 flex gap-3">
        <div className="w-9 h-9 rounded-full bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
          <MapPin size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[#191c1e]">{t.location.promptTitle}</p>
          <p className="text-[13px] leading-[19px] text-[#565e74] mt-1">{t.location.promptBody}</p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={onAccept}
              className="px-3.5 py-1.5 rounded-lg bg-[#dc2626] text-white text-[13px] font-semibold hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.location.accept}
            </button>
            <button
              onClick={onDecline}
              className="px-3.5 py-1.5 rounded-lg text-[#565e74] text-[13px] font-semibold hover:bg-[#f2f4f6] transition-colors cursor-pointer"
            >
              {t.location.decline}
            </button>
          </div>
        </div>
        <button
          onClick={onDecline}
          aria-label="Dismiss"
          className="text-[#94a3b8] hover:text-[#565e74] transition-colors cursor-pointer shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
