import { ArrowLeft, Mail, MoreHorizontal } from "lucide-react";
import styles from "../styles/ProfileHeader.module.css";

type Props = {
  nome: string;
  email: string;
  celular: string | null;
  dataNascimento: string | null;
  totalPosts: number;
};

export default function ProfileHeader({ nome, email, celular, totalPosts }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <button className={styles.backBtn}>
          <ArrowLeft size={18} /> {nome}
        </button>
        <span className={styles.postCount}>{totalPosts} posts</span>
      </div>

      <div className={styles.cover} />

      <div className={styles.profileRow}>
        <div className={styles.avatar}>{nome[0]?.toUpperCase()}</div>
        <div className={styles.actions}>
          <button className={styles.iconBtn}><MoreHorizontal size={18} /></button>
          <button className={styles.iconBtn}><Mail size={18} /></button>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{nome}</span>
        </div>
        <span className={styles.handle}>{email}</span>
        {celular && <span className={styles.handle}>{celular}</span>}
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