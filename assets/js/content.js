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
    // Manifesto da série: cada bloco é uma estrofe, cada item é uma linha.
    { slug: "estrutura", nome: "ESTRUTURA", materia: "Diamantes", ideia: "Arquitetura",
      manifesto: [
        ["Uma pedra não existe sozinha."],
        ["Existe aquilo que a contém."],
        ["Aquilo que a suspende."],
        ["Aquilo que permite que a luz atravesse."],
        ["ESTRUTURA investiga o limite entre matéria e vazio."],
        ["O ouro sustenta."],
        ["O diamante responde à luz."],
        ["Entre ambos permanece apenas o necessário."]
      ] },
    { slug: "abissal",   nome: "ABISSAL",   materia: "Tanzanita", ideia: "Profundidade",
      manifesto: [
        ["Algumas cores existem na superfície."],
        ["Outras parecem continuar depois dela."],
        ["ABISSAL nasce onde a luz encontra profundidade."],
        ["Azul."],
        ["Violeta."],
        ["Sombra."],
        ["Uma mesma matéria muda conforme o olhar se desloca."],
        ["Não existe horizonte."],
        ["Apenas profundidade."]
      ] },
    { slug: "horizonte", nome: "HORIZONTE", materia: "Água-marinha", ideia: "Extensão",
      manifesto: [
        ["Uma linha separa."],
        ["E ao mesmo tempo aproxima."],
        ["Matéria e ar."],
        ["Presença e distância."],
        ["Aquilo que termina."],
        ["Aquilo que continua."],
        ["HORIZONTE nasce dessa divisão quase invisível."]
      ] },
    { slug: "ion",       nome: "ÍON",       materia: "Turmalina do tipo Paraíba", ideia: "Energia",
      manifesto: [
        ["Algumas matérias absorvem luz."],
        ["Outras parecem devolvê-la."],
        ["ÍON nasce dessa diferença."],
        ["Cor concentrada."],
        ["Energia contida."],
        ["Um ponto de intensidade dentro da matéria."]
      ] },
    { slug: "desvio",    nome: "DESVIO",    materia: "Diamantes fancy yellow", ideia: "Exceção",
      manifesto: [
        ["Existe uma ordem esperada."],
        ["E existe aquilo que se afasta dela."],
        ["Uma alteração mínima pode mudar toda a percepção da matéria."],
        ["DESVIO começa nesse ponto."],
        ["Não celebra a irregularidade."],
        ["Observa aquilo que ela produz."]
      ] },
    { slug: "veio",      nome: "VEIO",      materia: "Esmeraldas", ideia: "Geologia",
      manifesto: [
        ["A esmeralda não nasce clara."],
        ["Ela se forma sob pressão mineral."],
        ["Durante milhões de anos, o verde atravessa a rocha até tornar-se matéria estável."],
        ["Cada esmeralda carrega fraturas internas como registros do tempo que a formou."],
        ["VEIO não busca perfeição."],
        ["Busca profundidade."]
      ] },
    { slug: "pacto",     nome: "PACTO",     materia: "", ideia: "Símbolo e devoção",
      manifesto: [
        ["Alguns objetos são usados."],
        ["Outros são guardados."],
        ["Alguns acompanham uma vida inteira."],
        ["PACTO nasce quando matéria e crença passam a ocupar o mesmo objeto."],
        ["O ouro permanece."],
        ["O símbolo atravessa gerações."],
        ["A fé pertence a quem o carrega."]
      ] },
    { slug: "voto",      nome: "VOTO",      materia: "", ideia: "Compromisso",
      manifesto: [
        ["Antes do objeto, existe uma decisão."],
        ["Antes da forma, existe aquilo que ela deverá sustentar."],
        ["VOTO começa nesse instante."],
        ["Uma pedra."],
        ["Duas pessoas."],
        ["Uma escolha que pretende atravessar o tempo."],
        ["O objeto registra."]
      ],
      texto: "Arquitetura de compromisso.",
      porta: { rotulo: "Atelier Voto", href: "voto.html" } },
    { slug: "redea",     nome: "RÉDEA",     materia: "", ideia: "Movimento e universo equestre",
      manifesto: [
        ["Antes da velocidade, existe contato."],
        ["Entre a mão e a boca do cavalo,", "entre o corpo e o movimento,", "existe uma tensão quase invisível."],
        ["O cavalo responde àquilo que não precisa ser dito."],
        ["Força sem excesso.", "Direção sem rigidez.", "Movimento sustentado por confiança."],
        ["RÉDEA registra essa relação em ouro."],
        ["Linhas vêm da anatomia.", "Formas vêm do equipamento.", "Pedras aparecem como pontos de presença."],
        ["Não como ornamento."],
        ["Como registro."]
      ],
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
