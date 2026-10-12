/* ŌLAM — interface. Sem dependências. */
(function () {
  var O = window.OLAM;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var serieDe = function (slug) { return O.series.filter(function (s) { return s.slug === slug; })[0]; };
  var param = function (k) { return new URLSearchParams(location.search).get(k); };

  document.documentElement.classList.add("js");

  /* ——— Cabeçalho, menu, rodapé ——— */

  var NAV = [
    ["OBJETOS", "objetos.html"], ["SÉRIES", "series.html"], ["ATLAS", "atlas.html"], ["ARQUIVO", "arquivo.html"],
    ["VOTO", "voto.html"], ["PRIVATE SHOP", "private.html"], ["CONTATO", "contato.html"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  var links = function (cls) {
    return NAV.map(function (n) {
      return '<a class="' + cls + '" href="' + n[1] + '"' + (n[1] === here ? ' aria-current="page"' : "") + ">" + n[0] + "</a>";
    });
  };

  document.body.insertAdjacentHTML("afterbegin",
    '<header class="hd">' +
      '<a class="mark" href="index.html" aria-label="ŌLAM — início">ŌLAM</a>' +
      '<nav aria-label="Principal">' + links("label").join("") + "</nav>" +
      '<button class="toggle label" aria-expanded="false" aria-controls="menu">Menu</button>' +
    "</header>" +
    '<div class="menu" id="menu" aria-hidden="true">' +
      '<div class="top"><a class="mark" href="index.html">ŌLAM</a><button class="label" data-close>Fechar</button></div>' +
      "<ul>" + links("").map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>" +
      '<p class="label foot">Tempo. Matéria. Permanência.</p>' +
    "</div>");

  document.body.insertAdjacentHTML("beforeend",
    '<footer class="ft">' +
      '<p class="mark">ŌLAM</p>' +
      '<p class="lines">Ouro é tempo solidificado.<br>Feito sob demanda.</p>' +
      "<ul>" + [["RÉDEA / RETRATO", "retrato.html"]].concat(NAV).map(function (n) {
        return '<li><a class="label" href="' + n[1] + '">' + n[0] + "</a></li>";
      }).join("") + "</ul>" +
      '<p class="label legal">© ' + new Date().getFullYear() + " ŌLAM</p>" +
    "</footer>");

  var menu = $("#menu"), toggle = $(".hd .toggle");
  var setMenu = function (open) {
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    (open ? $("[data-close]", menu) : toggle).focus();
  };
  toggle.addEventListener("click", function () { setMenu(true); });
  $("[data-close]", menu).addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false); });

  /* ——— Blocos ——— */

  var figure = function (o, cls, eager) {
    return '<img src="' + o.imagem + '" alt="' + esc(o.alt || "") + '" width="' + o.w + '" height="' + o.h + '"' +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (cls ? ' class="' + cls + '"' : "") + ">";
  };

  var card = function (o) {
    var s = serieDe(o.serie);
    return '<a class="object-card reveal" href="objeto.html?o=' + o.slug + '">' +
      figure(o) +
      '<div class="meta">' +
        '<span class="label mute">' + s.nome + "</span>" +
        '<span class="n">' + esc(o.rascunho ? "Registro em preparação" : o.nome) + "</span>" +
        '<span class="code mute">' + esc(o.chrono) + (o.estado === "ARQUIVO" ? " · ARQUIVO" : "") + "</span>" +
      "</div></a>";
  };

  var spec = function (titulo, dados) {
    if (!dados) return "";
    var rows = Object.keys(dados).filter(function (k) { return dados[k]; });
    if (!rows.length) return "";
    return '<section class="section stack"><h2 class="label">' + titulo + '</h2><dl class="spec">' +
      rows.map(function (k) { return '<div><dt class="label">' + esc(k) + "</dt><dd>" + esc(dados[k]) + "</dd></div>"; }).join("") +
      "</dl></section>";
  };

  var seriesList = function () {
    return '<ol class="series-list">' + O.series.map(function (s) {
      return '<li><a href="serie.html?s=' + s.slug + '"><span class="n">' + s.nome + "</span>" +
        '<span class="label mute">' + esc((s.materia ? s.materia + " — " : "") + s.ideia) + "</span></a></li>";
    }).join("") + "</ol>";
  };

  var vazio = function (txt) { return '<p class="body">' + txt + "</p>"; };

  /* ——— Renderizações por página ——— */

  var R = {
    "series-list": function (el) { el.innerHTML = seriesList(); },

    "objetos": function (el) {
      var lista = O.objetos.slice(0, +el.dataset.limit || undefined);
      el.innerHTML = lista.length ? '<div class="objects">' + lista.map(card).join("") + "</div>"
        : vazio("Nenhum objeto registrado até o momento.");
    },

    "serie": function (el) {
      var s = serieDe(param("s"));
      if (!s) { el.innerHTML = '<div class="wrap page-head"><p class="label">Série</p><h1 class="title">Série não encontrada.</h1><p style="margin-top:40px"><a class="cta" href="series.html">Ver as séries</a></p></div>'; return; }
      document.title = s.nome + " — ŌLAM";
      var objs = O.objetos.filter(function (o) { return o.serie === s.slug; });
      el.innerHTML =
        '<div class="wrap page-head"><p class="label mute">Série</p>' +
          '<h1 class="display">' + s.nome + "</h1>" +
          '<p class="lede" style="margin-top:32px">' + esc((s.materia ? s.materia + " — " : "") + s.ideia) + ".</p></div>" +
        (s.manifesto ? '<section class="wrap section manifesto serie"><h2 class="label mute">Manifesto</h2>' +
          s.manifesto.map(function (estrofe, i) {
            return '<p class="' + (i ? "lede" : "title") + '">' + estrofe.map(esc).join("<br>") + "</p>";
          }).join("") + '<p class="sign">ŌLAM</p>' +
          (s.porta && !s.texto ? '<p style="margin-top:56px"><a class="cta" href="' + s.porta.href + '">' + esc(s.porta.rotulo) + "</a></p>" : "") + "</section>" : "") +
        (s.texto ?'<section class="wrap section stack"><p class="lede">' + esc(s.texto) + "</p>" +
          (s.porta ? '<p><a class="cta" href="' + s.porta.href + '">' + esc(s.porta.rotulo) + "</a></p>" : "") + "</section>" : "") +
        '<section class="wrap section stack-l"><h2 class="label">Objetos</h2>' +
          (objs.length ? '<div class="objects">' + objs.map(card).join("") + "</div>"
            : vazio("Nenhum objeto registrado nesta série até o momento.")) + "</section>" +
        '<section class="wrap section"><a class="cta" href="series.html">Todas as séries</a></section>';
    },

    "objeto": function (el) {
      var o = O.objetos.filter(function (x) { return x.slug === param("o"); })[0];
      if (!o) { el.innerHTML = '<div class="wrap page-head"><p class="label">Objeto</p><h1 class="title">Registro não encontrado.</h1><p style="margin-top:40px"><a class="cta" href="objetos.html">Examinar objetos</a></p></div>'; return; }
      var s = serieDe(o.serie), e = O.estados[o.estado] || O.estados["A DEFINIR"];
      document.title = (o.rascunho ? "Registro em preparação" : o.nome) + " — ŌLAM";

      var aquisicao = "";
      if (e.preco && o.preco) aquisicao += '<p class="price">' + esc(o.preco) + "</p>";
      if (e.cta === "adquirir" && o.comercio && o.comercio.url) aquisicao += '<p><a class="cta" href="' + esc(o.comercio.url) + '">Adicionar à seleção</a></p>';
      else if (e.cta === "acesso") aquisicao += '<p><a class="cta" href="contato.html?assunto=private%20shop">Solicitar acesso</a></p>';
      else if (e.cta) aquisicao += '<p><a class="cta" href="contato.html?assunto=' + encodeURIComponent(o.chrono !== "A DEFINIR" ? o.chrono : "objeto") + '">Iniciar uma consulta</a></p>';

      el.innerHTML = '<div class="object-layout">' +
        '<figure class="object-hero wrap">' + figure(o, "", true) + "</figure>" +
        '<div class="object-body wrap">' +
          '<section class="section bare stack"><p class="label mute">Objeto</p>' +
            '<h1 class="title">' + esc(o.nome) + "</h1>" +
            '<p class="label"><a href="serie.html?s=' + s.slug + '">Série ' + s.nome + "</a></p>" +
            '<p class="code mute">Chrono Mark — ' + esc(o.chrono) + "</p>" +
            (o.rascunho ? '<p class="note">Registro em preparação. Imagem de referência de direção visual. Matéria, forma e registro serão publicados quando documentados.</p>' : "") +
          "</section>" +
          spec("Matéria", o.materia) + spec("Forma", o.forma) + spec("Pedra", o.pedra) + spec("Registro", o.registro) +
          (o.corpo && o.corpo.length ? '<section class="section stack"><h2 class="label">Corpo</h2>' +
            o.corpo.map(function (c) { return '<img src="' + c.src + '" alt="' + esc(c.alt || "") + '" loading="lazy">'; }).join("") + "</section>" : "") +
          '<section class="section stack"><h2 class="label">Disponibilidade</h2><p class="state">' + esc(o.estado) + "</p></section>" +
          (aquisicao ? '<section class="section stack"><h2 class="label">' + (e.cta === "adquirir" ? "Aquisição" : "Consulta") + "</h2>" + aquisicao + "</section>" : "") +
          '<section class="section stack"><h2 class="label">Continuidade</h2>' +
            '<p class="body">Assistência, registro e cuidados acompanham o objeto.</p>' +
            '<p><a class="cta" href="contato.html">Falar com a ŌLAM</a></p></section>' +
        "</div></div>";
    },

    "atlas": function (el) { el.innerHTML = O.atlas.length ? "" : vazio("Nenhum registro publicado até o momento."); },
    "arquivo": function (el) {
      var arq = O.objetos.filter(function (o) { return o.estado === "ARQUIVO"; });
      el.innerHTML = arq.length ? '<div class="objects">' + arq.map(card).join("") + "</div>"
        : vazio("Nenhum registro publicado até o momento.");
    },

    "contato": function (el) {
      var c = O.contato, assunto = param("assunto");
      var linha = function (k, v, href) {
        return '<div><dt class="label">' + k + "</dt><dd>" + (v ? '<a href="' + href + '">' + esc(v) + "</a>" : "A DEFINIR") + "</dd></div>";
      };
      el.innerHTML =
        (assunto ? '<p class="code mute">Assunto — ' + esc(assunto.toUpperCase()) + "</p>" : "") +
        (c.whatsapp ? '<p><a class="cta" rel="noopener" href="https://wa.me/' + esc(c.whatsapp) + '">Falar com a ŌLAM</a></p>' : "") +
        '<dl class="spec">' +
          linha("Atendimento", c.whatsapp && "WhatsApp", "https://wa.me/" + c.whatsapp) +
          linha("E-mail", c.email, "mailto:" + c.email) +
          linha("Instagram", c.instagram && "@" + c.instagram, "https://instagram.com/" + c.instagram) +
        "</dl>";
    }
  };

  document.querySelectorAll("[data-render]").forEach(function (el) { R[el.dataset.render](el); });

  /* ——— Carrossel do hero: fade, sem sequestrar a rolagem ——— */

  document.querySelectorAll("[data-carousel]").forEach(function (c) {
    var imgs = c.querySelectorAll("img"), i = 0, timer;
    if (imgs.length < 2) return;
    var ticks = document.createElement("div");
    ticks.className = "ticks";
    imgs.forEach(function (_, n) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Imagem " + (n + 1) + " de " + imgs.length);
      b.addEventListener("click", function () { go(n); start(); });
      ticks.appendChild(b);
    });
    c.appendChild(ticks);
    var go = function (n) {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach(function (img, k) {
        if (k === i) img.loading = "eager";
        img.classList.toggle("on", k === i);
        img.setAttribute("aria-hidden", String(k !== i));
        ticks.children[k][k === i ? "setAttribute" : "removeAttribute"]("aria-current", "true");
      });
    };
    var stop = function () { clearInterval(timer); };
    var start = function () {
      stop();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      timer = setInterval(function () { if (!document.hidden) go(i + 1); }, 6000);
    };
    c.addEventListener("mouseenter", stop);
    c.addEventListener("mouseleave", start);
    c.addEventListener("focusin", stop);
    c.addEventListener("focusout", start);
    var x0 = null;
    c.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    c.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); start(); }
    }, { passive: true });
    go(0);
    start();
  });

  /* ——— Reveal mínimo ——— */

  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (e) { io.observe(e); });
})();
