import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { cadastrarUsuario } from "./services/auth";


export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Passo 1
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Passo 2
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Passo 3
  const [accepted, setAccepted] = useState(false);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

 const validarPasso1 = () => {
    if (!nomeUsuario.trim()) {
      setErro("Nome de usuário é obrigatório.");
      return false;
    }
    if (nomeUsuario.length > 30) {
      setErro("Nome de usuário deve ter no máximo 30 caracteres.");
      return false;
    }
    if (!email.trim()) {
      setErro("E-mail é obrigatório.");
      return false;
    }
    return true;
  };

  const validarPasso2 = () => {
    if (!dataNascimento) {
      setErro("Data de nascimento é obrigatória.");
      return false;
    }
    if (senha.length < 8) {
      setErro("Senha deve possuir no mínimo 8 caracteres.");
      return false;
    }
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return false;
    }
    return true;
  };

  const avancarPasso = (proximo: number) => {
    setErro("");
    if (proximo === 2 && !validarPasso1()) return;
    if (proximo === 3 && !validarPasso2()) return;
    setStep(proximo);
  };

  const handleSubmit = async () => {
    setErro("");
    setCarregando(true);

    try {
      const resposta = await cadastrarUsuario({
        nome_usuario: nomeUsuario,
        email: email || undefined,
        telefone: telefone || undefined,
        senha,
        data_nascimento: dataNascimento,
      });

      if (resposta.sucesso) {
        navigate("/");
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
      <div className={styles.container}>

        <button
  className={styles.backBtn}
  onClick={() => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep((s) => s - 1);
    }
  }}
>
  ← Voltar
</button>

        <div className={styles.brand}>
          <div className={styles.logo}>X</div>
          <span className={styles.brandName}>Sistema X</span>
        </div>

        <div className={styles.progress}>
          <div className={step >= 1 ? styles.progressActive : styles.progressBar} />
          <div className={step >= 2 ? styles.progressActive : styles.progressBar} />
          <div className={step >= 3 ? styles.progressActive : styles.progressBar} />
        </div>

        {step === 1 && (
          <>
            <h1 className={styles.title}>Crie sua conta</h1>
            <p className={styles.subtitle}>Passo 1 de 3 — Informações básicas</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="nomeUsuario">
                Nome de usuário <span className={styles.required}>*</span>
              </label>
              <input
                id="nomeUsuario"
                type="text"
                placeholder="ex: joaosilva"
                maxLength={30}
                className={styles.input}
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
              <span className={styles.counter}>{nomeUsuario.length}/30</span>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                E-mail <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>@</span>
                <input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  className={`${styles.input} ${styles.inputWithIcon}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="telefone">
                Telefone <span className={styles.optional}>(opcional)</span>
              </label>
              <input
                id="telefone"
                type="tel"
                placeholder="+55 (11) 9 9999-9999"
                className={styles.input}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>


            {erro && <p className={styles.erro}>{erro}</p>}

            <button className={styles.continueBtn} onClick={() => avancarPasso(2)}>
              Continuar →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className={styles.title}>Mais detalhes</h1>
            <p className={styles.subtitle}>Passo 2 de 3 — Dados de acesso</p>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="dataNascimento">
                Data de nascimento <span className={styles.required}>*</span>
              </label>
              <input
                id="dataNascimento"
                type="date"
                className={styles.input}
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="senha">
                Senha <span className={styles.required}>*</span>
              </label>
              <input
                id="senha"
                type="password"
                placeholder="Mín. 8 caracteres"
                className={styles.input}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirmarSenha">
                Confirmar senha <span className={styles.required}>*</span>
              </label>
              <input
                id="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                className={styles.input}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            {erro && <p className={styles.erro}>{erro}</p>}

            <button className={styles.continueBtn} onClick={() => avancarPasso(3)}>
              Continuar →
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className={styles.title}>Quase lá!</h1>
            <p className={styles.subtitle}>Passo 3 de 3 — Termos e condições</p>

            <div className={styles.termsBox}>
              Ao criar uma conta no X, você concorda com nossos Termos de Serviço e
              Política de Privacidade. Seus dados serão utilizados para personalizar
              sua experiência e nunca serão vendidos a terceiros. Você pode excluir
              sua conta a qualquer momento. Nosso conteúdo é moderado por IA e equipe
              humana para garantir um ambiente seguro e respeitoso para todos os usuários.
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Li e aceito os{" "}
                <a href="/terms" className={styles.link}>Termos de Serviço</a>
                {" "}e a{" "}
                <a href="/privacy" className={styles.link}>Política de Privacidade</a>
              </span>
            </label>

            {erro && <p className={styles.erro}>{erro}</p>}

            <button
              className={styles.continueBtn}
              onClick={handleSubmit}
              disabled={!accepted || carregando}
            >
              {carregando ? "Criando conta..." : "Criar conta"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}