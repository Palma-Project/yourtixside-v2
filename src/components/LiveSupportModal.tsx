import React, { useState } from 'react';

interface LiveSupportModalProps {
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export const LiveSupportModal: React.FC<LiveSupportModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'agent',
      text: 'Halo! Saya asisten operasional yourtixside. Ada yang bisa kami bantu terkait tiket, voting, atau formulir event hari ini?',
      time: '12:00',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Terima kasih atas pertanyaan Anda. ';
      const lower = userText.toLowerCase();

      if (lower.includes('vote') || lower.includes('voting')) {
        reply += 'Setiap tiket resmi memiliki 1 token voting terverifikasi. Anda dapat memasukkan kode tiket di segmen Voting Engine.';
      } else if (lower.includes('form') || lower.includes('ktp') || lower.includes('dokumen')) {
        reply += 'Formulir kustom dan upload identitas dapat diakses langsung pada formulir tier tiket Anda atau lewat tautan konfirmasi tiket.';
      } else if (lower.includes('gate') || lower.includes('masuk') || lower.includes('barcode')) {
        reply += 'Pintu gerbang/turnstile dilengkapi barcode scanner terenkripsi. Pastikan QR tiket Anda memiliki kecerahan layar optimal.';
      } else {
        reply += 'Tim Customer Care yourtixside telah menerima tiket bantuan Anda. Rata-rata waktu tanggap tim operasional saat acara berlangsung adalah < 2 menit.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  const quickQuestions = [
    'Bagaimana cara validasi tiket voting?',
    'Cara upload KTP di custom form?',
    'Berapa SLA respons saat gate open?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col h-[560px]">
        {/* Header */}
        <div className="p-4 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f7f9fb] rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#fef2f2] text-[#dc2626] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">support_agent</span>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#191c1e] flex items-center gap-1.5">
                <span>Customer Care yourtixside</span>
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              </div>
              <div className="text-[11px] text-[#565e74]">
                SLA Respons Aktif: &lt; 2 menit
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f7f9fb]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-[20px] ${
                  m.sender === 'user'
                    ? 'bg-[#dc2626] text-white rounded-br-xs'
                    : 'bg-white text-[#191c1e] border border-[#e2e8f0] rounded-bl-xs shadow-2xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#565e74] mt-1 px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1 bg-white border border-[#e2e8f0] px-3 py-2 rounded-xl w-fit shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 border-t border-[#e2e8f0] bg-white flex flex-wrap gap-1.5">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInputVal(q);
              }}
              className="text-[11px] text-[#565e74] hover:text-[#dc2626] bg-[#f2f4f6] hover:bg-[#fef2f2] px-2.5 py-1 rounded-full border border-[#e2e8f0] transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-[#e2e8f0] bg-white rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ketik pertanyaan bantuan Anda..."
            className="flex-1 px-3.5 py-2 text-[13px] bg-[#f7f9fb] border border-[#e2e8f0] rounded-xl focus:outline-hidden focus:border-[#dc2626]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#dc2626] text-white rounded-xl font-semibold text-[13px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
