/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  QrCode,
  Link2,
  Download,
  X,
  Type,
  AlignLeft,
  ChevronDown,
  CheckSquare,
  Circle,
  Upload,
  Calendar,
  Hash,
  Mail,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { eoForms, EOForm, EOFormField } from '../../data/creatorData';
import { Tabs, SectionCard, StatusBadge, EmptyState } from '../components/ui';

const TABS = [
  { id: 'builder', label: 'Buat Form' },
  { id: 'manage', label: 'Kelola Form' },
  { id: 'submissions', label: 'Data Masuk' },
];

const TEMPLATES: EOForm['template'][] = ['Volunteer', 'Tenant/Bazaar', 'Media Partner', 'Kosong'];

const FIELD_TYPES: { type: EOFormField['type']; label: string; icon: React.ElementType }[] = [
  { type: 'text', label: 'Teks Singkat', icon: Type },
  { type: 'textarea', label: 'Teks Panjang', icon: AlignLeft },
  { type: 'dropdown', label: 'Dropdown', icon: ChevronDown },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { type: 'radio', label: 'Radio', icon: Circle },
  { type: 'upload', label: 'Unggah File', icon: Upload },
  { type: 'date', label: 'Tanggal', icon: Calendar },
  { type: 'number', label: 'Angka', icon: Hash },
  { type: 'email', label: 'Email', icon: Mail },
];

const ShareModal: React.FC<{ form: EOForm; onClose: () => void }> = ({ form, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-center">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-bold text-[#191c1e]">Link Form</h3>
        <button onClick={onClose} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
          <X size={18} />
        </button>
      </div>
      <div className="w-40 h-40 mx-auto bg-[#f1f5f9] rounded-xl flex items-center justify-center mb-3.5">
        <QrCode size={72} className="text-[#191c1e]" />
      </div>
      <p className="text-[13px] font-semibold text-[#191c1e] mb-1">{form.title}</p>
      <p className="text-[11.5px] text-[#94a3b8] font-mono truncate mb-1.5">
        yourtix.web.id/form/{form.id}
      </p>
      <p className="text-[11px] text-[#94a3b8] mb-4">Bisa diakses publik tanpa perlu login.</p>
      <button className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
        <Link2 size={14} />
        Salin Link
      </button>
    </div>
  </div>
);

export const FormsPage: React.FC = () => {
  const [active, setActive] = useState('builder');
  const [forms, setForms] = useState<EOForm[]>(eoForms);
  const [sharingForm, setSharingForm] = useState<EOForm | null>(null);
  const [submissionsFormId, setSubmissionsFormId] = useState(eoForms[0]?.id ?? '');

  const [template, setTemplate] = useState<EOForm['template']>('Volunteer');
  const [formTitle, setFormTitle] = useState('');
  const [quota, setQuota] = useState<number | ''>('');
  const [fields, setFields] = useState<EOFormField[]>([
    { id: 'nf1', label: 'Nama Lengkap', type: 'text', required: true },
    { id: 'nf2', label: 'Email', type: 'email', required: true },
  ]);

  const addField = (type: EOFormField['type']) => {
    setFields((prev) => [...prev, { id: `nf${prev.length + 1}`, label: '', type, required: false }]);
  };

  const updateFieldLabel = (id: string, label: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, label } : f)));
  };

  const toggleRequired = (id: string) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, required: !f.required } : f)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleCreate = () => {
    if (!formTitle.trim()) return;
    const newForm: EOForm = {
      id: `f${forms.length + 1}`,
      title: formTitle,
      template,
      status: 'aktif',
      quota: quota === '' ? undefined : quota,
      openDate: new Date().toISOString().slice(0, 10),
      closeDate: '',
      fields: fields.filter((f) => f.label.trim()),
      submissions: [],
    };
    setForms((prev) => [newForm, ...prev]);
    setFormTitle('');
    setQuota('');
    setFields([
      { id: 'nf1', label: 'Nama Lengkap', type: 'text', required: true },
      { id: 'nf2', label: 'Email', type: 'email', required: true },
    ]);
    setActive('manage');
  };

  const toggleFormStatus = (id: string) => {
    setForms((prev) => prev.map((f) => (f.id === id ? { ...f, status: f.status === 'aktif' ? 'tutup' : 'aktif' } : f)));
  };

  const setSubmissionStatus = (formId: string, subId: string, status: 'approved' | 'rejected') => {
    setForms((prev) =>
      prev.map((f) =>
        f.id === formId
          ? { ...f, submissions: f.submissions.map((s) => (s.id === subId ? { ...s, status } : s)) }
          : f
      )
    );
  };

  const submissionsForm = forms.find((f) => f.id === submissionsFormId);

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'builder' && (
        <SectionCard title="Buat Form" description="Form builder untuk kumpulkan data eksternal — tanpa perlu login.">
          <div className="mb-4">
            <label className="text-[12px] font-semibold text-[#191c1e] mb-2 block">Pilih Template</label>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => setTemplate(tpl)}
                  className={`px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border transition-colors cursor-pointer ${
                    template === tpl
                      ? 'bg-[#fef2f2] border-[#dc2626] text-[#dc2626]'
                      : 'border-[#e2e8f0] text-[#565e74] hover:border-[#dc2626]'
                  }`}
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Judul Form</label>
              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                placeholder="cth. Pendaftaran Volunteer"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Kuota Submission (opsional)</label>
              <input
                type="number"
                value={quota}
                onChange={(e) => setQuota(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                placeholder="Tanpa batas jika dikosongkan"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[12px] font-semibold text-[#191c1e] mb-2 block">Tambah Field</label>
            <div className="flex flex-wrap gap-2 mb-3.5">
              {FIELD_TYPES.map((ft) => (
                <button
                  key={ft.type}
                  onClick={() => addField(ft.type)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[12px] font-semibold text-[#565e74] hover:border-[#dc2626] hover:text-[#dc2626] transition-colors cursor-pointer"
                >
                  <ft.icon size={13} />
                  {ft.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {fields.map((f) => {
                const fieldMeta = FIELD_TYPES.find((ft) => ft.type === f.type)!;
                return (
                  <div key={f.id} className="flex items-center gap-2.5 rounded-xl border border-[#e2e8f0] p-3">
                    <span className="w-8 h-8 rounded-lg bg-[#f1f5f9] text-[#565e74] flex items-center justify-center shrink-0">
                      <fieldMeta.icon size={13} />
                    </span>
                    <input
                      value={f.label}
                      onChange={(e) => updateFieldLabel(f.id, e.target.value)}
                      placeholder="Label field"
                      className="flex-1 min-w-[100px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]"
                    />
                    <span className="text-[11px] text-[#94a3b8] shrink-0 hidden sm:block">{fieldMeta.label}</span>
                    <label className="flex items-center gap-1.5 shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={f.required}
                        onChange={() => toggleRequired(f.id)}
                        className="w-3.5 h-3.5 accent-[#dc2626]"
                      />
                      <span className="text-[11px] text-[#565e74]">Wajib</span>
                    </label>
                    <button onClick={() => removeField(f.id)} className="text-[#94a3b8] hover:text-[#b3220f] shrink-0 cursor-pointer">
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Publish Form
          </button>
        </SectionCard>
      )}

      {active === 'manage' && (
        <SectionCard title="Kelola Form" description="Pantau performa dan kontrol form yang sudah dibuat.">
          {forms.length === 0 ? (
            <EmptyState message="Belum ada form yang dibuat." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {forms.map((f) => (
                <div key={f.id} className="rounded-xl border border-[#e2e8f0] p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-[13.5px] font-bold text-[#191c1e] leading-snug flex-1">{f.title}</h3>
                    <StatusBadge status={f.status} />
                  </div>
                  <p className="text-[11.5px] text-[#94a3b8] mb-3">
                    {f.template} • {f.submissions.length} submission
                    {f.quota ? ` / kuota ${f.quota}` : ''}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSharingForm(f)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
                    >
                      <QrCode size={13} />
                      QR & Link
                    </button>
                    <button
                      onClick={() => toggleFormStatus(f.id)}
                      className="ml-auto text-[12px] font-bold text-[#dc2626] hover:underline cursor-pointer"
                    >
                      {f.status === 'aktif' ? 'Tutup Form' : 'Buka Lagi'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {active === 'submissions' && (
        <SectionCard title="Data Masuk" description="Rekap seluruh pendaftar tanpa perlu spreadsheet terpisah.">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <select
              value={submissionsFormId}
              onChange={(e) => setSubmissionsFormId(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] font-semibold"
            >
              {forms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.title}
                </option>
              ))}
            </select>
            <button className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#565e74] hover:text-[#191c1e] px-3 py-2 rounded-lg border border-[#e2e8f0] cursor-pointer">
              <Download size={13} />
              Export CSV
            </button>
          </div>

          {submissionsForm && submissionsForm.submissions.length === 0 ? (
            <EmptyState message="Belum ada yang mengisi form ini." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                    <th className="pb-2.5 pr-4">Nama</th>
                    <th className="pb-2.5 pr-4">Email</th>
                    <th className="pb-2.5 pr-4">Tanggal</th>
                    <th className="pb-2.5 pr-4">Status</th>
                    <th className="pb-2.5 pr-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {submissionsForm?.submissions.map((s) => (
                    <tr key={s.id} className="border-b border-[#f1f5f9]">
                      <td className="py-3 pr-4 font-semibold text-[#191c1e]">{s.submitterName}</td>
                      <td className="py-3 pr-4 text-[#565e74]">{s.submitterEmail}</td>
                      <td className="py-3 pr-4 text-[#94a3b8]">{s.submittedAt}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={s.status} />
                      </td>
                      <td className="py-3 pr-4">
                        {s.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSubmissionStatus(submissionsFormId, s.id, 'approved')}
                              className="text-[#059669] hover:text-[#047857] cursor-pointer"
                              title="Setujui"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button
                              onClick={() => setSubmissionStatus(submissionsFormId, s.id, 'rejected')}
                              className="text-[#b3220f] hover:text-[#991b1b] cursor-pointer"
                              title="Tolak"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      )}

      {sharingForm && <ShareModal form={sharingForm} onClose={() => setSharingForm(null)} />}
    </div>
  );
};
