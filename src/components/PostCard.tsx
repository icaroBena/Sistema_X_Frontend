import { MessageCircle, Repeat2, Heart, Bookmark } from "lucide-react";
import styles from "../styles/PostCard.module.css";

type Post = {
  id: number;
  conteudo: string;
  imagem_url: string | null;
  criado_em: string;
};

type Props = {
  post: Post;
  nomeAutor: string;
};

export default function PostCard({ post, nomeAutor }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>{nomeAutor[0]?.toUpperCase()}</div>

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.author}>{nomeAutor}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>{post.criado_em}</span>
        </div>

        <p className={styles.content}>{post.conteudo}</p>

        {post.imagem_url && (
          <div className={styles.imageWrapper}>
            <img src={post.imagem_url} alt="post" className={styles.image} />
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.action}>
            <MessageCircle size={16} />
          </button>
          <button className={styles.action}>
            <Repeat2 size={16} />
          </button>
          <button className={styles.action}>
            <Heart size={16} />
          </button>
          <button className={styles.action}>
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}