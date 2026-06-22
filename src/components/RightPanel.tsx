import { Search } from "lucide-react";
import styles from "../styles/RightPanel.module.css";

export default function RightPanel() {
  return (
    <aside className={styles.panel}>
      <div className={styles.search}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar no Sistema X"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Em breve</h3>
        <p className={styles.cardText}>
          Trending topics e sugestões de quem seguir vão aparecer aqui assim que tivermos mais usuários na plataforma.
        </p>
      </div>
    </aside>
  );
}