/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Diretoria from "./components/Diretoria";
import Sponsors from "./components/Sponsors";
import LogoPopup from "./components/LogoPopup";
import RegulamentoPage from "./components/RegulamentoPage";
import Footer from "./components/Footer";
import { Sponsor, Supporter } from "./types";
import { motion, AnimatePresence } from "motion/react";
import RelacaoAtletasPageProps from "./components/RelacaoAtletasPageProps";
import TabelasPage from "./components/TabelasPage";
import chave1 from "./assets/1.png";
import chave2 from "./assets/2.png";
import chave3 from "./assets/3.png";
import chave4 from "./assets/4.png";
import chave5 from "./assets/5.png";
import RelacaoAtletasAdminPage from "./components/RelacaoAtletasAdminPage";
import GalleryFeed from "./components/GalleryFeed";
import Resultados from "./components/Resultados";
import GaleriaCampeoes from "./components/GaleriaCampeoes";

// Exact path from generated image output
const AERIAL_IMAGE_PATH = "/src/assets/drone.jpg";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "regulamento" | "equipes" | "galeria"
  >("home");
  const [selectedLogo, setSelectedLogo] = useState<Sponsor | Supporter | null>(
    null
  );
  const [chaves, setChaves] = useState<any>(null);
1
  useEffect(() => {
    buscarChaves();
  }, []);

  const buscarChaves = async () => {
    const res = await fetch(
      "https://sothink.com.br/centenario26/api/v2/nippon/list-images"
    );

    const data = await res.json();

    setChaves(data[0]);
  };

  const handleResults = async () => {
    setCurrentPage("resultados")
  }

  // Helper to scroll smoothly to sections
  const handleScrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectLogo = (item: Sponsor | Supporter) => {
    setSelectedLogo(item);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFAF2] text-stone-800">
      {/* Sticky navigation header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner with logos, dates, coordinates & intro */}
              <HeroSection aerialImagePath={AERIAL_IMAGE_PATH} />
              {/* <GaleriaCampeoes onCheckResults={handleResults} /> */}
              {/* Nova Diretoria (New Directorate) Section */}
              <Diretoria />

              {/* Patrocínio and Apoio sections */}
              <Sponsors onSelectItem={handleSelectLogo} />
            </motion.div>
          )}
          {currentPage === "regulamento" && (
            <motion.div
              key="regulamento"
              /* ...props do framer motion... */ className="bg-white min-h-[80vh]"
            >
              <RegulamentoPage onBack={() => setCurrentPage("home")} />
            </motion.div>
          )}

                    {/* NOVA PÁGINA AQUI */}
                    {currentPage === "resultados" && (
            <motion.div
              key="resultados"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FCFAF2] min-h-[80vh]"
            >
              <Resultados onBack={() => setCurrentPage("home")} />
            </motion.div>
          )}
          {/* NOVA PÁGINA AQUI */}
          {currentPage === "equipes" && (
            <motion.div
              key="equipes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FCFAF2] min-h-[80vh]"
            >
              <RelacaoAtletasPageProps onBack={() => setCurrentPage("home")} />
            </motion.div>
          )}
          
          {/* NOVA PÁGINA AQUI */}
          {currentPage === "galeria" && (
            <motion.div
              key="galeria"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FCFAF2] min-h-[80vh]"
            >
              <GalleryFeed />
            </motion.div>
          )}

          {/* NOVA PÁGINA AQUI */}
          {currentPage === "tabelas" && (
            <motion.div
              key="tabelas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FCFAF2] min-h-[80vh]"
            >
              <div className="flex flex-col gap-6 items-center justify-center h-auto max-w-2xl mx-auto py-8">
                {chaves?.image_1 && (
                  <img
                    src={`https://sothink.com.br/centenario26/${chaves.image_1}`}
                    className="max-w-full"
                  />
                )}

                {chaves?.image_2 && (
                  <img
                    src={`https://sothink.com.br/centenario26/${chaves.image_2}`}
                    className="max-w-full"
                  />
                )}

                {chaves?.image_3 && (
                  <img
                    src={`https://sothink.com.br/centenario26/${chaves.image_3}`}
                    className="max-w-full"
                  />
                )}

                {chaves?.image_4 && (
                  <img
                    src={`https://sothink.com.br/centenario26/${chaves.image_4}`}
                    className="max-w-full"
                  />
                )}

                {chaves?.image_5 && (
                  <img
                    src={`https://sothink.com.br/centenario26/${chaves.image_5}`}
                    className="max-w-full"
                  />
                )}
              </div>
            </motion.div>
          )}
          {/* admin */}
          {/* {currentPage === 'admin' && (
            <RelacaoAtletasAdminPage />
          )} */}
        </AnimatePresence>
      </main>

      {/* Footer matching exactly the style in the images */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Interactive logo popup */}
      <LogoPopup item={selectedLogo} onClose={() => setSelectedLogo(null)} />
    </div>
  );
}
