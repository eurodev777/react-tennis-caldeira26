// Navbar.tsx - VERSÃO COM "MENU" PARA MOBILE

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Menu,
  X,
  Users,
  Calendar,
  ClipboardList,
  GalleryHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPage:
    | "home"
    | "equipes"
    | "tabelas"
    | "regulamento"
    | "galeria"
    | "resultados";
  setCurrentPage: (
    page:
      | "home"
      | "equipes"
      | "tabelas"
      | "regulamento"
      | "galeria"
      | "resultados"
  ) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePageChange = (
    page:
      | "home"
      | "equipes"
      | "tabelas"
      | "regulamento"
      | "galeria"
      | "resultados"
  ) => {
    setIsOpen(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="app-navbar"
      className="sticky top-0 z-40 w-full border-b border-gold/10 bg-[#FCFAF2]/90 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand - clicando volta pra home */}
          <div
            onClick={() => handlePageChange("home")}
            className="flex cursor-pointer items-center space-x-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nippon-red text-white font-serif font-bold text-sm tracking-tighter">
              11º
            </span>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-xs tracking-wider text-sorocaba-blue sm:text-sm">
                NIPPON SOROCABA
              </span>
              <span className="font-serif text-[10px] italic text-gold font-semibold tracking-widest sm:text-xs">
                Tênis Intercolonial 2026
              </span>
            </div>
          </div>

          {/* Desktop Navigation - APENAS 3 BOTÕES */}
          <nav className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => handlePageChange("home")}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === "home"
                  ? "bg-nippon-red text-white shadow-sm"
                  : "bg-gold/10 text-gold-dark hover:bg-gold/20"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>11° INTERCOLONIAL</span>
            </button>
            {/* Botão EQUIPES */}
            <button
              onClick={() => handlePageChange("equipes")}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === "equipes"
                  ? "bg-nippon-red text-white shadow-sm"
                  : "bg-gold/10 text-gold-dark hover:bg-gold/20"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Duplas</span>
            </button>

            {/* Botão TABELAS */}
            <button
              onClick={() => handlePageChange("tabelas")}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === "tabelas"
                  ? "bg-nippon-red text-white shadow-sm"
                  : "bg-gold/10 text-gold-dark hover:bg-gold/20"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Jogos</span>
            </button>

            {/* Botão TABELAS */}
            {/* <button
              onClick={() => handlePageChange("resultados")}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === "resultados"
                  ? "bg-nippon-red text-white shadow-sm"
                  : "bg-gold/10 text-gold-dark hover:bg-gold/20"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Resultados</span>
            </button> */}

            {/* Botão TABELAS */}
            <button
              onClick={() => handlePageChange("galeria")}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === "galeria"
                  ? "bg-nippon-red text-white shadow-sm"
                  : "bg-gold/10 text-gold-dark hover:bg-gold/20"
              }`}
            >
              <GalleryHorizontal className="h-3.5 w-3.5" />
              <span>Galeria</span>
            </button>

            {/* Botão REGULAMENTO */}
            <button
              onClick={() => handlePageChange("regulamento")}
              className={`flex items-center space-x-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                currentPage === "regulamento"
                  ? "bg-nippon-red text-white shadow-sm"
                  : "bg-gold/10 text-gold-dark hover:bg-gold/20"
              }`}
            >
              <ClipboardList className="h-3.5 w-3.5" />
              <span>Regulamento</span>
            </button>
          </nav>

          {/* Mobile menu button com texto "MENU" */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider text-stone-700 hover:bg-gold/10 hover:text-stone-950 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? (
                <>
                  <X className="h-5 w-5" />
                  <span>FECHAR</span>
                </>
              ) : (
                <>
                  <Menu className="h-5 w-5" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - APENAS 3 BOTÕES */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gold/10 bg-[#FCFAF2]"
          >
            <div className="space-y-1 px-2 pb-4 pt-2">
              <button
                onClick={() => handlePageChange("home")}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === "home"
                    ? "bg-nippon-red text-white"
                    : "bg-gold/10 text-gold-dark"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>11º INTERCOLONIAL</span>
              </button>
              {/* Botão EQUIPES (Mobile) */}
              <button
                onClick={() => handlePageChange("equipes")}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === "equipes"
                    ? "bg-nippon-red text-white"
                    : "bg-gold/10 text-gold-dark"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Duplas</span>
              </button>
              {/* Botão EQUIPES (Mobile) */}
              <button
                onClick={() => handlePageChange("tabelas")}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === "tabelas"
                    ? "bg-nippon-red text-white"
                    : "bg-gold/10 text-gold-dark"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Jogos</span>
              </button>

              {/* <button
                onClick={() => handlePageChange("resultados")}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === "resultados"
                    ? "bg-nippon-red text-white"
                    : "bg-gold/10 text-gold-dark"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Resultados</span>
              </button> */}

              {/* Botão TABELAS (Mobile) */}
              <button
                onClick={() => handlePageChange("galeria")}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === "galeria"
                    ? "bg-nippon-red text-white"
                    : "bg-gold/10 text-gold-dark"
                }`}
              >
                <GalleryHorizontal className="h-4 w-4" />
                <span>Galeria</span>
              </button>

              {/* Botão REGULAMENTO (Mobile) */}
              <button
                onClick={() => handlePageChange("regulamento")}
                className={`flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                  currentPage === "regulamento"
                    ? "bg-nippon-red text-white"
                    : "bg-gold/10 text-gold-dark"
                }`}
              >
                <ClipboardList className="h-4 w-4" />
                <span>Regulamento</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
