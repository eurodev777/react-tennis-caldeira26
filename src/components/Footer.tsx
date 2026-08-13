/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface NavbarProps {
  currentPage: any;
  setCurrentPage: (page: any) => void;
}

export default function Footer({ currentPage, setCurrentPage }: NavbarProps) {
  const currentYear = new Date().getFullYear();

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="w-full bg-[#111111] text-stone-400 py-6 border-t border-stone-800 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between text-xs font-semibold uppercase tracking-wider">

          {/* Left: support links and copy info */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <span className="text-stone-500 font-mono text-[11px] tracking-normal">
              11º Intercolonial © {currentYear}
            </span>
            <div className="h-3 w-[1px] bg-stone-800 hidden sm:block" />
            <a
              href="#support"
              onClick={(e) => {
                e.preventDefault();
                alert('Para suporte técnico ou dúvidas gerais, por favor entre em contato com a Sede Nippon Sorocaba pelo telefone (15) 3242-1234.');
              }}
              className="hover:text-white transition"
            >
              Condições e suporte
            </a>
            <div className="h-3 w-[1px] bg-stone-800" />
            <a
              href="#privacy"
              onClick={(e) => {
                e.preventDefault();
                alert('Política de Privacidade: Os dados deste torneio servem estritamente para fins de organização interna e divulgação dos confrontos, em consonância com a LGPD e normas esportivas do Nippon.');
              }}
              className="hover:text-white transition"
            >
              Política de Privacidade
            </a>
            <div className="h-3 w-[1px] bg-stone-800" />
            <button
              onClick={() => {
                setCurrentPage('regulamento');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition"
            >
              Ver Regulamento
            </button>
          </div>

          {/* Right: Canva attribution & Powered indicator */}
          <div className="text-center md:text-right flex items-center justify-center space-x-2 text-[10px] text-stone-500">
            <span>Desenvolvido por <a href="https://sothink.com.br/" target="_blank">Sothink Marketing</a></span>
            <span onClick={() => {
              setCurrentPage('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>•</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
