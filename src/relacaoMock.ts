export type EquipeMock = {
  nome: string;
  atletas: string[];
};

export type CategoriaMock = {
  titulo: string;
  equipes: EquipeMock[];
};

const equipes120A: EquipeMock[] = [
  {
    nome: "Sorocaba",
    atletas: [
      "Claudio Marques (SOR)",
      "Marcos Takeda (SOR)",
    ],
  },
  {
    nome: "Sorocaba",
    atletas: [
      "Yoshikazu Tubone (SOR)",
      "Vlademilson Oliveira (SOR)",
    ],
  },
  {
    nome: "Cooper Tênis",
    atletas: [
      "Pedro Shiraishi (CAC)",
      "Tiemi Feitosa (CAC)",
    ],
  },
  {
    nome: "Yellow",
    atletas: [
      "Ishao Togata (YLW)",
      "Gilberto Takeda (SOR)",
    ],
  },
  {
    nome: "Longway",
    atletas: [
      "Wu Ming Lee (LGW)",
      "Alberto Kuhlmann Neto (LGW)",
    ],
  },
];

const clubes = [
  "Sorocaba",
  "Nippon",
  "Cooper Tênis",
  "Kosmos",
  "Yellow",
  "Longway",
];

const duplas = [
  ["Akira Tanaka (SOR)", "Carlos Sato (SOR)"],
  ["Eduardo Yamamoto (NIP)", "Roberto Suzuki (NIP)"],
  ["Marcos Nakamura (CAC)", "Paulo Kato (CAC)"],
  ["Sérgio Mori (KOS)", "Rogério Kimura (KOS)"],
  ["Kenji Matsuda (YLW)", "Luiz Watanabe (YLW)"],
  ["Hiroshi Ito (LGW)", "Daniel Nakano (LGW)"],
  ["Maurício Saito (SOR)", "Rafael Mori (SOR)"],
  ["Fernando Kato (NIP)", "Ricardo Suzuki (NIP)"],
  ["Paulo Takeda (CAC)", "Renato Yamamoto (CAC)"],
  ["Carlos Nakamura (KOS)", "André Sato (KOS)"],
  ["Takashi Mori (YLW)", "Nelson Kato (YLW)"],
  ["Roberto Ito (LGW)", "Marcelo Saito (LGW)"],
];

function criarEquipes(seed: number): EquipeMock[] {
  return Array.from({ length: 5 }, (_, index) => {
    const clube = clubes[(seed + index) % clubes.length];
    const atletas = duplas[(seed * 3 + index) % duplas.length];

    return {
      nome: clube,
      atletas: [...atletas],
    };
  });
}

function criarCategoria(
  idade: number,
  letra: string | null,
  seed: number,
): CategoriaMock {
  return {
    titulo: letra
      ? `${idade} ANOS "${letra}"`
      : `${idade} ANOS`,
    equipes:
      idade === 120 && letra === "A"
        ? equipes120A
        : criarEquipes(seed),
  };
}

const categorias: CategoriaMock[] = [];

let seed = 0;

for (const idade of [120, 130, 140, 150]) {
  for (const letra of ["A", "B", "C", "D", "E", "F"]) {
    categorias.push(
      criarCategoria(idade, letra, seed),
    );

    seed += 1;
  }
}

// 160 possui somente uma tabela
categorias.push(
  criarCategoria(160, null, seed),
);

export const relacaoMock = {
  categorias,
};