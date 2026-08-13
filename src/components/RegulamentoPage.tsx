/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, ArrowLeft, BookOpen, ShieldAlert, FileText, ChevronRight, Hash, Clock, Landmark, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface RegulamentoPageProps {
  onBack: () => void;
}

export default function RegulamentoPage({ onBack }: RegulamentoPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  // Organized segments of the regulation for structured searching and filtering
  const rulesData = useMemo(() => {
    return [
      {
        id: 'geral',
        title: 'Informações Gerais & Local',
        icon: Landmark,
        items: [
          { label: 'Local', text: 'Sede Campestre II - Nippon Sorocaba - União Cultural e Esportiva Nipo Brasileira de Sorocaba (Antiga Estrada de Araçoiaba da Serra, 211, Araçoiaba da Serra - SP).' },
          { label: 'Formato do Torneio', text: 'Equipes (Masculino e Feminino: Sem limite de idade).' },
          { label: 'Quadras Disponibilizadas', text: '8 Quadras de Saibro.' },
          { label: 'Bolas a serem utilizadas', text: 'Prince NX Tour Pro' },
          { label: 'Categorias', text: 'Ouro Masculino, Prata Masculino, Bronze Masculino, Ouro Feminino e Prata Feminino.' },
          { label: 'Datas', text: '17 de Julho de 2026 (Sexta): Início 7:00hs; 18 de Julho de 2026 (Sábado): Início 7:00hs; 19 de Julho de 2026 (Domingo): Início 7:00hs (Finais), com cerimônia de encerramento às 13:30hs.' }
        ]
      },
      {
        id: 'composicao',
        title: 'Composição das Equipes',
        icon: FileText,
        items: [
          { label: 'Categorias Masculinas (Ouro, Prata e Bronze)', text: 'Cada equipe poderá ser composta de no mínimo 5 atletas e máximo de 7 atletas, sem limite de idade.' },
          { label: 'Categorias Femininas (Ouro e Prata)', text: 'Cada equipe poderá ser composta de no mínimo 6 atletas e máximo de 8 atletas, sem limite de idade.' },
          { label: 'Participação de não Nikkeys', text: 'Permitido a escalação de somente um (1) atleta Não Nikkey por súmula de confronto.' },
          { label: 'Atleta Não Nikkey Cônjuge', text: 'O Atleta Não Nikkey/Não Descendente de Nikkey Cônjuge/Casado de/com pessoa Nikkey ou descendente, será considerado Nikkey para efeito de participação no torneio.' },
          { label: 'Limite de Categorias', text: 'Cada jogador poderá jogar em somente uma (1) categoria.' },
          { label: 'Profissionais na Categoria Ouro Masculino', text: 'Será permitida a participação de 2 (dois) professores/ex-professores ou profissional/ex-profissional de tênis por equipe.' },
          { label: 'Profissionais na Categoria Ouro Feminino', text: 'Será permitida a participação de 1 (uma) professora/ex-professora ou profissional/ex-profissional de tênis por equipe.' },
          { label: 'Profissionais nas demais categorias', text: 'Nas demais Categorias não será permitida a participação de professores/ex-professores ou profissional/ex-profissional.' },
          { label: 'Regra de Idade para Professores', text: 'Professor/ex-Professor, profissional/ex-profissional acima de 60 anos (inclusive) não será considerado Profissional de Tênis para este torneio.' }
        ]
      },
      {
        id: 'jogos',
        title: 'Formato dos Jogos & Pontuação',
        icon: Clock,
        items: [
          { label: 'Sorteio', text: 'Os confrontos serão definidos por sorteio, realizados pela Comissão Organizadora.' },
          { label: 'Confrontos Masculinos', text: 'Cada confronto será decidido através de 2 jogos de duplas e um jogo de simples, nessa seqüência.' },
          { label: 'Confrontos Femininos', text: 'Cada confronto será decidido através de 3 jogos de duplas.' },
          { label: 'Regras de Duplas', text: 'As duplas não poderão ser repetidas durante todo o torneio, com exceção de equipes em que não haja mais combinações possíveis.' },
          { label: 'Confronto Já Definido', text: 'Estando o confronto já definido com 2 (duas) vitórias, o terceiro jogo deverá ser realizado mesmo assim, e portanto, as duplas relacionadas em súmula serão contabilizadas para efeito de combinações no Torneio.' },
          { label: 'Horários e Quadras', text: 'Não haverá possibilidade de restrições de horários e datas. Eventualmente os jogos de um mesmo confronto poderão ocorrer em quadras simultâneas, portanto todos os atletas da equipe devem obedecer ao horário definido na tabela dos jogos.' },
          { label: 'Jogos da Primeira Rodada e Chave Principal', text: 'Disputados em melhor de três (3) sets, no sistema "No-AD"*. Nos 1º e 2º sets, havendo empate em 6 x 6, a decisão do set será disputado através de um tie-break normal de sete (7) pontos com diferença de dois (2) pontos. Ocorrendo um empate em sets em 1 a 1, o 3º set será decidido através de um "super tie-break", onde o vencedor será aquele que atingir dez (10) pontos com diferença de dois (2) pontos.' },
          { label: 'Jogos da Chave Repescagem (todas as categorias)', text: 'Disputa em "Pro set" de 8 (oito) games, no sistema No-AD*. Havendo empate em 7 x 7, o jogo será decidido através de um "tie-break" normal de sete (7) pontos com diferença de dois (2) pontos.' },
          { label: 'Regra do No-AD*', text: 'Todos os jogos serão disputados com a regra do No-AD: o game estando em 40 a 40 será disputado apenas mais um ponto, com a dupla recebedora tendo direito de escolha do lado do saque.' }
        ]
      },
      {
        id: 'operacao',
        title: 'Súmula, Capitão, WO & Aquecimento',
        icon: ShieldAlert,
        items: [
          { label: 'Preenchimento da Súmula', text: 'Trinta minutos antes de cada confronto, deverá ser preenchida e apresentada a súmula pelo capitão, contendo a inscrição dos jogadores em ordem seqüencial: Masculino = Duplas, Duplas, Simples; Feminino = Duplas, Duplas, Duplas.' },
          { label: 'Participação por Confronto', text: 'Um jogador não pode atuar duas vezes no mesmo confronto.' },
          { label: 'Papel do Capitão', text: 'O capitão poderá ficar dentro da quadra (sentado no banco junto à rede) e poderá dar instruções somente nas viradas de lado. Caso ele seja componente da equipe e vá jogar, deverá passar o seu cargo a um substituto.' },
          { label: 'WO por Ausência', text: 'Caso ocorra a ausência de um jogador no momento do início do jogo, será proclamada a vitória do oponente por WO e será computada a contagem de 6/0 e 6/0 para a Chave Principal e 8/0 para a Chave Repescagem.' },
          { label: 'Aquecimento em Quadra', text: 'As equipes terão 5 minutos de aquecimento a partir do anúncio da chamada do jogo.' },
          { label: 'Antecedência Recomendada', text: 'Pedimos que os atletas cheguem pelo menos com 1 hora de antecedência aos jogos programados.' }
        ]
      },
      {
        id: 'sistematica',
        title: 'Sistemática das Chaves',
        icon: Hash,
        items: [
          { label: 'Categoria Ouro Masculino (5 equipes)', text: 'Os confrontos Primeira Rodada serão definidos através de Sorteio. Na Primeira Rodada, as Equipes terão 2 confrontos cada, definidos por sorteio. As equipes que tiverem os 2 melhores resultados, disputarão a Final Principal. As equipes que tiverem o terceiro e quarto melhor resultado, disputarão a Final da Repescagem. Jogos Principal e Final; melhor de 3 Sets, No-Ad. Final da Repescagem: Set-Pro até 8, No-Ad.' },
          { label: 'Critérios de Classificação (Ouro Masculino e Feminino)', text: 'Saldo de Vitórias; Saldo de Sets; Saldo de Games (sem pontos do 3º set); Saldo de Pontos no 3º set (caso aplicável); Sorteio. Obs: A equipe com pior desempenho poderá disputar a Categoria Prata na próxima edição.' },
          { label: 'Categoria Prata Masculino (8 equipes)', text: 'Primeira rodada por Sorteio. Vencedores do primeiro confronto disputam Chave Principal e os perdedores disputam Chave Repescagem. Principal: melhor de 3 sets, No-Ad. Repescagem: Set-Pro até 8, No-Ad. Campeão promove para Ouro. Piores 2 disputam Bronze na próxima edição.' },
          { label: 'Categoria Bronze Masculino (12 equipes)', text: 'Primeira rodada por Sorteio. Chave com 4 cabeças de chave, que também por sorteio enfrentam vencedores da Primeira Rodada. Perdedores disputam Repescagem junto com perdedores da Primeira Rodada. Principal: melhor de 3 sets, No-Ad. Repescagem: Set-Pro até 8, No-Ad. Campeão e Vice promovem para Prata. Piores 2 podem ir para Qualifying.' },
          { label: 'Categoria Ouro Feminino (6 equipes)', text: 'Primeira rodada por sorteio (Top 2 anteriores não se enfrentam na rodada 1). Vencedoras disputam Chave Principal (Grupo de 3, Round Robin). Perdedoras disputam Repescagem (Grupo de 3, Round Robin). Top 2 da Principal serão Campeã e Vice. Melhor da Repescagem será Campeã da Repescagem. Principal: melhor de 3 sets, No-Ad. Repescagem: Set-Pro até 8, No-Ad.' },
          { label: 'Categoria Prata Feminino (8 equipes)', text: 'Primeira rodada por Sorteio. Vencedores do primeiro confronto disputam Chave Principal e os perdedores disputam Chave Repescagem. Principal: melhor de 3 sets, No-Ad. Repescagem: Set-Pro até 8, No-Ad. Campeão promove para Ouro. Piores 2 podem disputar Qualifying para a próxima edição.' }
        ]
      },
      {
        id: 'premiacao',
        title: 'Premiação, Taxas & Condições Gerais',
        icon: Award,
        items: [
          { label: 'Premiação', text: 'Troféus para as equipes Campeã, Vice-Campeã e Campeã da Repescagem em todas as Categorias.' },
          { label: 'Taxa de Inscrição', text: 'R$ 350,00 (Trezentos e cinquenta reais) por atleta, com direito ao almoço de encerramento (19 de Julho).' },
          { label: 'Direitos da Comissão', text: 'A Comissão se reserva ao direito de alterar o sistema de chaveamento, sistema dos jogos e horários, em caso de alterações no número de duplas participantes ou motivo de força maior.' },
          { label: 'Dúvidas e Penalidades', text: 'Qualquer dúvida sobre a aplicação e interpretação do regulamento, inclusive sobre a aplicação de penalidades, será resolvida pela Comissão Técnica e Disciplinar, cuja decisão será soberana e definitiva.' },
          { label: 'Casos Omissos', text: 'Os casos omissos no presente regulamento serão resolvidos pela Comissão Organizadora.' },
          { label: 'Comprovação de Identidade', text: 'A qualquer momento, a comissão pode pedir RG ou outro documento que prove a identidade conforme a inscrição prévia.' }
        ]
      }
    ];
  }, []);

  // Filter and search logic
  const filteredRules = useMemo(() => {
    return rulesData
      .map(category => {
        // If specific category is active, bypass others
        if (activeCategory !== 'todos' && category.id !== activeCategory) {
          return null;
        }

        // Filter items inside category based on search
        const matchedItems = category.items.filter(item => {
          const searchLower = searchTerm.toLowerCase();
          return (
            item.label.toLowerCase().includes(searchLower) ||
            item.text.toLowerCase().includes(searchLower)
          );
        });

        if (matchedItems.length === 0) return null;

        return {
          ...category,
          items: matchedItems
        };
      })
      .filter((cat): cat is typeof rulesData[0] => cat !== null);
  }, [searchTerm, activeCategory, rulesData]);

  // Helper to highlight searched terms
  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div id="regulamento-page-container" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Return Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gold/15 pb-6 mb-8">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-xs transition hover:border-[#c93b2b]/30 hover:bg-[#c93b2b]/5 hover:text-[#c93b2b]"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c93b2b]">
              11º Intercolonial Nippon Sorocaba
            </span>
            <h1 className="font-serif text-3xl font-black text-stone-900 tracking-tight leading-none mt-1">
              REGULAMENTO OFICIAL
            </h1>
          </div>
        </div>
        
        {/* Quick info tag */}
        <div className="mt-4 sm:mt-0 inline-flex items-center space-x-2 rounded-full bg-stone-100 px-4 py-1.5 text-xs font-semibold text-stone-600 border border-stone-200">
          <BookOpen className="h-4 w-4 text-gold-dark" />
          <span>Vigência: Julho de 2026</span>
        </div>
      </div>

      {/* Control Panel: Search & Categories */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 mb-8">
        {/* Search Input (7 cols) */}
        <div className="md:col-span-6 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-stone-400">
            <Search className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            placeholder="Pesquisar regra, termo, WO, super tie-break..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:border-[#c93b2b] focus:ring-1 focus:ring-[#c93b2b] text-sm text-stone-800 placeholder-stone-400 font-medium shadow-2xs outline-none transition"
          />
        </div>

        {/* Category Filters (5 cols) */}
        <div className="md:col-span-6 flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 shrink-0 mr-1 hidden lg:inline">
            Filtros:
          </span>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'geral', label: 'Geral' },
            { id: 'composicao', label: 'Composição' },
            { id: 'jogos', label: 'Formato' },
            { id: 'operacao', label: 'Súmula/WO' },
            { id: 'sistematica', label: 'Chaves' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation Index (Desktop Only) */}
        <div className="hidden lg:block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block px-3 mb-2">
            Índice de Seções
          </span>
          {rulesData.map(section => {
            const SectionIcon = section.icon;
            const isActive = activeCategory === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveCategory(section.id);
                  setSearchTerm('');
                  const element = document.getElementById(`section-${section.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? 'bg-gold/15 text-gold-dark border border-gold/10'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <SectionIcon className={`h-4.5 w-4.5 ${isActive ? 'text-gold-dark' : 'text-stone-400'}`} />
                  <span>{section.title}</span>
                </div>
                <ChevronRight className="h-3 w-3 opacity-60" />
              </button>
            );
          })}
          
          <div className="mt-8 p-4 rounded-xl bg-orange-50/50 border border-orange-100 space-y-2">
            <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wider block">Suporte ao Atleta</span>
            <p className="text-[11px] text-orange-700/90 leading-relaxed font-semibold">
              Qualquer dúvida de arbitragem ou interpretação será dirimida soberanamente pela Comissão Técnica e Disciplinar.
            </p>
          </div>
        </div>

        {/* Dynamic Rules List (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-12">
          {filteredRules.length > 0 ? (
            filteredRules.map(section => {
              const SectionIcon = section.icon;
              return (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden scroll-mt-24"
                >
                  {/* Section Title Header */}
                  <div className="flex items-center space-x-3 bg-stone-50 border-b border-stone-100 px-6 py-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c93b2b]/10 text-[#c93b2b]">
                      <SectionIcon className="h-4.5 w-4.5" />
                    </span>
                    <h2 className="font-serif text-lg font-black text-stone-900 uppercase tracking-wide">
                      {section.title}
                    </h2>
                  </div>

                  {/* Section Rule Items */}
                  <div className="divide-y divide-stone-100">
                    {section.items.map((item, index) => (
                      <div key={index} className="p-6 hover:bg-stone-50/30 transition">
                        <span className="text-xs font-bold text-gold-dark uppercase tracking-wide block">
                          {highlightText(item.label, searchTerm)}
                        </span>
                        <p className="mt-1 text-sm text-stone-600 font-medium leading-relaxed">
                          {highlightText(item.text, searchTerm)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
              <span className="text-stone-400 block font-serif italic text-base">Nenhuma regra encontrada</span>
              <p className="text-stone-500 text-xs mt-1">Experimente buscar por outros termos como "súmula", "WO" ou "sets".</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('todos');
                }}
                className="mt-4 text-xs font-bold text-[#c93b2b] uppercase hover:underline"
              >
                Limpar filtros e busca
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating back button helper */}
      <div className="mt-12 flex justify-center border-t border-gold/15 pt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 rounded-full bg-stone-900 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-stone-800 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para a Página Principal</span>
        </button>
      </div>
    </div>
  );
}
