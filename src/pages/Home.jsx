import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { setLoading(false); return navigate("/"); }
      const snap = await getDoc(doc(db, "users", u.uid));
      if (snap.exists()) setUserDoc(snap.data());
      setLoading(false);
    });
    return () => unsub();
  }, [navigate]);

  async function sair() {
    await signOut(auth);
    navigate("/");
  }

  if (loading) return <div className="container"><p>Carregando...</p></div>;

  return (
    <div className="container">
      <h1>Principal</h1>
      {userDoc ? (
        <>
          <p><b>Nome:</b> {userDoc.firstName}</p>
          <p><b>Sobrenome:</b> {userDoc.lastName}</p>
          <p><b>Data de nascimento:</b> {userDoc.birthDate}</p>
          <button onClick={sair}>Sair</button>
        </>
      ) : <p>Não foi possível carregar os dados.</p>}
    </div>
  );
}
