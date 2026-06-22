const BASE_URL = "http://127.0.0.1:8000/api";

export async function loginUsuario(email: string, senha: string) {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();
  return data;
}

export async function cadastrarUsuario(dados: {
  nome: string;
  email: string;
  celular: string;
  senha: string;
  data_nascimento: string;
  aceite_termos: boolean;
}) {
  const response = await fetch(`${BASE_URL}/cadastro/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await response.json();
  return data;
}

export async function buscarPerfilUsuario(usuarioId: number) {
  const response = await fetch(`${BASE_URL}/usuario/${usuarioId}/posts/`);
  const data = await response.json();
  return data;
}

export async function criarPost(usuarioId: number, conteudo: string, imagemUrl?: string) {
  const response = await fetch(`${BASE_URL}/posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario_id: usuarioId,
      conteudo,
      imagem_url: imagemUrl,
    }),
  });

  const data = await response.json();
  return data;
}