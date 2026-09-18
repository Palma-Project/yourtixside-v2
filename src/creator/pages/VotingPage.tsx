/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, QrCode, Link2, BarChart3, Users, Vote as VoteIcon, X } from 'lucide-react';
import { useAppStore } from '../../store/AppStore';
import { Poll, Candidate, SelectionType } from '../../data/polls';
import { EOAccount } from '../../store/AppStore';
import { Tabs, SectionCard, StatusBadge, StatPill, EmptyState } from '../components/ui';

const TABS = [
  { id: 'create', label: 'Buat Vote' },
  { id: 'manage', label: 'Kelola Vote' },
  { id: 'analytics', label: 'Analitik Vote' },
];

const RULE_LABELS: Record<SelectionType, string> = {
  single: 'Pilih 1 (single choice)',
  multi: 'Boleh pilih banyak (max N)',
};

const ShareModal: React.FC<{ vote: Poll; onClose: () => void }> = ({ vote, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-center">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-bold text-[#191c1e]">Bagikan Vote</h3>
        <button onClick={onClose} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
          <X size={18} />
        </button>
      </div>
      <div className="w-40 h-40 mx-auto bg-[#f1f5f9] rounded-xl flex items-center justify-center mb-3.5">
        <QrCode size={72} className="text-[#191c1e]" />
      </div>
      <p className="text-[13px] font-semibold text-[#191c1e] mb-1">{vote.question}</p>
      <p className="text-[11.5px] text-[#94a3b8] font-mono truncate mb-4">yourtix.web.id/vote/{vote.id}</p>
      <button className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
        <Link2 size={14} />
        Salin Link
      </button>
    </div>
  </div>
);

interface VotingPageProps {
  account: EOAccount;
}

export const VotingPage: React.FC<VotingPageProps> = ({ account }) => {
  const { votes, setVotes } = useAppStore();
  const [active, setActive] = useState('create');
  const [sharingVote, setSharingVote] = useState<Poll | null>(null);
  const [analyticsVoteId, setAnalyticsVoteId] = useState('');

  const myVotes = votes.filter((v) => v.eoId === account.id);

  // Create-vote form state
  const [title, setTitle] = useState('');
  const [relatedEvent, setRelatedEvent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ruleType, setRuleType] = useState<SelectionType>('single');
  const [maxN, setMaxN] = useState(2);
  const [showPublic, setShowPublic] = useState(true);
  const [candidates, setCandidates] = useState<{ id: string; name: string; description: string }[]>([
    { id: 'new1', name: '', description: '' },
    { id: 'new2', name: '', description: '' },
  ]);

  const addCandidate = () => {
    setCandidates((prev) => [...prev, { id: `new${prev.length + 1}`, name: '', description: '' }]);
  };
  const removeCandidate = (id: string) => setCandidates((prev) => prev.filter((c) => c.id !== id));
  const updateCandidate = (id: string, field: 'name' | 'description', value: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handlePublish = () => {
    const finalCandidates: Candidate[] = candidates
      .filter((c) => c.name.trim())
      .map((c, i) => ({
        id: `${Date.now()}-${i}`,
        number: String(i + 1).padStart(2, '0'),
        name: c.name,
        photo: `https://images.unsplash.com/photo-${1500000000000 + i}?w=400&q=80`,
        summary: c.description,
        category: 'all',
        votes: 0,
      }));

    const newVote: Poll = {
      id: `eov${Date.now()}`,
      eoId: account.id,
      eoName: account.orgName,
      status: 'draf',
      votedEmails: [],
      question: title || 'Vote Tanpa Judul',
      headlineLead: title,
      headlineAccent: '',
      headlineTail: '',
      description: `Vote dari ${account.orgName} untuk ${relatedEvent || 'event terkait'}.`,
      eyebrow: `Vote resmi dari ${account.orgName}`,
      periodLabel: 'Periode voting dibuka',
      closesLabel: endDate || '-',
      finalistCount: finalCandidates.length,
      ratioLabel: '1 Akun = 1 Suara Sah',
      coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
      categoryLabel: relatedEvent || 'Komunitas',
      organizer: account.orgName,
      organizerVerified: account.verificationStatus === 'verified',
      seriesLabel: 'EO Submission',
      closesInLabel: endDate || '-',
      statusBadge: 'Baru',
      accessLabel: 'AKSES VOTE',
      accessValue: 'Gratis via Google',
      categoryCountLabel: `${finalCandidates.length} Kandidat`,
      selectionType: ruleType,
      minSelect: 1,
      maxSelect: ruleType === 'multi' ? maxN : 1,
      categories: [{ id: 'all', label: 'Semua Kandidat' }],
      ticker: [],
      candidates: finalCandidates,
    };

    setVotes((prev) => [newVote, ...prev]);
    setTitle('');
    setRelatedEvent('');
    setStartDate('');
    setEndDate('');
    setCandidates([
      { id: 'new1', name: '', description: '' },
      { id: 'new2', name: '', description: '' },
    ]);
    setActive('manage');
  };

  const toggleStatus = (id: string) => {
    setVotes((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, status: v.status === 'aktif' ? 'selesai' : v.status === 'draf' ? 'aktif' : 'aktif' } : v
      )
    );
  };

  const analyticsVote = myVotes.find((v) => v.id === analyticsVoteId) ?? myVotes[0];
  const analyticsTotal = analyticsVote?.candidates.reduce((s, c) => s + c.votes, 0) ?? 0;

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'create' && (
        <SectionCard title="Buat Vote Baru" description="Vote ini akan muncul di Landing Page begitu di-publish.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Judul Vote</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="cth. Penampil Penutup Festival" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Event Terkait</label>
              <input value={relatedEvent} onChange={(e) => setRelatedEvent(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="Pilih event Anda" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Tanggal Mulai</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Tanggal Berakhir</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[12px] font-semibold text-[#191c1e] mb-2 block">Aturan Pemilihan</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(RULE_LABELS) as SelectionType[]).map((rule) => (
                <button key={rule} onClick={() => setRuleType(rule)} className={`px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border transition-colors cursor-pointer ${ruleType === rule ? 'bg-[#fef2f2] border-[#dc2626] text-[#dc2626]' : 'border-[#e2e8f0] text-[#565e74] hover:border-[#dc2626]'}`}>
                  {RULE_LABELS[rule]}
                </button>
              ))}
            </div>
            {ruleType === 'multi' && (
              <div className="mt-2.5 max-w-[160px]">
                <input type="number" min={1} value={maxN} onChange={(e) => setMaxN(Number(e.target.value) || 1)} className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]" placeholder="Maks pilihan" />
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[12px] font-semibold text-[#191c1e]">Kandidat</label>
              <button onClick={addCandidate} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer">
                <Plus size={13} />
                Tambah Kandidat
              </button>
            </div>
            <div className="space-y-2.5">
              {candidates.map((c) => (
                <div key={c.id} className="flex items-center gap-2.5 rounded-xl border border-[#e2e8f0] p-3">
                  <span className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0 text-[#94a3b8]">
                    <VoteIcon size={15} />
                  </span>
                  <input value={c.name} onChange={(e) => updateCandidate(c.id, 'name', e.target.value)} placeholder="Nama kandidat" className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]" />
                  <input value={c.description} onChange={(e) => updateCandidate(c.id, 'description', e.target.value)} placeholder="Deskripsi singkat" className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]" />
                  <button onClick={() => removeCandidate(c.id)} className="text-[#94a3b8] hover:text-[#b3220f] shrink-0 cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 mb-5 cursor-pointer w-fit">
            <input type="checkbox" checked={showPublic} onChange={(e) => setShowPublic(e.target.checked)} className="w-4 h-4 accent-[#dc2626]" />
            <span className="text-[13px] font-medium text-[#191c1e]">Tampilkan hasil ke publik</span>
          </label>

          <button onClick={handlePublish} className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
            <Plus size={16} />
            Simpan sebagai Draf
          </button>
        </SectionCard>
      )}

      {active === 'manage' && (
        <SectionCard title="Kelola Vote" description="Pantau dan kontrol seluruh sesi vote Anda.">
          {myVotes.length === 0 ? (
            <EmptyState message="Belum ada vote yang dibuat." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {myVotes.map((v) => (
                <div key={v.id} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h3 className="text-[13.5px] font-bold text-[#191c1e] leading-snug flex-1">{v.question}</h3>
                    <StatusBadge status={v.status || 'draf'} />
                  </div>
                  <div className="flex -space-x-2 mb-2.5">
                    {v.candidates.slice(0, 4).map((c) => (
                      <img key={c.id} src={c.photo} alt={c.name} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <p className="text-[11.5px] text-[#94a3b8] mb-3">
                    {v.candidates.reduce((s, c) => s + c.votes, 0).toLocaleString('id-ID')} suara masuk
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSharingVote(v)} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer">
                      <QrCode size={13} />
                      QR & Link
                    </button>
                    <button onClick={() => toggleStatus(v.id)} className="ml-auto text-[12px] font-bold text-[#dc2626] hover:underline cursor-pointer">
                      {v.status === 'draf' ? 'Publish' : v.status === 'aktif' ? 'Tutup Vote' : 'Buka Lagi'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {active === 'analytics' && (
        <SectionCard title="Analitik Vote" description="Pantau tren suara secara real-time.">
          {myVotes.length === 0 ? (
            <EmptyState message="Belum ada vote untuk dianalisis." />
          ) : (
            <>
              <div className="mb-4">
                <select value={analyticsVote?.id ?? ''} onChange={(e) => setAnalyticsVoteId(e.target.value)} className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] font-semibold">
                  {myVotes.map((v) => (
                    <option key={v.id} value={v.id}>{v.question}</option>
                  ))}
                </select>
              </div>
              {analyticsVote && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    <StatPill label="Total Suara" value={analyticsTotal.toLocaleString('id-ID')} icon={<VoteIcon size={15} />} />
                    <StatPill label="Jumlah Kandidat" value={analyticsVote.candidates.length} icon={<Users size={15} />} />
                    <StatPill label="Status" value={analyticsVote.status === 'aktif' ? 'Aktif' : analyticsVote.status === 'draf' ? 'Draf' : 'Selesai'} icon={<BarChart3 size={15} />} />
                  </div>
                  <div className="space-y-3">
                    {analyticsVote.candidates.slice().sort((a, b) => b.votes - a.votes).map((c) => {
                      const pct = analyticsTotal > 0 ? Math.round((c.votes / analyticsTotal) * 100) : 0;
                      return (
                        <div key={c.id} className="flex items-center gap-3">
                          <img src={c.photo} alt={c.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-[13px] mb-1">
                              <span className="font-semibold text-[#191c1e] truncate">{c.name}</span>
                              <span className="font-bold text-[#dc2626] shrink-0 ml-2">{c.votes.toLocaleString('id-ID')} ({pct}%)</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#f1f0f7] overflow-hidden">
                              <div className="h-full rounded-full bg-[#dc2626]" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </SectionCard>
      )}

      {sharingVote && <ShareModal vote={sharingVote} onClose={() => setSharingVote(null)} />}
    </div>
  );
};
