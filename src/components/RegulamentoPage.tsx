/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import {
  Search,
  ArrowLeft,
  BookOpen,
  ShieldAlert,
  FileText,
  ChevronRight,
  Hash,
  Clock,
  Landmark,
  Award,
} from "lucide-react";
import { motion } from "motion/react";

interface RegulamentoPageProps {
  onBack: () => void;
}

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function RegulamentoPage({ onBack }: RegulamentoPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    const container = document.getElementById("regulamento-page-container");
    if (!container) return;

    const termo = normalizeSearch(searchTerm);
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-rule-section]")
    );

    let visibleSections = 0;

    sections.forEach((section) => {
      const category = section.dataset.category ?? "";
      const categoryMatches =
        activeCategory === "todos" || activeCategory === category;

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("[data-rule-card]")
      );

      let visibleCards = 0;

      cards.forEach((card) => {
        const cardText = normalizeSearch(card.innerText);
        const searchMatches = !termo || cardText.includes(termo);
        const shouldShow = categoryMatches && searchMatches;

        card.style.display = shouldShow ? "" : "none";

        if (shouldShow) {
          visibleCards += 1;
        }
      });

      const shouldShowSection = categoryMatches && visibleCards > 0;
      section.style.display = shouldShowSection ? "" : "none";

      if (shouldShowSection) {
        visibleSections += 1;
      }
    });

    setHasResults(visibleSections > 0);
  }, [searchTerm, activeCategory]);

  const selectSection = (id: string) => {
    setActiveCategory(id);
    setSearchTerm("");

    requestAnimationFrame(() => {
      document
        .getElementById(`section-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div
      id="regulamento-page-container"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col justify-between border-b border-[#d4af37]/15 pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:border-[#c93b2b]/30 hover:bg-[#c93b2b]/5 hover:text-[#c93b2b]"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c93b2b]">
              11º Torneio Intercolonial de Tênis
            </span>

            <h1 className="mt-1 font-serif text-3xl font-black leading-none tracking-tight text-stone-900">
              REGULAMENTO OFICIAL
            </h1>

            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-stone-500">
              Duplas 120 / 130 / 140 / 150 / 160 anos
            </p>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center space-x-2 rounded-full border border-stone-200 bg-stone-100 px-4 py-1.5 text-xs font-semibold text-stone-600 sm:mt-0">
          <BookOpen className="h-4 w-4 text-[#b88a1d]" />
          <span>Vigência: Setembro de 2026</span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="relative md:col-span-6">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
            <Search className="h-4 w-4" />
          </span>

          <input
            type="text"
            placeholder="Pesquisar regra, categoria, WO, No-AD, prazo..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-[#c93b2b] focus:ring-1 focus:ring-[#c93b2b]"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:col-span-6 md:pb-0">
          <span className="mr-1 hidden shrink-0 text-xs font-bold uppercase tracking-wider text-stone-400 lg:inline">
            Filtros:
          </span>

          <button
            onClick={() => setActiveCategory("todos")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "todos"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => setActiveCategory("geral")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "geral"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Geral
          </button>

          <button
            onClick={() => setActiveCategory("duplas")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "duplas"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Duplas
          </button>

          <button
            onClick={() => setActiveCategory("categorias")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "categorias"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Categorias
          </button>

          <button
            onClick={() => setActiveCategory("jogos")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "jogos"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Jogos
          </button>

          <button
            onClick={() => setActiveCategory("classificacao")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "classificacao"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Classificação
          </button>

          <button
            onClick={() => setActiveCategory("premiacao")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "premiacao"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Premiação
          </button>

          <button
            onClick={() => setActiveCategory("inscricao")}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              activeCategory === "inscricao"
                ? "bg-stone-900 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            Prazos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="hidden space-y-1 lg:block">
          <span className="mb-2 block px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Índice de Seções
          </span>

          <button
            onClick={() => selectSection("geral")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "geral"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Landmark
                className={`h-4 w-4 ${
                  activeCategory === "geral"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Informações Gerais</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("duplas")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "duplas"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <FileText
                className={`h-4 w-4 ${
                  activeCategory === "duplas"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Composição das Duplas</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("categorias")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "categorias"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Hash
                className={`h-4 w-4 ${
                  activeCategory === "categorias"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Composição das Categorias</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("jogos")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "jogos"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Clock
                className={`h-4 w-4 ${
                  activeCategory === "jogos"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Formato dos Jogos</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("classificacao")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "classificacao"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <ShieldAlert
                className={`h-4 w-4 ${
                  activeCategory === "classificacao"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Critérios de Classificação</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("premiacao")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "premiacao"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Award
                className={`h-4 w-4 ${
                  activeCategory === "premiacao"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Premiação, Taxas e Alimentação</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <button
            onClick={() => selectSection("inscricao")}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === "inscricao"
                ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <BookOpen
                className={`h-4 w-4 ${
                  activeCategory === "inscricao"
                    ? "text-[#8a6512]"
                    : "text-stone-400"
                }`}
              />
              <span>Inscrição, Prazos e Comissão</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-60" />
          </button>

          <div className="mt-8 space-y-2 rounded-xl border border-orange-100 bg-orange-50/50 p-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-800">
              Suporte ao Atleta
            </span>

            <p className="text-[11px] font-semibold leading-relaxed text-orange-700/90">
              Dúvidas, interpretação de regulamento e penalidades serão resolvidas pela
              Comissão Técnica e Disciplinar.
            </p>
          </div>
        </aside>

        <main className="space-y-10 lg:col-span-3">

          <motion.section
            id="section-geral"
            data-rule-section
            data-category="geral"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Landmark className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Informações Gerais
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Evento
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  11º Torneio Intercolonial de Tênis Nippon Sorocaba - 2026 — Duplas 120 / 130 / 140 / 150 / 160 anos.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Local
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Nippon Sorocaba (União Cultural Esportiva Nipo Brasileira de Sorocaba) — Sede Campestre II, Antiga Estrada de Araçoiaba da Serra, 211 — Araçoiaba da Serra.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Formato do Torneio
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Duplas 120 anos, Duplas 130 anos, Duplas 140 anos, Duplas 150 anos e Duplas 160 anos.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Datas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  17 de Setembro de 2026 (quinta-feira): início às 16h, somente Duplas 150 / 160 anos. 18 de Setembro de 2026 (sexta-feira): início às 7h. 19 de Setembro de 2026 (sábado): início às 7h.<br />20 de Setembro de 2026 (domingo): finais das chaves e cerimônia de encerramento, com início às 7h e encerramento às 13h30.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="section-duplas"
            data-rule-section
            data-category="duplas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 1 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <FileText className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Composição das Duplas
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Quantidade de Chaves
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Serão 6 Chaves de Duplas 120 anos, 5 Chaves de Duplas 130 anos, 6 Chaves de Duplas 140 anos, 3 Chaves de Duplas 150 anos e 1 Chave de Duplas 160 anos. As duplas serão classificadas pela Comissão Organizadora.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categorias 120 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  DUPLAS 120 ANOS “A”, “B”, “C”, “D”, “E” e “F”.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categorias 130 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  DUPLAS 130 ANOS “A”, “C”, “D” e “E”.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categorias 140 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  DUPLAS 140 ANOS “A”, “C”, “D”, “E”, “F” e “G”.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categorias 150 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  DUPLAS 150 ANOS “A”, “B” e “C”.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Categoria 160 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  DUPLAS 160 ANOS — Chave Única.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Regra 120 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser pelo menos 120 anos para dupla masculina, 110 anos para dupla mista e 100 anos para dupla feminina.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Regra 130 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 130 anos para dupla masculina, 120 anos para dupla mista e 110 anos para dupla feminina.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Regra 140 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 140 anos para dupla masculina, 130 anos para dupla mista e 120 anos para dupla feminina.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Regra 150 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 150 anos para dupla masculina, 140 anos para dupla mista e 130 anos para dupla feminina.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Regra 160 anos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 160 anos para dupla masculina, 150 anos para dupla mista e 140 anos para dupla feminina.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Cônjuge não Nikkey
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Esposa ou marido não Nikkey, casado(a) com Nikkey, será considerado Nikkey para efeito de participação no torneio.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Professor ou profissional
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  A formação das duplas estará limitada a somente 1 professor(a), ex-professor(a), profissional ou ex-profissional de tênis. Essa condição deverá ser informada no ato da inscrição e a dupla poderá ser classificada automaticamente na categoria “A” de cada idade.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="section-categorias"
            data-rule-section
            data-category="categorias"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 2 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Hash className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Composição das Categorias
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Chaves com 4 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Duplas 120 Anos “A”, 130 Anos “A”, 140 Anos “A” e 150 Anos “A”:
                  <br />
                  <br />
                  chaves com 4 duplas no sistema todos contra todos (round-robin). As três melhores duplas classificadas sagram-se Campeã, Vice-Campeã e 3º Lugar, respectivamente.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Chaves com 6 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Duplas 120 Anos “B”, 130 Anos “C”, 140 Anos “C” e 160 Anos:
                  <br />chave com 6 duplas, dividida em 2 grupos com 3 duplas cada. Classificam-se para a Final Principal os primeiros colocados de cada grupo. Classificam-se para a Final da Repescagem os segundos colocados de cada grupo.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Chaves com 8 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Duplas 120 Anos “C”, “D”, “E”, “F”; Duplas 130 Anos “D”, “E”, “F”; Duplas 140 Anos “D”, “E”, “F”, “G”; e Duplas 150 Anos “B”, “C”: os ganhadores do primeiro confronto disputam a semifinal para classificação à Final Principal, enquanto os perdedores do primeiro confronto disputam a semifinal para classificação da Final da Repescagem.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Alterações de composição
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  A composição das Categorias/Chaves pode ser alterada de acordo com a categoria/idade das duplas inscritas.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="section-jogos"
            data-rule-section
            data-category="jogos"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 3 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Clock className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Formato dos Jogos
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Jogos em melhor de 3 sets
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Primeira Rodada e Rodadas da Chave Principal nas chaves com 8 duplas, Rodada de Grupos nas chaves com 6 duplas e Round-Robin nas chaves com 4 duplas serão disputados em melhor de três sets, no sistema No-AD.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  1º e 2º sets
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Nos 1º e 2º sets não ocorrerá tie-break. Havendo empate em 5 x 5, vence o set quem fizer 6 games primeiro.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Empate em sets
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Ocorrendo empate em sets em 1 a 1, o confronto será decidido por meio de tie-break. A dupla vencedora será aquela que atingir sete pontos, com diferença de dois pontos.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Chave Repescagem
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Rodadas da Chave Repescagem, perdedores do 1º jogo nas chaves com 8 duplas e Final Repescagem nas chaves com 8, 6 e 5 duplas: disputa em set único (pró-set) até 8 games, no sistema No-AD.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Tie-break na Repescagem
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Havendo empate em 7 x 7 na Repescagem, o confronto será decidido por tie-break. A dupla vencedora será aquela que atingir sete pontos, com diferença de dois pontos.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  No-AD
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Todos os jogos serão disputados com a regra No-AD: o game estando em 40 a 40 será disputado apenas mais um ponto, com a dupla recebedora tendo direito de escolha do lado do saque.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  WO
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Caso ocorra ausência de um jogador no momento do início do jogo, após a devida chamada pela mesa organizadora, será proclamada a vitória do oponente por WO.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Aquecimento
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  As duplas terão 5 minutos de aquecimento a partir do anúncio da chamada do jogo.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Antecedência
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Os atletas devem chegar pelo menos com 1 hora de antecedência aos jogos programados.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="section-classificacao"
            data-rule-section
            data-category="classificacao"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 4 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <ShieldAlert className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Critérios de Classificação
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Chaves com 4 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Critérios de classificação, nesta ordem:
                  <br />Quantidade de Vitórias;
                  <br />Confronto direto;
                  <br />Saldo de Sets;
                  <br />Saldo de Games, observando que pontos do 3º set não serão computados como games;
                  <br />Saldo de Pontos no Tie-Break, se aplicável;
                  <br />Maior somatória das idades da dupla.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Fase de Grupos — Chaves com 6 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Critérios de classificação na fase de grupos, nesta ordem:
                  <br />Quantidade de Vitórias;
                  <br />Confronto direto;
                  <br />Saldo de Sets;
                  <br />Saldo de Games;
                  <br />Saldo de Pontos no Tie-Break, se aplicável;
                  <br />Maior somatória das idades da dupla.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Sistema de 4 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Sistema de chaveamento com Grupo Único em todos contra todos. As três melhores duplas ficam como Campeã, Vice-Campeã e 3º Lugar.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Sistema de 6 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Sistema de chaveamento com Final Repescagem, Fase de Grupos e Final Principal. O Grupo 1 e o Grupo 2 classificam seus primeiros colocados para a Final Principal e seus segundos colocados para a Final Repescagem.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Sistema de 8 duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Sistema de chaveamento com Repescagem e Chave Principal. Vencedores avançam pela Chave Principal e perdedores seguem para a Repescagem.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="section-premiacao"
            data-rule-section
            data-category="premiacao"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 5 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <Award className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Premiação, Taxas e Alimentação
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Troféus — Repescagem
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Troféus para as duplas Campeãs, Vice-Campeãs e Campeãs da Repescagem nas categorias: Duplas 120 “B”, “C”, “D”, “E” e “F”; Duplas 130 “C”, “D” e “E”, “F”; Duplas 140 “C”, “D”, “E”, “F” e “G”; Duplas 150 “B” e “C”; e Duplas 160.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Troféus — 3º Lugar
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Troféus para as duplas Campeãs, Vice-Campeãs e 3º Lugar nas categorias: Duplas 120 “A”, Duplas 130 “A”, Duplas 140 “A” e Duplas 150 “A”.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Taxa de inscrição
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  R$ 350,00 por jogador, incluso almoço na cerimônia de encerramento em 20 de Setembro.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Alimentação
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Nos dias 18, 19 e 20 de Setembro, será servido café da manhã aos tenistas participantes e convidados. Nos dias 18, 19 e 20 de Setembro, terá almoço à venda.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Arbitragem
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Regis Yoshida / Julio Mira.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="section-inscricao"
            data-rule-section
            data-category="inscricao"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 6 * 0.03 }}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
          >
            <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                <BookOpen className="h-4 w-4" />
              </span>

              <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                Inscrição, Prazos e Comissão
              </h2>
            </div>

            <div className="divide-y divide-stone-100">

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Participação por categoria
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Cada participante poderá participar somente de 1 categoria de Duplas.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Confirmação das vagas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Prazo para confirmação das vagas: 07/Agosto/2026.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Envio da relação das duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Prazo para envio da relação das duplas: 31/Agosto/2026.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Alteração da relação das duplas
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  A relação das duplas, depois de divulgada, não poderá mais ser modificada, salvo por motivos de contusão ou força maior, desde que aprovados pela Comissão Organizadora e que obedeçam aos critérios do regulamento.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Alterações pela Comissão
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  A Comissão se reserva ao direito de alterar o sistema de chaveamento, sistema dos jogos e horários em caso de necessidade de ajustes no número/categoria das duplas participantes ou de atrasos por qualquer motivo.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Dúvidas e penalidades
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Qualquer dúvida sobre a aplicação e interpretação do regulamento, inclusive sobre penalidades, será resolvida pela Comissão Técnica e Disciplinar, cuja decisão será soberana e definitiva.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Casos omissos
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Os casos omissos no presente regulamento serão resolvidos pela Comissão Organizadora.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Comprovação de identidade
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  A qualquer momento, a comissão pode pedir RG ou outro documento que prove a identidade conforme a inscrição prévia.
                </p>
              </div>

              <div data-rule-card className="p-6 transition hover:bg-stone-50/30">
                <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                  Comissão Organizadora
                </span>

                <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                  Milton Toshihiko Tsubaki, Sergio Shigueo Takeda, Raquel Takeda Sakanaka, Tomoko Kanaschiro e Israel Valle — Diretoria do Departamento de Tênis - Nippon Sorocaba - Gestão 2026.
                </p>
              </div>
            </div>
          </motion.section>

          {!hasResults && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
              <span className="block font-serif text-base italic text-stone-400">
                Nenhuma regra encontrada
              </span>

              <p className="mt-1 text-xs text-stone-500">
                Experimente buscar por outros termos como “No-AD”, “WO”, “duplas” ou
                “prazos”.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("todos");
                }}
                className="mt-4 text-xs font-bold uppercase text-[#c93b2b] hover:underline"
              >
                Limpar filtros e busca
              </button>
            </div>
          )}
        </main>
      </div>

      <div className="mt-12 flex justify-center border-t border-[#d4af37]/15 pt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-stone-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para a Página Principal</span>
        </button>
      </div>
    </div>
  );
}
