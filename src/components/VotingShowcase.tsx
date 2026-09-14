import React, { useState } from 'react';

interface Candidate {
  id: string;
  name: string;
  votes: number;
  percentage: number;
}

export const VotingShowcase: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('a');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'a', name: 'Performer A', votes: 450, percentage: 45 },
    { id: 'b', name: 'Performer B', votes: 380, percentage: 38 },
    { id: 'c', name: 'Performer C', votes: 170, percentage: 17 },
  ]);

  const handleSubmitVote = () => {
    if (!hasVoted) {
      const updated = candidates.map((c) => {
        if (c.id === selectedCandidate) {
          return { ...c, votes: c.votes + 1 };
        }
        return c;
      });
      const total = updated.reduce((sum, c) => sum + c.votes, 0);
      const withPerc = updated.map((c) => ({
        ...c,
        percentage: Math.round((c.votes / total) * 100),
      }));
      setCandidates(withPerc);
      setHasVoted(true);
    }
  };

  const handleResetVote = () => {
    setHasVoted(false);
  };

  return (
    <section className="py-16 md:py-20 bg-[#f7f9fb] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2f2] text-[#b91c1c] text-[11px] font-bold">
              <span className="material-symbols-outlined text-sm">how_to_vote</span>
              VOTING ENGINE
            </div>

            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#191c1e] tracking-tight leading-[1.2]">
              Bukan cuma datang.{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#dc2626]">Ikut menentukan.</span>
            </h2>

            <p className="text-[16px] text-[#565e74] leading-[26px]">
              Event Creator dapat membuat voting untuk audience tertentu, termasuk voting khusus ticket holder dengan validasi token anti-bot.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-xl">check_circle</span>
                <span className="text-[14px] text-[#191c1e] font-medium">One ticket, one vote</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-xl">check_circle</span>
                <span className="text-[14px] text-[#191c1e] font-medium">Verified ticket holder</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-xl">check_circle</span>
                <span className="text-[14px] text-[#191c1e] font-medium">Single / multiple choice</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-xl">check_circle</span>
                <span className="text-[14px] text-[#191c1e] font-medium">Ranking mechanism</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-xl">check_circle</span>
                <span className="text-[14px] text-[#191c1e] font-medium">Live realtime results</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-xl">check_circle</span>
                <span className="text-[14px] text-[#191c1e] font-medium">Voting analytics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-4 shadow-2xl border-4 border-[#e2e8f0] ring-1 ring-black/5">
              {/* Phone notch */}
              <div className="w-32 h-4 bg-[#e2e8f0] rounded-full mx-auto mb-4"></div>

              <div className="bg-[#f7f9fb] p-5 rounded-2xl border border-[#e2e8f0]">
                <div className="text-center pb-3 border-b border-[#e2e8f0]">
                  <span className="text-[11px] font-bold text-[#dc2626] tracking-widest uppercase">
                    EVENT AWARDS 2026
                  </span>
                  <h4 className="text-[16px] font-bold text-[#191c1e] mt-1">
                    Siapa performer favorit kamu?
                  </h4>
                  <p className="text-[12px] text-[#565e74] mt-0.5">
                    VIP &amp; Regular Ticket Holder Voting
                  </p>
                </div>

                {/* Radio options with percentage bars */}
                <div className="space-y-3 mt-4">
                  {candidates.map((c) => {
                    const isSelected = selectedCandidate === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => !hasVoted && setSelectedCandidate(c.id)}
                        className={`p-3 bg-white rounded-xl border relative overflow-hidden transition-all ${
                          !hasVoted ? 'cursor-pointer hover:border-[#dc2626]' : ''
                        } ${
                          isSelected
                            ? 'border-[#dc2626]/70 shadow-xs ring-1 ring-[#dc2626]/20'
                            : 'border-[#e2e8f0]'
                        }`}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-[#dc2626]'
                                  : 'border-[#565e74]/40'
                              }`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
                              )}
                            </span>
                            <span
                              className={`text-[13px] font-semibold ${
                                isSelected ? 'text-[#191c1e]' : 'text-[#565e74]'
                              }`}
                            >
                              {c.name}
                            </span>
                          </div>
                          <span
                            className={`text-[12px] font-bold ${
                              isSelected ? 'text-[#dc2626]' : 'text-[#565e74]'
                            }`}
                          >
                            {c.percentage}%
                          </span>
                        </div>

                        {/* Progress Bar underlay */}
                        <div
                          className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                            isSelected ? 'bg-[#fef2f2]' : 'bg-[#eceef0]/60'
                          }`}
                          style={{ width: `${c.percentage}%` }}
                        ></div>
                      </div>
                    );
                  })}
                </div>

                {/* Verified token pill */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[#565e74] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[#006645] text-sm">
                    verified_user
                  </span>
                  <span>Tiket Terverifikasi: #TIX-8842-VJ</span>
                </div>

                {/* Submit Button & feedback */}
                {!hasVoted ? (
                  <button
                    onClick={handleSubmitVote}
                    className="w-full mt-4 py-3 rounded-xl bg-[#dc2626] text-white font-bold text-[13px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all tracking-wider cursor-pointer shadow-xs"
                  >
                    SUBMIT VOTE
                  </button>
                ) : (
                  <div className="mt-4 text-center space-y-2">
                    <div className="py-2.5 px-3 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[12px] font-semibold flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#10b981]">
                        check_circle
                      </span>
                      <span>Suara Anda Berhasil Dicatat!</span>
                    </div>
                    <button
                      onClick={handleResetVote}
                      className="text-[11px] text-[#565e74] hover:text-[#191c1e] underline cursor-pointer"
                    >
                      Uji coba suara lain (demo mode)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
