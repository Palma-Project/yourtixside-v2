/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Minisite } from '../store/AppStore';

interface MinisiteViewProps {
  site: Minisite;
}

export const MinisiteView: React.FC<MinisiteViewProps> = ({ site }) => {
  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center py-14 px-4">
      <div className="w-full max-w-md">
        {site.coverImage && (
          <div className="h-32 rounded-2xl overflow-hidden mb-[-40px] bg-[#191c1e]">
            <img src={site.coverImage} alt="" className="w-full h-full object-cover opacity-90" />
          </div>
        )}
        <div className="flex flex-col items-center text-center px-4">
          {site.avatar && (
            <img src={site.avatar} alt={site.title} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
          )}
          <h1 className="text-[19px] font-extrabold text-[#191c1e] tracking-tight mt-3">{site.title}</h1>
          {site.bio && <p className="text-[13px] text-[#565e74] mt-1.5 leading-[20px]">{site.bio}</p>}
        </div>

        <div className="mt-7 space-y-2.5">
          {site.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center justify-between gap-2 bg-white border border-[#e2e8f0] rounded-xl px-4 py-3.5 hover:border-[#dc2626] hover:shadow-sm transition-all"
            >
              <span className="text-[13.5px] font-semibold text-[#191c1e]">{link.label}</span>
              <ExternalLink size={15} className="text-[#94a3b8] shrink-0" />
            </a>
          ))}
        </div>

        <p className="text-center text-[11px] text-[#94a3b8] mt-8">
          Dibuat dengan <span className="text-[#dc2626] font-bold">yourtix</span>side
        </p>
      </div>
    </div>
  );
};
