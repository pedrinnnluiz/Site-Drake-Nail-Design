/* =========================================================
   Marcelo Nail Design — interações
   1. Menu do celular
   2. Cabeçalho que ganha fundo ao rolar (Home)
   3. Foto ampliada (galeria)
   4. Ano atual no rodapé
   5. Seguidores do Instagram sincronizados
   ========================================================= */

(function () {
  /* ---------- 1. Menu do celular ---------- */
  var botaoMenu = document.querySelector('.botao-menu');
  var menuCelular = document.getElementById('menu-celular');

  function abrirMenu(abrir) {
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    botaoMenu.querySelector('.so-leitor-de-tela').textContent = abrir ? 'Fechar menu' : 'Abrir menu';
    menuCelular.hidden = !abrir;
    document.body.classList.toggle('sem-rolagem', abrir);
    document.body.classList.toggle('menu-aberto', abrir);
    if (abrir) menuCelular.querySelector('a').focus();
  }

  if (botaoMenu && menuCelular) {
    botaoMenu.addEventListener('click', function () {
      abrirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menuCelular.hidden) {
        abrirMenu(false);
        botaoMenu.focus();
      }
    });
    // Fecha o menu se a tela for alargada (ex.: celular girado)
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && !menuCelular.hidden) abrirMenu(false);
    });
  }

  /* ---------- 2. Cabeçalho ao rolar ---------- */
  var cabecalho = document.querySelector('.cabecalho');
  if (cabecalho) {
    var aoRolar = function () {
      cabecalho.classList.toggle('rolado', window.scrollY > 24);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
  }

  /* ---------- 3. Foto ampliada ----------
     Qualquer link com a classe "trabalho" dentro de um elemento com
     o atributo data-galeria abre a foto ampliada. Sem JavaScript,
     o link simplesmente abre a imagem. */
  var icones = {
    fechar: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    seta: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  var galerias = document.querySelectorAll('[data-galeria]');
  if (!galerias.length) return;

  var caixa = document.createElement('div');
  caixa.className = 'ampliada';
  caixa.hidden = true;
  caixa.setAttribute('role', 'dialog');
  caixa.setAttribute('aria-modal', 'true');
  caixa.setAttribute('aria-label', 'Foto ampliada');
  caixa.innerHTML =
    '<div class="ampliada-topo">' +
    '  <p class="ampliada-contador" aria-live="polite"></p>' +
    '  <button type="button" class="ampliada-botao ampliada-fechar">' + icones.fechar +
    '    <span class="so-leitor-de-tela">Fechar</span></button>' +
    '</div>' +
    '<figure class="ampliada-palco"><img alt=""><figcaption class="ampliada-legenda"></figcaption></figure>' +
    '<button type="button" class="ampliada-botao ampliada-anterior"><span style="display:grid;transform:scaleX(-1)">' +
    icones.seta + '</span><span class="so-leitor-de-tela">Foto anterior</span></button>' +
    '<button type="button" class="ampliada-botao ampliada-proxima">' + icones.seta +
    '  <span class="so-leitor-de-tela">Próxima foto</span></button>';
  document.body.appendChild(caixa);

  var img = caixa.querySelector('img');
  var contador = caixa.querySelector('.ampliada-contador');
  var legenda = caixa.querySelector('.ampliada-legenda');
  var botaoFechar = caixa.querySelector('.ampliada-fechar');
  var botaoAnterior = caixa.querySelector('.ampliada-anterior');
  var botaoProxima = caixa.querySelector('.ampliada-proxima');

  var fotos = [];
  var atual = 0;
  var quemAbriu = null;

  function mostrar(indice) {
    atual = (indice + fotos.length) % fotos.length;
    var link = fotos[atual];
    var miniatura = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = miniatura ? miniatura.alt : '';
    contador.textContent = atual + 1 + ' de ' + fotos.length;
    legenda.textContent = link.dataset.legenda || (link.querySelector('.selo-provisoria') ? 'Foto provisória' : '');
    var variasFotos = fotos.length > 1;
    botaoAnterior.hidden = !variasFotos;
    botaoProxima.hidden = !variasFotos;
  }

  function abrir(galeria, link) {
    fotos = Array.prototype.slice.call(galeria.querySelectorAll('a.trabalho'));
    quemAbriu = link;
    mostrar(fotos.indexOf(link));
    caixa.hidden = false;
    document.body.classList.add('sem-rolagem');
    botaoFechar.focus();
  }

  function fechar() {
    caixa.hidden = true;
    document.body.classList.remove('sem-rolagem');
    if (quemAbriu) quemAbriu.focus();
  }

  galerias.forEach(function (galeria) {
    galeria.addEventListener('click', function (e) {
      var link = e.target.closest('a.trabalho');
      if (!link) return;
      e.preventDefault();
      abrir(galeria, link);
    });
  });

  botaoFechar.addEventListener('click', fechar);
  botaoAnterior.addEventListener('click', function () { mostrar(atual - 1); });
  botaoProxima.addEventListener('click', function () { mostrar(atual + 1); });

  // Clique fora da foto fecha
  caixa.addEventListener('click', function (e) {
    if (e.target === caixa || e.target.classList.contains('ampliada-palco')) fechar();
  });

  // Teclado: Esc fecha, setas navegam, Tab fica dentro da caixa
  document.addEventListener('keydown', function (e) {
    if (caixa.hidden) return;
    if (e.key === 'Escape') fechar();
    else if (e.key === 'ArrowRight' && fotos.length > 1) mostrar(atual + 1);
    else if (e.key === 'ArrowLeft' && fotos.length > 1) mostrar(atual - 1);
    else if (e.key === 'Tab') {
      var focaveis = Array.prototype.filter.call(caixa.querySelectorAll('button'), function (b) {
        return !b.hidden;
      });
      var primeiro = focaveis[0];
      var ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });

  // Celular: deslizar para os lados troca a foto
  var inicioX = null;
  caixa.addEventListener('touchstart', function (e) {
    inicioX = e.touches[0].clientX;
  }, { passive: true });
  caixa.addEventListener('touchend', function (e) {
    if (inicioX === null || fotos.length < 2) return;
    var distancia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(distancia) > 50) mostrar(distancia < 0 ? atual + 1 : atual - 1);
    inicioX = null;
  });
})();

/* ---------- 4. Ano no rodapé ---------- */
document.querySelectorAll('[data-ano]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

/* ---------- 5. Seguidores sincronizados ----------
   Todo elemento com o atributo data-seguidores mostra o número
   fixo escrito no HTML. Com o site publicado no Netlify e o
   token configurado, ele é trocado pelo número atual do Instagram.
   Se algo falhar, o número fixo continua aparecendo. */
(function () {
  var alvos = document.querySelectorAll('[data-seguidores]');
  if (!alvos.length || location.protocol === 'file:') return;

  // 17432 vira "17,4 mil"; arredonda para baixo para nunca exagerar.
  function formatar(n) {
    if (n >= 1000000) return (Math.floor(n / 100000) / 10).toLocaleString('pt-BR') + ' mi';
    if (n >= 1000) return (Math.floor(n / 100) / 10).toLocaleString('pt-BR') + ' mil';
    return String(n);
  }

  fetch('/.netlify/functions/seguidores')
    .then(function (r) {
      return r.ok ? r.json() : null;
    })
    .then(function (dados) {
      if (!dados || typeof dados.seguidores !== 'number') return;
      var texto = formatar(dados.seguidores);
      alvos.forEach(function (el) {
        el.textContent = texto;
      });
    })
    .catch(function () {
      /* sem conexão ou sem a função: mantém o número fixo */
    });
})();
