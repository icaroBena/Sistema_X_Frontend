import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SettingsPage.module.css";
import Sidebar from "../components/Sidebar";
import { editarUsuario, excluirUsuario } from "../services/auth";

export default function SettingsPage() {
  const navigate = useNavigate();
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [nomeUsuario, setNomeUsuario] = useState(usuarioSalvo.nome_usuario || "");
  const [email, setEmail] = useState(usuarioSalvo.email || "");
  const [telefone, setTelefone] = useState(usuarioSalvo.telefone || "");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const [senhaExcluir, setSenhaExcluir] = useState("");
  const [confirmarExcluir, setConfirmarExcluir] = useState(false);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleEditar = async () => {
    setErro("");
    setSucesso("");

    if (!senhaAtual) {
      setErro("Informe sua senha atual para salvar as alterações.");
      return;
    }

    if (novaSenha && novaSenha.length < 8) {
      setErro("Nova senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (novaSenha && novaSenha !== confirmarNovaSenha) {
      setErro("As novas senhas não coincidem.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await editarUsuario(usuarioSalvo.id, {
        nome_usuario: nomeUsuario,
        email,
        telefone: telefone || undefined,
        senha_atual: senhaAtual,
        nova_senha: novaSenha || undefined,
      });

      if (resposta.sucesso) {
        localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
        setSucesso("Dados atualizados com sucesso!");
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarNovaSenha("");
      } else {
        setErro(resposta.mensagem);
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluir = async () => {
    setErro("");

    if (!senhaExcluir) {
      setErro("Informe sua senha para excluir a conta.");
      return;
    }

    if (!confirmarExcluir) {
      setErro("Confirme que deseja excluir sua conta.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await excluirUsuario(usuarioSalvo.id, senhaExcluir);

      if (resposta.sucesso) {
        localStorage.removeItem("usuario");
        navigate("/");
      } else {
        setErro(resposta.mensagem);
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar
        nomeUsuario={usuarioSalvo.nome_usuario}
        emailUsuario={usuarioSalvo.email ?? usuarioSalvo.telefone ?? ""}
      />

      <main className={styles.main}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate("/perfil")}>
            ← Voltar
          </button>
          <h1 className={styles.title}>Configurações</h1>
        </div>

        {/* Editar dados */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Editar informações</h2>

          <div className={styles.field}>
            <label className={styles.label}>Nome de usuário</label>
            <input
              type="text"
              maxLength={30}
              className={styles.input}
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />
            <span className={styles.counter}>{nomeUsuario.length}/30</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Telefone <span className={styles.optional}>(opcional)</span></label>
            <input
              type="tel"
              className={styles.input}
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.field}>
            <label className={styles.label}>Nova senha <span className={styles.optional}>(deixe em branco para não alterar)</span></label>
            <input
              type="password"
              placeholder="Mín. 8 caracteres"
              className={styles.input}
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Confirmar nova senha</label>
            <input
              type="password"
              placeholder="Repita a nova senha"
              className={styles.input}
              value={confirmarNovaSenha}
              onChange={(e) => setConfirmarNovaSenha(e.target.value)}
            />
          </div>

          <div className={styles.divider} />

          <div className={styles.field}>
            <label className={styles.label}>Senha atual <span className={styles.required}>*</span></label>
            <input
              type="password"
              placeholder="Obrigatório para salvar"
              className={styles.input}
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}
          {sucesso && <p className={styles.sucesso}>{sucesso}</p>}

          <button
            className={styles.saveBtn}
            onClick={handleEditar}
            disabled={carregando}
          >
            {carregando ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>

        {/* Excluir conta */}
        <div className={styles.dangerSection}>
          <h2 className={styles.dangerTitle}>Zona de perigo</h2>
          <p className={styles.dangerText}>
            Excluir sua conta é uma ação irreversível. Todos os seus dados e posts serão apagados permanentemente.
          </p>

          <div className={styles.field}>
            <label className={styles.label}>Senha para confirmar exclusão</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className={styles.input}
              value={senhaExcluir}
              onChange={(e) => setSenhaExcluir(e.target.value)}
            />
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={confirmarExcluir}
              onChange={(e) => setConfirmarExcluir(e.target.checked)}
            />
            <span>Entendo que esta ação é irreversível e desejo excluir minha conta.</span>
          </label>

          <button
            className={styles.deleteBtn}
            onClick={handleExcluir}
            disabled={carregando}
          >
            {carregando ? "Excluindo..." : "Excluir conta"}
          </button>
        </div>
      </main>
    </div>
  );
}