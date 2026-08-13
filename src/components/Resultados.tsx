import React from "react";

export default function Resultados() {
  // Dados estruturados do Quadro Geral
  const quadroGeral = [
    {
      categoria: "Ouro Masculino",
      campeao: "COOPER",
      vice: "SOROCABA I",
      repescagem: "M.CAMICADO",
    },
    {
      categoria: "Ouro Feminino",
      campeao: "COOPER LONGWAY",
      vice: "M.CAMICADO I",
      repescagem: "ACEAS NIKKEY",
    },
    {
      categoria: "Prata Masculino",
      campeao: "COOPER LONGWAY",
      vice: "ACEMA M.CAMICADO",
      repescagem: "M.CAMICADO I",
    },
    {
      categoria: "Prata Feminino",
      campeao: "KITIGAI I",
      vice: "T&T GUARANI CAMPINAS",
      repescagem: "KOSMOS",
    },
    {
      categoria: "Bronze Masculino",
      campeao: "M.CAMICADO",
      vice: "CTC CURITIBA",
      repescagem: "COOPER II",
    },
  ];

  // Dados estruturados dos Times e Atletas
  const timesDetalhes = [
    // OURO MASCULINO
    {
      categoria: "Ouro Masculino",
      colocacao: "Campeão",
      nomeTime: "COOPER",
      atletas: [
        "Daniel Hira (C)",
        "Rafael Suiama",
        "Breno Tanaka",
        "Orlando Nakano",
        "Tito Tanaka",
        "Guilherme Gabriel da Luz",
      ],
    },
    {
      categoria: "Ouro Masculino",
      colocacao: "Vice-Campeão",
      nomeTime: "SOROCABA I",
      atletas: [
        "Gabriel Ito (C)",
        "Arthur Ito",
        "Guilherme Sassaki",
        "Danilo Yohei",
        "Luiz André",
        "Gil Takeda",
      ],
    },
    {
      categoria: "Ouro Masculino",
      colocacao: "Campeão Repescagem",
      nomeTime: "M.CAMICADO",
      atletas: [
        "Rodrigo Nishida Fabro (C)",
        "Lee Chía Tsun",
        "Luis Campos",
        "Pedro Shiraishi",
        "Rubens Massayuki Kumori",
      ],
    },

    // OURO FEMININO
    {
      categoria: "Ouro Feminino",
      colocacao: "Campeão",
      nomeTime: "COOPER LONGWAY",
      atletas: [
        "Cinara Tanaka (C)",
        "Cristina Hirata",
        "Eliane Wakatsuki",
        "Maki Sakamoto",
        "Suely Rumy Wu",
        "Jaqueline Wu",
        "Pamela Wu",
      ],
    },
    {
      categoria: "Ouro Feminino",
      colocacao: "Vice-Campeão",
      nomeTime: "M.CAMICADO I",
      atletas: [
        "Irene Ando (C)",
        "Sanae Lee",
        "Althea Abiko",
        "Tatiana Uejima",
        "Roberta Caldas",
        "Liliana Liun Hung Shibata",
      ],
    },
    {
      categoria: "Ouro Feminino",
      colocacao: "Campeão Repescagem",
      nomeTime: "ACEAS NIKKEY",
      atletas: [
        "Akemi Masuda (C)",
        "Dani Bon",
        "Irina Tomari",
        "Juliana Ogata",
        "Laís Masuda",
        "Regina Sakamoto",
        "Sandra Yakabi",
      ],
    },

    // PRATA MASCULINO
    {
      categoria: "Prata Masculino",
      colocacao: "Campeão",
      nomeTime: "COOPER LONGWAY",
      atletas: [
        "Kazuzo Okino(C)",
        "Wu Ming Lee",
        "Eduardo Ueda",
        "Flavio Tomimatsu",
        "Pedro Okino",
      ],
    },
    {
      categoria: "Prata Masculino",
      colocacao: "Vice-Campeão",
      nomeTime: "ACEMA M.CAMICADO",
      atletas: [
        "Edson Inoue (C)",
        "Nilo Kague",
        "Vitor Fernandes",
        "Stefan Ando",
        "Fabio Yano",
      ],
    },
    {
      categoria: "Prata Masculino",
      colocacao: "Campeão Repescagem",
      nomeTime: "M.CAMICADO I",
      atletas: [
        "Fernando Nakajima (C)",
        "Douglas Yoshimassa Nako",
        "Eduardo Seigo Ikari",
        "Pablo Bauza",
        "Ricardo Ryoiti Yamaguchi",
        "Sang Chul Lee",
      ],
    },

    // PRATA FEMININO
    {
      categoria: "Prata Feminino",
      colocacao: "Campeão",
      nomeTime: "KITIGAI I",
      atletas: [
        "Mariza Tomita (C)",
        "Marcia Yamamoto",
        "Lisandra Lima",
        "Jackeline Abrão",
        "Edna Harada",
        "Luciana Shimabuko",
      ],
    },
    {
      categoria: "Prata Feminino",
      colocacao: "Vice-Campeão",
      nomeTime: "T&T GUARANI CAMPINAS",
      atletas: [
        "Michelle Miya (C)",
        "Tigussa Yoshida",
        "Mariana Kei Toma",
        "Paula Suehara",
        "Elize Takahashi",
        "Fátima Shibuya",
        "Ingrid Sato",
      ],
    },
    {
      categoria: "Prata Feminino",
      colocacao: "Campeão Repescagem",
      nomeTime: "KOSMOS",
      atletas: [
        "Mari Yamamoto (C)",
        "Solange Takahashi",
        "Maylin Odashima",
        "Ilda Kunii",
        "Jessica Nieno",
        "Marina Kawakami",
      ],
    },

    // BRONZE MASCULINO
    {
      categoria: "Bronze Masculino",
      colocacao: "Campeão",
      nomeTime: "M.CAMICADO",
      atletas: [
        "Leo Ohnuma (C)",
        "Edgar Nakajima",
        "Fernando Takeshi Uchinaka",
        "Joao Victor Hatsunoma",
        "Joel Key Hayashi",
        "Rafael Cotarelli Russo",
      ],
    },
    {
      categoria: "Bronze Masculino",
      colocacao: "Vice-Campeão",
      nomeTime: "CTC CURITIBA",
      atletas: [
        "Mario Makoto Ono (C)",
        "Edson Miyawaki Jr",
        "Luciano Nakashita",
        "Felipe Kawatani",
        "Thiago Filipi",
        "Hideki Hattori",
      ],
    },
    {
      categoria: "Bronze Masculino",
      colocacao: "Campeão Repescagem",
      nomeTime: "COOPER II",
      atletas: [
        "Luis Constantino (C)",
        "Andrew Barbosa",
        "Alexandre Otsubo",
        "Eugenio Kobayashi",
        "Marcelo Utumi",
      ],
    },
  ];

  // Helper para cores baseadas na colocação
  const getBadgeColor = (colocacao) => {
    if (colocacao.includes("Vice")) return { bg: "#e2e8f0", text: "#475569" };
    if (colocacao.includes("Repescagem"))
      return { bg: "#ffedd5", text: "#c2410c" };
    return { bg: "#fef08a", text: "#a16207" }; // Campeões (Dourado/Amarelo)
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, Roboto, sans-serif",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "#333",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Cabeçalho */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <h1
          style={{ color: "#1e3a8a", margin: "0 0 10px 0", fontSize: "2rem" }}
        >
          11° Torneio Intercolonial de Tênis Nippon Sorocaba
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem", margin: 0 }}>
          {" "}
          Quadro de Honra & Elencos Oficiais
        </p>
      </header>

      {/* Seção 1: Quadro Geral de Medalhas */}
      <section style={{ marginBottom: "50px" }}>
        <h2
          style={{
            color: "#1e3a8a",
            borderLeft: "4px solid #3b82f6",
            paddingLeft: "10px",
            marginBottom: "20px",
          }}
        >
          🏆 Quadro Geral de Resultados
        </h2>
        <div
          style={{
            overflowX: "auto",
            width: "100%",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "max-content",
              minWidth: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1e3a8a", color: "#fff" }}>
                <th style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  Categoria
                </th>
                <th style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  🥇 Campeão
                </th>
                <th style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  🥈 Vice-Campeão
                </th>
                <th style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  🥉 Repescagem
                </th>
              </tr>
            </thead>
            <tbody>
              {quadroGeral.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f5f9",
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: "bold",
                      color: "#334155",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.categoria}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#a16207",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.campeao}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#475569",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.vice}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#c2410c",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.repescagem}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção 2: Detalhes das Equipes */}
      <section>
        <h2
          style={{
            color: "#1e3a8a",
            borderLeft: "4px solid #3b82f6",
            paddingLeft: "10px",
            marginBottom: "20px",
          }}
        >
          👥 Escalação das Equipes Premiadas
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {timesDetalhes.map((time, idx) => {
            const badge = getBadgeColor(time.colocacao);
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header do Card */}
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "#f1f5f9",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "between",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: badge.bg,
                        color: badge.text,
                      }}
                    >
                      {time.colocacao}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#64748b",
                        marginLeft: "auto",
                      }}
                    >
                      {time.categoria}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#0f172a",
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                    }}
                  >
                    {time.nomeTime}
                  </h3>
                </div>

                {/* Lista de Atletas */}
                <div style={{ padding: "16px", flexGrow: 1 }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#94a3b8",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Atletas Inscritos
                  </span>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {time.atletas.map((atleta, aIdx) => (
                      <li
                        key={aIdx}
                        style={{
                          padding: "6px 0",
                          borderBottom:
                            aIdx === time.atletas.length - 1
                              ? "none"
                              : "1px dashed #e2e8f0",
                          fontSize: "0.95rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "#94a3b8",
                            marginRight: "10px",
                            minWidth: "15px",
                            fontSize: "0.85rem",
                          }}
                        >
                          {aIdx + 1}
                        </span>
                        <span
                          style={{
                            color: "#334155",
                            fontWeight: atleta.includes("(C)")
                              ? "bold"
                              : "normal",
                          }}
                        >
                          {atleta}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
