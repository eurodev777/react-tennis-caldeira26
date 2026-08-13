/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sponsor } from '../types';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface SponsorCardProps {
  key?: string;
  sponsor: Sponsor;
  onClick: (sponsor: Sponsor) => void;
}

export default function SponsorCard({ sponsor, onClick }: SponsorCardProps) {
  // Let's create visually faithful renderings of the sponsor logos from the image

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.08)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(sponsor)}
      className="group border-1 border-[#BA9155] relative flex h-62 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-all"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-50/50 opacity-0 transition group-hover:opacity-100" />

      {/* Visual content representation */}
      <div className="z-10 w-48 h-52">
        <img
          src={sponsor.logoText}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Decorative arrow helper */}
      <div className="absolute bottom-2.5 right-2.5 rounded-full bg-stone-50 p-1 text-stone-400 opacity-0 transition group-hover:bg-gold/10 group-hover:text-gold-dark group-hover:opacity-100">
        <ArrowUpRight className="h-3 w-3" />
      </div>
    </motion.div>
  );
}
