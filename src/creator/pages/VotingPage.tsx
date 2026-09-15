/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, QrCode, Link2, BarChart3, Users, Vote as VoteIcon, X } from 'lucide-react';
import { eoVotes, EOVote, EOVoteCandidate } from '../../data/creatorData';
import { Tabs, SectionCard, StatusBadge, StatPill, EmptyState } from '../components/ui';

const TABS = [
  { id: 'create', label: 'Buat Vote' },
  { id: 'manage', label: 'Kelola Vote' },
  { id: 'analytics', label: 'Analitik Vote' },
];

const RULE_LABELS: Record<EOVote['ruleType'], string> = {
  single: 'Pilih 1 (single choice)',
  'max-n': 'Maksimal N pilihan',
  'min-n': 'Minimal N pilihan',
  unlimited: 'Boleh pilih semua',
};

const ShareModal: React.FC<{ vote: EOVote; onClose: () => void }> = ({ vote, onClose }) => (
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
      <p className="text-[13px] font-semibold text-[#191c1e] mb-1">{vote.title}</p>
      <p className="text-[11.5px] text-[#94a3b8] font-mono truncate mb-4">
        yourtix.web.id/vote/{vote.id}
      </p>
      <button className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
        <Link2 size={14} />
        Salin Link
      </button>
    </div>
  </div>
);

export const VotingPage: React.FC = () => {
  const [active, setActive] = useState('create');
  const [votes, setVotes] = useState<EOVote[]>(eoVotes);
  const [sharingVote, setSharingVote] = useState<EOVote | null>(null);
  const [analyticsVoteId, setAnalyticsVoteId] = useState(eoVotes[0]?.id ?? '');

  // Create-vote form state
  const [title, setTitle] = useState('');
  const [relatedEvent, setRelatedEvent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ruleType, setRuleType] = useState<EOVote['ruleType']>('single');
  const [maxN, setMaxN] = useState(2);
  const [showPublic, setShowPublic] = useState(true);
  const [candidates, setCandidates] = useState<EOVoteCandidate[]>([
    { id: 'new1', name: '', photo: '', description: '', votes: 0 },
    { id: 'new2', name: '', photo: '', description: '', votes: 0 },
  ]);

  const addCandidate = () => {
    setCandidates((prev) => [...prev, { id: `new${prev.length + 1}`, name: '', photo: '', description: '', votes: 0 }]);
  };

  const removeCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCandidate = (id: string, field: 'name' | 'description', value: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handlePublish = () => {
    const newVote: EOVote = {
      id: `ev${votes.length + 1}`,
      title: title || 'Vote Tanpa Judul',
      relatedEvent: relatedEvent || '-',
      startDate,
      endDate,
      ruleType,
      maxN: ruleType === 'max-n' ? maxN : undefined,
      minN: ruleType === 'min-n' ? maxN : undefined,
      showResultsPublicly: showPublic,
      status: 'draf',
      candidates: candidates.filter((c) => c.name.trim()),
    };
    setVotes((prev) => [newVote, ...prev]);
    setTitle('');
    setRelatedEvent('');
    setStartDate('');
    setEndDate('');
    setCandidates([
      { id: 'new1', name: '', photo: '', description: '', votes: 0 },
      { id: 'new2', name: '', photo: '', description: '', votes: 0 },
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

  const analyticsVote = votes.find((v) => v.id === analyticsVoteId);
  const analyticsTotal = analyticsVote?.candidates.reduce((s, c) => s + c.votes, 0) ?? 0;

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'create' && (
        <SectionCard
          title="Buat Vote Baru"
          description="Bikin sesi polling interaktif untuk audiens — misalnya vote penampil favorit."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Judul Vote</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                placeholder="cth. Penampil Penutup Festival"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Event Terkait</label>
              <input
                value={relatedEvent}
                onChange={(e) => setRelatedEvent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                placeholder="Pilih event Anda"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Tanggal Mulai</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Tanggal Berakhir</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
              />
            </div>
          </div>

          {/* Rule type */}
          <div className="mb-5">
            <label className="text-[12px] font-semibold text-[#191c1e] mb-2 block">Aturan Pemilihan</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(RULE_LABELS) as EOVote['ruleType'][]).map((rule) => (
                <button
                  key={rule}
                  onClick={() => setRuleType(rule)}
                  className={`px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border transition-colors cursor-pointer ${
                    ruleType === rule
                      ? 'bg-[#fef2f2] border-[#dc2626] text-[#dc2626]'
                      : 'border-[#e2e8f0] text-[#565e74] hover:border-[#dc2626]'
                  }`}
                >
                  {RULE_LABELS[rule]}
                </button>
              ))}
            </div>
            {(ruleType === 'max-n' || ruleType === 'min-n') && (
              <div className="mt-2.5 max-w-[160px]">
                <input
                  type="number"
                  min={1}
                  value={maxN}
                  onChange={(e) => setMaxN(Number(e.target.value) || 1)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]"
                  placeholder="Nilai N"
                />
              </div>
            )}
          </div>

          {/* Candidates */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[12px] font-semibold text-[#191c1e]">Kandidat</label>
              <button
                onClick={addCandidate}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer"
              >
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
                  <input
                    value={c.name}
                    onChange={(e) => updateCandidate(c.id, 'name', e.target.value)}
                    placeholder="Nama kandidat"
                    className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]"
                  />
                  <input
                    value={c.description}
                    onChange={(e) => updateCandidate(c.id, 'description', e.target.value)}
                    placeholder="Deskripsi singkat"
                    className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]"
                  />
                  <button
                    onClick={() => removeCandidate(c.id)}
                    className="text-[#94a3b8] hover:text-[#b3220f] shrink-0 cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 mb-5 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={showPublic}
              onChange={(e) => setShowPublic(e.target.checked)}
              className="w-4 h-4 accent-[#dc2626]"
            />
            <span className="text-[13px] font-medium text-[#191c1e]">Tampilkan hasil ke publik</span>
          </label>

          <button
            onClick={handlePublish}
            className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Simpan sebagai Draf
          </button>
        </SectionCard>
      )}

      {active === 'manage' && (
        <SectionCard title="Kelola Vote" description="Pantau dan kontrol seluruh sesi vote Anda.">
          {votes.length === 0 ? (
            <EmptyState message="Belum ada vote yang dibuat." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {votes.map((v) => (
                <div key={v.id} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h3 className="text-[13.5px] font-bold text-[#191c1e] leading-snug flex-1">{v.title}</h3>
                    <StatusBadge status={v.status} />
                  </div>

                  <div className="flex -space-x-2 mb-2.5">
                    {v.candidates.slice(0, 4).map((c) =>
                      c.photo ? (
                        <img key={c.id} src={c.photo} alt={c.name} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                      ) : (
                        <span key={c.id} className="w-7 h-7 rounded-full border-2 border-white bg-[#f1f5f9]" />
                      )
                    )}
                  </div>

                  <p className="text-[11.5px] text-[#94a3b8] mb-3">
                    {v.candidates.reduce((s, c) => s + c.votes, 0).toLocaleString('id-ID')} suara masuk • {v.relatedEvent}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSharingVote(v)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
                    >
                      <QrCode size={13} />
                      QR & Link
                    </button>
                    <button
                      onClick={() => toggleStatus(v.id)}
                      className="ml-auto text-[12px] font-bold text-[#dc2626] hover:underline cursor-pointer"
                    >
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
        <SectionCard title="Analitik Vote" description="Pantau tren suara secara real-time tanpa menunggu vote ditutup.">
          <div className="mb-4">
            <select
              value={analyticsVoteId}
              onChange={(e) => setAnalyticsVoteId(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] font-semibold"
            >
              {votes.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>

          {analyticsVote && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <StatPill label="Total Suara" value={analyticsTotal.toLocaleString('id-ID')} icon={<VoteIcon size={15} />} />
                <StatPill label="Jumlah Kandidat" value={analyticsVote.candidates.length} icon={<Users size={15} />} />
                <StatPill
                  label="Status"
                  value={analyticsVote.status === 'aktif' ? 'Aktif' : analyticsVote.status === 'draf' ? 'Draf' : 'Selesai'}
                  icon={<BarChart3 size={15} />}
                />
              </div>

              <div className="space-y-3">
                {analyticsVote.candidates
                  .slice()
                  .sort((a, b) => b.votes - a.votes)
                  .map((c) => {
                    const pct = analyticsTotal > 0 ? Math.round((c.votes / analyticsTotal) * 100) : 0;
                    return (
                      <div key={c.id} className="flex items-center gap-3">
                        {c.photo ? (
                          <img src={c.photo} alt={c.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                        ) : (
                          <span className="w-9 h-9 rounded-full bg-[#f1f5f9] shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[13px] mb-1">
                            <span className="font-semibold text-[#191c1e] truncate">{c.name}</span>
                            <span className="font-bold text-[#dc2626] shrink-0 ml-2">
                              {c.votes.toLocaleString('id-ID')} ({pct}%)
                            </span>
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
        </SectionCard>
      )}

      {sharingVote && <ShareModal vote={sharingVote} onClose={() => setSharingVote(null)} />}
    </div>
  );
};
