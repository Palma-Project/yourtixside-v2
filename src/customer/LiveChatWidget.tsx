/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const AUTO_REPLY =
  'Terima kasih sudah menghubungi YourtixSide! Tim kami akan membalas secepatnya. Sambil menunggu, cek dulu FAQ di atas — mungkin jawabannya sudah ada di sana.';

export const LiveChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; from: 'me' | 'bot'; text: string }[]>([
    { id: 0, from: 'bot', text: 'Halo! Ada yang bisa kami bantu?' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const id = messages.length;
    setMessages((prev) => [...prev, { id, from: 'me', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: id + 1, from: 'bot', text: AUTO_REPLY }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-[320px] max-w-[85vw] bg-white rounded-2xl border border-[#e2e8f0] shadow-2xl flex flex-col h-[420px] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between bg-[#dc2626] rounded-t-2xl">
            <span className="text-white text-[13.5px] font-bold">Live Chat CS</span>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-[12.5px] leading-[18px] ${
                    m.from === 'me' ? 'bg-[#dc2626] text-white' : 'bg-[#f1f5f9] text-[#191c1e]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2.5 border-t border-[#e2e8f0] flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Tulis pesan..."
              className="flex-1 px-3 py-2 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[12.5px]"
            />
            <button
              onClick={send}
              className="w-9 h-9 rounded-xl bg-[#dc2626] text-white flex items-center justify-center hover:bg-[#b91c1c] transition-colors cursor-pointer shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-[#dc2626] text-white shadow-lg flex items-center justify-center hover:bg-[#b91c1c] active:scale-95 transition-all cursor-pointer ml-auto"
        aria-label="Live Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
};
