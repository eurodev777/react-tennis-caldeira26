import React, { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

import { relacaoMock } from "../relacaoMock";

interface RelacaoAtletasPageProps {
  onBack: () => void;
}

type Equipe = {
  nome: string;
  atletas: string[];
};

type Categoria = {
  titulo: string;
  equipes: Equipe[];
};

type FaixaEtaria = 120 | 130 | 140 | 150 | 160;
type CategoriaSelecionada = FaixaEtaria | "todos";

const FAIXAS: FaixaEtaria[] = [120, 130, 140, 150, 160];

function pegarIdade(titulo: string): number | null {
  const match = titulo.match(/\b(120|130|140|150|160)\b/);

  return match ? Number(match[1]) : null;
}

function pegarLetra(titulo: string): string | null {
  const match = titulo.match(/["']?([A-F])["']?\s*$/i);

  return match ? match[1].toUpperCase() : null;
}

function ordemCategoria(categoria: Categoria) {
  const idade = pegarIdade(categoria.titulo) ?? 999;
  const letra = pegarLetra(categoria.titulo);

  return {
    idade,
    letra: letra ? letra.charCodeAt(0) : 999,
  };
}

function ordenarCategorias(categorias: Categoria[]) {
  return [...categorias].sort((a, b) => {
    const ordemA = ordemCategoria(a);
    const ordemB = ordemCategoria(b);

    if (ordemA.idade !== ordemB.idade) {
      return ordemA.idade - ordemB.idade;
    }

    return ordemA.letra - ordemB.letra;
  });
}

function TabelaCategoria({ categoria }: { categoria: Categoria }) {
  return (
    <section className="w-full">
      {/* Título da tabela */}
      <h2 className="mb-1.5 text-center text-[13px] font-bold text-black md:text-[14px]">
        {categoria.titulo}
      </h2>

      {/* Tabela */}
      <div className="overflow-hidden border border-black bg-white">
        <table className="w-full table-fixed border-collapse">
          <tbody>
            {categoria.equipes.map((equipe, equipeIndex) => (
              <tr
                key={`${categoria.titulo}-${equipe.nome}-${equipeIndex}`}
                className="border-b border-black last:border-b-0"
              >
                {/* COLUNA 1 - EQUIPE */}
                <td className="w-[36%] border-r border-black px-2 py-1.5 align-middle text-center text-[11px] leading-tight text-black md:text-[12px]">
                  {equipe.nome}
                </td>

                {/* COLUNA 2 - ATLETAS */}
                <td className="w-[64%] px-2 py-1 align-middle text-center">
                  {equipe.atletas.length > 0 ? (
                    <div className="flex flex-col">
                      {equipe.atletas.map((atleta, atletaIndex) => (
                        <span
                          key={`${atleta}-${atletaIndex}`}
                          className="block text-[11px] leading-[1.35] text-black md:text-[12px]"
                        >
                          {atleta}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400">
                      Sem atletas
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function RelacaoAtletasPage({
  onBack,
}: RelacaoAtletasPageProps) {
  const [categoriaAtual, setCategoriaAtual] =
    useState<CategoriaSelecionada>(120);

  const categorias = useMemo(
    () => ordenarCategorias(relacaoMock.categorias),
    [],
  );

  const categoriasExibidas = useMemo(() => {
    if (categoriaAtual === "todos") {
      return categorias;
    }

    return categorias.filter(
      (categoria) => pegarIdade(categoria.titulo) === categoriaAtual,
    );
  }, [categoriaAtual, categorias]);

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-[1500px]">
        {/* VOLTAR */}
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex items-center font-semibold text-[#c93b2b] transition hover:opacity-80"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar para a Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* NAVEGAÇÃO SOMENTE POR IDADE */}
          <nav className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {FAIXAS.map((idade) => (
              <button
                key={idade}
                type="button"
                onClick={() => setCategoriaAtual(idade)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  categoriaAtual === idade
                    ? "bg-[#c93b2b] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {idade} ANOS
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCategoriaAtual("todos")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                categoriaAtual === "todos"
                  ? "bg-[#c93b2b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
          </nav>

          {/* TABELAS */}
          {categoriasExibidas.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-x-8
                gap-y-10
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {categoriasExibidas.map((categoria, index) => (
                <TabelaCategoria
                  key={`${categoria.titulo}-${index}`}
                  categoria={categoria}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-500">
              Nenhuma categoria encontrada.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}