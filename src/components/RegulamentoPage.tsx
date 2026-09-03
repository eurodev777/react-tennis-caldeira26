/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from "react";
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

type RuleItem = {
  label: string;
  text: string;
};

type RuleSection = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: RuleItem[];
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function RegulamentoPage({ onBack }: RegulamentoPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const rulesData = useMemo<RuleSection[]>(() => {
    return [
      {
        id: "geral",
        title: "Informações Gerais",
        icon: Landmark,
        items: [
          {
            label: "Evento",
            text: "11º Torneio Intercolonial de Tênis Nippon Sorocaba - 2026 — Duplas 120 / 130 / 140 / 150 / 160 anos.",
          },
          {
            label: "Local",
            text: "Nippon Sorocaba (União Cultural Esportiva Nipo Brasileira de Sorocaba) — Sede Campestre II, Antiga Estrada de Araçoiaba da Serra, 211 — Araçoiaba da Serra.",
          },
          {
            label: "Formato do Torneio",
            text: "Duplas 120 anos, Duplas 130 anos, Duplas 140 anos, Duplas 150 anos e Duplas 160 anos.",
          },
          {
            label: "Datas",
            text: "17 de Setembro de 2026 (quinta-feira): início às 16h, somente Duplas 150 / 160 anos. 18 de Setembro de 2026 (sexta-feira): início às 7h. 19 de Setembro de 2026 (sábado): início às 7h. 20 de Setembro de 2026 (domingo): finais das chaves e cerimônia de encerramento, com início às 7h e encerramento às 13h30.",
          },
        ],
      },
      {
        id: "duplas",
        title: "Composição das Duplas",
        icon: FileText,
        items: [
          {
            label: "Quantidade de Chaves",
            text: "Serão 6 Chaves de Duplas 120 anos, 5 Chaves de Duplas 130 anos, 6 Chaves de Duplas 140 anos, 3 Chaves de Duplas 150 anos e 1 Chave de Duplas 160 anos. As duplas serão classificadas pela Comissão Organizadora.",
          },
          {
            label: "Categorias 120 anos",
            text: "DUPLAS 120 ANOS “A”, “B”, “C”, “D”, “E” e “F”.",
          },
          {
            label: "Categorias 130 anos",
            text: "DUPLAS 130 ANOS “A”, “B”, “C”, “D” e “E”.",
          },
          {
            label: "Categorias 140 anos",
            text: "DUPLAS 140 ANOS “A”, “C”, “D”, “E”, “F” e “G”.",
          },
          {
            label: "Categorias 150 anos",
            text: "DUPLAS 150 ANOS “A”, “B” e “C”.",
          },
          {
            label: "Categoria 160 anos",
            text: "DUPLAS 160 ANOS — Chave Única.",
          },
          {
            label: "Regra 120 anos",
            text: "Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser pelo menos 120 anos para dupla masculina, 110 anos para dupla mista e 100 anos para dupla feminina.",
          },
          {
            label: "Regra 130 anos",
            text: "Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 130 anos para dupla masculina, 120 anos para dupla mista e 110 anos para dupla feminina.",
          },
          {
            label: "Regra 140 anos",
            text: "Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 140 anos para dupla masculina, 130 anos para dupla mista e 120 anos para dupla feminina.",
          },
          {
            label: "Regra 150 anos",
            text: "Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 150 anos para dupla masculina, 140 anos para dupla mista e 130 anos para dupla feminina.",
          },
          {
            label: "Regra 160 anos",
            text: "Participação de no mínimo um Nikkey por dupla. A somatória das idades deve ser 160 anos para dupla masculina, 150 anos para dupla mista e 140 anos para dupla feminina.",
          },
          {
            label: "Cônjuge não Nikkey",
            text: "Esposa ou marido não Nikkey, casado(a) com Nikkey, será considerado Nikkey para efeito de participação no torneio.",
          },
          {
            label: "Professor ou profissional",
            text: "A formação das duplas estará limitada a somente 1 professor(a), ex-professor(a), profissional ou ex-profissional de tênis. Essa condição deverá ser informada no ato da inscrição e a dupla poderá ser classificada automaticamente na categoria “A” de cada idade.",
          },
        ],
      },
      {
        id: "categorias",
        title: "Composição das Categorias",
        icon: Hash,
        items: [
          {
            label: "Chaves com 4 duplas",
            text: "Duplas 120 Anos “A”, 130 Anos “A”, 140 Anos “A” e 150 Anos “A”: chaves com 4 duplas no sistema todos contra todos (round-robin). As três melhores duplas classificadas sagram-se Campeã, Vice-Campeã e 3º Lugar, respectivamente.",
          },
          {
            label: "Chaves com 6 duplas",
            text: "Duplas 120 Anos “B”, 130 Anos “B”, 140 Anos “C” e 160 Anos: chave com 6 duplas, dividida em 2 grupos com 3 duplas cada. Classificam-se para a Final Principal os primeiros colocados de cada grupo. Classificam-se para a Final da Repescagem os segundos colocados de cada grupo.",
          },
          {
            label: "Chaves com 8 duplas",
            text: "Duplas 120 Anos “C”, “D”, “E”, “F”; Duplas 130 Anos “C”, “D”, “E”; Duplas 140 Anos “D”, “E”, “F”, “G”; e Duplas 150 Anos “B”, “C”: os ganhadores do primeiro confronto disputam a semifinal para classificação à Final Principal, enquanto os perdedores do primeiro confronto disputam a semifinal para classificação da Final da Repescagem.",
          },
          {
            label: "Alterações de composição",
            text: "A composição das Categorias/Chaves pode ser alterada de acordo com a categoria/idade das duplas inscritas.",
          },
        ],
      },
      {
        id: "jogos",
        title: "Formato dos Jogos",
        icon: Clock,
        items: [
          {
            label: "Jogos em melhor de 3 sets",
            text: "Primeira Rodada e Rodadas da Chave Principal nas chaves com 8 duplas, Rodada de Grupos nas chaves com 6 duplas e Round-Robin nas chaves com 4 duplas serão disputados em melhor de três sets, no sistema No-AD.",
          },
          {
            label: "1º e 2º sets",
            text: "Nos 1º e 2º sets não ocorrerá tie-break. Havendo empate em 5 x 5, vence o set quem fizer 6 games primeiro.",
          },
          {
            label: "Empate em sets",
            text: "Ocorrendo empate em sets em 1 a 1, o confronto será decidido por meio de tie-break. A dupla vencedora será aquela que atingir sete pontos, com diferença de dois pontos.",
          },
          {
            label: "Chave Repescagem",
            text: "Rodadas da Chave Repescagem, perdedores do 1º jogo nas chaves com 8 duplas e Final Repescagem nas chaves com 8, 6 e 5 duplas: disputa em set único (pró-set) até 8 games, no sistema No-AD.",
          },
          {
            label: "Tie-break na Repescagem",
            text: "Havendo empate em 7 x 7 na Repescagem, o confronto será decidido por tie-break. A dupla vencedora será aquela que atingir sete pontos, com diferença de dois pontos.",
          },
          {
            label: "No-AD",
            text: "Todos os jogos serão disputados com a regra No-AD: o game estando em 40 a 40 será disputado apenas mais um ponto, com a dupla recebedora tendo direito de escolha do lado do saque.",
          },
          {
            label: "WO",
            text: "Caso ocorra ausência de um jogador no momento do início do jogo, após a devida chamada pela mesa organizadora, será proclamada a vitória do oponente por WO.",
          },
          {
            label: "Aquecimento",
            text: "As duplas terão 5 minutos de aquecimento a partir do anúncio da chamada do jogo.",
          },
          {
            label: "Antecedência",
            text: "Os atletas devem chegar pelo menos com 1 hora de antecedência aos jogos programados.",
          },
        ],
      },
      {
        id: "classificacao",
        title: "Critérios de Classificação",
        icon: ShieldAlert,
        items: [
          {
            label: "Chaves com 4 duplas",
            text: "Critérios de classificação, nesta ordem: Quantidade de Vitórias; Confronto direto; Saldo de Sets; Saldo de Games, observando que pontos do 3º set não serão computados como games; Saldo de Pontos no Tie-Break, se aplicável; Maior somatória das idades da dupla.",
          },
          {
            label: "Fase de Grupos — Chaves com 6 duplas",
            text: "Critérios de classificação na fase de grupos, nesta ordem: Quantidade de Vitórias; Confronto direto; Saldo de Sets; Saldo de Games; Saldo de Pontos no Tie-Break, se aplicável; Maior somatória das idades da dupla.",
          },
          {
            label: "Sistema de 4 duplas",
            text: "Sistema de chaveamento com Grupo Único em todos contra todos. As três melhores duplas ficam como Campeã, Vice-Campeã e 3º Lugar.",
          },
          {
            label: "Sistema de 6 duplas",
            text: "Sistema de chaveamento com Final Repescagem, Fase de Grupos e Final Principal. O Grupo 1 e o Grupo 2 classificam seus primeiros colocados para a Final Principal e seus segundos colocados para a Final Repescagem.",
          },
          {
            label: "Sistema de 8 duplas",
            text: "Sistema de chaveamento com Repescagem e Chave Principal. Vencedores avançam pela Chave Principal e perdedores seguem para a Repescagem.",
          },
        ],
      },
      {
        id: "premiacao",
        title: "Premiação, Taxas e Alimentação",
        icon: Award,
        items: [
          {
            label: "Troféus — Repescagem",
            text: "Troféus para as duplas Campeãs, Vice-Campeãs e Campeãs da Repescagem nas categorias: Duplas 120 “B”, “C”, “D”, “E” e “F”; Duplas 130 “B”, “C”, “D” e “E”; Duplas 140 “B”, “C”, “D”, “E” e “F”; Duplas 150 “B” e “C”; e Duplas 160.",
          },
          {
            label: "Troféus — 3º Lugar",
            text: "Troféus para as duplas Campeãs, Vice-Campeãs e 3º Lugar nas categorias: Duplas 120 “A”, Duplas 130 “A”, Duplas 140 “A” e Duplas 150 “A”.",
          },
          {
            label: "Taxa de inscrição",
            text: "R$ 350,00 por jogador, incluso almoço na cerimônia de encerramento em 20 de Setembro.",
          },
          {
            label: "Alimentação",
            text: "Nos dias 18, 19 e 20 de Setembro, será servido café da manhã aos tenistas participantes e convidados. Nos dias 18, 19 e 20 de Setembro, terá almoço à venda.",
          },
          {
            label: "Arbitragem",
            text: "Regis Yoshida / Julio Mira.",
          },
        ],
      },
      {
        id: "inscricao",
        title: "Inscrição, Prazos e Comissão",
        icon: BookOpen,
        items: [
          {
            label: "Participação por categoria",
            text: "Cada participante poderá participar somente de 1 categoria de Duplas.",
          },
          {
            label: "Confirmação das vagas",
            text: "Prazo para confirmação das vagas: 07/Agosto/2026.",
          },
          {
            label: "Envio da relação das duplas",
            text: "Prazo para envio da relação das duplas: 31/Agosto/2026.",
          },
          {
            label: "Alteração da relação das duplas",
            text: "A relação das duplas, depois de divulgada, não poderá mais ser modificada, salvo por motivos de contusão ou força maior, desde que aprovados pela Comissão Organizadora e que obedeçam aos critérios do regulamento.",
          },
          {
            label: "Alterações pela Comissão",
            text: "A Comissão se reserva ao direito de alterar o sistema de chaveamento, sistema dos jogos e horários em caso de necessidade de ajustes no número/categoria das duplas participantes ou de atrasos por qualquer motivo.",
          },
          {
            label: "Dúvidas e penalidades",
            text: "Qualquer dúvida sobre a aplicação e interpretação do regulamento, inclusive sobre penalidades, será resolvida pela Comissão Técnica e Disciplinar, cuja decisão será soberana e definitiva.",
          },
          {
            label: "Casos omissos",
            text: "Os casos omissos no presente regulamento serão resolvidos pela Comissão Organizadora.",
          },
          {
            label: "Comprovação de identidade",
            text: "A qualquer momento, a comissão pode pedir RG ou outro documento que prove a identidade conforme a inscrição prévia.",
          },
          {
            label: "Comissão Organizadora",
            text: "Milton Toshihiko Tsubaki, Sergio Shigueo Takeda, Raquel Takeda Sakanaka, Tomoko Kanaschiro e Israel Valle — Diretoria do Departamento de Tênis - Nippon Sorocaba - Gestão 2026.",
          },
        ],
      },
    ];
  }, []);

  const filteredRules = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase();

    return rulesData
      .map((category) => {
        if (activeCategory !== "todos" && category.id !== activeCategory) {
          return null;
        }

        const matchedItems = category.items.filter((item) => {
          if (!termo) return true;

          return (
            item.label.toLowerCase().includes(termo) ||
            item.text.toLowerCase().includes(termo)
          );
        });

        if (!matchedItems.length) return null;

        return {
          ...category,
          items: matchedItems,
        };
      })
      .filter((cat): cat is RuleSection => cat !== null);
  }, [searchTerm, activeCategory, rulesData]);

  const highlightText = (value: string, search: string) => {
    const termo = search.trim();

    if (!termo) return value;

    const parts = value.split(new RegExp(`(${escapeRegExp(termo)})`, "gi"));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === termo.toLowerCase() ? (
            <mark
              key={index}
              className="rounded-sm bg-amber-100 px-0.5 font-semibold text-amber-950"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const filters = [
    { id: "todos", label: "Todos" },
    { id: "geral", label: "Geral" },
    { id: "duplas", label: "Duplas" },
    { id: "categorias", label: "Categorias" },
    { id: "jogos", label: "Jogos" },
    { id: "classificacao", label: "Classificação" },
    { id: "premiacao", label: "Premiação" },
    { id: "inscricao", label: "Prazos" },
  ];

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

          {filters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                activeCategory === cat.id
                  ? "bg-stone-900 text-white shadow-sm"
                  : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="hidden space-y-1 lg:block">
          <span className="mb-2 block px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Índice de Seções
          </span>

          {rulesData.map((section) => {
            const SectionIcon = section.icon;
            const isActive = activeCategory === section.id;

            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveCategory(section.id);
                  setSearchTerm("");

                  const element = document.getElementById(`section-${section.id}`);

                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? "border border-[#d4af37]/10 bg-[#d4af37]/15 text-[#8a6512]"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <SectionIcon
                    className={`h-4 w-4 ${
                      isActive ? "text-[#8a6512]" : "text-stone-400"
                    }`}
                  />

                  <span>{section.title}</span>
                </div>

                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>
            );
          })}

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
          {filteredRules.length > 0 ? (
            filteredRules.map((section, sectionIndex) => {
              const SectionIcon = section.icon;

              return (
                <motion.section
                  key={section.id}
                  id={`section-${section.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: sectionIndex * 0.03 }}
                  className="scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm"
                >
                  <div className="flex items-center space-x-3 border-b border-stone-100 bg-stone-50 px-6 py-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                      <SectionIcon className="h-4 w-4" />
                    </span>

                    <h2 className="font-serif text-lg font-black uppercase tracking-wide text-stone-900">
                      {section.title}
                    </h2>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {section.items.map((item, index) => (
                      <div key={index} className="p-6 transition hover:bg-stone-50/30">
                        <span className="block text-xs font-bold uppercase tracking-wide text-[#8a6512]">
                          {highlightText(item.label, searchTerm)}
                        </span>

                        <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600">
                          {highlightText(item.text, searchTerm)}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              );
            })
          ) : (
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
