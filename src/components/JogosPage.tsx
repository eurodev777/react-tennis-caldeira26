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
const HEADER_H = 42;
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
      <article className="jp-card" style={style}>
        <div className="jp-match">
          <div className="jp-team">
            <div className="jp-team-names">
              {mostrarEquipe(lado1) ? (
                <span className="jp-team-club">{lado1.clube}</span>
              ) : null}

              {nomesBox(lado1).map((nome, index) => (
                <span key={`${nome}-${index}`} className="jp-player-name">
                  {nome}
                </span>
              ))}
            </div>

            <strong
              className={`jp-total-score ${placar1 === "–" ? "jp-total-score-empty" : ""}`}
              title="Sets vencidos pela dupla"
            >
              {placar1}
            </strong>
          </div>

          <div className="jp-middle">
            <div className="jp-x">X</div>

            <div className="jp-meta">
              <b>{jogo.codigo || "SEM CÓDIGO"}</b>
              {jogo.data_jogo ? <span>{formatarData(jogo.data_jogo)}</span> : null}

              <button
                type="button"
                className="jp-sets-button"
                onClick={abrirSets}
                onMouseEnter={abrirSets}
                aria-label={`Ver resultados dos sets do jogo ${jogo.codigo || jogo.id}`}
                title="Passe o mouse ou clique para ver os sets"
              >
                SETS
              </button>
            </div>
          </div>

          <div className="jp-team">
            <div className="jp-team-names">
              {mostrarEquipe(lado2) ? (
                <span className="jp-team-club">{lado2.clube}</span>
              ) : null}

              {nomesBox(lado2).map((nome, index) => (
                <span key={`${nome}-${index}`} className="jp-player-name">
                  {nome}
                </span>
              ))}
            </div>

            <strong
              className={`jp-total-score ${placar2 === "–" ? "jp-total-score-empty" : ""}`}
              title="Sets vencidos pela dupla"
            >
              {placar2}
            </strong>
          </div>
        </div>
      </article>

      {mostrarSets ? (
        <div
          className="jp-sets-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Sets do jogo ${jogo.codigo || jogo.id}`}
          onMouseDown={() => setMostrarSets(false)}
        >
          <div
            className="jp-sets-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="jp-sets-modal-head">
              <div>
                <span>RESULTADO POR SET</span>
                <strong>{jogo.codigo || `Jogo ${jogo.id}`}</strong>
              </div>

              <button
                type="button"
                className="jp-sets-close"
                onClick={() => setMostrarSets(false)}
                aria-label="Fechar resultados dos sets"
              >
                ×
              </button>
            </div>

            <div className="jp-sets-total">
              <div>
                <span>{nomesBox(lado1).join(" / ")}</span>
                <strong>{placar1}</strong>
              </div>

              <b>PLACAR TOTAL</b>

              <div>
                <span>{nomesBox(lado2).join(" / ")}</span>
                <strong>{placar2}</strong>
              </div>
            </div>

            <div className="jp-sets-list">
              {carregandoSets ? (
                <div className="jp-sets-message">Carregando sets...</div>
              ) : erroSets ? (
                <div className="jp-sets-message jp-sets-message-error">{erroSets}</div>
              ) : sets.length === 0 ? (
                <div className="jp-sets-message">Nenhum set lançado para este jogo.</div>
              ) : (
                sets.map((set, index) => (
                  <div
                    className="jp-set-row"
                    key={String(set.id ?? `${jogo.id}-${set.numero_set ?? index}`)}
                  >
                    <span>SET {set.numero_set || index + 1}</span>
                    <strong>{set.pontos_dupla1 ?? "-"}</strong>
                    <i>×</i>
                    <strong>{set.pontos_dupla2 ?? "-"}</strong>
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
      <div className="jp-empty">
        Nenhuma chave encontrada para esta seleção.
      </div>
    );
  }

  return (
    <div className="jp-board-scroll" ref={boardScrollRef}>
      <div className="jp-scroll-hint">↔ Arraste para os lados para ver toda a chave</div>

      <div
        className="jp-board"
        style={{
          width: calculo.totalWidth,
          minWidth: calculo.totalWidth,
          height: calculo.height,
        }}
      >
        <div
          className="jp-heading jp-heading-left"
          style={{ left: 0, width: calculo.repWidth }}
        >
          {calculo.titulos.esquerda}
        </div>

        <div
          className="jp-heading jp-heading-main"
          style={{ left: calculo.mainLeft, width: CARD_W }}
        >
          {calculo.titulos.meio}
        </div>

        <div
          className="jp-heading jp-heading-right"
          style={{ left: calculo.finalLeft, width: calculo.finalWidth }}
        >
          {calculo.titulos.direita}
        </div>

        {calculo.groupTitles.map((titulo) => (
          <div
            key={`${titulo.label}-${titulo.top}`}
            className="jp-group-title"
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
    <section className="jp-section">
      <div className="jp-filter-box">
        <div>
          <label>Categoria</label>
          <select value={categoriaId} onChange={(event) => setCategoriaId(event.target.value)}>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Chave</label>
          <select value={torneioId} onChange={(event) => setTorneioId(event.target.value)}>
            {torneios.map((torneio) => (
              <option key={torneio.id} value={torneio.id}>
                {torneio.titulo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? <div className="jp-alert jp-alert-info">Carregando...</div> : null}
      {erro ? <div className="jp-alert jp-alert-error">{erro}</div> : null}

      <div className="jp-chave-title">
        <h2>{detalhes.torneio?.titulo || torneios.find((t) => String(t.id) === torneioId)?.titulo || "Chaves"}</h2>
        {detalhes.torneio?.subtitulo ? <p>{detalhes.torneio.subtitulo}</p> : null}
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
    <section className="jp-section jp-photos">
      {loading ? <div className="jp-alert jp-alert-info">Carregando imagens...</div> : null}
      {erro ? <div className="jp-alert jp-alert-error">{erro}</div> : null}

      {!loading && !erro && !imagens.length ? (
        <div className="jp-empty">
          Nenhuma imagem encontrada.
        </div>
      ) : null}

      {imagens.map((imagem, index) => (
        <a
          key={`${imagem}-${index}`}
          href={urlImagem(imagem)}
          target="_blank"
          rel="noreferrer"
          className="jp-photo-link"
        >
          <img
            src={urlImagem(imagem)}
            alt={`Chave ${index + 1}`}
            loading="lazy"
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
    <div className="jp-page">
      <style>{`
        .jp-page {
          min-height: 80vh;
          background: #fcfaf2;
          color: #292524;
        }

        .jp-top {
          max-width: 1180px;
          margin: 0 auto;
          padding: 20px 16px 8px;
        }

        .jp-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .jp-title-row h1 {
          margin: 0;
          font-size: clamp(22px, 4vw, 34px);
          line-height: 1;
          font-weight: 950;
          text-transform: uppercase;
          color: #1c1917;
        }

        .jp-title-row p {
          margin: 4px 0 0;
          color: #78716c;
          font-size: 13px;
          font-weight: 700;
        }

        .jp-back {
          border: 1px solid #d6d3d1;
          background: #fff;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 13px;
          color: #44403c;
          font-weight: 900;
          cursor: pointer;
          white-space: nowrap;
        }

        .jp-tabs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          max-width: 620px;
        }

        .jp-tabs button {
          border: 1px solid #d6d3d1;
          background: #fff;
          border-radius: 14px;
          padding: 12px 14px;
          color: #44403c;
          font-size: 13px;
          font-weight: 950;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(41, 37, 36, .06);
        }

        .jp-tabs button.active {
          background: #0f3f7a;
          border-color: #0f3f7a;
          color: #fff;
        }

        .jp-section {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 14px 16px 28px;
        }

        .jp-filter-box {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 10px;
          background: #fff;
          border: 1px solid #e7e5e4;
          border-radius: 18px;
          padding: 12px;
          box-shadow: 0 8px 20px rgba(41, 37, 36, .05);
        }

        .jp-filter-box label {
          display: block;
          margin: 0 0 5px;
          font-size: 11px;
          text-transform: uppercase;
          color: #57534e;
          font-weight: 950;
        }

        .jp-filter-box select {
          width: 100%;
          min-height: 42px;
          border: 1px solid #d6d3d1;
          border-radius: 12px;
          background: #fff;
          padding: 0 12px;
          font-weight: 850;
          color: #292524;
          outline: none;
        }

        .jp-alert {
          margin: 10px 0;
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 13px;
          font-weight: 850;
          text-align: center;
        }

        .jp-alert-info {
          background: #eff6ff;
          color: #1e3a8a;
        }

        .jp-alert-error {
          background: #fef2f2;
          color: #b91c1c;
        }

        .jp-chave-title {
          text-align: center;
          margin: 12px 0 10px;
        }

        .jp-chave-title h2 {
          margin: 0;
          font-size: clamp(20px, 3vw, 28px);
          color: #1c1917;
          font-weight: 950;
          text-transform: uppercase;
        }

        .jp-chave-title p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #78716c;
          font-weight: 700;
        }

        .jp-board-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          background: #fff;
          border: 1px solid #e7e5e4;
          border-radius: 20px;
          padding: 14px;
          box-shadow: 0 10px 24px rgba(41, 37, 36, .06);
        }

        .jp-scroll-hint {
          display: none;
          margin-bottom: 10px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #9a3412;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 12px;
          text-align: center;
          font-weight: 950;
        }

        .jp-board {
          position: relative;
          margin: 0 auto;
        }

        .jp-heading {
          position: absolute;
          top: 0;
          height: ${HEADER_H}px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          text-align: center;
          font-size: 13px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .35px;
        }

        .jp-heading-left {
          background: #dedbc6;
          color: #292524;
        }

        .jp-heading-main {
          background: #dce7f3;
          color: #0f3f7a;
        }

        .jp-heading-right {
          background: #e7b8b8;
          color: #7f1d1d;
        }

        .jp-group-title {
          position: absolute;
          height: ${GROUP_TITLE_H}px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f3f7a;
          color: #fff;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .5px;
          z-index: 2;
        }

        .jp-card {
          position: absolute;
          background: #fff;
          border: 1px solid #d6d3d1;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(41, 37, 36, .08);
          padding: 10px;
          overflow: hidden;
          z-index: 5;
        }

        .jp-match {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 6px;
        }

        .jp-team {
          min-height: 52px;
          background: #d9d9d9;
          border-radius: 999px;
          padding: 8px 48px 8px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        .jp-team-names {
          width: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .jp-team-club {
          display: block;
          width: 100%;
          margin-bottom: 1px;
          color: #0f3f7a;
          font-size: 10px;
          line-height: 1.05;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .55px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .jp-total-score {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: #0f3f7a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 1;
          font-weight: 950;
          box-shadow: 0 3px 9px rgba(15, 63, 122, .18);
        }

        .jp-total-score-empty {
          background: #a8a29e;
          box-shadow: none;
        }

        .jp-player-name {
          display: block;
          width: 100%;
          color: #111827;
          font-size: 13px;
          line-height: 1.12;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: .45px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .jp-middle {
          min-height: 34px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .jp-x {
          color: #111827;
          font-size: 14px;
          line-height: 1;
          font-weight: 950;
        }

        .jp-meta {
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #57534e;
          font-size: 11px;
          line-height: 1;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
        }

        .jp-meta b {
          color: #0f3f7a;
          font-weight: 950;
        }

        .jp-meta span {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .jp-meta em {
          flex: 0 0 auto;
          background: #ecfdf5;
          color: #047857;
          border-radius: 999px;
          padding: 4px 7px;
          font-style: normal;
          font-weight: 950;
        }

        .jp-sets-button {
          flex: 0 0 auto;
          border: 0;
          border-radius: 999px;
          padding: 5px 9px;
          background: #0f3f7a;
          color: #fff;
          font: inherit;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .45px;
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(15, 63, 122, .18);
        }

        .jp-sets-button:hover {
          filter: brightness(1.08);
        }

        .jp-sets-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(17, 24, 39, .42);
          backdrop-filter: blur(3px);
        }

        .jp-sets-modal {
          width: min(470px, 100%);
          max-height: min(640px, calc(100vh - 36px));
          overflow: auto;
          background: #fff;
          border: 1px solid #e7e5e4;
          border-radius: 18px;
          box-shadow: 0 24px 70px rgba(17, 24, 39, .24);
        }

        .jp-sets-modal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          border-bottom: 1px solid #e7e5e4;
        }

        .jp-sets-modal-head > div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .jp-sets-modal-head span {
          color: #78716c;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .8px;
        }

        .jp-sets-modal-head strong {
          color: #0f3f7a;
          font-size: 17px;
          font-weight: 950;
        }

        .jp-sets-close {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 999px;
          background: #f5f5f4;
          color: #292524;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }

        .jp-sets-total {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          background: #f8fafc;
          border-bottom: 1px solid #e7e5e4;
        }

        .jp-sets-total > div {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .jp-sets-total > div:last-child {
          flex-direction: row-reverse;
          text-align: right;
        }

        .jp-sets-total span {
          min-width: 0;
          color: #292524;
          font-size: 11px;
          line-height: 1.2;
          font-weight: 900;
          text-transform: uppercase;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .jp-sets-total strong {
          flex: 0 0 auto;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: #0f3f7a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          font-weight: 950;
        }

        .jp-sets-total > b {
          color: #78716c;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: .5px;
          white-space: nowrap;
        }

        .jp-sets-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 18px 18px;
        }

        .jp-sets-message {
          padding: 18px 14px;
          border: 1px dashed #d6d3d1;
          border-radius: 12px;
          background: #fafaf9;
          color: #57534e;
          text-align: center;
          font-size: 12px;
          font-weight: 850;
        }

        .jp-sets-message-error {
          border-color: #fecaca;
          background: #fef2f2;
          color: #b91c1c;
        }

        .jp-set-row {
          display: grid;
          grid-template-columns: 1fr 44px 20px 44px;
          align-items: center;
          gap: 6px;
          min-height: 46px;
          padding: 7px 10px 7px 14px;
          background: #fafaf9;
          border: 1px solid #e7e5e4;
          border-radius: 12px;
        }

        .jp-set-row span {
          color: #57534e;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: .4px;
        }

        .jp-set-row strong {
          height: 32px;
          border-radius: 9px;
          background: #fff;
          border: 1px solid #d6d3d1;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 950;
        }

        .jp-set-row i {
          color: #a8a29e;
          text-align: center;
          font-style: normal;
          font-weight: 950;
        }

        .jp-empty {
          background: #fff;
          border: 1px dashed #d6d3d1;
          border-radius: 18px;
          padding: 28px 16px;
          text-align: center;
          color: #78716c;
          font-weight: 850;
        }

        .jp-photos {
          max-width: 980px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .jp-photo-link {
          display: block;
          width: 100%;
        }

        .jp-photos img {
          width: 100%;
          max-width: 100%;
          display: block;
          border-radius: 16px;
          border: 1px solid #e7e5e4;
          background: #fff;
          box-shadow: 0 10px 24px rgba(41, 37, 36, .06);
        }

        @media (max-width: 760px) {
          .jp-title-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .jp-tabs {
            max-width: none;
          }

          .jp-filter-box {
            grid-template-columns: 1fr;
          }

          .jp-scroll-hint {
            display: block;
          }

          .jp-sets-total {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .jp-sets-total > div,
          .jp-sets-total > div:last-child {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }

          .jp-sets-total > b {
            order: -1;
          }
        }
      `}</style>

      <section className="jp-top">
        <div className="jp-title-row">
          <div>
            <h1>Jogos</h1>
            <p>Escolha como deseja visualizar as chaves.</p>
          </div>

          {onBack ? (
            <button type="button" onClick={onBack} className="jp-back">
              ← Voltar
            </button>
          ) : null}
        </div>

        <div className="jp-tabs">
          <button
            type="button"
            onClick={() => setModo("fotos")}
            className={modo === "fotos" ? "active" : ""}
          >
            Fotos das chaves
          </button>

          <button
            type="button"
            onClick={() => setModo("sistema")}
            className={modo === "sistema" ? "active" : ""}
          >
            Chaves interativas
          </button>
        </div>
      </section>

      {modo === "fotos" ? <VisualizadorFotosChaves /> : <VisualizadorSistemaChaves />}
    </div>
  );
}
