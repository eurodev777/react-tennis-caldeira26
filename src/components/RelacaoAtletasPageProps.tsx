import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { relacaoMock } from "../relacaoMock";

interface RelacaoAtletasPageProps {
  onBack: () => void;
}

type Atleta = {
  id?: string | number;
  nome: string;
};

type Equipe = {
  id?: string | number;
  nome: string;
  atletas: Atleta[];
};

type Categoria = {
  id?: string | number;
  titulo: string;
  equipes: Equipe[];
};

type Relacao = {
  categorias: Categoria[];
};

type CategoriaSelecionada = number | "todos";

const API_RELACAO =
  "https://sothink.com.br/centenario26/api/v2/nippon/listar?tabela=completo";

const ORDEM_CATEGORIAS = [120, 130, 140, 150, 160];

function nomeCategoria(titulo: string) {
  return titulo.replace(/^RELAÇÃO DOS ATLETAS\s*-\s*/i, "").trim();
}

function idadeDaCategoria(titulo: string) {
  const match = titulo.match(/\b(120|130|140|150|160)\b/);
  return match ? Number(match[1]) : 999;
}

function ordenarCategorias(categorias: Categoria[]) {
  return [...categorias].sort((a, b) => {
    const idadeA = idadeDaCategoria(a.titulo);
    const idadeB = idadeDaCategoria(b.titulo);

    const posA = ORDEM_CATEGORIAS.indexOf(idadeA);
    const posB = ORDEM_CATEGORIAS.indexOf(idadeB);

    const ordemA = posA === -1 ? 999 : posA;
    const ordemB = posB === -1 ? 999 : posB;

    return ordemA - ordemB;
  });
}

function normalizarAtleta(atleta: any, atletaIndex: number): Atleta | null {
  // O mock atual usa atletas como strings.
  if (typeof atleta === "string") {
    const nome = atleta.trim();
    return nome ? { id: atletaIndex, nome } : null;
  }

  // A API pode retornar objetos.
  const nome = String(atleta?.nome ?? atleta?.name ?? "").trim();

  if (!nome) return null;

  return {
    id: atleta?.id ?? atletaIndex,
    nome,
  };
}


function relacaoTemConteudo(relacao: Relacao): boolean {
  return relacao.categorias.some((categoria) =>
    categoria.equipes.some((equipe) => equipe.atletas.length > 0),
  );
}

function normalizarRelacao(payload: any): Relacao {
  if (Array.isArray(payload?.categorias)) {
    const categorias = payload.categorias.map(
      (categoria: any, categoriaIndex: number): Categoria => ({
        id: categoria?.id ?? categoriaIndex,
        titulo: String(
          categoria?.titulo ?? categoria?.nome ?? `Categoria ${categoriaIndex + 1}`,
        ).trim(),
        equipes: Array.isArray(categoria?.equipes)
          ? categoria.equipes.map((equipe: any, equipeIndex: number) => ({
              id: equipe?.id ?? equipeIndex,
              nome: String(
                equipe?.nome ?? equipe?.equipe ?? `Equipe ${equipeIndex + 1}`,
              ).trim(),
              atletas: Array.isArray(equipe?.atletas)
                ? equipe.atletas
                    .map((atleta: any, atletaIndex: number) =>
                      normalizarAtleta(atleta, atletaIndex),
                    )
                    .filter((atleta: Atleta | null): atleta is Atleta => atleta !== null)
                : [],
            }))
          : [],
      }),
    );

    return {
      categorias: ordenarCategorias(categorias),
    };
  }

  const interno = payload?.data ?? payload?.dados ?? payload?.result;

  if (interno && interno !== payload) {
    return normalizarRelacao(interno);
  }

  return { categorias: [] };
}

function TabelaCategoria({ categoria }: { categoria: Categoria }) {
  return (
    <section>
      <h1 className="mb-12 text-center text-xl font-bold uppercase tracking-widest text-black md:text-2xl">
        {categoria.titulo}
      </h1>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {categoria.equipes.map((equipe, equipeIndex) => (
          <div key={equipe.id ?? equipeIndex} className="flex flex-col">
            <h3 className="mb-2 text-center text-sm font-bold uppercase text-[#e31818] md:text-[15px]">
              {equipe.nome}
            </h3>

            <div className="flex min-h-[100px] flex-col border-[1.5px] border-black bg-white">
              {equipe.atletas.length > 0 ? (
                equipe.atletas.map((atleta, atletaIndex) => {
                  const isCaptain = atleta.nome.includes("(C)");

                  return (
                    <div
                      key={atleta.id ?? `${equipeIndex}-${atletaIndex}`}
                      className="border-b border-black px-2 py-2.5 text-center last:border-b-0"
                    >
                      <span
                        className={`text-[15px] text-black ${
                          isCaptain ? "font-bold" : ""
                        }`}
                      >
                        {atleta.nome}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="px-2 py-4 text-center text-sm text-stone-400">
                  Nenhum atleta cadastrado.
                </div>
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
  const [dados, setDados] = useState<Relacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriaAtual, setCategoriaAtual] =
    useState<CategoriaSelecionada>(0);

  useEffect(() => {
    let ativo = true;

    const fetchRelacao = async () => {
      setLoading(true);

      try {
        const response = await fetch(API_RELACAO, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }

        const json = await response.json();
        const relacaoApi = normalizarRelacao(json);

        if (!ativo) return;

        // A API pode responder 200 e ainda trazer só a categoria, sem equipes/atletas.
        // Nesse caso, consideramos que não há conteúdo útil e usamos o mock completo.
        if (relacaoTemConteudo(relacaoApi)) {
          setDados(relacaoApi);
        } else {
          console.warn(
            "API retornou sem equipes/atletas. Usando relacaoMock como fallback.",
          );
          setDados(normalizarRelacao(relacaoMock));
        }
      } catch (error) {
        if (!ativo) return;

        console.warn("API falhou, usando dados de mock (fallback).", error);
        setDados(normalizarRelacao(relacaoMock));
      } finally {
        if (ativo) setLoading(false);
      }
    };

    fetchRelacao();

    return () => {
      ativo = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-20 text-center text-stone-500">
        Carregando relação de atletas...
      </div>
    );
  }

  const categorias = dados?.categorias ?? [];

  if (!categorias.length) {
    return (
      <div className="min-h-screen bg-white px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="mb-8 flex items-center font-semibold text-[#c93b2b] transition hover:opacity-80"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para a Home
          </button>

          <div className="p-20 text-center text-stone-500">
            Nenhuma categoria encontrada.
          </div>
        </div>
      </div>
    );
  }

  const categoriasExibidas =
    categoriaAtual === "todos"
      ? categorias
      : categorias[categoriaAtual]
        ? [categorias[categoriaAtual]]
        : [];

  return (
    <div className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center font-semibold text-[#c93b2b] transition hover:opacity-80"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar para a Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Categorias na ordem 120, 130, 140, 150, 160 e TODOS no final */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categorias.map((cat, index) => (
              <button
                key={cat.id ?? index}
                onClick={() => setCategoriaAtual(index)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  categoriaAtual === index
                    ? "bg-[#c93b2b] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {nomeCategoria(cat.titulo)}
              </button>
            ))}

            <button
              onClick={() => setCategoriaAtual("todos")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                categoriaAtual === "todos"
                  ? "bg-[#c93b2b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
          </div>

          <div className="space-y-20">
            {categoriasExibidas.map((categoria, index) => (
              <TabelaCategoria
                key={categoria.id ?? `${categoria.titulo}-${index}`}
                categoria={categoria}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
