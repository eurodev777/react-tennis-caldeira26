/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Globe, Instagram, MessageSquare, Phone, Check, Copy, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LogoPopup({ item, onClose }) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  if (!item) return null;

  const isSponsor = 'bgColor' in item;

  // Generate generic links
  const siteUrl = item.siteUrl ? item.siteUrl : null;
  const instaUrl = item.instagram ? `https://instagram.com/${item.instagram}` : null;
  const faceUrl = item.facebook ? `https://facebook.com/${item.facebook}` : null;
  const whatsappMsg = encodeURIComponent(
    `Olá! Encontrei o contato de vocês no portal do 11º Torneio Intercolonial de Tênis Nippon Sorocaba.`
  );
  const whatsappUrl = item.whatsapp ? `https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMsg}` : null;
  const phoneUrl = item.phone ? `tel:${item.phone.replace(/[^0-9]/g, '')}` : null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Extract a fallback color scheme based on item name or custom property
  const brandBg = isSponsor && (item as Sponsor).bgColor 
    ? (item as Sponsor).bgColor 
    : 'bg-[#b38e41]';
  const brandTextColor = isSponsor && (item as Sponsor).textColor 
    ? (item as Sponsor).textColor 
    : 'text-white';

  return (
    <AnimatePresence>
      <div 
        id="sponsor-popup-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
        >
          {/* Brand header band */}
          <div className={`p-6 ${brandBg} ${brandTextColor} relative`}>
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 transition hover:bg-black/10 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              {isSponsor ? 'Patrocinador Oficial' : 'Apoio Oficial'}
            </span>
            <h3 className="mt-1 font-sans text-2xl font-extrabold tracking-tight">
              {item.name}
            </h3>
            {item.tagline && (
              <p className="mt-1 text-xs italic opacity-90 font-medium">
                "{item.tagline}"
              </p>
            )}
          </div>

          {/* Body content */}
          <div className="p-6">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-400">
              Sobre a Empresa
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {item.description || `${item.name} é um parceiro orgulhoso do tênis e esporte nikkey brasileiro, apoiando a 11ª edição do Torneio Intercolonial de Tênis Nippon Sorocaba.`}
            </p>

            <div className="mt-6 border-t border-stone-100 pt-5">
              <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Canais de Atendimento
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {/* Website */}
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2.5 rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-700 transition hover:border-gold/30 hover:bg-gold/5 hover:text-gold-dark"
                >
                  <Globe className="h-4.5 w-4.5 text-stone-400" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">Website</span>
                    <span className="text-xs font-semibold truncate">{item.siteUrl}</span>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={instaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2.5 rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-700 transition hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5 hover:text-[#E1306C]"
                >
                  <Instagram className="h-4.5 w-4.5 text-stone-400" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">Instagram</span>
                    <span className="text-xs font-semibold truncate">@{item.instagram}</span>
                  </div>
                </a>

                
                {/* Instagram */}
                <a
                  href={faceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2.5 rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-700 transition hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5 hover:text-[#E1306C]"
                >
                  <Facebook className="h-4.5 w-4.5 text-stone-400" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">Facebook</span>
                    <span className="text-xs font-semibold truncate">{item.facebook || null}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2.5 rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-700 transition hover:border-emerald-500/30 hover:bg-emerald-50/50 hover:text-emerald-600"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-stone-400" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">WhatsApp</span>
                    <span className="text-xs font-semibold truncate">{item.whatsapp}</span>
                  </div>
                </a>

                {/* Phone */}
                <div className="relative group">
                  <a
                    href={phoneUrl}
                    className="flex items-center space-x-2.5 rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-700 transition hover:border-sky-500/30 hover:bg-sky-50/50 hover:text-sky-600"
                  >
                    <Phone className="h-4.5 w-4.5 text-stone-400" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">Telefone</span>
                      <span className="text-xs font-semibold truncate">{item.phone}</span>
                    </div>
                  </a>
                  
                  {/* Quick Copy Trigger */}
                  <button
                    onClick={() => copyToClipboard(item.phone, 'phone')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 bg-white hover:bg-stone-100 rounded-md shadow-sm border border-stone-100 text-stone-400 hover:text-stone-700"
                    title="Copiar telefone"
                  >
                    {copiedText === 'phone' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick confirmation Toast in-modal */}
          {copiedText && (
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center shadow-md animate-fade-in">
              Telefone copiado para a área de transferência!
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
