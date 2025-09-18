import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setMsg("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(cred.user, { displayName: `${nome} ${sobrenome}` });
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email: email.trim().toLowerCase(),
        firstName: nome.trim(),
        lastName: sobrenome.trim(),
        birthDate: nascimento,
        createdAt: serverTimestamp(),
      });
      setMsg("Cadastro ok! Vá fazer login.");
      setTimeout(() => navigate("/"), 900);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setMsg("E-mail já está em uso.");
      else if (err.code === "auth/weak-password") setMsg("Senha fraca (mín. 6).");
      else setMsg("Erro ao cadastrar.");
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <Link to="/">Login</Link> | <b>Cadastro</b>
      </div>
      <h1>Cadastro</h1>
      <form className="form" onSubmit={handleRegister}>
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)} />
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
        <input placeholder="Sobrenome" value={sobrenome} onChange={e=>setSobrenome(e.target.value)} />
        <input type="date" placeholder="Data de nascimento" value={nascimento} onChange={e=>setNascimento(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>
      <p className="mensagem">{msg}</p>
    </div>
  );
}
