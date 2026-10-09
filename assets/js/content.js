/* ŌLAM — conteúdo institucional.
 *
 * Este arquivo é a fonte de verdade da casa: séries, objetos, registros.
 * Ele não depende da plataforma comercial. A engine (Nuvemshop hoje, outra amanhã)
 * entra apenas no campo `comercio` de cada objeto.
 *
 * REGRA DE VERDADE: só preencher o que estiver documentado.
 * Campo sem documentação = omitir (a seção não aparece) ou "A DEFINIR".
 */

window.OLAM = {

  contato: {
    // Preencher quando definido. Vazio = a página de contato exibe "A DEFINIR".
    whatsapp: "",   // somente dígitos, com DDI. Ex.: "5511900000000"
    email: "",
    instagram: ""
  },

  /* Estados comerciais. Existência institucional ≠ disponibilidade comercial.
   * preco: se o preço pode ser exibido. cta: qual caminho de aquisição aparece. */
  estados: {
    "DISPONÍVEL":        { preco: true,  cta: "adquirir" },
    "SOB DEMANDA":       { preco: true,  cta: "consulta" },
    "POR CONSULTA":      { preco: false, cta: "consulta" },
    "RESERVADO":         { preco: false, cta: null },
    "ALOCAÇÃO PRIVADA":  { preco: false, cta: "acesso" },
    "ARQUIVO":           { preco: false, cta: null },   // preço e CTA desaparecem; o registro permanece
    "A DEFINIR":         { preco: false, cta: "consulta" }
  },

  series: [
    { slug: "estrutura", nome: "ESTRUTURA", materia: "Diamantes", ideia: "Arquitetura" },
    { slug: "abissal",   nome: "ABISSAL",   materia: "Tanzanita", ideia: "Profundidade" },
    { slug: "horizonte", nome: "HORIZONTE", materia: "Água-marinha", ideia: "Extensão" },
    { slug: "ion",       nome: "ÍON",       materia: "Turmalina do tipo Paraíba", ideia: "Energia" },
    { slug: "desvio",    nome: "DESVIO",    materia: "Diamantes fancy yellow", ideia: "Exceção" },
    { slug: "veio",      nome: "VEIO",      materia: "Esmeraldas", ideia: "Geologia" },
    { slug: "pacto",     nome: "PACTO",     materia: "", ideia: "Símbolo e devoção" },
    { slug: "voto",      nome: "VOTO",      materia: "", ideia: "Compromisso",
      texto: "Arquitetura de compromisso.",
      porta: { rotulo: "Atelier Voto", href: "voto.html" } },
    { slug: "redea",     nome: "RÉDEA",     materia: "", ideia: "Movimento e universo equestre",
      texto: "A série nasce de anatomia, movimento, tensão, direção, equipamento e da relação entre cavalo e atleta.",
      porta: { rotulo: "Rédea / Retrato", href: "retrato.html" } },
    { slug: "aureo",     nome: "ÁUREO",     materia: "Ouro", ideia: "Ouro como matéria",
      texto: "Em ÁUREO, o ouro não sustenta a joia. O ouro constitui a joia." }
  ],

  /* OBJETOS
   *
   * Os três registros abaixo são RASCUNHOS de demonstração da estrutura.
   * As imagens são referências de direção visual, não fotografia confirmada de objetos ŌLAM.
   * Substituir por registros reais antes de publicar.
   *
   * Modelo completo de um objeto (todas as seções são opcionais; seção sem dado não aparece):
   *
   * {
   *   slug: "veio-fenda",
   *   serie: "veio",
   *   nome: "VEIO / FENDA",
   *   chrono: "VEI 27 014",            // Chrono Mark — identificador institucional. Nunca é o SKU.
   *   imagem: "assets/img/….jpg", alt: "…",
   *   materia:  { "Metal": "…", "Gema": "…", "Peso": "…", "Dimensões": "…" },
   *   forma:    { "Construção": "…", "Proporção": "…", "Perfil": "…", "Acabamento": "…" },
   *   pedra:    { … somente informações documentadas … },
   *   registro: { "Chrono Mark": "…", "Atlas Mineral": "…", "Ano": "…", "Documentação": "…" },
   *   corpo:    [ { src: "…", alt: "…" } ],
   *   estado: "DISPONÍVEL",
   *   preco: "R$ …",
   *   comercio: { sku: "…", url: "https://shop.…/…" }   // única ponte com a engine comercial
   * }
   */
  objetos: [
    {
      slug: "registro-em-preparacao-01", serie: "aureo", rascunho: true,
      nome: "A DEFINIR", chrono: "A DEFINIR",
      imagem: "assets/img/aro.jpg", w: 1338, h: 1380,
      alt: "Aro aberto em ouro sobre desenho técnico em papel escuro.",
      estado: "A DEFINIR"
    },
    {
      slug: "registro-em-preparacao-02", serie: "veio", rascunho: true,
      nome: "A DEFINIR", chrono: "A DEFINIR",
      imagem: "assets/img/mao.jpg", w: 800, h: 1000,
      alt: "Anel aberto com duas gemas verdes em gota e pedras incolores, na mão.",
      estado: "A DEFINIR"
    },
    {
      slug: "registro-em-preparacao-03", serie: "aureo", rascunho: true,
      nome: "A DEFINIR", chrono: "A DEFINIR",
      imagem: "assets/img/chama.jpg", w: 978, h: 1512,
      alt: "Pulseira em ouro apoiada sobre bloco refratário, chama ao fundo.",
      estado: "A DEFINIR"
    }
  ],

  // Atlas Mineral e Arquivo têm estrutura própria e não dependem do e-commerce.
  atlas: [],     // { codigo, especie, ano, imagem, dados: { … somente o documentado … } }
  arquivo: []    // { data, tipo, titulo, href }
};
