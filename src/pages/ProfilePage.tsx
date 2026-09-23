import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ProfilePage.module.css";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import PostCard from "../components/PostCard";
import RightPanel from "../components/RightPanel";
import { buscarPerfilUsuario } from "../services/auth";

type Usuario = {
  id: number;
  nome_usuario: string;
  email: string | null;
  telefone: string | null;
  data_nascimento: string | null;
  total_posts: number;
};

type Post = {
  id: number;
  conteudo: string;
  imagem_url: string | null;
  criado_em: string;
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!usuarioSalvo) {
      navigate("/");
      return;
    }

    const { id } = JSON.parse(usuarioSalvo);

    buscarPerfilUsuario(id)
      .then((resposta) => {
        if (resposta.sucesso) {
          setUsuario(resposta.usuario);
          setPosts(resposta.posts);
        } else {
          setErro(resposta.mensagem);
        }
      })
      .catch(() => setErro("Erro ao carregar perfil."))
      .finally(() => setCarregando(false));
  }, [navigate]);

  if (carregando) {
    return <div className={styles.loading}>Carregando perfil...</div>;
  }

  if (erro || !usuario) {
    return <div className={styles.loading}>{erro || "Usuário não encontrado."}</div>;
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        nomeUsuario={usuario.nome_usuario}
        emailUsuario={usuario.email ?? usuario.telefone ?? ""}
      />

      <main className={styles.main}>
        <ProfileHeader
          nomeUsuario={usuario.nome_usuario}
          email={usuario.email}
          telefone={usuario.telefone}
          dataNascimento={usuario.data_nascimento}
          totalPosts={usuario.total_posts}
        />
        <div className={styles.feed}>
          {posts.length === 0 ? (
            <p className={styles.emptyFeed}>Você ainda não fez nenhum post.</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} nomeAutor={usuario.nome_usuario} />
            ))
          )}
        </div>
      </main>

      <RightPanel />
    </div>
  );
}