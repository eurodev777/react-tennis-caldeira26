import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, Users, MapPin, Trophy, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface RelacaoAtletasPageProps {
  onBack: () => void;
}

type Atleta = {
  nome: string;
};

type Dupla = {
  id?: string | number;
  nome?: string;
  jogador1?: string;
  jogador2?: string;
  atletas?: Atleta[];
};

type Equipe = {
  id?: string | number;
  nome: string;
  cidade?: string;
  clube?: string;
  categoria?: string;
  duplas?: Dupla[];
  atletas?: Atleta[];
};

const API_EQUIPES = "https://sothink.com.br/centenario26/api/v2/nippon/equipes/listar";

const EQUIPES_EXEMPLO: Equipe[] = [
  {
    id: "exemplo-1",
    nome: "Nippon Sorocaba",
    cidade: "Sorocaba",
    categoria: "Duplas 120 anos",
    duplas: [
      {
        nome: "Dupla 1",
        jogador1: "Akira Tanaka",
        jogador2: "Carlos Sato",
      },
      {
        nome: "Dupla 2",
        jogador1: "Eduardo Yamamoto",
        jogador2: "Roberto Suzuki",
      },
    ],
  },
  {
    id: "exemplo-2",
    nome: "Cooper Cotia",
    cidade: "Cotia",
    categoria: "Duplas 130 anos",
    duplas: [
      {
        nome: "Dupla 1",
        jogador1: "Marcos Nakamura",
        jogador2: "Paulo Kato",
      },
      {
        nome: "Dupla 2",
        jogador1: "Sérgio Mori",
        jogador2: "Rogério Kimura",
      },
    ],
  },
  {
    id: "exemplo-3",
    nome: "M. Camicado",
    cidade: "São Paulo",
    categoria: "Duplas 140 anos",
    duplas: [
      {
        nome: "Dupla 1",
        jogador1: "Kenji Matsuda",
        jogador2: "Luiz Watanabe",
      },
    ],
  },
];

function texto(valor: unknown): string {
  return String(valor ?? "").trim();
}

function arraySeguro<T>(valor: unknown): T[] {
  return Array.isArray(valor) ? (valor as T[]) : [];
}

function pegarArrayPrincipal(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (!payload || typeof payload !== "object") return [];

  const obj = payload as Record<string, unknown>;

  const candidatos = [
    obj.data,
    obj.dados,
    obj.equipes,
    obj.items,
    obj.result,
    obj.results,
    obj.lista,
  ];

  for (const item of candidatos) {
    if (Array.isArray(item)) return item;
  }

  return [];
}

function normalizarDupla(item: unknown, index: number): Dupla {
  if (!item || typeof item !== "object") {
    return {
      id: `dupla-${index}`,
      nome: `Dupla ${index + 1}`,
      jogador1: "",
      jogador2: "",
    };
  }

  const obj = item as Record<string, unknown>;

  const atletas = arraySeguro<Record<string, unknown>>(obj.atletas || obj.jogadores).map((atleta) => ({
    nome: texto(atleta.nome || atleta.name),
  })).filter((atleta) => atleta.nome);

  return {
    id: texto(obj.id) || `dupla-${index}`,
    nome: texto(obj.nome || obj.dupla || obj.name) || `Dupla ${index + 1}`,
    jogador1: texto(obj.jogador1 || obj.atleta1 || obj.player1),
    jogador2: texto(obj.jogador2 || obj.atleta2 || obj.player2),
    atletas,
  };
}

function normalizarEquipe(item: unknown, index: number): Equipe {
  if (!item || typeof item !== "object") {
    return {
      id: `equipe-${index}`,
      nome: `Equipe ${index + 1}`,
      duplas: [],
    };
  }

  const obj = item as Record<string, unknown>;

  const duplasRaw = arraySeguro<unknown>(obj.duplas || obj.doubles || obj.pares);
  const atletasRaw = arraySeguro<Record<string, unknown>>(obj.atletas || obj.jogadores || obj.players);

  return {
    id: texto(obj.id) || `equipe-${index}`,
    nome:
      texto(obj.nome) ||
      texto(obj.equipe) ||
      texto(obj.clube) ||
      texto(obj.cidade) ||
      `Equipe ${index + 1}`,
    cidade: texto(obj.cidade || obj.city),
    clube: texto(obj.clube || obj.club),
    categoria: texto(obj.categoria || obj.category || obj.chave),
    duplas: duplasRaw.map(normalizarDupla),
    atletas: atletasRaw
      .map((atleta) => ({
        nome: texto(atleta.nome || atleta.name),
      }))
      .filter((atleta) => atleta.nome),
  };
}

function extrairEquipesDaApi(payload: unknown): Equipe[] {
  return pegarArrayPrincipal(payload)
    .map(normalizarEquipe)
    .filter((equipe) => equipe.nome);
}

function atletasDaDupla(dupla: Dupla): string {
  const nomesArray = arraySeguro<Atleta>(dupla.atletas)
    .map((atleta) => texto(atleta.nome))
    .filter(Boolean);

  if (nomesArray.length) return nomesArray.join(" / ");

  return [texto(dupla.jogador1), texto(dupla.jogador2)].filter(Boolean).join(" / ");
}

function quantidadeAtletas(equipe: Equipe): number {
  const porDupla = arraySeguro<Dupla>(equipe.duplas).reduce((total, dupla) => {
    const jogadores = atletasDaDupla(dupla);
    return total + (jogadores ? jogadores.split("/").filter((nome) => nome.trim()).length : 0);
  }, 0);

  if (porDupla > 0) return porDupla;

  return arraySeguro<Atleta>(equipe.atletas).length;
}

export default function RelacaoAtletasPageProps({ onBack }: RelacaoAtletasPageProps) {
  const [equipesApi, setEquipesApi] = useState<Equipe[]>([]);
  const [usarExemplo, setUsarExemplo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  useEffect(() => {
    let ativo = true;

    async function carregarEquipes() {
      setLoading(true);
      setErro("");

      try {
        const res = await fetch(API_EQUIPES, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Erro ${res.status}`);
        }

        const data = await res.json();
        const equipes = extrairEquipesDaApi(data);

        if (!ativo) return;

        if (equipes.length) {
          setEquipesApi(equipes);
          setUsarExemplo(false);
        } else {
          setEquipesApi(EQUIPES_EXEMPLO);
          setUsarExemplo(true);
        }
      } catch (error) {
        if (!ativo) return;

        setEquipesApi(EQUIPES_EXEMPLO);
        setUsarExemplo(true);
        setErro("A API ainda não retornou equipes cadastradas. Exibindo exemplo.");
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarEquipes();

    return () => {
      ativo = false;
    };
  }, []);

  const categorias = useMemo(() => {
    const lista = equipesApi
      .map((equipe) => texto(equipe.categoria))
      .filter(Boolean);

    return ["todos", ...Array.from(new Set(lista))];
  }, [equipesApi]);

  const equipesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return equipesApi.filter((equipe) => {
      const categoriaOk =
        categoriaAtiva === "todos" || texto(equipe.categoria) === categoriaAtiva;

      const conteudo = [
        equipe.nome,
        equipe.cidade,
        equipe.clube,
        equipe.categoria,
        ...arraySeguro<Dupla>(equipe.duplas).flatMap((dupla) => [
          dupla.nome,
          dupla.jogador1,
          dupla.jogador2,
          atletasDaDupla(dupla),
        ]),
        ...arraySeguro<Atleta>(equipe.atletas).map((atleta) => atleta.nome),
      ]
        .join(" ")
        .toLowerCase();

      const buscaOk = !termo || conteudo.includes(termo);

      return categoriaOk && buscaOk;
    });
  }, [equipesApi, categoriaAtiva, busca]);

  return (
    <div className="min-h-screen bg-[#FCFAF2] px-4 py-8 md:px-8">
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
          transition={{ duration: 0.35 }}
        >
          <div className="mb-8 text-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#c93b2b]">
              Nippon Sorocaba 2026
            </span>

            <h1 className="mt-2 font-serif text-3xl font-black uppercase text-stone-900 md:text-4xl">
              Relação de Equipes e Atletas
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-stone-600">
              Consulte as cidades/clubes cadastrados, suas duplas e seus atletas.
            </p>
          </div>

          <div className="mb-6 grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por equipe, cidade, dupla ou atleta..."
                className="w-full rounded-xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#c93b2b] focus:ring-1 focus:ring-[#c93b2b]"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCategoriaAtiva(categoria)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black uppercase transition ${
                    categoriaAtiva === categoria
                      ? "bg-stone-900 text-white shadow-sm"
                      : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {categoria === "todos" ? "Todos" : categoria}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="mb-6 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-bold text-blue-900">
              Carregando equipes...
            </div>
          ) : null}

          {usarExemplo ? (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                Exemplo de visualização. Quando a API tiver equipes cadastradas, esses dados
                demonstrativos somem automaticamente.
                {erro ? <span className="block text-xs font-semibold opacity-80">{erro}</span> : null}
              </div>
            </div>
          ) : null}

          {equipesFiltradas.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {equipesFiltradas.map((equipe, index) => {
                const duplas = arraySeguro<Dupla>(equipe.duplas);
                const atletasSoltos = arraySeguro<Atleta>(equipe.atletas);

                return (
                  <article
                    key={`${equipe.id || equipe.nome}-${index}`}
                    className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="border-b border-stone-100 bg-stone-50 px-5 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-black uppercase leading-tight text-stone-900">
                            {equipe.nome}
                          </h2>

                          {(equipe.cidade || equipe.clube) ? (
                            <div className="mt-1 flex items-center gap-1 text-xs font-bold text-stone-500">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{equipe.cidade || equipe.clube}</span>
                            </div>
                          ) : null}
                        </div>

                        {equipe.categoria ? (
                          <span className="rounded-full bg-[#c93b2b]/10 px-3 py-1 text-[10px] font-black uppercase text-[#c93b2b]">
                            {equipe.categoria}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-white px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-1 text-xs font-black uppercase text-stone-500">
                            <Trophy className="h-3.5 w-3.5" />
                            Duplas
                          </div>
                          <strong className="text-lg font-black text-stone-900">
                            {duplas.length}
                          </strong>
                        </div>

                        <div className="rounded-xl bg-white px-3 py-2 text-center">
                          <div className="flex items-center justify-center gap-1 text-xs font-black uppercase text-stone-500">
                            <Users className="h-3.5 w-3.5" />
                            Atletas
                          </div>
                          <strong className="text-lg font-black text-stone-900">
                            {quantidadeAtletas(equipe)}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 p-5">
                      {duplas.length ? (
                        duplas.map((dupla, duplaIndex) => (
                          <div
                            key={`${dupla.id || dupla.nome}-${duplaIndex}`}
                            className="rounded-xl border border-stone-100 bg-[#FCFAF2] px-4 py-3"
                          >
                            <div className="text-xs font-black uppercase tracking-wide text-[#8a6512]">
                              {dupla.nome || `Dupla ${duplaIndex + 1}`}
                            </div>

                            <div className="mt-1 text-sm font-bold leading-relaxed text-stone-800">
                              {atletasDaDupla(dupla) || "Atletas a definir"}
                            </div>
                          </div>
                        ))
                      ) : atletasSoltos.length ? (
                        <div className="rounded-xl border border-stone-100 bg-[#FCFAF2] px-4 py-3">
                          <div className="text-xs font-black uppercase tracking-wide text-[#8a6512]">
                            Atletas
                          </div>

                          <div className="mt-1 text-sm font-bold leading-relaxed text-stone-800">
                            {atletasSoltos.map((atleta) => atleta.nome).join(" / ")}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-stone-200 px-4 py-6 text-center text-sm font-bold text-stone-400">
                          Nenhuma dupla cadastrada.
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-12 text-center">
              <strong className="block text-stone-500">Nenhuma equipe encontrada.</strong>

              <button
                onClick={() => {
                  setBusca("");
                  setCategoriaAtiva("todos");
                }}
                className="mt-3 text-xs font-black uppercase text-[#c93b2b] hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
