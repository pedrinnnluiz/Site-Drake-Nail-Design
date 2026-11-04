/* =========================================================
   Seguidores do Instagram (função do Netlify)

   Busca o número de seguidores na API oficial do Instagram e
   devolve só esse número para o site. O token de acesso fica
   guardado no Netlify (variável INSTAGRAM_TOKEN) e nunca aparece
   no código do site.

   Endereço depois de publicado: /.netlify/functions/seguidores
   Resposta: { "seguidores": 17432 }
   ========================================================= */

// Versão da API do Instagram. Se a Meta descontinuar, troque aqui.
const VERSAO_API = 'v26.0';

export default async () => {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) {
    return resposta({ erro: 'Variável INSTAGRAM_TOKEN não configurada no Netlify.' }, 500);
  }

  try {
    const url =
      `https://graph.instagram.com/${VERSAO_API}/me` +
      `?fields=followers_count&access_token=${encodeURIComponent(token)}`;
    const r = await fetch(url);
    const dados = await r.json();

    if (!r.ok || typeof dados.followers_count !== 'number') {
      // Ex.: token vencido. O site continua mostrando o número fixo.
      console.error('Instagram respondeu com erro:', JSON.stringify(dados.error || dados));
      return resposta({ erro: 'O Instagram não devolveu o número de seguidores.' }, 502);
    }

    // Guarda a resposta por 1 hora no Netlify para não consultar o Instagram a cada visita.
    return resposta({ seguidores: dados.followers_count }, 200, true);
  } catch (e) {
    console.error('Falha ao consultar o Instagram:', e);
    return resposta({ erro: 'Instagram indisponível no momento.' }, 502);
  }
};

function resposta(corpo, status, guardarEmCache = false) {
  const headers = { 'content-type': 'application/json; charset=utf-8' };
  if (guardarEmCache) {
    headers['cache-control'] = 'public, max-age=300';
    headers['netlify-cdn-cache-control'] = 'public, s-maxage=3600, stale-while-revalidate=86400';
  } else {
    headers['cache-control'] = 'no-store';
  }
  return new Response(JSON.stringify(corpo), { status, headers });
}
