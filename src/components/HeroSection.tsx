/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import logo  from '../assets/nippon-sorocaba.png';
import nippon  from '../assets/logo.png';
import insta  from '../assets/instagram.png';
import local  from '../assets/drone.jpg';
import centenarias  from '../assets/centenarias.png';

interface HeroSectionProps {
  aerialImagePath: string;
}

export default function HeroSection({ aerialImagePath }: HeroSectionProps) {
  // Let's create beautiful SVGs inline for perfect high-res renders
  
  // 1. Nippon Sorocaba Tênis Logo SVG representation
  const NipponTennisLogo = () => (
    <div className="flex flex-col items-center justify-center p-2">
      <svg className="h-16 w-16 md:h-20 md:w-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#1d3557" strokeWidth="3" fill="white" />
        <circle cx="50" cy="50" r="40" stroke="#c93b2b" strokeWidth="2" strokeDasharray="3 3" />
        {/* Tennis Racquet inside */}
        <path d="M45 45 L25 25 M30 30 L40 40 M25 25 L20 20" stroke="#1d3557" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="60" cy="60" rx="15" ry="15" transform="rotate(-45 60 60)" stroke="#c93b2b" strokeWidth="3" fill="none" />
        {/* Strings */}
        <line x1="50" y1="50" x2="70" y2="70" stroke="#1d3557" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="55" y1="45" x2="65" y2="55" stroke="#1d3557" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="45" y1="55" x2="55" y2="65" stroke="#1d3557" strokeWidth="1" strokeOpacity="0.4" />
        {/* Decorative elements */}
        <path d="M50 15 C40 25 40 35 50 45 C60 35 60 25 50 15 Z" fill="#c93b2b" fillOpacity="0.1" />
      </svg>
      <div className="mt-1 text-center">
        <span className="block font-sans font-black text-xs tracking-wider text-sorocaba-blue leading-none">
          NIPPON
        </span>
        <span className="block font-sans font-bold text-[9px] tracking-widest text-sorocaba-blue/80 leading-none mt-0.5">
          SOROCABA
        </span>
        <span className="block font-serif text-[10px] italic text-[#c93b2b] font-bold mt-1">
          Tênis
        </span>
      </div>
    </div>
  );

  // 2. 11º Intercolonial Torii Gate Logo representation
  const ToriiIntercolonialLogo = () => (
    <div className="flex flex-col items-center justify-center p-3">
      <div className="relative flex items-center justify-center h-28 w-28 md:h-36 md:w-36 rounded-full border-4 border-gold bg-white shadow-md p-2">
        <svg className="h-full w-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular frame text placeholder */}
          <circle cx="50" cy="50" r="46" stroke="#b38e41" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Cherry Blossom icons */}
          <path d="M12 50 C12 47 15 47 16 50 C15 53 12 53 12 50 Z" fill="#c93b2b" />
          <circle cx="14" cy="50" r="1.5" fill="#fcfaf4" />
          
          {/* Torii Gate */}
          {/* Top beams */}
          <path d="M28 32 C40 30 60 30 72 32 L74 27 C60 25 40 25 26 27 Z" fill="#c93b2b" />
          <path d="M32 37 L68 37" stroke="#c93b2b" strokeWidth="3.5" strokeLinecap="round" />
          {/* Pillars */}
          <path d="M38 37 L36 78" stroke="#c93b2b" strokeWidth="5" strokeLinecap="round" />
          <path d="M62 37 L64 78" stroke="#c93b2b" strokeWidth="5" strokeLinecap="round" />
          {/* Center Japanese Sun / Tennis Ball hybrid */}
          <circle cx="50" cy="55" r="12" fill="#c93b2b" fillOpacity="0.1" />
          <circle cx="50" cy="55" r="10" stroke="#b38e41" strokeWidth="1.5" fill="none" />
          <path d="M42 55 C46 50 54 50 58 55" stroke="#b38e41" strokeWidth="1" strokeLinecap="round" />
          <path d="M42 55 C46 60 54 60 58 55" stroke="#b38e41" strokeWidth="1" strokeLinecap="round" />

          {/* Crossed Racquets in center */}
          <line x1="33" y1="75" x2="48" y2="60" stroke="#b38e41" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="67" y1="75" x2="52" y2="60" stroke="#b38e41" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* Absolute labels on top */}
        <div className="absolute top-3 flex flex-col items-center">
          <span className="font-serif font-black text-xl md:text-2xl text-stone-900 leading-none">
            11º
          </span>
          <span className="text-[6px] md:text-[7px] font-extrabold tracking-[0.2em] text-gold-dark uppercase leading-none mt-0.5">
            INTERCOLONIAL
          </span>
        </div>

        <div className="absolute bottom-3.5 flex flex-col items-center">
          <span className="font-sans font-black text-[9px] md:text-[11px] tracking-wide text-stone-900 leading-none">
            NIPPON SOROCABA
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FCFAF2] py-8 md:py-16">
      {/* Decorative background flowers */}
      <div className="absolute left-4 top-20 opacity-5 pointer-events-none md:left-20">
        <svg className="h-40 w-40 text-gold" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C55 20 75 20 100 20 C80 25 80 45 100 50 C80 55 80 75 100 80 C75 80 55 100 50 100 C45 80 25 80 0 80 C20 75 20 55 0 50 C20 45 20 25 0 20 C25 20 45 20 50 0 Z" />
        </svg>
      </div>
      <div className="absolute right-4 bottom-20 opacity-5 pointer-events-none md:right-20">
        <svg className="h-48 w-48 text-gold" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C55 20 75 20 100 20 C80 25 80 45 100 50 C80 55 80 75 100 80 C75 80 55 100 50 100 C45 80 25 80 0 80 C20 75 20 55 0 50 C20 45 20 25 0 20 C25 20 45 20 50 0 Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Header Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center border-b border-gold/10 pb-10">
          {/* Left: Nippon Sorocaba Tênis Logo */}
          <div className="flex flex-col gap-2 items-center justify-center md:justify-start">
            <img src={logo} />
            <div className="flex gap-2 items-center">
            <img width="24" src={insta} />
              <a href="https://www.instagram.com/nipponsorocabatenis" className="font-bold text-blue-800" target="_blank">@nipponsorocabatenis</a>
            </div>
          </div>

          <img src={nippon} />

          {/* Right: Date Badge */}
          <div className="flex text-[#BA9155] flex-col items-center text-center md:items-center md:text-right">
            <div className="w-full ml-34 lg:mb-4 mb-2">
              <img src={centenarias} className="lg:w-[250px] w-[200px]" />
            </div>
            <h2 className="text-2xl font-black md:text-3xl tracking-tight leading-none">
              17, 18, 19 e 20 de Setembro
            </h2>
            <p className="mt-1 font-sans text-xs font-bold uppercase tracking-widest">
              UCENS / Nippon Sorocaba
            </p>
            <p className="font-sans text-[11px] font-semibold tracking-wider mt-0.5">
              Unidade Campo II / Sede Campestre II
            </p>
            
            <div className="mt-3 inline-flex items-center space-x-1.5 rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              <Calendar className="h-3 w-3" />
              <span>Sorocaba - SP</span>
            </div>
          </div>
        </div>

        {/* Info Blocks Row with maps */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          {/* Location Block (6 cols) */}
          <div className="md:col-span-6 space-y-6">
            <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gold" />
              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c93b2b]/10 text-[#c93b2b]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-stone-400">
                    Sede / Local
                  </h3>
                  <p className="mt-1 font-sans text-base font-extrabold text-stone-900 leading-snug">
                    Sede Campestre II - Nippon Sorocaba
                  </p>
                  <p className="text-xs text-stone-500 font-medium leading-relaxed mt-0.5">
                    União Cultural e Esportiva Nipo Brasileira de Sorocaba
                  </p>
                  
                  <div className="mt-4 border-t border-stone-100 pt-3">
                    <p className="font-mono text-xs text-[#c93b2b] font-bold">
                      Antiga Estrada de Araçoiaba da Serra, 211
                    </p>
                    <p className="font-sans text-xs text-stone-500 font-semibold mt-0.5">
                      Araçoiaba da Serra - SP
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-1 italic">
                      *(Também conhecida como Estrada da Cooperativa, 211)
                    </span>
                  </div>

                  <div className="mt-4">
                    <a
                      href="https://maps.google.com/?q=Nippon+Sorocaba+Sede+Campestre+Araçoiaba+da+Serra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-bold text-gold-dark hover:text-gold transition group/btn"
                    >
                      <span>Como chegar no Google Maps</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Details List */}
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 bg-white/70 p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Formato</span>
                <span className="text-xs font-extrabold text-stone-800 block mt-0.5">Equipes (Masc / Fem)</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Sem limite de idade</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white/70 p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Infraestrutura</span>
                <span className="text-xs font-extrabold text-stone-800 block mt-0.5">8 Quadras de Saibro</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Disponibilizadas no local</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white/70 p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Bola Oficial</span>
                <span className="text-xs font-extrabold text-stone-800 block mt-0.5">Dunlop Australian Open</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Qualidade premium</span>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white/70 p-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block">Inscrição</span>
                <span className="text-xs font-extrabold text-[#c93b2b] block mt-0.5">R$ 300,00 por Atleta</span>
                <span className="text-[10px] text-stone-500 block mt-0.5">Inclui Almoço</span>
              </div>
            </div> */}
          </div>

          {/* Aerial Photo Block (6 cols) */}
          <div className="md:col-span-6 flex justify-center">
            <div className="relative rounded-2xl border-4 border-white bg-white p-2 shadow-lg rotate-1 max-w-md w-full">
              <img
                src={local}
                alt="Sede Campestre II Nippon Sorocaba"
                referrerPolicy="no-referrer"
                className="rounded-xl object-cover w-full h-72 md:h-80 shadow-inner"
              />
              <div className="p-3 text-center">
                <span className="font-serif italic text-xs font-bold text-stone-500">
                  Vista Aérea da Sede Campestre II — Nippon Sorocaba
                </span>
              </div>
              
              {/* Corner tape decorations for polaroid feel */}
              <div className="absolute -top-4 -left-4 w-12 h-6 bg-white/45 backdrop-blur-xs shadow-xs -rotate-12 border-t border-b border-stone-200/50 hidden md:block" />
              <div className="absolute -bottom-4 -right-4 w-12 h-6 bg-white/45 backdrop-blur-xs shadow-xs -rotate-12 border-t border-b border-stone-200/50 hidden md:block" />
            </div>
          </div>
        </div>

        {/* Greeting / Welcome text blocks */}
        <div className="mt-16 text-center max-w-4xl mx-auto space-y-8">
          {/* Quote block */}
          <div className="relative py-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold/30" />
            <h3 className="font-serif italic text-lg md:text-2xl text-gold-dark leading-relaxed px-4">
              "Há encontros que vão além da competição. Há tradições que atravessam gerações. E há momentos que permanecem para sempre em nossa memória."
            </h3>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold/30" />
          </div>

          {/* Beautiful welcome prose */}
          <div className="space-y-6 text-sm text-stone-600 leading-relaxed font-medium text-justify md:text-center md:px-6">
            <p>
              É com enorme satisfação que damos início à <strong className="text-stone-800">11ª edição do Torneio Intercolonial de Tênis Nippon Sorocaba</strong>,
              um evento construído ao longo dos anos pela paixão ao esporte, pelo respeito entre atletas e pela união de amigos e famílias que
              compartilham os mesmos valores dentro e fora das quadras. Mais do que disputar pontos e troféus, o Intercolonial representa
              convivência, integração e o fortalecimento dos laços que fazem desta comunidade algo tão especial. Cada partida carrega dedicação,
              superação e espírito esportivo, mas também sorrisos, reencontros e histórias que continuam sendo escritas a cada edição.
            </p>
            
            <p>
              Para 2026, preparamos este torneio com ainda mais carinho, dedicação e gratidão por todos que fazem parte desta trajetória. Nosso desejo
              é que cada participante viva dias inesquecíveis, marcados por grandes jogos, celebrações, novas amizades e momentos que ficarão
              guardados no coração. Que o fair play prevaleça em cada ponto, que a alegria esteja presente em cada encontro e que o tênis continue
              sendo essa ponte capaz de conectar pessoas, culturas e gerações. A todos os atletas, familiares, convidados, apoiadores e amigos: o nosso
              muito obrigado pela presença e por fazerem parte de mais um capítulo desta linda história.
            </p>

            <p className="text-center font-serif text-base font-bold text-[#c93b2b] mt-8 block">
              Sejam muito bem-vindos ao 11º Intercolonial Nippon Sorocaba!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
