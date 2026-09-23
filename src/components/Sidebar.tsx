
import { Home, Search, Bell, Mail, Bookmark, List, Crown, User, Settings } from "lucide-react";
import styles from "../styles/Sidebar.module.css";

type Props = {
  nomeUsuario: string;
  emailUsuario: string;
};

const navItems = [
  { icon: <Home size={22} />, label: "Início", href: "/perfil" },
  { icon: <Search size={22} />, label: "Explorar", href: "#" },
  { icon: <Bell size={22} />, label: "Notificações", href: "#" },
  { icon: <Mail size={22} />, label: "Mensagens", href: "#" },
  { icon: <Bookmark size={22} />, label: "Salvos", href: "#" },
  { icon: <List size={22} />, label: "Listas", href: "#" },
  { icon: <Crown size={22} />, label: "Premium", href: "#" },
  { icon: <User size={22} />, label: "Perfil", href: "/perfil" },
];

export default function Sidebar({ nomeUsuario, emailUsuario }: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>X</div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <a key={item.label} href="#" className={styles.navItem}>
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
          </a>
        ))}
      </nav>

      <button className={styles.publishBtn}>Publicar</button>

      <div className={styles.userInfo} onClick={() => window.location.href = "/configuracoes"}>
        <div className={styles.avatar}>{nomeUsuario[0]?.toUpperCase()}</div>
        <div className={styles.userText}>
          <span className={styles.userName}>{nomeUsuario}</span>
          <span className={styles.userHandle}>{emailUsuario}</span>
        </div>
        <Settings size={18} className={styles.settingsIcon} />
      </div>
    </aside>
  );
}