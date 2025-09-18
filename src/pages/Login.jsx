import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch (err) {
      if (err.code === "auth/user-not-found") setMsg("Usuário não cadastrado.");
      else if (err.code === "auth/wrong-password") setMsg("Senha incorreta.");
      else setMsg("Falha no login.");
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <b>Login</b> | <Link to="/cadastro">Cadastro</Link>
      </div>
      <h1>Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <input type="email" placeholder="Insira o seu e-mail"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha"
               value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Acessar</button>
      </form>
      <p className="mensagem">{msg}</p>
    </div>
  );
}
