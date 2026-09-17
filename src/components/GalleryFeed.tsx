import React, { useEffect, useState } from "react";

const API_URL = "https://sothink.com.br/centenario26/api/v2/nipponimages";
const BASE_URL = "https://sothink.com.br/centenario26/";

interface ImagemGaleria {
  id: number;
  imagem: string;
  descricao?: string | null;
}

function cortarTexto(texto?: string | null, limite = 95) {
  const descricao = texto?.trim();

  if (!descricao) return "";

  if (descricao.length <= limite) return descricao;

  return `${descricao.slice(0, limite).trim()}...`;
}

export default function GalleryFeed() {
  const [imagens, setImagens] = useState<ImagemGaleria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/listar`)
      .then((res) => res.json())
      .then((data) => {
        if (data.sucesso) setImagens(data.dados || []);
      })
      .catch((error) => console.error(error));
  }, []);

  const abrirModal = (index: number) => {
    setSlideAtual(index);
    setModalAberto(true);
  };

  const proximoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideAtual((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const slideAnterior = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideAtual((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const imagemAtual = imagens[slideAtual];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.22em] text-[#c93b2b]">
          Galeria
        </span>

        <h2 className="text-2xl font-bold uppercase text-stone-950 md:text-3xl">
          Fotos do Torneio
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
          Registros oficiais do torneio de tênis Nippon Sorocaba.
        </p>
      </div>

      {/* Mobile: 1 por linha | Tablet: 2 | Desktop: 3 ou 4 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {imagens.map((item, index) => {
          const descricao = item.descricao?.trim() || "";
          const descricaoGrande = descricao.length > 95;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => abrirModal(index)}
                className="block w-full overflow-hidden bg-stone-100"
              >
                <img
                  src={`${BASE_URL}${item.imagem}`}
                  alt={descricao || "Foto da galeria do torneio"}
                  className="aspect-[4/5] w-full object-cover transition duration-300 hover:scale-[1.03]"
                  loading="lazy"
                />
              </button>

              {descricao ? (
                <div className="border-t border-stone-100 px-4 py-3">
                  <p
                    className="break-words text-sm leading-relaxed text-stone-700"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {cortarTexto(descricao)}
                  </p>

                  <button
                    type="button"
                    onClick={() => abrirModal(index)}
                    className="mt-2 text-xs font-bold uppercase tracking-wide text-[#c93b2b] hover:opacity-80"
                  >
                    {descricaoGrande ? "Ver mais" : "Ampliar"}
                  </button>
                </div>
              ) : null}
            </article>
          );
        })}

        {imagens.length === 0 && (
          <p className="col-span-full py-12 text-center text-gray-500">
            Nenhuma imagem na galeria ainda.
          </p>
        )}
      </div>

      {modalAberto && imagemAtual && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setModalAberto(false)}
        >
          <button
            type="button"
            onClick={() => setModalAberto(false)}
            className="absolute right-4 top-4 z-50 text-4xl font-bold text-white hover:text-gray-300"
            aria-label="Fechar"
          >
            &times;
          </button>

          {imagens.length > 1 && (
            <button
              type="button"
              onClick={slideAnterior}
              className="absolute left-2 z-50 p-3 text-4xl font-bold text-white hover:text-gray-300 md:left-8 md:text-5xl"
              aria-label="Imagem anterior"
            >
              &#10094;
            </button>
          )}

          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid max-h-[92vh] md:grid-cols-[1fr_340px]">
              <div className="flex items-center justify-center bg-black">
                <img
                  src={`${BASE_URL}${imagemAtual.imagem}`}
                  alt={imagemAtual.descricao || "Foto ampliada do torneio"}
                  className="max-h-[92vh] w-full object-contain"
                />
              </div>

              <aside className="max-h-[92vh] overflow-y-auto border-t border-stone-200 p-5 md:border-l md:border-t-0">
                <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[0.2em] text-[#c93b2b]">
                  Foto do torneio
                </span>

                <h3 className="mb-4 text-lg font-black text-stone-950">
                  Nippon Sorocaba
                </h3>

                {imagemAtual.descricao?.trim() ? (
                  <p className="whitespace-pre-line break-words text-sm leading-relaxed text-stone-800">
                    {imagemAtual.descricao}
                  </p>
                ) : (
                  <p className="text-sm text-stone-400">
                    Sem descrição cadastrada.
                  </p>
                )}
              </aside>
            </div>
          </div>

          {imagens.length > 1 && (
            <button
              type="button"
              onClick={proximoSlide}
              className="absolute right-2 z-50 p-3 text-4xl font-bold text-white hover:text-gray-300 md:right-8 md:text-5xl"
              aria-label="Próxima imagem"
            >
              &#10095;
            </button>
          )}
        </div>
      )}
    </section>
  );
}
