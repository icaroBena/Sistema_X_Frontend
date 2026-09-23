import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import styles from "./LoginPage.module.css";
import { loginUsuario } from "./services/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async () => {
    setErro("");

    if (!identificador.trim() || !senha.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await loginUsuario(identificador, senha);

      if (resposta.sucesso) {
        localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
        navigate("/perfil");
      } else {
        setErro(resposta.mensagem);
      }
    } catch {
      setErro("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logo}>X</div>
          <h1 className={styles.heroTitle}>Acontecendo agora</h1>
          <p className={styles.heroSub}>Conecte-se ao mundo com o X.</p>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.formInner}>
          <h2 className={styles.formTitle}>Entrar no X</h2>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="identificador">
              E-mail ou nome de usuário
            </label>
            <input
              id="identificador"
              type="text"
              placeholder="email@exemplo.com ou @usuario"
              className={styles.input}
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="senha">Senha</label>
            <div className={styles.inputWrapper}>
              <input
                id="senha"
                type={showSenha ? "text" : "password"}
                placeholder="••••••••"
                className={styles.input}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowSenha((v) => !v)}
              >
                {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}

          <button type="button" className={styles.forgotLink}>
            Esqueci minha senha
          </button>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <p className={styles.registerText}>
            Não tem conta?{" "}
            <a href="/register" className={styles.registerLink}>Criar conta</a>
          </p>
        </div>
      </div>
    </div>
  );
}