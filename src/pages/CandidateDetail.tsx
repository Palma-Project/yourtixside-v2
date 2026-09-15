/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ShieldCheck,
  Lock,
  Play,
  Flag,
  TrendingUp,
  Instagram,
  Video,
  FileText,
  CheckCircle2,
  AlertCircle,
  Radio,
} from 'lucide-react';
import { Poll, Candidate } from '../data/polls';
import { hasVoted, recordVote, getVoteDeltas } from '../lib/voteStorage';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { useLanguage } from '../i18n/LanguageContext';

interface CandidateDetailProps {
  poll: Poll;
  candidate: Candidate;
  onBack: () => void;
  onOpenCandidate: (pollId: string, candidateId: string) => void;
  onBackHome: () => void;
}

export const CandidateDetail: React.FC<CandidateDetailProps> = ({
  poll,
  candidate,
  onBack,
  onOpenCandidate,
  onBackHome,
}) => {
  const { t, lang } = useLanguage();
  const locale = lang === 'id' ? 'id-ID' : 'en-US';

  const [openProgram, setOpenProgram] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [rejected, setRejected] = useState<string | null>(null);
  const { user, configured, renderButtonInto } = useGoogleAuth();

  const deltas = useMemo(() => getVoteDeltas(poll.id), [poll.id, submitted]);
  const withVotes = poll.candidates.map((c) => ({ ...c, votes: c.votes + (deltas[c.id] || 0) }));
  const total = withVotes.reduce((sum, c) => sum + c.votes, 0);
  const current = withVotes.find((c) => c.id === candidate.id)!;
  const percent = total > 0 ? ((current.votes / total) * 100).toFixed(1) : '0.0';
  const rank = [...withVotes].sort((a, b) => b.votes - a.votes).findIndex((c) => c.id === candidate.id) + 1;
  const others = withVotes.filter((c) => c.id !== candidate.id).slice(0, 3);

  // Once signed in, check whether this account has already voted in this poll
  useEffect(() => {
    if (!user) return;
    const existing = hasVoted(poll.id, user.email);
    if (existing) {
      setRejected(
        existing.candidateIds.includes(candidate.id)
          ? t.candidate.alreadyVotedThis
          : t.candidate.alreadyVotedOther
      );
    } else {
      setRejected(null);
    }
  }, [user, poll.id, candidate.id, t]);

  const handleSubmit = () => {
    if (!user) return;
    const existing = hasVoted(poll.id, user.email);
    if (existing) {
      setRejected(
        existing.candidateIds.includes(candidate.id)
          ? t.candidate.alreadyVotedThis
          : t.candidate.alreadyVotedOther
      );
      return;
    }
    recordVote(poll.id, user.email, [candidate.id]);
    setSubmitted(true);
  };

  const canSubmit = !!user && !rejected && !submitted;

  return (
    <div className="bg-white">
      {/* Top bar */}
      <div className="border-b border-[#f1f0f7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 text-[12px]">
          <button onClick={onBackHome} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
            {t.candidate.home}
          </button>
          <ChevronRight size={13} className="text-[#cbd5e1]" />
          <button onClick={onBack} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
            {t.candidate.candidates}
          </button>
          <ChevronRight size={13} className="text-[#cbd5e1]" />
          <span className="font-semibold text-[#191c1e] truncate">
            {candidate.number} {candidate.name}
            {candidate.partnerName ? ` & ${candidate.partnerName.split(' ')[0]}` : ''}
          </span>

          <span
            className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold shrink-0 ${
              submitted
                ? 'bg-[#ecfdf5] text-[#059669]'
                : user
                ? 'bg-[#eff6ff] text-[#1d4ed8]'
                : 'bg-[#fef2f2] text-[#b3220f]'
            }`}
          >
            {submitted ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
            {submitted
              ? t.candidate.statusVoted
              : user
              ? `${t.candidate.statusSignedIn}: ${user.email}`
              : t.candidate.statusNotSignedIn}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============ LEFT COLUMN ============ */}
        <div className="lg:col-span-4 space-y-5">
          {/* Photo card */}
          <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-[#fef2f2] text-[#b3220f] text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                {t.candidate.numberPrefix} {candidate.number}
              </span>
              {candidate.badge && (
                <span className="bg-[#fff5ed] text-[#c2410c] text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {candidate.badge}
                </span>
              )}
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-[#191c1e]">
              <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 bg-[#10b981] text-white text-[10px] font-bold px-2 py-1 rounded-md mb-2">
                  <CheckCircle2 size={11} />
                  {candidate.tagline.toUpperCase()}
                </span>
                <div className="text-white text-[19px] font-extrabold tracking-tight drop-shadow leading-tight">
                  {candidate.name}
                  {candidate.partnerName && ` & ${candidate.partnerName.split(' ')[0]}`}
                </div>
                <div className="text-white/80 text-[12px] mt-0.5 drop-shadow">
                  {t.candidate.candidateOf} {candidate.field} {poll.question.split(' ').pop()}
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#fbfaff] border border-[#ece9f5] px-3.5 py-3">
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-bold text-[#191c1e] truncate">
                  {t.candidate.verifiedBy}
                </div>
                <div className="text-[11px] text-[#94a3b8] truncate">{candidate.verifiedNote}</div>
              </div>
              <span className="bg-[#ecfdf5] text-[#059669] text-[11px] font-bold px-2.5 py-1 rounded-md shrink-0">
                {t.candidate.valid}
              </span>
            </div>

            {/* Official channels */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-[#94a3b8]">{t.candidate.officialChannels}</span>
              <div className="flex items-center gap-1.5">
                {[Instagram, Video, FileText].map((Icon, i) => (
                  <span
                    key={i}
                    className="w-7 h-7 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center"
                  >
                    <Icon size={13} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Video card */}
          {candidate.videoThumb && (
            <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-bold text-[#191c1e]">{t.candidate.campaignVideo}</span>
                <span className="text-[11px] font-semibold text-[#dc2626]">
                  {candidate.videoDuration}
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-video bg-[#191c1e] group cursor-pointer">
                <img
                  src={candidate.videoThumb}
                  alt={candidate.videoTitle}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={20} fill="currentColor" />
                  </span>
                </div>
                <span className="absolute bottom-2.5 left-3 text-white text-[11px] font-semibold drop-shadow">
                  &ldquo;{candidate.videoTitle}&rdquo;
                </span>
                <span className="absolute bottom-2.5 right-3 text-white/80 text-[10px] font-semibold drop-shadow">
                  HD 1080P
                </span>
              </div>
              <p className="text-[12px] leading-[19px] text-[#565e74] mt-3">{candidate.videoCaption}</p>
            </div>
          )}
        </div>

        {/* ============ RIGHT COLUMN ============ */}
        <div className="lg:col-span-8 space-y-5">
          {/* Header + standings */}
          <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm p-5">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[12px] mb-1.5">
                  <span className="bg-[#f5f3ff] text-[#5b21b6] font-semibold px-2 py-0.5 rounded-md">
                    {t.candidate.finalistPrefix} {candidate.number}
                  </span>
                  <span className="text-[#94a3b8]">• {candidate.field}</span>
                </div>
                <h1 className="text-[28px] sm:text-[32px] font-extrabold text-[#191c1e] tracking-tight leading-tight">
                  {candidate.name}
                </h1>
                {candidate.partnerName && (
                  <p className="text-[14px] text-[#565e74] mt-1">
                    {t.candidate.partner}: {candidate.partnerName}
                  </p>
                )}
                <p className="text-[12px] text-[#94a3b8] mt-1">{candidate.region}</p>
              </div>

              <div className="bg-[#fef2f2] rounded-xl px-5 py-3.5 text-center shrink-0">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#b3220f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                  {t.candidate.standing} #{rank}
                </div>
                <div className="text-[28px] font-extrabold text-[#dc2626] leading-none mt-1.5">
                  {current.votes.toLocaleString(locale)}
                </div>
                <div className="text-[11px] text-[#94a3b8] mt-1">
                  {percent}% {t.candidate.ofValidVotes}
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5 pt-5 border-t border-[#f1f0f7]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <span className="text-[13px] font-bold text-[#191c1e]">
                  {t.candidate.realtimeProgress}
                </span>
                <span className="text-[13px] font-bold text-[#dc2626]">
                  {current.votes.toLocaleString(locale)} / {total.toLocaleString(locale)}{' '}
                  {t.candidate.votesIn}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#fde8e8] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#dc2626] transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-[11px]">
                <span className="text-[#94a3b8]">{t.candidate.threshold}: 33.3%</span>
                {candidate.trendLabel && (
                  <span className="inline-flex items-center gap-1 text-[#059669] font-semibold">
                    <TrendingUp size={12} />
                    {candidate.trendLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <div className="rounded-xl border border-[#ece9f5] bg-[#fbfaff] p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[12px] font-bold text-[#191c1e]">{t.candidate.ageGroup}</span>
                  <span className="text-[11px] font-semibold text-[#dc2626]">{t.candidate.ratio}</span>
                </div>
                <div className="space-y-2">
                  {candidate.ageStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[#565e74] truncate">{stat.label}</span>
                        <span className="font-bold text-[#191c1e] shrink-0 ml-2">{stat.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#f1f0f7] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#dc2626]"
                          style={{ width: `${stat.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#ece9f5] bg-[#fbfaff] p-3.5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[12px] font-bold text-[#191c1e]">{t.candidate.regionBase}</span>
                  <span className="text-[11px] font-semibold text-[#dc2626]">Top 3</span>
                </div>
                <ol className="space-y-1.5">
                  {candidate.regionStats.map((stat, i) => (
                    <li key={stat.region} className="flex items-center justify-between text-[12px]">
                      <span className="text-[#565e74] truncate">
                        {i + 1}. {stat.region}
                      </span>
                      <span className="font-semibold text-[#191c1e] shrink-0 ml-2">
                        {stat.votes.toLocaleString(locale)} {t.candidate.votesShort}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Vision & programs */}
          <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="inline-flex items-center gap-2 text-[16px] font-bold text-[#191c1e]">
                <Flag size={16} className="text-[#dc2626]" />
                {t.candidate.visionTitle}
              </h2>
              <span className="text-[11px] text-[#94a3b8]">{t.candidate.draftLabel}</span>
            </div>

            <div className="rounded-xl border border-[#f3d5d5] bg-[#fff8f8] p-4 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-wide text-[#b3220f] mb-2">
                {t.candidate.visionPrefix} {candidate.number}
              </div>
              <p className="text-[14px] leading-[23px] text-[#191c1e] italic font-medium">
                &ldquo;{candidate.vision}&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              {candidate.programs.map((program, i) => (
                <div key={i} className="rounded-xl border border-[#ece9f5] overflow-hidden">
                  <button
                    onClick={() => setOpenProgram(openProgram === i ? null : i)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#fbfaff] transition-colors cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#fef2f2] text-[#dc2626] text-[11px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-semibold text-[#191c1e] flex-1 min-w-0">
                      {program.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#94a3b8] shrink-0 transition-transform duration-200 ${
                        openProgram === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openProgram === i && (
                    <div className="px-4 pb-4 pl-13 animate-in fade-in slide-in-from-top-1 duration-200">
                      <p className="text-[13px] leading-[21px] text-[#565e74]">{program.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ===== VOTING BOOTH ===== */}
          <div className="rounded-2xl border-2 border-[#f3d5d5] bg-[#fff8f8] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[11px] font-bold px-3 py-1.5 rounded-md">
                <ShieldCheck size={13} />
                {t.candidate.boothBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-[#f3d5d5] text-[#b3220f] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                <Radio size={11} className="animate-pulse" />
                {t.candidate.liveServer}
              </span>
            </div>

            <h2 className="text-[19px] font-extrabold text-[#191c1e] tracking-tight mb-4">
              {t.candidate.boothTitle.replace('{number}', candidate.number)}
            </h2>

            {/* Rules */}
            <div className="rounded-xl bg-white border border-[#f3d5d5] p-4 mb-4 flex gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                <ShieldCheck size={15} />
              </span>
              <div>
                <div className="text-[12px] font-bold text-[#191c1e] mb-1">{t.candidate.rulesTitle}</div>
                <p className="text-[12px] leading-[19px] text-[#565e74]">{t.candidate.rulesBody}</p>
              </div>
            </div>

            {/* Auth / submit states */}
            {submitted ? (
              <div className="rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] p-4 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#059669] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-[#065f46]">{t.candidate.successTitle}</div>
                  <p className="text-[12px] text-[#047857] mt-0.5">
                    {t.candidate.successBody.replace('{name}', candidate.name)}
                  </p>
                </div>
              </div>
            ) : rejected ? (
              <div className="rounded-xl bg-[#fffbeb] border border-[#fde68a] p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-[#d97706] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[13px] font-bold text-[#92400e]">{t.candidate.rejectedTitle}</div>
                  <p className="text-[12px] text-[#b45309] mt-0.5">{rejected}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-xl bg-white border border-[#ece9f5] p-4 mb-3">
                  <p className="text-[12px] text-[#565e74] mb-3">
                    {user ? t.candidate.signedInAs.replace('{email}', user.email) : t.candidate.signInPrompt}
                  </p>
                  {!user && (
                    <>
                      <div ref={renderButtonInto} className="flex justify-center min-h-[44px]" />
                      {!configured && (
                        <p className="text-[11px] text-[#b45309] text-center mt-2">
                          {t.candidate.missingClientId}
                        </p>
                      )}
                    </>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`w-full inline-flex items-center justify-center gap-2 text-[14px] font-bold py-3.5 rounded-xl transition-all ${
                    canSubmit
                      ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c] active:scale-[0.99] cursor-pointer shadow-sm'
                      : 'bg-[#e8e6f0] text-[#94a3b8] cursor-not-allowed'
                  }`}
                >
                  {!canSubmit && <Lock size={15} />}
                  {canSubmit
                    ? t.candidate.submitVote.replace('{name}', candidate.name)
                    : t.candidate.submitLocked.replace('{name}', candidate.name)}
                </button>
              </>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-[#f3d5d5]">
              {t.candidate.trustBadges.map((badge, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-[#565e74]">
                  <ShieldCheck size={12} className="text-[#dc2626]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Other finalists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="border-t border-[#f1f0f7] pt-8">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
                {t.candidate.othersEyebrow}
              </span>
              <h2 className="text-[22px] font-extrabold text-[#191c1e] tracking-tight mt-1.5">
                {t.candidate.othersTitle}
              </h2>
              <p className="text-[13px] text-[#565e74] mt-1">{t.candidate.othersSubtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full border border-[#ece9f5] flex items-center justify-center text-[#94a3b8]">
                <ChevronLeft size={16} />
              </span>
              <span className="w-9 h-9 rounded-full border border-[#ece9f5] flex items-center justify-center text-[#94a3b8]">
                <ChevronRight size={16} />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((other) => {
              const otherPercent = total > 0 ? ((other.votes / total) * 100).toFixed(1) : '0.0';
              return (
                <div
                  key={other.id}
                  className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm hover:shadow-md transition-shadow p-3"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#191c1e]">
                    <img src={other.photo} alt={other.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#191c1e] text-[10px] font-bold px-2 py-1 rounded-md">
                      {t.candidate.finalistPrefix} {other.number}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 text-white text-[11px] font-bold drop-shadow">
                      {otherPercent}% {t.candidate.votesShort}
                    </span>
                  </div>

                  <div className="px-1 pt-3">
                    <h3 className="text-[15px] font-bold text-[#191c1e] truncate">{other.name}</h3>
                    <p className="text-[12px] text-[#94a3b8] truncate mt-0.5">
                      {other.region} • {other.field}
                    </p>
                    <div className="w-full h-1 rounded-full bg-[#f1f0f7] overflow-hidden my-3">
                      <div
                        className="h-full rounded-full bg-[#dc2626]"
                        style={{ width: `${otherPercent}%` }}
                      />
                    </div>
                    <button
                      onClick={() => onOpenCandidate(poll.id, other.id)}
                      className="w-full inline-flex items-center justify-center gap-2 border border-[#ece9f5] text-[#dc2626] text-[13px] font-bold py-2.5 rounded-full hover:bg-[#fef2f2] hover:border-[#f3d5d5] transition-colors cursor-pointer"
                    >
                      {t.candidate.openProfile}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
