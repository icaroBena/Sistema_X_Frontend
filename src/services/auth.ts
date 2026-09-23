const BASE_URL = "http://127.0.0.1:8000/api";

export async function loginUsuario(identificador: string, senha: string) {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identificador, senha }),
  });

  const data = await response.json();
  return data;
}

export async function cadastrarUsuario(dados: {
  nome_usuario: string;
  email?: string;
  telefone?: string;
  senha: string;
  data_nascimento: string;
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

// Nota pra nao esquecer: to criando a função para editar perfil do usuário!!!

export async function editarUsuario(usuarioId: number, dados: {
  nome_usuario?: string;
  email?: string;
  telefone?: string;
  senha_atual: string;
  nova_senha?: string;
}) {
  const response = await fetch(`${BASE_URL}/usuario/${usuarioId}/editar/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const data = await response.json();
  return data;
}

export async function excluirUsuario(usuarioId: number, senha: string) {
  const response = await fetch(`${BASE_URL}/usuario/${usuarioId}/excluir/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha }),
  });

  const data = await response.json();
  return data;
}