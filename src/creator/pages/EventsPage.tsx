/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, Pencil, X, CalendarPlus } from 'lucide-react';
import { useAppStore } from '../../store/AppStore';
import { EventItem } from '../../data/events';
import { EOAccount } from '../../store/AppStore';
import { SectionCard, EmptyState } from '../components/ui';

interface EventsPageProps {
  account: EOAccount;
}

const emptyForm = {
  title: '',
  category: '',
  city: '',
  venue: '',
  date: '',
  time: '',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  description: '',
};

export const EventsPage: React.FC<EventsPageProps> = ({ account }) => {
  const { events, setEvents, logActivity } = useAppStore();
  const myEvents = events.filter((e) => e.eoId === account.id);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const startCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (ev: EventItem) => {
    setForm({
      title: ev.title,
      category: ev.category,
      city: ev.city,
      venue: ev.venue,
      date: ev.date,
      time: ev.time,
      image: ev.image,
      description: ev.description,
    });
    setEditingId(ev.id);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setEvents((prev) => prev.map((ev) => (ev.id === editingId ? { ...ev, ...form } : ev)));
      logActivity(`${account.orgName} memperbarui event "${form.title}"`);
    } else {
      const newEvent: EventItem = {
        id: `ev${Date.now()}`,
        eoId: account.id,
        eoName: account.orgName,
        ...form,
        lineup: [],
        tickets: [{ id: 'regular', name: 'Regular', price: 0, available: true }],
      };
      setEvents((prev) => [newEvent, ...prev]);
      logActivity(`${account.orgName} membuat event baru "${form.title}" — tampil di Landing Page`);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <div>
      <SectionCard
        title="Event Saya"
        description="Event yang Anda buat di sini otomatis tampil di Landing Page (/events)."
        action={
          <button onClick={startCreate} className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
            <Plus size={13} />
            Buat Event
          </button>
        }
      >
        {myEvents.length === 0 ? (
          <EmptyState message="Belum ada event. Klik 'Buat Event' untuk mulai." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {myEvents.map((ev) => (
              <div key={ev.id} className="rounded-xl border border-[#e2e8f0] overflow-hidden">
                <div className="aspect-video bg-[#f1f5f9]">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3.5">
                  <h3 className="text-[13.5px] font-bold text-[#191c1e] truncate">{ev.title}</h3>
                  <p className="text-[11.5px] text-[#94a3b8] mb-3">{ev.venue}, {ev.city} • {ev.date}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(ev)} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer">
                      <Pencil size={12} />
                      Edit
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="ml-auto inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#b3220f] hover:underline cursor-pointer">
                      <Trash2 size={12} />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#191c1e] inline-flex items-center gap-2">
                <CalendarPlus size={16} className="text-[#dc2626]" />
                {editingId ? 'Edit Event' : 'Buat Event Baru'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Judul Event" required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              <div className="grid grid-cols-2 gap-2.5">
                <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Kategori" required className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <input value={form.city} onChange={(e) => set('city', e.target.value)} placeholder="Kota" required className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              </div>
              <input value={form.venue} onChange={(e) => set('venue', e.target.value)} placeholder="Venue" required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              <div className="grid grid-cols-2 gap-2.5">
                <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <input type="time" value={form.time} onChange={(e) => set('time', e.target.value)} required className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              </div>
              <input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="URL Gambar Cover" className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Deskripsi event" rows={3} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none" />
              <button type="submit" className="w-full bg-[#dc2626] text-white text-[13.5px] font-bold py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
                {editingId ? 'Simpan Perubahan' : 'Publish Event'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
