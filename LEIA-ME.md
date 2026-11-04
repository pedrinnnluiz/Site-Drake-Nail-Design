# Drake Nail Design — site

Site simples em HTML, CSS e JavaScript. Não precisa instalar nada.

## Como abrir

Dê dois cliques no arquivo **index.html**. O site abre no navegador.

Para editar, use qualquer editor de texto. O mais indicado é o **VS Code** (gratuito, code.visualstudio.com). Depois de salvar uma alteração, atualize a página no navegador (F5).

## O que tem na pasta

```
index.html            página inicial (Home)
minha-historia.html   Minha História
portfolio.html        Portfólio
seja-parceiro.html    Seja parceiro (contatos, endereço e mapa)
contato.html          Contato
404.html              página de "não encontrado"
css/style.css         todo o visual (cores, fontes, tamanhos)
js/main.js            menu do celular, foto ampliada e seguidores
netlify/functions/    função que busca os seguidores no Instagram
images/portfolio/     fotos dos trabalhos
images/perfil/        fotos do topo, do manifesto e da história
favicon.svg           ícone da aba do navegador
```

## Fotos

As fotos ficam em `images/portfolio/` (trabalhos) e `images/perfil/` (retrato do Marcelo).

### Adicionar um trabalho novo

1. Coloque a foto na pasta `images/portfolio/`, com nome simples, sem espaço nem acento (ex.: `trabalho-07.jpg`).
2. Prefira fotos em pé (retrato), com 600 a 1200 px de largura. Para deixá-las leves, passe pelo site squoosh.app. Use a foto original, não um print do Instagram.
3. Abra `portfolio.html`, copie um bloco inteiro como este e cole logo abaixo do último:

```html
<li>
  <a class="trabalho" href="images/portfolio/trabalho-06.jpg">
    <div class="foto"><img src="images/portfolio/trabalho-06.jpg" alt="Unhas longas e quadradas cobertas de glitter prateado" width="647" height="823" loading="lazy" /></div>
  </a>
</li>
```

4. Troque o nome da foto **nos dois lugares** (`href` e `src`).
5. Troque o `alt` por uma descrição curta do que aparece na foto. Isso ajuda pessoas com deficiência visual e o Google.
6. Ajuste `width` e `height` para as medidas da foto (ou para a mesma proporção).

### Onde cada foto aparece

- **Home:** retrato do Marcelo no topo, 5 fotos em "Trabalhos selecionados" e a foto do manifesto (`index.html`).
- **Portfólio:** todas as fotos (`portfolio.html`).
- **Minha História:** retrato do Marcelo e uma foto de trabalho (`minha-historia.html`).
- **Contato:** foto `trabalho-01` (`contato.html`).

Para trocar uma foto que já está no site, substitua o arquivo na pasta mantendo o mesmo nome, ou edite o caminho no HTML.

## Atualizar a história

Abra `minha-historia.html`. Os textos são uma base **sem fatos inventados**. Há comentários `<!-- A CONFIRMAR ... -->` (invisíveis no site) mostrando onde entram informações que só o Marcelo pode confirmar. Revise tudo com ele antes de publicar.

## Trocar links

O número do WhatsApp e o Instagram aparecem em várias páginas. Para trocar todos de uma vez, use o "Localizar e substituir em todos os arquivos" do VS Code (Ctrl + Shift + H):

- WhatsApp: procure `5515996334016`
- Instagram: procure `drakenails_ofc`
- Endereço: procure `Comendador` (aparece no topo da Home, no Contato, em Seja parceiro, no menu do celular e no rodapé). Os links do mapa começam com `https://www.google.com/maps` e, o mapa incorporado de Seja parceiro, com `https://maps.google.com/maps?q=`. Troque o endereço dentro deles também.

A página Seja parceiro usa outra mensagem automática no WhatsApp ("...gostaria de conversar sobre uma parceria").

A mensagem automática do WhatsApp fica depois de `?text=` no link, escrita em formato de URL. Para gerar uma nova, use o site urlencoder.org e cole o resultado depois de `?text=`.

## Mudar cores e fontes

No começo do arquivo `css/style.css` ficam as variáveis com as cores da marca (`--preto`, `--vinho`, `--champagne`…) e as fontes. Mudando ali, muda o site inteiro.

A fonte é a **Plus Jakarta Sans** (Google Fonts), carregada no `<head>` de cada página. Para trocar, mude o link do Google Fonts nos arquivos `.html` e o nome nas variáveis `--fonte-titulo` e `--fonte-texto`.

## Publicar de graça

**Sem a sincronização de seguidores:** acesse **app.netlify.com/drop** e arraste a pasta inteira do site. Você recebe um endereço público na hora.

**Com a sincronização de seguidores:** publique pelo GitHub (veja abaixo). O "arrastar e soltar" do Netlify não publica a pasta `netlify/functions`, então o número ficaria sempre fixo.

## Seguidores do Instagram sincronizados

Como funciona: o site mostra o número fixo escrito no HTML (`17,4 mil`). Quando o site está no Netlify e o token está configurado, a função `netlify/functions/seguidores.mjs` pergunta o número atual para a API oficial do Instagram, e o site troca o número fixo pelo real. O resultado fica guardado por 1 hora, para não consultar o Instagram a cada visita. Se algo der errado (token vencido, Instagram fora do ar), o site continua mostrando o número fixo, sem quebrar.

Abrindo o `index.html` direto no computador, o número fica sempre fixo. A sincronização só funciona com o site publicado.

### Passo 1 — Conta do Instagram profissional

No app do Instagram do Marcelo: Configurações → Tipo de conta e ferramentas → mudar para **conta profissional** (Criador de conteúdo ou Empresa). É grátis e não muda nada para os seguidores.

### Passo 2 — App na Meta e token de acesso

1. Entre em **developers.facebook.com** com uma conta do Facebook e crie um app do tipo **Business** (Empresa).
2. No app, adicione o produto **Instagram** e escolha **API do Instagram com login do Instagram**.
3. Em "Gerar tokens de acesso", adicione a conta @drakenails_ofc (o Marcelo precisa fazer login e autorizar) e clique em **Gerar token**.
4. Copie o token. Ele vale **60 dias**. Trate como senha: nunca coloque no HTML nem mande por mensagem aberta.

### Passo 3 — Publicar pelo GitHub + Netlify

1. Crie uma conta no **github.com** e um repositório novo (pode ser privado).
2. Envie todos os arquivos da pasta do site (no próprio site do GitHub dá para arrastar os arquivos, ou use o GitHub Desktop).
3. No **app.netlify.com**: Add new site → Import an existing project → GitHub → escolha o repositório. Não precisa preencher comando de build; a pasta de publicação é a raiz (`.`).
4. Em Site configuration → **Environment variables**, crie a variável `INSTAGRAM_TOKEN` com o token do passo 2.
5. Faça um novo deploy (Deploys → Trigger deploy).

### Passo 4 — Conferir

Abra `https://SEU-SITE.netlify.app/.netlify/functions/seguidores`. Deve aparecer algo como `{"seguidores":17432}`. Na Home, o número já aparece atualizado.

### Manutenção: renovar o token a cada 60 dias

Antes de vencer, gere um token novo no painel da Meta (passo 2.3), troque o valor de `INSTAGRAM_TOKEN` no Netlify e faça um novo deploy. Coloque um lembrete no calendário: isso entra na manutenção mensal. Se esquecer, nada quebra: o site volta a mostrar o número fixo.

De tempos em tempos, atualize também o número fixo (procure `17,4 mil`), que é o que aparece se a sincronização falhar.

## Antes de publicar

- [ ] Confirmar o número do WhatsApp com o Marcelo.
- [ ] Revisar a história com o Marcelo.
- [ ] Confirmar com o Marcelo o endereço e o nome do bairro (Caguassu).
- [ ] Atualizar o número fixo de seguidores: procure `17,4 mil` em todos os arquivos.
- [ ] Se for usar a sincronização: seguir os passos de "Seguidores do Instagram sincronizados".
