// TabelasPage.tsx

import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal } from 'lucide-react';
import { motion } from 'motion/react';

interface Jogo {
  id: string;
  data: string;
  time1: string;
  time2: string;
}

interface Categoria {
  id: string;
  titulo: string;
  jogos: Jogo[];
  resultados?: {
    campeao?: string;
    vice?: string;
    repescagem?: string;
    melhor1?: string;
    melhor2?: string;
    melhor3?: string;
    melhor4?: string;
  };
}

interface TabelasPageProps {
  onBack: () => void;
}

// MOCK COMPLETO DOS DADOS
export const tabelasMock: Categoria[] = [
  {
    id: 'ouro-masculino',
    titulo: 'OURO MASCULINO',
    resultados: {
      melhor1: 'KOSMOS',
      melhor2: 'M.CAMICADO',
      melhor3: 'COOPER',
      melhor4: 'SOROCABA I',
      campeao: 'SOROCABA II',
      vice: 'COOPER'
    },
    jogos: [
      { id: 'JG.OM1', data: '17/JUL 15:30', time1: 'KOSMOS', time2: 'M.CAMICADO' },
      { id: 'JG.OM2', data: '17/JUL 15:30', time1: 'COOPER', time2: 'SOROCABA I' },
      { id: 'JG.OM3', data: '18/JUL 07:00', time1: 'KOSMOS', time2: 'M.CAMICADO' },
      { id: 'JG.OM4', data: '18/JUL 11:00', time1: 'SOROCABA II', time2: 'SOROCABA I' },
      { id: 'JG.OM5', data: '18/JUL 15:30', time1: 'SOROCABA II', time2: 'COOPER' },
      { id: 'JG.OM6', data: '19/JUL 07:00', time1: '1º MELHOR RESULTADO', time2: '2º MELHOR RESULTADO' },
      { id: 'JG.OM7', data: '19/JUL 07:30', time1: '3º MELHOR RESULTADO', time2: '4º MELHOR RESULTADO' }
    ]
  },
  {
    id: 'prata-masculino',
    titulo: 'PRATA MASCULINO',
    resultados: {
      campeao: 'VENC. JG.PM5',
      vice: 'VENC. JG.PM6',
      repescagem: 'VENC. JG.PM8'
    },
    jogos: [
      { id: 'JG.PM1', data: '17/JUL 07:00', time1: 'M.CAMICADO I', time2: 'COOPER LONGWAY' },
      { id: 'JG.PM2', data: '17/JUL 07:00', time1: 'SOROCABA', time2: 'M.CAMICADO II' },
      { id: 'JG.PM3', data: '17/JUL 11:00', time1: 'S.JOSE CAMPOS', time2: 'RIO RAINHA' },
      { id: 'JG.PM4', data: '17/JUL 11:00', time1: 'ACEAS', time2: 'ACEMA M.CAMICADO' },
      { id: 'JG.PM5', data: '18/JUL 07:00', time1: 'VENC. JG.PM1', time2: 'VENC. JG.PM2' },
      { id: 'JG.PM6', data: '18/JUL 13:00', time1: 'VENC. JG.PM3', time2: 'VENC. JG.PM4' },
      { id: 'JG.PM7', data: '18/JUL 10:00', time1: 'PERD. JG.PM1', time2: 'PERD. JG.PM2' },
      { id: 'JG.PM8', data: '18/JUL 14:30', time1: 'PERD. JG.PM3', time2: 'PERD. JG.PM4' },
      { id: 'JG.PM9', data: '19/JUL 07:00', time1: 'VENC. JG.PM5', time2: 'VENC. JG.PM6' },
      { id: 'JG.PM10', data: '19/JUL 07:30', time1: 'VENC. JG.PM7', time2: 'VENC. JG.PM8' }
    ]
  },
  {
    id: 'bronze-masculino',
    titulo: 'BRONZE MASCULINO',
    resultados: {
      campeao: 'VENC. JG.BM15',
      vice: 'VENC. JG.BM16',
      repescagem: 'VENC. JG.BM14'
    },
    jogos: [
      { id: 'JG.BM1', data: '17/JUL 07:00', time1: 'COOPER II', time2: 'SOROCABA II' },
      { id: 'JG.BM2', data: '17/JUL 07:00', time1: 'M.CAMICADO', time2: 'PIEDADE' },
      { id: 'JG.BM3', data: '17/JUL 07:00', time1: 'VGP M.ANIMAL I', time2: 'S.J.CAMPOS I' },
      { id: 'JG.BM4', data: '17/JUL 11:00', time1: 'VGP M.ANIMAL II', time2: 'SOROCABA I' },
      { id: 'JG.BM5', data: '17/JUL 11:00', time1: 'KOSMOS', time2: 'S.J. CAMPOS II' },
      { id: 'JG.BM6', data: '17/JUL 11:00', time1: 'CTC CURITIBA', time2: 'COOPER I' },
      { id: 'JG.BM7', data: '17/JUL 15:30', time1: 'VENC. JG.BM1', time2: 'VENC. JG.BM2' },
      { id: 'JG.BM8', data: '17/JUL 15:30', time1: 'VENC. JG.BM3', time2: 'VENC. JG.BM4' },
      { id: 'JG.BM9', data: '18/JUL 07:00', time1: 'PERD. JG.BM1', time2: 'PERD. JG.BM2' },
      { id: 'JG.BM10', data: '18/JUL 07:00', time1: 'PERD. JG.BM3', time2: 'PERD. JG.BM4' },
      { id: 'JG.BM11', data: '18/JUL 07:00', time1: 'PERD. JG.BM5', time2: 'PERD. JG.BM6' },
      { id: 'JG.BM12', data: '18/JUL 07:00', time1: 'PERD. JG.BM7', time2: 'PERD. JG.BM8' },
      { id: 'JG.BM13', data: '18/JUL 13:00', time1: 'VENC. JG.BM9', time2: 'VENC. JG.BM10' },
      { id: 'JG.BM14', data: '18/JUL 14:30', time1: 'VENC. JG.BM11', time2: 'VENC. JG.BM12' },
      { id: 'JG.BM15', data: '18/JUL 10:00', time1: 'VENC. JG.BM5', time2: 'VENC. JG.BM6' },
      { id: 'JG.BM16', data: '18/JUL 10:00', time1: 'VENC. JG.BM7', time2: 'VENC. JG.BM8' },
      { id: 'JG.BM17', data: '19/JUL 10:00', time1: 'VENC. JG.BM13', time2: 'VENC. JG.BM14' },
      { id: 'JG.BM18', data: '19/JUL 07:00', time1: 'VENC. JG.BM15', time2: 'VENC. JG.BM16' }
    ]
  },
  {
    id: 'ouro-feminino',
    titulo: 'OURO FEMININO',
    resultados: {
      campeao: 'VENCEDOR JG.OF3',
      vice: 'VENCEDOR JG.OF4',
      repescagem: 'VENCEDOR JG.OF5'
    },
    jogos: [
      { id: 'JG.OF1', data: '17/JUL 11:00', time1: 'COOPER II', time2: 'M.CAMICADO I' },
      { id: 'JG.OF2', data: '17/JUL 15:30', time1: 'ACEAS', time2: 'SOROCABA' },
      { id: 'JG.OF3', data: '17/JUL 15:30', time1: 'M.CAMICADO II', time2: 'COOPER LONGWAY' },
      { id: 'JG.OF4', data: '18/JUL 10:00', time1: 'VENCEDOR JG.OF1', time2: 'VENCEDOR JG.OF2' },
      { id: 'JG.OF5', data: '18/JUL 07:00', time1: 'VENCEDOR JG.OF3', time2: 'PERDEDOR JG.OF4' },
      { id: 'JG.OF6', data: '18/JUL 14:30', time1: 'PERDEDOR JG.OF1', time2: 'PERDEDOR JG.OF2' },
      { id: 'JG.OF7', data: '18/JUL 10:00', time1: 'PERDEDOR JG.OF3', time2: 'VENCEDOR JG.OF5' },
      { id: 'JG.OF8', data: '19/JUL 07:00', time1: 'VENCEDOR JG.OF3', time2: 'VENCEDOR JG.OF4' },
      { id: 'JG.OF9', data: '19/JUL 10:00', time1: 'PERDEDOR JG.OF3', time2: 'VENCEDOR JG.OF5' }
    ]
  },
  {
    id: 'prata-feminino',
    titulo: 'PRATA FEMININO',
    resultados: {
      campeao: 'VENC. JG.PF5',
      vice: 'VENC. JG.PF6',
      repescagem: 'VENC. JG.PF8'
    },
    jogos: [
      { id: 'JG.PF1', data: '17/JUL 07:00', time1: 'T&T GUARANI', time2: 'SOROCABA I' },
      { id: 'JG.PF2', data: '17/JUL 11:00', time1: 'S.JOSE CAMPOS', time2: 'KITIGAI II' },
      { id: 'JG.PF3', data: '17/JUL 11:00', time1: 'SOROCABA II', time2: 'RIO RAINHA' },
      { id: 'JG.PF4', data: '17/JUL 15:30', time1: 'KITIGAI I', time2: 'KOSMO' },
      { id: 'JG.PF5', data: '18/JUL 07:00', time1: 'VENC. JG.PF1', time2: 'VENC. JG.PF2' },
      { id: 'JG.PF6', data: '18/JUL 10:00', time1: 'VENC. JG.PF3', time2: 'VENC. JG.PF4' },
      { id: 'JG.PF7', data: '18/JUL 10:00', time1: 'PERD. JG.PF1', time2: 'PERD. JG.PF2' },
      { id: 'JG.PF8', data: '18/JUL 14:30', time1: 'PERD. JG.PF3', time2: 'PERD. JG.PF4' },
      { id: 'JG.PF9', data: '19/JUL 07:30', time1: 'VENC. JG.PF5', time2: 'VENC. JG.PF6' },
      { id: 'JG.PF10', data: '19/JUL 07:00', time1: 'VENC. JG.PF7', time2: 'VENC. JG.PF8' }
    ]
  }
];

// COMPONENTE PRINCIPAL
export default function TabelasPage({ onBack }: TabelasPageProps) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);
  const categorias = tabelasMock;

  return (
    <div className="bg-[#FCFAF2] min-h-screen py-10 px-4 md:px-8">
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
            {categorias.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSelecionada(index)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition ${
                  categoriaSelecionada === index
                    ? 'bg-[#c93b2b] text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-[#c93b2b] hover:text-[#c93b2b]'
                }`}
              >
                {cat.titulo}
              </button>
            ))}
          </div>

          {/* Título da Categoria */}
          <h1 className="text-center font-bold text-2xl md:text-3xl uppercase tracking-widest text-black mb-8">
            {categorias[categoriaSelecionada].titulo}
          </h1>

          {/* Renderiza a chave conforme o ID */}
          <ChaveRenderer categoria={categorias[categoriaSelecionada]} />
        </motion.div>
      </div>
    </div>
  );
}

// RENDERIZADOR DE CHAVES
function ChaveRenderer({ categoria }: { categoria: Categoria }) {
  switch (categoria.id) {
    case 'ouro-masculino':
      return <ChaveOuroMasculino categoria={categoria} />;
    case 'prata-masculino':
      return <ChavePrataMasculino categoria={categoria} />;
    case 'bronze-masculino':
      return <ChaveBronzeMasculino categoria={categoria} />;
    case 'ouro-feminino':
      return <ChaveOuroFeminino categoria={categoria} />;
    case 'prata-feminino':
      return <ChavePrataFeminino categoria={categoria} />;
    default:
      return <ChaveGenerica categoria={categoria} />;
  }
}

// CHAVE OURO MASCULINO
function ChaveOuroMasculino({ categoria }: { categoria: Categoria }) {
  const { jogos, resultados } = categoria;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-x-auto">
      <div className="flex flex-col items-center min-w-[320px]">
        {/* Linha 1: Quartas de Final */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="border-2 border-stone-300 rounded-lg p-3 text-center">
            <div className="font-bold text-sm text-stone-600">{jogos[0].id}</div>
            <div className="text-xs text-stone-500">{jogos[0].data}</div>
            <div className="font-semibold">{jogos[0].time1}</div>
            <div className="text-xs text-stone-400">X</div>
            <div className="font-semibold">{jogos[0].time2}</div>
          </div>
          <div className="border-2 border-stone-300 rounded-lg p-3 text-center">
            <div className="font-bold text-sm text-stone-600">{jogos[1].id}</div>
            <div className="text-xs text-stone-500">{jogos[1].data}</div>
            <div className="font-semibold">{jogos[1].time1}</div>
            <div className="text-xs text-stone-400">X</div>
            <div className="font-semibold">{jogos[1].time2}</div>
          </div>
        </div>

        {/* Resultados Melhores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4 w-full max-w-2xl">
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-2 text-center">
            <div className="font-bold text-xs text-stone-600">1º MELHOR</div>
            <div className="font-semibold text-sm">{resultados?.melhor1}</div>
          </div>
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-2 text-center">
            <div className="font-bold text-xs text-stone-600">2º MELHOR</div>
            <div className="font-semibold text-sm">{resultados?.melhor2}</div>
          </div>
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-2 text-center">
            <div className="font-bold text-xs text-stone-600">3º MELHOR</div>
            <div className="font-semibold text-sm">{resultados?.melhor3}</div>
          </div>
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-2 text-center">
            <div className="font-bold text-xs text-stone-600">4º MELHOR</div>
            <div className="font-semibold text-sm">{resultados?.melhor4}</div>
          </div>
        </div>

        {/* Linha 2: Semifinais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="border-2 border-stone-300 rounded-lg p-3 text-center">
            <div className="font-bold text-sm text-stone-600">{jogos[2].id}</div>
            <div className="text-xs text-stone-500">{jogos[2].data}</div>
            <div className="font-semibold">{jogos[2].time1}</div>
            <div className="text-xs text-stone-400">X</div>
            <div className="font-semibold">{jogos[2].time2}</div>
          </div>
          <div className="border-2 border-stone-300 rounded-lg p-3 text-center">
            <div className="font-bold text-sm text-stone-600">{jogos[3].id}</div>
            <div className="text-xs text-stone-500">{jogos[3].data}</div>
            <div className="font-semibold">{jogos[3].time1}</div>
            <div className="text-xs text-stone-400">X</div>
            <div className="font-semibold">{jogos[3].time2}</div>
          </div>
        </div>

        {/* Linha 3: Final */}
        <div className="w-full max-w-md mt-4">
          <div className="border-2 border-yellow-500 bg-yellow-50 rounded-lg p-3 text-center">
            <div className="font-bold text-sm text-stone-600">{jogos[4].id}</div>
            <div className="text-xs text-stone-500">{jogos[4].data}</div>
            <div className="font-semibold">{jogos[4].time1}</div>
            <div className="text-xs text-stone-400">X</div>
            <div className="font-semibold">{jogos[4].time2}</div>
          </div>
        </div>

        {/* Campeão e Vice */}
        <div className="grid grid-cols-2 gap-8 mt-6 w-full max-w-md">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="font-bold text-sm text-stone-600">CAMPEÃO</div>
            <div className="font-bold text-lg text-[#c93b2b]">{resultados?.campeao}</div>
          </div>
          <div className="text-center">
            <Medal className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <div className="font-bold text-sm text-stone-600">VICE-CAMPEÃO</div>
            <div className="font-bold text-lg text-stone-700">{resultados?.vice}</div>
          </div>
        </div>

        {/* Repescagem */}
        <div className="mt-6 w-full max-w-md border-t-2 border-stone-200 pt-4">
          <div className="text-center font-bold text-sm text-stone-600 mb-3">REPESCAGEM</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-stone-300 rounded-lg p-3 text-center">
              <div className="font-bold text-sm text-stone-600">{jogos[5].id}</div>
              <div className="text-xs text-stone-500">{jogos[5].data}</div>
              <div className="font-semibold text-sm">1º MELHOR</div>
              <div className="text-xs text-stone-400">X</div>
              <div className="font-semibold text-sm">2º MELHOR</div>
            </div>
            <div className="border-2 border-stone-300 rounded-lg p-3 text-center">
              <div className="font-bold text-sm text-stone-600">{jogos[6].id}</div>
              <div className="text-xs text-stone-500">{jogos[6].data}</div>
              <div className="font-semibold text-sm">3º MELHOR</div>
              <div className="text-xs text-stone-400">X</div>
              <div className="font-semibold text-sm">4º MELHOR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// CHAVE PRATA MASCULINO
function ChavePrataMasculino({ categoria }: { categoria: Categoria }) {
  const { jogos } = categoria;
  
  // Agrupa jogos por posição
  const jogos1 = jogos.slice(0, 4);
  const jogos2 = jogos.slice(4, 6);
  const jogos3 = jogos.slice(6, 8);
  const jogos4 = jogos.slice(8, 10);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-x-auto">
      <div className="flex flex-col items-center min-w-[320px]">
        {/* Primeira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
          {jogos1.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Segunda linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos2.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Terceira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos3.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Quarta linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos4.map((jogo, index) => (
            <div key={jogo.id} className={`border-2 rounded-lg p-2 text-center ${
              index === 0 ? 'border-yellow-500 bg-yellow-50' : 'border-stone-300'
            }`}>
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className={`font-semibold text-sm ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className={`font-semibold text-sm ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CHAVE BRONZE MASCULINO
function ChaveBronzeMasculino({ categoria }: { categoria: Categoria }) {
  const { jogos } = categoria;
  
  const jogos1 = jogos.slice(0, 6);
  const jogos2 = jogos.slice(6, 8);
  const jogos3 = jogos.slice(8, 12);
  const jogos4 = jogos.slice(12, 14);
  const jogos5 = jogos.slice(14, 16);
  const jogos6 = jogos.slice(16, 18);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-x-auto">
      <div className="flex flex-col items-center min-w-[600px]">
        {/* Primeira fase - 6 jogos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-4xl">
          {jogos1.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-[10px] text-stone-600">{jogo.id}</div>
              <div className="text-[8px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-xs">{jogo.time1}</div>
              <div className="text-[8px] text-stone-400">X</div>
              <div className="font-semibold text-xs">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Segunda fase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 w-full max-w-2xl">
          {jogos2.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-[10px] text-stone-600">{jogo.id}</div>
              <div className="text-[8px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-xs">{jogo.time1}</div>
              <div className="text-[8px] text-stone-400">X</div>
              <div className="font-semibold text-xs">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Repescagem 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 w-full max-w-4xl">
          {jogos3.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-[10px] text-stone-600">{jogo.id}</div>
              <div className="text-[8px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-xs">{jogo.time1}</div>
              <div className="text-[8px] text-stone-400">X</div>
              <div className="font-semibold text-xs">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Repescagem 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 w-full max-w-2xl">
          {jogos4.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-[10px] text-stone-600">{jogo.id}</div>
              <div className="text-[8px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-xs">{jogo.time1}</div>
              <div className="text-[8px] text-stone-400">X</div>
              <div className="font-semibold text-xs">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Terceira fase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 w-full max-w-2xl">
          {jogos5.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-[10px] text-stone-600">{jogo.id}</div>
              <div className="text-[8px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-xs">{jogo.time1}</div>
              <div className="text-[8px] text-stone-400">X</div>
              <div className="font-semibold text-xs">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Finais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full max-w-2xl">
          {jogos6.map((jogo, index) => (
            <div key={jogo.id} className={`border-2 rounded-lg p-3 text-center ${
              index === 0 ? 'border-yellow-500 bg-yellow-50' : 'border-stone-300'
            }`}>
              <div className="font-bold text-sm text-stone-600">{jogo.id}</div>
              <div className="text-xs text-stone-500">{jogo.data}</div>
              <div className={`font-bold ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time1}</div>
              <div className="text-xs text-stone-400">X</div>
              <div className={`font-bold ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CHAVE OURO FEMININO
function ChaveOuroFeminino({ categoria }: { categoria: Categoria }) {
  const { jogos } = categoria;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-x-auto">
      <div className="flex flex-col items-center min-w-[320px]">
        {/* Primeira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
          {jogos.slice(0, 3).map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Segunda linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos.slice(3, 5).map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Terceira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos.slice(5, 7).map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Final */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full max-w-2xl">
          {jogos.slice(7, 9).map((jogo, index) => (
            <div key={jogo.id} className={`border-2 rounded-lg p-3 text-center ${
              index === 0 ? 'border-yellow-500 bg-yellow-50' : 'border-stone-300'
            }`}>
              <div className="font-bold text-sm text-stone-600">{jogo.id}</div>
              <div className="text-xs text-stone-500">{jogo.data}</div>
              <div className={`font-bold ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time1}</div>
              <div className="text-xs text-stone-400">X</div>
              <div className={`font-bold ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CHAVE PRATA FEMININO
function ChavePrataFeminino({ categoria }: { categoria: Categoria }) {
  const { jogos } = categoria;
  
  const jogos1 = jogos.slice(0, 4);
  const jogos2 = jogos.slice(4, 6);
  const jogos3 = jogos.slice(6, 8);
  const jogos4 = jogos.slice(8, 10);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-x-auto">
      <div className="flex flex-col items-center min-w-[320px]">
        {/* Primeira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
          {jogos1.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Segunda linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos2.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Terceira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos3.map(jogo => (
            <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-2 text-center">
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className="font-semibold text-sm">{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className="font-semibold text-sm">{jogo.time2}</div>
            </div>
          ))}
        </div>

        {/* Quarta linha */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 w-full max-w-2xl">
          {jogos4.map((jogo, index) => (
            <div key={jogo.id} className={`border-2 rounded-lg p-2 text-center ${
              index === 0 ? 'border-yellow-500 bg-yellow-50' : 'border-stone-300'
            }`}>
              <div className="font-bold text-xs text-stone-600">{jogo.id}</div>
              <div className="text-[10px] text-stone-500">{jogo.data}</div>
              <div className={`font-semibold text-sm ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time1}</div>
              <div className="text-[10px] text-stone-400">X</div>
              <div className={`font-semibold text-sm ${index === 0 ? 'text-[#c93b2b]' : ''}`}>{jogo.time2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CHAVE GENERICA (fallback)
function ChaveGenerica({ categoria }: { categoria: Categoria }) {
  const { jogos } = categoria;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jogos.map(jogo => (
          <div key={jogo.id} className="border-2 border-stone-300 rounded-lg p-3 text-center">
            <div className="font-bold text-sm text-stone-600">{jogo.id}</div>
            <div className="text-xs text-stone-500">{jogo.data}</div>
            <div className="font-semibold">{jogo.time1}</div>
            <div className="text-xs text-stone-400">X</div>
            <div className="font-semibold">{jogo.time2}</div>
          </div>
        ))}
      </div>
    </div>
  );
}