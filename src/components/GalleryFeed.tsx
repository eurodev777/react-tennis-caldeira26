import React, { useState, useEffect } from "react";

const API_URL = "https://sothink.com.br/apinippon/api/v2/nipponimages"; // MUDE AQUI

interface ImagemGaleria {
  id: number;
  imagem: string; // ex: uploads/12345.jpg
}

export default function GalleryFeed() {
  const [imagens, setImagens] = useState<ImagemGaleria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/listar`)
      .then((res) => res.json())
      .then((data) => {
        if (data.sucesso) setImagens(data.dados);
      });
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

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Feed 4 Colunas - Formato Vertical */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {imagens.map((item, index) => (
          <div
            key={item.id}
            onClick={() => abrirModal(index)}
            className="cursor-pointer overflow-hidden rounded-xl aspect-[9/16] bg-gray-200 hover:opacity-90 transition-opacity"
          >
            <img
              src={`http://sothink.com.br/apinippon/${item.imagem}`}
              alt="Galeria"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Modal Tela Inteira */}
      {modalAberto && imagens.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setModalAberto(false)}
        >
          {/* Botão Fechar */}
          <button className="absolute top-4 right-4 text-white text-4xl font-bold z-50 hover:text-gray-300">
            &times;
          </button>

          {/* Botão Anterior */}
          <button
            onClick={slideAnterior}
            className="absolute left-4 md:left-8 text-white text-5xl font-bold hover:text-gray-300 z-50 p-4"
          >
            &#10094;
          </button>

          {/* Imagem do Slide */}
          <img
            src={`http://sothink.com.br/apinippon/${imagens[slideAtual].imagem}`}
            alt="Slide"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
            onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o modal
          />

          {/* Botão Próximo */}
          <button
            onClick={proximoSlide}
            className="absolute right-4 md:right-8 text-white text-5xl font-bold hover:text-gray-300 z-50 p-4"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
