import React, { useEffect, useMemo, useRef, useState } from "react";

type JogosModo = "fotos" | "sistema";

type Categoria = {
  id: number | string;
  nome: string;
};

type Torneio = {
  id: number | string;
  titulo: string;
  subtitulo?: string;
  status?: string;
};

type Dupla = {
  id: number | string;
  nome?: string;
  equipe_nome?: string;
  equipe_base_nome?: string;
  cidade?: string;
  clube?: string;
  jogador1?: string;
  jogador2?: string;
};

type SetJogo = {
  id?: number | string;
  jogo_id?: number | string;
  numero_set?: number | string;
  pontos_dupla1?: number | string | null;
  pontos_dupla2?: number | string | null;
};

type Jogo = {
  id: number | string;
  tipo_chave?: "principal" | "repescagem" | "final" | string;
  coluna_chave?: number | string;
  fase?: string;
  codigo?: string;
  data_jogo?: string;
  ordem?: number | string;
  status?: string;
  dupla1_id?: number | string | null;
  dupla2_id?: number | string | null;
  dupla1_nome?: string;
  dupla2_nome?: string;
  dupla1_label?: string;
  dupla2_label?: string;
  dupla1_equipe_nome?: string;
  dupla2_equipe_nome?: string;
  dupla1_jogador1?: string;
  dupla1_jogador2?: string;
  dupla2_jogador1?: string;
  dupla2_jogador2?: string;
  placar1?: string | number | null;
  placar2?: string | number | null;
  vencedor_nome?: string;
  sets?: SetJogo[];
};

type DetalhesChave = {
  torneio?: Torneio;
  duplas?: Dupla[];
  jogos?: Jogo[];
  sets?: SetJogo[];
};

type JogosPageProps = {
  onBack?: () => void;
  initialMode?: JogosModo;
};

type CardLayout = {
  jogo: Jogo;
  top: number;
  left: number;
};

type TitleLayout = {
  label: string;
  top: number;
  left: number;
  width: number;
};

const API_IMAGENS = "https://sothink.com.br/centenario26/api/v2/nippon/list-images";
const BASE_IMAGENS = "https://sothink.com.br/centenario26/";
const API_CHAVES = "https://sothink.com.br/apichaves/api/jogos";

const CARD_W = 355;
const CARD_H = 184;
const GAP_COL = 36;
const GAP_SECAO = 44;
const BOARD_TOP = 72;
const GROUP_TITLE_H = 34;

function texto(valor: unknown): string {
  return String(valor ?? "").trim();
}

function normalizar(valor: unknown): string {
  return texto(valor).toLowerCase();
}

function idNumerico(valor: unknown): number {
  return Number(valor || 0);
}

function urlImagem(caminho: string): string {
  if (!caminho) return "";

  if (caminho.startsWith("http://") || caminho.startsWith("https://")) {
    return caminho;
  }

  return BASE_IMAGENS + caminho.replace(/^\/+/, "");
}


function pareceImagem(valor: string): boolean {
  const v = valor.trim();

  if (!v) return false;

  if (/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(v)) {
    return true;
  }

  if (/\/(uploads|storage|images|imagens|galeria|chaves)\//i.test(v)) {
    return true;
  }

  return false;
}

function extrairImagensDaApi(payload: unknown): string[] {
  const imagens: string[] = [];
  const vistos = new Set<string>();

  const adicionar = (valor: unknown, forcar = false) => {
    if (typeof valor !== "string") return;

    const limpo = valor.trim();

    if (!limpo) return;
    if (!forcar && !pareceImagem(limpo)) return;
    if (vistos.has(limpo)) return;

    vistos.add(limpo);
    imagens.push(limpo);
  };

  const visitar = (valor: unknown) => {
    if (!valor) return;

    if (typeof valor === "string") {
      adicionar(valor);
      return;
    }

    if (Array.isArray(valor)) {
      valor.forEach(visitar);
      return;
    }

    if (typeof valor !== "object") return;

    const obj = valor as Record<string, unknown>;

    /*
     * Aceita todos os formatos comuns:
     * [{ image_1: "..." }]
     * [{ imagem: "..." }]
     * { data: [{ imagem: "..." }] }
     * { imagem: "..." }
     * { foto: "..." }
     * { url: "..." }
     */
    [
      "image_1",
      "image_2",
      "image_3",
      "image_4",
      "image_5",
      "image",
      "imagem",
      "foto",
      "file",
      "arquivo",
      "path",
      "caminho",
      "url",
      "src",
    ].forEach((key) => {
      if (key in obj) adicionar(obj[key], true);
    });

    [
      "data",
      "dados",
      "result",
      "results",
      "items",
      "lista",
      "imagens",
      "images",
      "fotos",
      "galeria",
      "chaves",
    ].forEach((key) => {
      if (key in obj) visitar(obj[key]);
    });

    Object.entries(obj).forEach(([key, value]) => {
      if (
        key.startsWith("image_") ||
        key.includes("imagem") ||
        key.includes("foto") ||
        key.includes("arquivo")
      ) {
        adicionar(value, true);
      }
    });
  };

  visitar(payload);

  return imagens;
}

function formatarData(data?: string): string {
  if (!data) return "";

  const d = new Date(String(data).replace(" ", "T"));

  if (Number.isNaN(d.getTime())) {
    return String(data);
  }

  return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function apiChaves<T>(rota: string, params: Record<string, unknown> = {}): Promise<T> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const url = `${API_CHAVES}/${rota}${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro ${res.status} ao carregar dados`);
  }

  const json = await res.json();

  if (json?.sucesso === false) {
    throw new Error(json.erro || "Erro na API de chaves");
  }

  return json;
}

function ordemJogo(jogo: Jogo): number {
  return Number(jogo.ordem ?? 999);
}

function ordenarJogos(lista: Jogo[]): Jogo[] {
  return [...lista].sort((a, b) => {
    const oa = ordemJogo(a);
    const ob = ordemJogo(b);

    if (oa !== ob) return oa - ob;

    return Number(a.id || 0) - Number(b.id || 0);
  });
}

function colunaDoJogo(jogo: Jogo): number {
  const coluna = Number(jogo.coluna_chave || 1);

  if (!Number.isFinite(coluna)) {
    return 1;
  }

  return Math.max(1, Math.min(4, coluna || 1));
}

function maxColuna(jogos: Jogo[]): number {
  if (!jogos.length) return 1;

  return Math.max(1, ...jogos.map(colunaDoJogo));
}

function larguraColunas(qtd: number): number {
  return qtd * CARD_W + Math.max(0, qtd - 1) * GAP_COL;
}

function nomeClubeCidade(dupla?: Dupla): string {
  if (!dupla) return "";

  return (
    texto(dupla.equipe_nome) ||
    texto(dupla.equipe_base_nome) ||
    texto(dupla.cidade) ||
    texto(dupla.clube)
  );
}

function jogadoresDaDupla(dupla?: Dupla): string {
  if (!dupla) return "";

  return [texto(dupla.jogador1), texto(dupla.jogador2)].filter(Boolean).join(" / ");
}

function labelLivre(jogo: Jogo, lado: 1 | 2): string {
  return (
    texto(jogo[`dupla${lado}_label` as keyof Jogo]) ||
    texto(jogo[`dupla${lado}_nome` as keyof Jogo]) ||
    "A definir"
  );
}

function dadosLado(jogo: Jogo, lado: 1 | 2, duplas: Dupla[]) {
  const duplaId = idNumerico(jogo[`dupla${lado}_id` as keyof Jogo]);
  const dupla = duplas.find((d) => idNumerico(d.id) === duplaId);

  if (dupla) {
    const clube = nomeClubeCidade(dupla) || texto(dupla.nome) || "A definir";
    const jogadores = jogadoresDaDupla(dupla);

    return {
      clube,
      jogadores,
      auxiliar: texto(dupla.nome),
      livre: false,
    };
  }

  const clubeLivre = texto(jogo[`dupla${lado}_equipe_nome` as keyof Jogo]);
  const jogador1 = texto(jogo[`dupla${lado}_jogador1` as keyof Jogo]);
  const jogador2 = texto(jogo[`dupla${lado}_jogador2` as keyof Jogo]);
  const jogadoresLivres = [jogador1, jogador2].filter(Boolean).join(" / ");

  return {
    clube: clubeLivre || labelLivre(jogo, lado),
    jogadores: jogadoresLivres,
    auxiliar: labelLivre(jogo, lado),
    livre: true,
  };
}

function idsPrincipais(jogos: Jogo[]): Set<number> {
  const ids = new Set<number>();

  jogos
    .filter((j) => j.tipo_chave === "principal")
    .forEach((j) => {
      if (j.dupla1_id) ids.add(idNumerico(j.dupla1_id));
      if (j.dupla2_id) ids.add(idNumerico(j.dupla2_id));
    });

  return ids;
}

function ehGrupoUnico(jogos: Jogo[], duplas: Dupla[]): boolean {
  const principal = jogos.filter((j) => j.tipo_chave === "principal");

  const textoGeral = normalizar(
    [
      ...principal.map((j) => j.fase),
      ...principal.map((j) => j.codigo),
      ...principal.map((j) => j.dupla1_label),
      ...principal.map((j) => j.dupla2_label),
    ].join(" ")
  );

  if (textoGeral.includes("grupo único") || textoGeral.includes("grupo unico")) {
    return true;
  }

  const ids = idsPrincipais(jogos);

  return principal.length === 6 && (duplas.length === 4 || ids.size === 4);
}

function ehSeisDuplasComGrupos(jogos: Jogo[], duplas: Dupla[], torneio?: Torneio): boolean {
  const principal = jogos.filter((j) => j.tipo_chave === "principal");

  if (principal.length < 6) return false;
  if (ehGrupoUnico(jogos, duplas)) return false;

  const ids = idsPrincipais(jogos);

  const textoGeral = normalizar(
    [
      torneio?.titulo,
      torneio?.subtitulo,
      ...principal.map((j) => j.fase),
      ...principal.map((j) => j.dupla1_label),
      ...principal.map((j) => j.dupla2_label),
    ].join(" ")
  );

  return (
    duplas.length === 6 ||
    ids.size === 6 ||
    textoGeral.includes("grupo 1") ||
    textoGeral.includes("grupo 2") ||
    textoGeral.includes("160 anos") ||
    textoGeral.includes('130 anos "b"') ||
    textoGeral.includes('140 anos "b"')
  );
}

function ehMataMataOito(jogos: Jogo[], duplas: Dupla[]): boolean {
  const principal = jogos.filter((j) => j.tipo_chave === "principal");
  const repescagem = jogos.filter((j) => j.tipo_chave === "repescagem");
  const finais = jogos.filter((j) => j.tipo_chave === "final");

  return duplas.length >= 8 && principal.length <= 4 && (repescagem.length > 0 || finais.length > 0);
}

function titulosDaChave(jogos: Jogo[], duplas: Dupla[], torneio?: Torneio) {
  if (ehGrupoUnico(jogos, duplas)) {
    return {
      esquerda: "3º Lugar",
      meio: "Grupo Único",
      direita: "Campeões",
    };
  }

  if (ehSeisDuplasComGrupos(jogos, duplas, torneio)) {
    return {
      esquerda: "Final Repescagem",
      meio: "Fase de Grupos",
      direita: "Final Principal",
    };
  }

  if (ehMataMataOito(jogos, duplas)) {
    return {
      esquerda: "Chave Repescagem",
      meio: "Primeira Fase",
      direita: "Chave Principal",
    };
  }

  return {
    esquerda: "Repescagem",
    meio: "Chave Principal",
    direita: "Final",
  };
}

function media(lista: number[]): number {
  if (!lista.length) return 0;

  return lista.reduce((total, valor) => total + valor, 0) / lista.length;
}

function distribuir(min: number, max: number, qtd: number): number[] {
  if (qtd <= 0) return [];

  if (qtd === 1) return [(min + max) / 2];

  const intervalo = (max - min) / Math.max(1, qtd - 1);

  return Array.from({ length: qtd }, (_, index) => min + index * intervalo);
}

function evitarSobreposicao(centros: number[], minGap: number): number[] {
  const saida = [...centros];

  for (let i = 1; i < saida.length; i++) {
    if (saida[i] - saida[i - 1] < minGap) {
      saida[i] = saida[i - 1] + minGap;
    }
  }

  return saida;
}

function centrosPrimeiraColuna(centrosPrincipal: number[], qtdDestino: number): number[] {
  if (!qtdDestino) return [];

  if (!centrosPrincipal.length) {
    return distribuir(CARD_H / 2, (CARD_H + 40) * qtdDestino, qtdDestino);
  }

  if (qtdDestino === 1) {
    return [media(centrosPrincipal)];
  }

  if (centrosPrincipal.length >= qtdDestino * 2) {
    const saida: number[] = [];

    for (let i = 0; i < qtdDestino; i++) {
      saida.push(media(centrosPrincipal.slice(i * 2, i * 2 + 2)));
    }

    return saida;
  }

  return distribuir(Math.min(...centrosPrincipal), Math.max(...centrosPrincipal), qtdDestino);
}

function centrosColunaSeguinte(centrosAnteriores: number[], qtdDestino: number): number[] {
  if (!qtdDestino) return [];

  if (!centrosAnteriores.length) {
    return distribuir(CARD_H / 2, (CARD_H + 40) * qtdDestino, qtdDestino);
  }

  if (qtdDestino === 1) {
    return [media(centrosAnteriores)];
  }

  if (centrosAnteriores.length >= qtdDestino * 2) {
    const saida: number[] = [];

    for (let i = 0; i < qtdDestino; i++) {
      saida.push(media(centrosAnteriores.slice(i * 2, i * 2 + 2)));
    }

    return saida;
  }

  return distribuir(Math.min(...centrosAnteriores), Math.max(...centrosAnteriores), qtdDestino);
}

function calcularPrincipal(jogos: Jogo[], temGrupos: boolean, left: number) {
  const cards: CardLayout[] = [];
  const titulos: TitleLayout[] = [];
  const centros: number[] = [];
  const ordenados = ordenarJogos(jogos);

  let top = 0;

  const adicionarJogo = (jogo: Jogo) => {
    cards.push({ jogo, left, top });
    centros.push(top + CARD_H / 2);
    top += CARD_H + (temGrupos ? 52 : 64);
  };

  if (!ordenados.length) {
    return {
      cards,
      titulos,
      centros,
      altura: CARD_H + 40,
    };
  }

  if (!temGrupos) {
    ordenados.forEach(adicionarJogo);

    return {
      cards,
      titulos,
      centros,
      altura: Math.max(420, top - 64),
    };
  }

  const grupo1 = ordenados.filter((j) => ordemJogo(j) <= 3);
  const grupo2 = ordenados.filter((j) => ordemJogo(j) > 3);

  titulos.push({
    label: "Grupo 1",
    top,
    left,
    width: CARD_W,
  });

  top += GROUP_TITLE_H + 24;

  grupo1.forEach(adicionarJogo);

  top += 30;

  titulos.push({
    label: "Grupo 2",
    top,
    left,
    width: CARD_W,
  });

  top += GROUP_TITLE_H + 24;

  grupo2.forEach(adicionarJogo);

  return {
    cards,
    titulos,
    centros,
    altura: Math.max(660, top - 52),
  };
}

function jogosPorColuna(jogos: Jogo[]) {
  const mapa = new Map<number, Jogo[]>();

  ordenarJogos(jogos).forEach((jogo) => {
    const coluna = colunaDoJogo(jogo);

    if (!mapa.has(coluna)) {
      mapa.set(coluna, []);
    }

    mapa.get(coluna)!.push(jogo);
  });

  return mapa;
}

function calcularLateral(
  jogos: Jogo[],
  principalCentros: number[],
  leftStart: number,
  lado: "repescagem" | "final"
) {
  const layouts: CardLayout[] = [];

  if (!jogos.length) {
    return {
      layouts,
      centrosPorColuna: new Map<number, number[]>(),
    };
  }

  const mapa = jogosPorColuna(jogos);
  const max = maxColuna(jogos);
  const centrosPorColuna = new Map<number, number[]>();

  for (let coluna = 1; coluna <= max; coluna++) {
    const jogosColuna = mapa.get(coluna) || [];
    const centrosBase = coluna === 1
      ? centrosPrimeiraColuna(principalCentros, jogosColuna.length)
      : centrosColunaSeguinte(centrosPorColuna.get(coluna - 1) || [], jogosColuna.length);

    const centros = evitarSobreposicao(centrosBase, CARD_H + 34);

    centrosPorColuna.set(coluna, centros);

    const posicaoVisual = lado === "repescagem" ? max - coluna : coluna - 1;
    const left = leftStart + posicaoVisual * (CARD_W + GAP_COL);

    jogosColuna.forEach((jogo, index) => {
      layouts.push({
        jogo,
        left,
        top: centros[index] - CARD_H / 2,
      });
    });
  }

  return {
    layouts,
    centrosPorColuna,
  };
}

function MatchCard({ jogo, duplas, style }: { jogo: Jogo; duplas: Dupla[]; style?: React.CSSProperties }) {
  const lado1 = dadosLado(jogo, 1, duplas);
  const lado2 = dadosLado(jogo, 2, duplas);

  // Começa usando os sets que já possam ter vindo no /detalhes,
  // mas o botão SETS SEMPRE aparece e também consegue buscar por jogo_id.
  const [sets, setSets] = useState<SetJogo[]>(() =>
    [...(jogo.sets || [])].sort(
      (a, b) => Number(a.numero_set || 0) - Number(b.numero_set || 0)
    )
  );
  const [mostrarSets, setMostrarSets] = useState(false);
  const [carregandoSets, setCarregandoSets] = useState(false);
  const [setsCarregados, setSetsCarregados] = useState((jogo.sets || []).length > 0);
  const [erroSets, setErroSets] = useState("");

  const carregarSets = async () => {
    // Se já carregou (mesmo que a lista esteja vazia), não consulta de novo.
    if (setsCarregados || carregandoSets) return;

    setCarregandoSets(true);
    setErroSets("");

    try {
      const data = await apiChaves<SetJogo[]>("listar", {
        tabela: "sets",
        jogo_id: jogo.id,
      });

      const lista = Array.isArray(data) ? data : [];
      lista.sort(
        (a, b) => Number(a.numero_set || 0) - Number(b.numero_set || 0)
      );

      setSets(lista);
      setSetsCarregados(true);
    } catch (error) {
      setErroSets(
        error instanceof Error ? error.message : "Erro ao carregar os sets"
      );
    } finally {
      setCarregandoSets(false);
    }
  };

  const abrirSets = () => {
    setMostrarSets(true);
    void carregarSets();
  };

  const placarCalculado = useMemo(() => {
    let dupla1 = 0;
    let dupla2 = 0;
    let temSetPreenchido = false;

    sets.forEach((set) => {
      const valor1 = set.pontos_dupla1;
      const valor2 = set.pontos_dupla2;

      if (
        valor1 === null || valor1 === undefined || valor1 === "" ||
        valor2 === null || valor2 === undefined || valor2 === ""
      ) {
        return;
      }

      const p1 = Number(valor1);
      const p2 = Number(valor2);

      if (!Number.isFinite(p1) || !Number.isFinite(p2)) return;

      temSetPreenchido = true;
      if (p1 > p2) dupla1++;
      else if (p2 > p1) dupla2++;
    });

    return { dupla1, dupla2, temSetPreenchido };
  }, [sets]);

  const temPlacarApi =
    jogo.placar1 !== null &&
    jogo.placar1 !== undefined &&
    jogo.placar1 !== "" &&
    jogo.placar2 !== null &&
    jogo.placar2 !== undefined &&
    jogo.placar2 !== "";

  // Prioriza placar salvo na API. Se estiver vazio, calcula pelos sets carregados.
  const placar1 = temPlacarApi
    ? String(jogo.placar1)
    : placarCalculado.temSetPreenchido
      ? String(placarCalculado.dupla1)
      : "–";

  const placar2 = temPlacarApi
    ? String(jogo.placar2)
    : placarCalculado.temSetPreenchido
      ? String(placarCalculado.dupla2)
      : "–";

  const nomesBox = (lado: ReturnType<typeof dadosLado>) => {
    const jogadores = lado.jogadores
      .split("/")
      .map((nome) => nome.trim())
      .filter(Boolean);

    if (jogadores.length) return jogadores;
    return [lado.auxiliar || lado.clube || "A definir"];
  };

  const mostrarEquipe = (lado: ReturnType<typeof dadosLado>) =>
    Boolean(texto(lado.clube) && texto(lado.jogadores));

  return (
    <>
      <article className="absolute z-[5] overflow-hidden rounded-xl border border-stone-300 bg-white p-2.5 shadow-[0_8px_20px_rgba(41,37,36,0.08)]" style={style}>
        <div className="flex flex-col items-stretch gap-1.5">
          <div className="relative flex min-h-[52px] flex-col items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9] py-2 pl-3.5 pr-12 text-center">
            <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0.5">
              {mostrarEquipe(lado1) ? (
                <span className="mb-px block w-full truncate whitespace-nowrap text-[10px] font-[950] uppercase leading-[1.05] tracking-[0.55px] text-[#0f3f7a]">{lado1.clube}</span>
              ) : null}

              {nomesBox(lado1).map((nome, index) => (
                <span key={`${nome}-${index}`} className="block w-full truncate whitespace-nowrap text-[13px] font-[950] uppercase leading-[1.12] tracking-[0.45px] text-gray-900">
                  {nome}
                </span>
              ))}
            </div>

            <strong
              className={`absolute right-2 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full text-base font-[950] leading-none text-white ${placar1 === "–" ? "bg-stone-400 shadow-none" : "bg-[#0f3f7a] shadow-[0_3px_9px_rgba(15,63,122,0.18)]"}`}
              title="Sets vencidos pela dupla"
            >
              {placar1}
            </strong>
          </div>

          <div className="flex min-h-[34px] flex-col items-center justify-center text-center">
            <div className="text-sm font-[950] leading-none text-gray-900">X</div>

            <div className="mt-0.5 flex items-center justify-center gap-[7px] overflow-hidden whitespace-nowrap text-[11px] font-[850] leading-none text-stone-600">
              <b className="font-[950] text-[#0f3f7a]">{jogo.codigo || "SEM CÓDIGO"}</b>
              {jogo.data_jogo ? <span className="overflow-hidden text-ellipsis">{formatarData(jogo.data_jogo)}</span> : null}

              <button
                type="button"
                className="shrink-0 cursor-pointer rounded-full border-0 bg-[#0f3f7a] px-[9px] py-[5px] text-[10px] font-[950] tracking-[0.45px] text-white shadow-[0_3px_8px_rgba(15,63,122,0.18)] hover:brightness-110"
                onClick={abrirSets}
                onMouseEnter={abrirSets}
                aria-label={`Ver resultados dos sets do jogo ${jogo.codigo || jogo.id}`}
                title="Passe o mouse ou clique para ver os sets"
              >
                SETS
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[52px] flex-col items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9] py-2 pl-3.5 pr-12 text-center">
            <div className="flex w-full min-w-0 flex-col items-center justify-center gap-0.5">
              {mostrarEquipe(lado2) ? (
                <span className="mb-px block w-full truncate whitespace-nowrap text-[10px] font-[950] uppercase leading-[1.05] tracking-[0.55px] text-[#0f3f7a]">{lado2.clube}</span>
              ) : null}

              {nomesBox(lado2).map((nome, index) => (
                <span key={`${nome}-${index}`} className="block w-full truncate whitespace-nowrap text-[13px] font-[950] uppercase leading-[1.12] tracking-[0.45px] text-gray-900">
                  {nome}
                </span>
              ))}
            </div>

            <strong
              className={`absolute right-2 top-1/2 flex h-[34px] w-[34px] -translate-y-1/2 items-center justify-center rounded-full text-base font-[950] leading-none text-white ${placar2 === "–" ? "bg-stone-400 shadow-none" : "bg-[#0f3f7a] shadow-[0_3px_9px_rgba(15,63,122,0.18)]"}`}
              title="Sets vencidos pela dupla"
            >
              {placar2}
            </strong>
          </div>
        </div>
      </article>

      {mostrarSets ? (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(17,24,39,0.42)] p-[18px] backdrop-blur-[3px]"
          role="dialog"
          aria-modal="true"
          aria-label={`Sets do jogo ${jogo.codigo || jogo.id}`}
          onMouseDown={() => setMostrarSets(false)}
        >
          <div
            className="max-h-[min(640px,calc(100vh-36px))] w-[min(470px,100%)] overflow-auto rounded-[18px] border border-stone-200 bg-white shadow-[0_24px_70px_rgba(17,24,39,0.24)]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-[18px] py-4">
              <div className="flex flex-col gap-[3px]">
                <span className="text-[10px] font-[950] tracking-[0.8px] text-stone-500">
                  RESULTADO POR SET
                </span>
                <strong className="text-[17px] font-[950] text-[#0f3f7a]">
                  {jogo.codigo || `Jogo ${jogo.id}`}
                </strong>
              </div>

              <button
                type="button"
                className="h-9 w-9 cursor-pointer rounded-full border-0 bg-stone-100 text-2xl leading-none text-stone-800"
                onClick={() => setMostrarSets(false)}
                aria-label="Fechar resultados dos sets"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-stone-200 bg-slate-50 px-[18px] py-4 text-left max-[760px]:grid-cols-1 max-[760px]:text-center">
              <div className="flex min-w-0 items-center gap-[9px] max-[760px]:justify-between">
                <span className="min-w-0 overflow-hidden text-ellipsis text-[11px] font-[900] uppercase leading-[1.2] text-stone-800">
                  {nomesBox(lado1).join(" / ")}
                </span>
                <strong className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f3f7a] text-[17px] font-[950] text-white">
                  {placar1}
                </strong>
              </div>

              <b className="whitespace-nowrap text-[9px] font-[950] tracking-[0.5px] text-stone-500 max-[760px]:order-first">
                PLACAR TOTAL
              </b>

              <div className="flex min-w-0 flex-row-reverse items-center gap-[9px] text-right max-[760px]:flex-row max-[760px]:justify-between max-[760px]:text-left">
                <span className="min-w-0 overflow-hidden text-ellipsis text-[11px] font-[900] uppercase leading-[1.2] text-stone-800">
                  {nomesBox(lado2).join(" / ")}
                </span>
                <strong className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f3f7a] text-[17px] font-[950] text-white">
                  {placar2}
                </strong>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-[18px] pb-[18px] pt-4">
              {carregandoSets ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-3.5 py-[18px] text-center text-xs font-[850] text-stone-600">Carregando sets...</div>
              ) : erroSets ? (
                <div className="rounded-xl border border-dashed border-red-200 bg-red-50 px-3.5 py-[18px] text-center text-xs font-[850] text-red-700">{erroSets}</div>
              ) : sets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-3.5 py-[18px] text-center text-xs font-[850] text-stone-600">Nenhum set lançado para este jogo.</div>
              ) : (
                sets.map((set, index) => (
                  <div
                    className="grid min-h-[46px] grid-cols-[1fr_44px_20px_44px] items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 py-[7px] pl-3.5 pr-2.5"
                    key={String(set.id ?? `${jogo.id}-${set.numero_set ?? index}`)}
                  >
                    <span className="text-xs font-[950] tracking-[0.4px] text-stone-600">SET {set.numero_set || index + 1}</span>
                    <strong className="flex h-8 items-center justify-center rounded-[9px] border border-stone-300 bg-white text-[15px] font-[950] text-gray-900">{set.pontos_dupla1 ?? "-"}</strong>
                    <i className="text-center not-italic font-[950] text-stone-400">×</i>
                    <strong className="flex h-8 items-center justify-center rounded-[9px] border border-stone-300 bg-white text-[15px] font-[950] text-gray-900">{set.pontos_dupla2 ?? "-"}</strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ChaveVisual({ detalhes }: { detalhes: DetalhesChave }) {
  const duplas = detalhes.duplas || [];
  const jogosOriginais = detalhes.jogos || [];
  const setsGerais = detalhes.sets || [];
  const torneio = detalhes.torneio;
  const boardScrollRef = useRef<HTMLDivElement | null>(null);

  const jogos = useMemo(() => {
    if (!setsGerais.length) return jogosOriginais;

    return jogosOriginais.map((jogo) => {
      if (jogo.sets?.length) return jogo;

      return {
        ...jogo,
        sets: setsGerais.filter((set) => String(set.jogo_id) === String(jogo.id)),
      };
    });
  }, [jogosOriginais, setsGerais]);

  const principal = useMemo(
    () => ordenarJogos(jogos.filter((j) => j.tipo_chave === "principal")),
    [jogos]
  );

  const repescagem = useMemo(
    () => ordenarJogos(jogos.filter((j) => j.tipo_chave === "repescagem")),
    [jogos]
  );

  const finais = useMemo(
    () => ordenarJogos(jogos.filter((j) => j.tipo_chave === "final")),
    [jogos]
  );

  const calculo = useMemo(() => {
    const qtdRep = maxColuna(repescagem);
    const qtdFin = maxColuna(finais);

    const repWidth = larguraColunas(qtdRep);
    const finalWidth = larguraColunas(qtdFin);
    const mainLeft = repWidth + GAP_SECAO;
    const finalLeft = mainLeft + CARD_W + GAP_SECAO;
    const totalWidth = repWidth + GAP_SECAO + CARD_W + GAP_SECAO + finalWidth;

    const temGrupos = ehSeisDuplasComGrupos(jogos, duplas, torneio);
    const principalCalc = calcularPrincipal(principal, temGrupos, mainLeft);

    const repCalc = calcularLateral(repescagem, principalCalc.centros, 0, "repescagem");
    const finalCalc = calcularLateral(finais, principalCalc.centros, finalLeft, "final");

    const todosCards = [
      ...principalCalc.cards,
      ...repCalc.layouts,
      ...finalCalc.layouts,
    ];

    const todosTitulos = principalCalc.titulos;

    const minTop = Math.min(
      0,
      ...todosCards.map((c) => c.top),
      ...todosTitulos.map((t) => t.top)
    );

    const shift = minTop < 0 ? Math.abs(minTop) + 24 : 0;

    const cardsCorrigidos = todosCards.map((item) => ({
      ...item,
      top: item.top + shift + BOARD_TOP,
    }));

    const titulosCorrigidos = todosTitulos.map((item) => ({
      ...item,
      top: item.top + shift + BOARD_TOP,
    }));

    const maxBottom = Math.max(
      520,
      ...cardsCorrigidos.map((c) => c.top + CARD_H),
      ...titulosCorrigidos.map((t) => t.top + GROUP_TITLE_H)
    );

    return {
      totalWidth,
      repWidth,
      mainLeft,
      finalLeft,
      finalWidth,
      cards: cardsCorrigidos,
      groupTitles: titulosCorrigidos,
      height: maxBottom + 42,
      titulos: titulosDaChave(jogos, duplas, torneio),
    };
  }, [repescagem, finais, principal, jogos, duplas, torneio]);

  useEffect(() => {
    const container = boardScrollRef.current;
    if (!container || !jogos.length) return;

    const centralizar = () => {
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
      container.scrollLeft = maxScroll / 2;
    };

    // Aguarda o DOM aplicar a largura calculada da chave antes de posicionar o scroll.
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(centralizar);
      (container as HTMLDivElement & { __jpCenterFrame?: number }).__jpCenterFrame = frame2;
    });

    return () => {
      cancelAnimationFrame(frame1);
      const frame2 = (container as HTMLDivElement & { __jpCenterFrame?: number }).__jpCenterFrame;
      if (frame2) cancelAnimationFrame(frame2);
    };
  }, [calculo.totalWidth, torneio?.id, jogos.length]);

  if (!jogos.length) {
    return (
      <div className="rounded-[18px] border border-dashed border-stone-300 bg-white px-4 py-7 text-center font-[850] text-stone-500">
        Nenhuma chave encontrada para esta seleção.
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex w-full justify-center px-3">
        <div
          className="pointer-events-none flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-4 py-2.5 text-center text-xs font-[950] text-orange-800 shadow-[0_8px_20px_rgba(154,52,18,0.12)] max-[520px]:w-full max-[520px]:whitespace-normal"
          role="status"
          aria-live="polite"
        >
          <span className="shrink-0 text-xl font-black leading-none text-orange-700">←</span>
          <span>Arraste para os lados para ver toda a chave</span>
          <span className="shrink-0 text-xl font-black leading-none text-orange-700">→</span>
        </div>
      </div>

      <div
        ref={boardScrollRef}
        className="overflow-x-auto overflow-y-hidden rounded-[20px] border border-stone-200 bg-white p-3.5 shadow-[0_10px_24px_rgba(41,37,36,0.06)] [-webkit-overflow-scrolling:touch]"
      >
        <div
          className="relative mx-auto"
          style={{
            width: calculo.totalWidth,
            minWidth: calculo.totalWidth,
            height: calculo.height,
          }}
        >
        <div
          className="absolute top-0 flex h-[42px] items-center justify-center rounded-lg bg-[#dedbc6] text-center text-[13px] font-[950] uppercase tracking-[0.35px] text-stone-800"
          style={{ left: 0, width: calculo.repWidth }}
        >
          {calculo.titulos.esquerda}
        </div>

        <div
          className="absolute top-0 flex h-[42px] items-center justify-center rounded-lg bg-[#dce7f3] text-center text-[13px] font-[950] uppercase tracking-[0.35px] text-[#0f3f7a]"
          style={{ left: calculo.mainLeft, width: CARD_W }}
        >
          {calculo.titulos.meio}
        </div>

        <div
          className="absolute top-0 flex h-[42px] items-center justify-center rounded-lg bg-[#e7b8b8] text-center text-[13px] font-[950] uppercase tracking-[0.35px] text-red-900"
          style={{ left: calculo.finalLeft, width: calculo.finalWidth }}
        >
          {calculo.titulos.direita}
        </div>

        {calculo.groupTitles.map((titulo) => (
          <div
            key={`${titulo.label}-${titulo.top}`}
            className="absolute z-[2] flex items-center justify-center rounded-[7px] bg-[#0f3f7a] text-center text-[13px] font-[950] uppercase tracking-[0.5px] text-white"
            style={{
              left: titulo.left,
              top: titulo.top,
              width: titulo.width,
            }}
          >
            {titulo.label}
          </div>
        ))}

        {calculo.cards.map((item) => (
          <MatchCard
            key={item.jogo.id}
            jogo={item.jogo}
            duplas={duplas}
            style={{
              left: item.left,
              top: item.top,
              width: CARD_W,
              height: CARD_H,
            }}
          />
        ))}
        </div>
      </div>
    </>
  );
}

function VisualizadorSistemaChaves() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [torneios, setTorneios] = useState<Torneio[]>([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [torneioId, setTorneioId] = useState("");
  const [detalhes, setDetalhes] = useState<DetalhesChave>({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      setLoading(true);
      setErro("");

      try {
        const data = await apiChaves<Categoria[]>("listar", { tabela: "categorias" });

        if (!ativo) return;

        setCategorias(data || []);
        setCategoriaId(data?.[0]?.id ? String(data[0].id) : "");
      } catch (error) {
        if (ativo) setErro(error instanceof Error ? error.message : "Erro ao carregar categorias");
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (!categoriaId) {
      setTorneios([]);
      setTorneioId("");
      return;
    }

    let ativo = true;

    async function carregarTorneios() {
      setLoading(true);
      setErro("");

      try {
        const data = await apiChaves<Torneio[]>("listar", {
          tabela: "torneios",
          categoria_id: categoriaId,
        });

        if (!ativo) return;

        setTorneios(data || []);
        setTorneioId(data?.[0]?.id ? String(data[0].id) : "");
      } catch (error) {
        if (ativo) setErro(error instanceof Error ? error.message : "Erro ao carregar chaves");
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarTorneios();

    return () => {
      ativo = false;
    };
  }, [categoriaId]);

  useEffect(() => {
    if (!torneioId) {
      setDetalhes({});
      return;
    }

    let ativo = true;

    async function carregarDetalhes() {
      setLoading(true);
      setErro("");

      try {
        const data = await apiChaves<DetalhesChave>("detalhes", {
          torneio_id: torneioId,
        });

        if (!ativo) return;

        setDetalhes(data || {});
      } catch (error) {
        if (ativo) setErro(error instanceof Error ? error.message : "Erro ao carregar detalhes da chave");
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarDetalhes();

    return () => {
      ativo = false;
    };
  }, [torneioId]);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pb-7 pt-3.5">
      <div className="mb-2.5 grid grid-cols-2 gap-3 rounded-[18px] border border-stone-200 bg-white p-3 shadow-[0_8px_20px_rgba(41,37,36,0.05)] max-[760px]:grid-cols-1">
        <div>
          <label className="mb-[5px] block text-[11px] font-[950] uppercase text-stone-600">Categoria</label>
          <select className="min-h-[42px] w-full rounded-xl border border-stone-300 bg-white px-3 font-[850] text-stone-800 outline-none" value={categoriaId} onChange={(event) => setCategoriaId(event.target.value)}>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-[5px] block text-[11px] font-[950] uppercase text-stone-600">Chave</label>
          <select className="min-h-[42px] w-full rounded-xl border border-stone-300 bg-white px-3 font-[850] text-stone-800 outline-none" value={torneioId} onChange={(event) => setTorneioId(event.target.value)}>
            {torneios.map((torneio) => (
              <option key={torneio.id} value={torneio.id}>
                {torneio.titulo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? <div className="my-2.5 rounded-xl bg-blue-50 px-3 py-2.5 text-center text-[13px] font-[850] text-blue-900">Carregando...</div> : null}
      {erro ? <div className="my-2.5 rounded-xl bg-red-50 px-3 py-2.5 text-center text-[13px] font-[850] text-red-700">{erro}</div> : null}

      <div className="my-2.5 text-center">
        <h2 className="m-0 text-[clamp(20px,3vw,28px)] font-[950] uppercase text-stone-900">
          {detalhes.torneio?.titulo ||
            torneios.find((t) => String(t.id) === torneioId)?.titulo ||
            "Chaves"}
        </h2>
        {detalhes.torneio?.subtitulo ? <p className="mt-1 text-[13px] font-bold text-stone-500">{detalhes.torneio.subtitulo}</p> : null}
      </div>

      <ChaveVisual detalhes={detalhes} />
    </section>
  );
}

function VisualizadorFotosChaves() {
  const [imagens, setImagens] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarFotos() {
      setLoading(true);
      setErro("");

      try {
        const res = await fetch(API_IMAGENS, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Erro ${res.status} ao carregar imagens`);
        }

        const data = await res.json();
        const imagensEncontradas = extrairImagensDaApi(data);

        if (!ativo) return;

        setImagens(imagensEncontradas);
      } catch (error) {
        if (ativo) {
          setErro(error instanceof Error ? error.message : "Erro ao carregar imagens");
          setImagens([]);
        }
      } finally {
        if (ativo) setLoading(false);
      }
    }

    carregarFotos();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-[980px] flex-col gap-[18px] px-4 pb-7 pt-3.5">
      {loading ? <div className="my-2.5 rounded-xl bg-blue-50 px-3 py-2.5 text-center text-[13px] font-[850] text-blue-900">Carregando imagens...</div> : null}
      {erro ? <div className="my-2.5 rounded-xl bg-red-50 px-3 py-2.5 text-center text-[13px] font-[850] text-red-700">{erro}</div> : null}

      {!loading && !erro && !imagens.length ? (
        <div className="rounded-[18px] border border-dashed border-stone-300 bg-white px-4 py-7 text-center font-[850] text-stone-500">
          Nenhuma imagem encontrada.
        </div>
      ) : null}

      {imagens.map((imagem, index) => (
        <a
          key={`${imagem}-${index}`}
          href={urlImagem(imagem)}
          target="_blank"
          rel="noreferrer"
          className="block w-full"
        >
          <img
            src={urlImagem(imagem)}
            alt={`Chave ${index + 1}`}
            loading="lazy"
            className="block w-full max-w-full rounded-2xl border border-stone-200 bg-white shadow-[0_10px_24px_rgba(41,37,36,0.06)]"
          />
        </a>
      ))}
    </section>
  );
}

export default function JogosPage({ onBack, initialMode = "fotos" }: JogosPageProps) {
  const [modo, setModo] = useState<JogosModo>(initialMode);

  useEffect(() => {
    setModo(initialMode);
  }, [initialMode]);

  return (
    <div className="min-h-[80vh] bg-[#fcfaf2] text-stone-800">

      <section className="mx-auto max-w-[1180px] px-4 pb-2 pt-5">
        <div className="mb-3 flex items-center justify-between gap-3 max-[760px]:flex-col max-[760px]:items-start">
          <div>
            <h1 className="m-0 text-[clamp(22px,4vw,34px)] font-[950] uppercase leading-none text-stone-900">Jogos</h1>
            <p className="mt-1 text-[13px] font-bold text-stone-500">Escolha como deseja visualizar as chaves.</p>
          </div>

          {onBack ? (
            <button type="button" onClick={onBack} className="cursor-pointer whitespace-nowrap rounded-full border border-stone-300 bg-white px-3.5 py-[9px] text-[13px] font-[900] text-stone-700">
              ← Voltar
            </button>
          ) : null}
        </div>

        <div className="grid max-w-[620px] grid-cols-2 gap-2.5 max-[760px]:max-w-none">
          <button
            type="button"
            onClick={() => setModo("fotos")}
            className={`cursor-pointer rounded-[14px] border px-3.5 py-3 text-[13px] font-[950] uppercase shadow-[0_8px_18px_rgba(41,37,36,0.06)] transition-colors ${modo === "fotos" ? "border-[#0f3f7a] bg-[#0f3f7a] text-white" : "border-stone-300 bg-white text-stone-700"}`}
          >
            Fotos das chaves
          </button>

          <button
            type="button"
            onClick={() => setModo("sistema")}
            className={`cursor-pointer rounded-[14px] border px-3.5 py-3 text-[13px] font-[950] uppercase shadow-[0_8px_18px_rgba(41,37,36,0.06)] transition-colors ${modo === "sistema" ? "border-[#0f3f7a] bg-[#0f3f7a] text-white" : "border-stone-300 bg-white text-stone-700"}`}
          >
            Chaves interativas
          </button>
        </div>
      </section>

      {modo === "fotos" ? <VisualizadorFotosChaves /> : <VisualizadorSistemaChaves />}
    </div>
  );
}
