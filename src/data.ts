/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sponsor, Supporter, Director } from './types';
import mcamicado from './assets/patrocinadores/1.jpg'
import hala from './assets/patrocinadores/2.jpg'
import unica from './assets/patrocinadores/4.jpg'
import ito from './assets/patrocinadores/3.jpg'
import sicredi from './assets/apoio/sicredi.jpg'
import bwm from './assets/apoio/bwm.jpg'
import dai from './assets/apoio/dai.jpg'
import maxxi from './assets/apoio/maxxi.jpg'
import jadlog from './assets/apoio/jadlog.jpg'
import mr from './assets/apoio/mr.jpg'
import ideal from './assets/apoio/ideal.jpg'
import h20 from './assets/apoio/h20.jpg'
import simus from './assets/apoio/simus.jpg'
import shibata from './assets/apoio/shibata.jpg'
import katia from './assets/apoio/katia.jpg'
import prosteel from './assets/apoio/prosteel.jpg'
import tammy from './assets/apoio/tammy.jpg'
import outlabel from './assets/apoio/outlabel.jpg'
import classicpan from './assets/apoio/classicpan.jpg'
import dr from './assets/apoio/dr.jpg'
import mira from './assets/apoio/mira.jpg'
import tadao from './assets/apoio/tadao.jpg'
import sothink from './assets/apoio/sothink.png'
import mt from './assets/diretoria/1.jpg'
import ic from './assets/diretoria/2.jpg'
import st from './assets/diretoria/3.jpg'
import tk from './assets/diretoria/4.jpg'
import rt from './assets/diretoria/5.jpg'
import acai from './assets/expositores/acai-everest.png'
import bea from './assets/expositores/bea.png'
import shimi from './assets/expositores/shimi.png'
import atomy from './assets/expositores/atomy.png'
import violet from './assets/expositores/violet.png'
import comfort from './assets/expositores/comfort.png'
import alice from './assets/expositores/alice.png'
import brilho from './assets/expositores/brilho.jpg'
import longway from './assets/expositores/longway.png'
import brahma from './assets/expositores/brahma.png'
import picole from './assets/expositores/picole-joao.jpeg'

import { describe } from 'node:test';

// Adicione isso ao seu arquivo data.ts (ou onde você guarda SPONSORS e SUPPORTERS)

// 1. Array para a grade principal de Expositores (parte de cima)
export const EXHIBITORS = [
  {
    id: 'exp-acai',
    name: 'Açaí Everest',
    logoText: acai, // Substitua pelo caminho correto da sua imagem
  },
  {
    id: 'exp-bea',
    name: 'Bea Activewear',
    logoText: bea,
  },
  {
    id: 'exp-shimi',
    name: 'Shimi Dorayaki House',
    logoText: shimi,
  },
  {
    id: 'exp-atomy',
    name: 'Atomy Santo André Oasis',
    logoText: atomy,
  },
  {
    id: 'exp-violet',
    name: 'Violet Doces',
    logoText: violet,
  },
  {
    id: 'exp-comfort',
    name: 'TG Comfort',
    logoText: comfort,
  },
  {
    id: 'exp-alice',
    name: 'Alice Furuno',
    logoText: alice,
  },
  {
    id: 'exp-brilho',
    name: 'Brilho Raro',
    logoText: brilho,
  },
  {
    id: 'exp-picole-joao',
    name: 'Picolé João',
    logoText: picole,
  }
];

// 2. Array para os 3 patrocinadores ao lado do logo do Birugumi (parte de baixo)
export const BIRUGUMI_SPONSORS = [
  {
    id: 'biru-longway',
    name: 'Longway',
    logoText: longway,
  },
  {
    id: 'biru-brahma',
    name: 'Mr. Jeff - Chopp Brahma Express',
    logoText: brahma,
  },
  {
    id: 'biru-dai',
    name: 'Dai Alimentos',
    logoText: dai,
  },
];

export const SPONSORS = [
  {
    id: 'm-camicado',
    name: 'M.Camicado',
    logoType: 'text',
    logoText: mcamicado,
    tagline: 'TRADIÇÃO EM PREÇOS BAIXOS',
    siteUrl: 'https://www.mcamicado.com.br',
    instagram: 'mcamicado',
    whatsapp: '+551133127676',
    phone: '(11) 3312-7676',
    description: 'A M.Camicado é sinônimo de tradição e economia em Sorocaba e região. Oferecemos uma linha completa de utilidades domésticas, presentes, decoração, brinquedos e artigos para o lar com o melhor preço garantido.',
    bgColor: 'bg-[#D2143A]',
    textColor: 'text-white'
  },
  {
    id: 'hala',
    name: 'HALA SOLUÇÕES',
    logoType: 'text',
    logoText: hala,
    tagline: 'Especialistas em oferecer soluções de engenharia',
    siteUrl: 'https://www.halasolucoes.com.br',
    instagram: 'halasolucoes',
    facebook: 'halasolucoes',
    description: 'Empresa focada em projetos, obras e manutenções diversas nas áreas de Engenharia Elétrica, Civil e Mecânica. Conta com um corpo técnico experiente e capacitado, que entrega resutados com alto padrão de qualidade, segurança e excelência.',
    bgColor: 'bg-white',
    textColor: 'text-[#1E1B4B]'
  },
  {
    id: 'grupo-unica',
    name: 'Grupo Unica',
    logoType: 'text',
    logoText: unica,
    tagline: 'há mais de 20 anos protegendo sua família e seu patrimônio',
    siteUrl: 'https://www.grupounica.com.br',
    instagram: 'grupounicaseguranca',
    facebook: 'grupounica_sorocaba',
    description: 'O Grupo Única conquistou seu espaço através da prestação de serviços de qualidade voltados integralmente à satisfação de seus clientes. Atuamos nas áreas de Segurança Patrimonial, Segurança Eletrônica e Facilities.',
    bgColor: 'bg-[#005CA9]',
    textColor: 'text-white'
  },
  {
    id: 'ito',
    name: 'ITO',
    logoType: 'text',
    logoText: ito,
    tagline: 'MATERIAIS PARA CONSTRUÇÃO',
    siteUrl: 'https://www.itomat.com.br',
    instagram: 'itomateriais',
    whatsapp: '+5511996192659',
    phone: '(15) 3231-6151',
    description: 'Sua melhor opção em loja de materiais para construção em Sorocaba. Com mais de 10.000 produtos divididos em diversos departamentos, aqui você encontra tudo para sua obra, podendo contar com as melhores e mais variadas marcas e modelos de materiais para construção disponíveis no mercado.',
    bgColor: 'bg-[#F2A900]',
    textColor: 'text-[#1C1917]'
  }
];

export const SUPPORTERS = [
  {
    id: 'sicredi',
    name: 'Sicredi',
    logoType: 'text',
    logoText: sicredi,
    siteUrl: 'https://www.sicredi.com.br',
  },
  {
    id: 'bwm',
    name: 'BWM',
    logoType: 'text',
    logoText: bwm,
    description: 'RESIDENCIAIS - COMERCIAIS - INVESTIMENTOS - LANÇAMENTOS'
  },
  {
    id: 'dai',
    name: 'Dai Cervejaria',
    logoType: 'text',
    logoText: dai,
    tagline: 'Alimentos',
    instagram: 'daialimentos',
    facebook: 'daialimentos',
    whatsapp: '+551120190909',
    description: 'Mais sabor à sua vida...'
  },
  {
    id: 'maxxi-ovos',
    name: 'Maxxi Ovos',
    logoType: 'text',
    logoText: maxxi,
    siteUrl: 'https://www.maxxiovos.com.br',
    instagram: 'maxxiovos',
    description: 'Mais sabor e praticidade para uma vida saudável.'
  },
  {
    id: 'jadlog',
    name: 'Jadlog',
    logoType: 'text',
    logoText: jadlog,
    whatsapp: '+551532333280',
    phone: '(15) 3233-3280',
    description: 'tat.sor@jadlog.com.br'
  },
  {
    id: 'mr-jeff',
    name: 'Mr Jeff',
    logoType: 'text',
    logoText: mr,
    instagram: 'mrjeffeventos',
    whatsapp: '+5515998267418',
    description: 'Há mais de 10 anos no mercado sendo referência em eventos em Sorocaba e Região.'
  },
  {
    id: 'ideal-seguros',
    name: 'Ideal Seguros',
    logoType: 'text',
    logoText: ideal,
    tagline: 'FONE: (15) 3219-3500',
    instagram: '@idealsegurossorocaba',
    whatsapp: '+5515998414953',
    phone: '(15) 3219-3500',
    description: 'Nós temos a melhor proposta 30 anos fazendo o melhor por você!'
  },
  {
    id: 'm0-ambiental',
    name: 'Grupo M0 Ambiental',
    logoType: 'text',
    logoText: h20,
    instagram: '@grupoh2oambiental2',
    whatsapp: '+5515998609777',
    description: 'a solução completa para o seu projeto!'
  },
  {
    id: 'simus',
    name: 'Simus Carnes',
    logoType: 'text',
    logoText: simus,
    tagline: 'A CASA DA CARNE',
    instagram: 'simuscarnes',
    whatsapp: '+5515997305088',
    phone: '(15) 3221-9095',
    description: 'Mais sabor para sua mesa!'
  },
  {
    id: 'shibata',
    name: 'Shibata Quitanda',
    logoType: 'text',
    logoText: shibata,
    tagline: 'quitanda',
    facebook: 'quitandasantarosalia',
    whatsapp: '+5515992014621',
    phone: '(15) 3231-8214',
    description: 'Desde 1981'
  },
  {
    id: 'katia-mayumi',
    name: 'Katia Mayumi',
    logoType: 'text',
    logoText: katia,
    instagram: 'katia_mayumi_tenis',
    whatsapp: '+5515991760021',
    description: 'Orientação para Postura - Quick Massage'
  },
  {
    id: 'prosteel',
    name: 'Prosteel',
    logoType: 'text',
    logoText: prosteel,
    tagline: 'Estruturas Metálicas e Calderaria',
    description: 'prosteelsorocaba@bol.com.br'
  },
  {
    id: 'tammy',
    name: 'O Verdadeiro pastel Tammy',
    logoType: 'text',
    logoText: tammy,
    siteUrl: 'linktr.ee/tammypastelaria',
    instagram: 'tammypastelaria',
    description: 'O Verdadeiro Pastel Desde 1977'
  },
  {
    id: 'label-packing',
    name: 'OUTLABEL',
    logoType: 'text',
    logoText: outlabel,
    siteUrl: 'https://www.outlabel.com.br',
    instagram: 'outlabel',
    description: 'OUTLABEL Rótulos e Bisnagas'
  },
  {
    id: 'classic-pan',
    name: 'Classic Pan',
    logoType: 'text',
    logoText: classicpan,
    description: 'Sinta o gosto dos clássicos - ClassicPan na 105,9 FM.'
  },
  {
    id: 'celso-amamura',
    name: 'Dr. Celso Amamura',
    logoType: 'text',
    logoText: dr,
    tagline: 'Oftalmologista',
    siteUrl: 'https://www.amuramed.com.br',
    instagram: 'dr_celso_amamura',
    phone: '(15) 3234-2942',
    description: 'Doe seus olhos'
  },
  {
    id: 'mira',
    name: 'Mira',
    logoType: 'text',
    logoText: mira,
    tagline: 'Manutenções e Vistorias Imobiliárias',
    whatsapp: '+5515997784221',
    description: 'QUALIDADE E PREÇO JUSTO'
  },
  {
    id: 'tadao-takeda',
    name: 'Tadao Takeda',
    logoType: 'text',
    logoText: tadao,
    tagline: 'FOTOS E VÍDEOS',
    instagram: 'takeda_tadao',
    whatsapp: '+5511993095120',
  },
  {
    id: 'sothink',
    name: 'Sothink Marketing',
    logoType: 'text',
    logoText: sothink,
    tagline: 'agência de marketing',
    siteUrl: 'https://sothink.com.br',
    instagram: 'sothink.mkt',
    facebook: 'profile.php?id=61562262162613',
    whatsapp: '+5515997442108',
    phone: '(15) 99744-2108',
    description: 'Na Sothink, cada projeto começa com uma análise estratégica das áreas da empresa. A partir desse diagnóstico, oferecemos soluções personalizadas, alinhadas às necessidades específicas de cada cliente — afinal, cada negócio é único e vive realidades diferentes.',
  }
];

export const DIRECTORS: Director[] = [
  {
    id: 'milton',
    name: 'Milton Tsubaki',
    role: 'Diretor',
    initials: mt
  },
  {
    id: 'israel',
    name: 'Israel Costa Vale',
    role: 'Coordenador Social',
    initials: ic
  },
  {
    id: 'sergio',
    name: 'Sergio Takeda',
    role: 'Coordenador Técnico',
    initials: st
  },
  {
    id: 'tomoko',
    name: 'Tomoko Kanaschiro',
    role: 'Coordenadora de Comunicação',
    initials: tk
  },
  {
    id: 'raquel',
    name: 'Raquel Takeda',
    role: 'Coordenadora Financeira',
    initials: rt
  }
];

export const tabelasMock = {
  categorias: [
    {
      id: "ouro_masc",
      nome: "Ouro Masculino",
      jogos: [
        { id: "JG.OM1", equipeA: "KOSMOS", equipeB: "M.CAMICADO", data: "17/JUL", hora: "15:30", fase: "Principal" },
        { id: "JG.OM2", equipeA: "COOPER", equipeB: "SOROCABA II", data: "17/JUL", hora: "15:30", fase: "Principal" },
        { id: "JG.OM3", equipeA: "SOROCABA I", equipeB: "KOSMOS", data: "18/JUL", hora: "07:00", fase: "Principal" }
      ]
    },
    {
      id: "prata_masc",
      nome: "Prata Masculino",
      jogos: [
        { id: "JG.PM1", equipeA: "M.CAMICADO I", equipeB: "COOPER LONGWAY", data: "17/JUL", hora: "07:00", fase: "Principal" },
        { id: "JG.PM2", equipeA: "SOROCABA", equipeB: "M.CAMICADO II", data: "17/JUL", hora: "07:00", fase: "Principal" }
      ]
    },
    {
      id: "ouro_fem",
      nome: "Ouro Feminino",
      jogos: [
        { id: "JG.OF1", equipeA: "SOROCABA", equipeB: "ACEAS", data: "17/JUL", hora: "11:00", fase: "Principal" },
        { id: "JG.OF2", equipeA: "M.CAMICADO I", equipeB: "COOPER II", data: "17/JUL", hora: "15:30", fase: "Principal" }
      ]
    }
  ]
};
