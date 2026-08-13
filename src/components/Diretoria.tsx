/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DIRECTORS } from '../data';
import { Users, Mail, Phone, CalendarRange } from 'lucide-react';
import { motion } from 'motion/react';

export default function Diretoria() {
  // We can render professional representative headshot layouts with styled Japanese/sports backgrounds
  const getAvatarStyle = (initials: string) => {
    switch (initials) {
      case 'MT':
        return 'from-amber-500 to-amber-700 text-amber-50';
      case 'IC':
        return 'from-blue-500 to-blue-700 text-blue-50';
      case 'ST':
        return 'from-emerald-500 to-emerald-700 text-emerald-50';
      case 'TK':
        return 'from-rose-500 to-rose-700 text-rose-50';
      case 'RT':
        return 'from-violet-500 to-violet-700 text-violet-50';
      default:
        return 'from-stone-500 to-stone-700 text-stone-50';
    }
  };

  return (
    <section id="diretoria" className="relative bg-[#FCFAF2] py-16 border-t border-b border-gold/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-gold-dark">
            Conselho & Liderança
          </h2>
          <h3 className="mt-2 font-serif text-3xl font-extrabold text-stone-950 md:text-4xl tracking-tight leading-none">
            Diretoria do Departamento de Tênis 2026
          </h3>
          <p className="mt-3 text-sm text-stone-500 max-w-xl mx-auto leading-relaxed">
            A comissão responsável pela organização, coordenação técnica e garantia de fair play ao longo de todo o 11º Intercolonial.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {DIRECTORS.map((director, index) => {
            const avatarColor = getAvatarStyle(director.initials);
            return (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: '#b38e41', boxShadow: '0 10px 20px -10px rgba(179, 142, 65, 0.12)' }}
                className="flex flex-col items-center p-5 rounded-2xl border border-stone-200/80 bg-white/65 backdrop-blur-xs text-center transition-all"
              >
                {/* Custom Styled Avatar Card representing the headshot */}
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-xl bg-stone-100 shadow-xs border-2 border-white">
                  <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${avatarColor}`}>
                    <img src={director.initials} />
                    {/* Tiny subtle circular Japanese design element */}
                    <div className="absolute right-1 bottom-1 h-5 w-5 rounded-full border border-white/20 flex items-center justify-center">
                      <span className="text-[6px] font-bold opacity-60">印</span>
                    </div>
                  </div>
                  {/* Glass shimmer effect */}
                  <div className="absolute inset-0 bg-linear-gradient(from-top-left-to-bottom-right, rgba(255,255,255,0.15), transparent)" />
                </div>

                {/* Director Name */}
                <h4 className="font-sans text-sm font-bold text-stone-900 line-clamp-1">
                  {director.name}
                </h4>
                
                {/* Director Role */}
                <p className="mt-1 text-xs font-semibold text-gold-dark tracking-wide uppercase line-clamp-1">
                  {director.role}
                </p>

                {/* Micro indicators */}
                <div className="mt-3.5 pt-3 border-t border-stone-100 w-full flex justify-center space-x-2 text-stone-400">
                  <span className="text-[9px] font-mono font-bold bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                    GESTÃO 2026
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
