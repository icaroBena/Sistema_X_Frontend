import { ArrowLeft, Mail, MoreHorizontal } from "lucide-react";
import styles from "../styles/ProfileHeader.module.css";

type Props = {
  nomeUsuario: string;
  email: string | null;
  telefone: string | null;
  dataNascimento: string | null;
  totalPosts: number;
};

export default function ProfileHeader({ nomeUsuario, email, telefone, totalPosts }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.backBtn}>
          <ArrowLeft size={18} /> {nomeUsuario}
        </button>
        <span className={styles.postCount}>{totalPosts} posts</span>
      </div>

      <div className={styles.cover} />

      <div className={styles.profileRow}>
        <div className={styles.avatar}>{nomeUsuario[0]?.toUpperCase()}</div>
        <div className={styles.actions}>
          <button className={styles.iconBtn}><MoreHorizontal size={18} /></button>
          <button className={styles.iconBtn}><Mail size={18} /></button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{nomeUsuario}</span>
        </div>
        <span className={styles.handle}>@{nomeUsuario}</span>
        {email && <span className={styles.handle}>{email}</span>}
        {telefone && <span className={styles.handle}>{telefone}</span>}
      </div>

      <div className={styles.tabs}>
        {["Posts", "Respostas", "Mídia", "Curtidas"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${tab === "Posts" ? styles.tabActive : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}