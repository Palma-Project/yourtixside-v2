/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, Wrench } from 'lucide-react';
import { useAppStore } from '../store/AppStore';

export const SystemStatusBanner: React.FC = () => {
  const { systemStatus } = useAppStore();

  if (systemStatus.status === 'normal') return null;

  const isMaintenance = systemStatus.status === 'maintenance';

  return (
    <div className={`${isMaintenance ? 'bg-[#1d4ed8]' : 'bg-[#b3220f]'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center gap-2 text-[12.5px] font-semibold">
        {isMaintenance ? <Wrench size={13} /> : <AlertTriangle size={13} />}
        <span>{isMaintenance ? 'Maintenance Terjadwal' : 'Gangguan Sebagian'}</span>
        {systemStatus.message && <span className="text-white/85 truncate">— {systemStatus.message}</span>}
      </div>
    </div>
  );
};
