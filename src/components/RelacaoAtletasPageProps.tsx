import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Users, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface RelacaoAtletasPageProps {
  onBack: () => void;
}

type Atleta = {
  id: number;
  atleta_id?: number;
  id_atleta?: number;
  equipe_id?: number;
  nome: string;
};

type Equipe = {
  id: number;
  equipe_id?: number;
  id_equipe?: number;
  categoria_id?: number;
  nome: string;
  atletas: Atleta[];
};

type Categoria = {
  id: number;
  categoria_id?: number;
  id_categoria?: number;
  titulo: string;
  equipes: Equipe[];
};

type RespostaAPI = {
  categorias: Categoria[];
};

type FaixaEtaria = 120 | 130 | 140 | 150 | 160;

type CategoriaSelecionada = FaixaEtaria | "todos";

const API_URL =
  "https://sothink.com.br/centenario26/api/v2/nippon";

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

function totalAtletas(categoria: Categoria) {
  return categoria.equipes.reduce(
    (total, equipe) => total + (equipe.atletas?.length || 0),
    0,
  );
}

function TabelaCategoria({
  categoria,
}: {
  categoria: Categoria;
}) {
  return (
    <section className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* TÍTULO */}
      <header className="flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3">

        <div className="flex min-w-0 items-center gap-2">

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c93b2b]/10 text-[#c93b2b]">
            <Users className="h-4 w-4" />
          </span>

          <div className="min-w-0">

            <h2 className="truncate text-[13px] font-bold uppercase text-black md:text-[14px]">
              {categoria.titulo}
            </h2>

            <p className="text-[10px] font-semibold text-gray-400">
              {totalAtletas(categoria)} atletas cadastrados
            </p>

          </div>

        </div>

        <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-600">
          {categoria.equipes?.length || 0} duplas
        </span>

      </header>

      {/* EQUIPES / DUPLAS */}
      <div className="divide-y divide-gray-100">

        {categoria.equipes?.map((equipe, equipeIndex) => (

          <div
            key={equipe.id || `${categoria.id}-${equipeIndex}`}
            className="grid grid-cols-[42px_36%_1fr] items-center gap-2 px-3 py-3 transition hover:bg-gray-50"
          >

            {/* NÚMERO */}
            <div className="flex justify-center">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-600">
                {equipeIndex + 1}
              </span>

            </div>

            {/* NOME DA EQUIPE */}
            <div className="border-r border-gray-100 pr-2 text-center text-[11px] font-bold uppercase leading-tight text-black md:text-[12px]">
              {equipe.nome}
            </div>

            {/* ATLETAS */}
            <div className="px-1 text-center">

              {equipe.atletas && equipe.atletas.length > 0 ? (

                <div className="flex flex-col">

                  {equipe.atletas.map((atleta, atletaIndex) => (

                    <span
                      key={atleta.id || `${equipe.id}-${atletaIndex}`}
                      className="block text-[11px] font-medium leading-[1.35] text-black md:text-[12px]"
                    >
                      {atleta.nome}
                    </span>

                  ))}

                </div>

              ) : (

                <span className="text-[11px] text-gray-400">
                  Sem atletas
                </span>

              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default function RelacaoAtletasPage({
  onBack,
}: RelacaoAtletasPageProps) {

  const [categoriaAtual, setCategoriaAtual] =
    useState<CategoriaSelecionada>(120);

  const [categoriasBanco, setCategoriasBanco] =
    useState<Categoria[]>([]);

  const [loading, setLoading] = useState(true);

  const [erro, setErro] = useState<string | null>(null);

  /*
  ============================================
  CARREGA AS CATEGORIAS DO BANCO
  ============================================
  */
  useEffect(() => {

    const carregarDados = async () => {

      try {

        setLoading(true);
        setErro(null);

        const response = await fetch(
          `${API_URL}/listar?tabela=completo`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            `Erro HTTP ${response.status}`,
          );
        }

        const json: RespostaAPI = await response.json();

        if (
          !json ||
          !Array.isArray(json.categorias)
        ) {
          throw new Error(
            "Formato inválido recebido da API.",
          );
        }

        setCategoriasBanco(json.categorias);

      } catch (error) {

        console.error(
          "Erro carregando relação de atletas:",
          error,
        );

        setErro(
          "Não foi possível carregar a relação de atletas.",
        );

      } finally {

        setLoading(false);

      }

    };

    carregarDados();

  }, []);

  /*
  ============================================
  ORDENA AS CATEGORIAS
  ============================================
  */
  const categorias = useMemo(() => {

    return ordenarCategorias(categoriasBanco);

  }, [categoriasBanco]);

  /*
  ============================================
  FILTRA PELA IDADE
  ============================================
  */
  const categoriasExibidas = useMemo(() => {

    if (categoriaAtual === "todos") {
      return categorias;
    }

    return categorias.filter(
      (categoria) =>
        pegarIdade(categoria.titulo) === categoriaAtual,
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
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          {/* NAVEGAÇÃO */}
          <nav className="mb-10 flex flex-wrap items-center justify-center gap-2">

            {FAIXAS.map((idade) => (

              <button
                key={idade}
                type="button"
                onClick={() =>
                  setCategoriaAtual(idade)
                }
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
              onClick={() =>
                setCategoriaAtual("todos")
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                categoriaAtual === "todos"
                  ? "bg-[#c93b2b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>

          </nav>

          {/* CARREGANDO */}
          {loading && (

            <div className="flex min-h-[300px] flex-col items-center justify-center">

              <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#c93b2b]" />

              <p className="text-sm font-medium text-gray-500">
                Carregando atletas...
              </p>

            </div>

          )}

          {/* ERRO */}
          {!loading && erro && (

            <div className="flex min-h-[300px] flex-col items-center justify-center">

              <AlertCircle className="mb-3 h-8 w-8 text-red-500" />

              <p className="text-sm font-semibold text-red-600">
                {erro}
              </p>

            </div>

          )}

          {/* CATEGORIAS */}
          {!loading && !erro && (

            <>
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

                  {categoriasExibidas.map(
                    (categoria) => (

                      <TabelaCategoria
                        key={categoria.id}
                        categoria={categoria}
                      />

                    ),
                  )}

                </div>

              ) : (

                <div className="py-20 text-center text-gray-500">
                  Nenhuma categoria encontrada.
                </div>

              )}
            </>

          )}

        </motion.div>

      </div>

    </div>
  );
}