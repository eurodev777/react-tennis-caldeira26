/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Supporter } from '../types';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

interface SupporterCardProps {
  key?: string;
  supporter: Supporter;
  onClick: (supporter: Supporter) => void;
}

export default function SupporterCard({ supporter, onClick }: SupporterCardProps) {

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.03, borderColor: '#b38e41', boxShadow: '0 8px 16px -8px rgba(179, 142, 65, 0.15)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(supporter)}
      className="group relative flex h-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white px-3 py-2 shadow-xs transition-all"
    >
      {/* Background card accent */}
      <div className="absolute inset-0 bg-stone-50/20 opacity-0 transition group-hover:opacity-100" />
      
      {/* Supporter Logo Content */}
      <div className="z-10 w-48 h-28">
        <img
          src={supporter.logoText}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Micro indicator */}
      <div className="absolute bottom-1 right-1 opacity-0 transition group-hover:opacity-100 text-stone-300">
        <Info className="h-2.5 w-2.5 text-gold" />
      </div>
    </motion.div>
  );
}
