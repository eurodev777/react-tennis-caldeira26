// RelacaoAtletasPage.tsx

import React, { useState, useEffect } from "react";
import { relacaoMock } from "../relacaoMock";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface RelacaoAtletasPageProps {
  onBack: () => void;
}

export default function RelacaoAtletasPage({
  onBack,
}: RelacaoAtletasPageProps) {
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categoriaAtual, setCategoriaAtual] = useState(0);

  useEffect(() => {
    const fetchRelacao = async () => {
      try {
        const response = await fetch(
          "https://sothink.com.br/apinippon/api/v2/nippon/listar?tabela=completo"
        );

        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }

        const json = await response.json();

        setDados(json);
      } catch (error) {
        console.warn("API falhou, usando dados de mock (fallback).", error);
        setDados(relacaoMock);
      } finally {
        setLoading(false);
      }
    };

    fetchRelacao();
  }, []);

  if (loading) {
    return (
      <div className="p-20 text-center text-stone-500">
        Carregando relação de atletas...
      </div>
    );
  }

  const categoria = dados?.categorias?.[categoriaAtual];

  if (!categoria) {
    return (
      <div className="p-20 text-center text-stone-500">
        Nenhuma categoria encontrada.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-[#c93b2b] font-semibold mb-8 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para a Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Navegação entre categorias */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {dados?.categorias.map((cat: any, index: number) => (
              <button
                key={index}
                onClick={() => setCategoriaAtual(index)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  categoriaAtual === index
                    ? "bg-[#c93b2b] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.titulo.replace("RELAÇÃO DOS ATLETAS - ", "")}
              </button>
            ))}
          </div>

          <h1 className="text-center font-bold text-xl md:text-2xl uppercase tracking-widest text-black mb-12">
            {categoria.titulo}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {categoria?.equipes.map((equipe: any, index: number) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-[#e31818] font-bold text-center text-sm md:text-[15px] mb-2 uppercase">
                  {equipe.nome}
                </h3>

                <div className="border-[1.5px] border-black flex flex-col bg-white min-h-[100px]">
                  {equipe?.atletas.map((atleta: any) => {
                    const isCaptain = atleta.nome.includes("(C)");

                    return (
                      <div
                        key={atleta.id}
                        className="border-b border-black last:border-b-0 py-2.5 px-2 text-center"
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
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
