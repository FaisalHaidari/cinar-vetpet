import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Modern bir fontu CDN'den ekleme (örneğin Nunito)
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function AuthForm() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.search.includes('register'));
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // isLogin'ı sorgu dizesiyle senkronize et
  React.useEffect(() => {
    setIsLogin(!location.search.includes('register'));
  }, [location.search]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    const url = isLogin
      ? `${import.meta.env.VITE_API_URL}/login`
      : `${import.meta.env.VITE_API_URL}/register`;
    const body = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        // faisal@gmail.com için yönetici rolü ayarla
        if (data.user && data.user.email === 'faisal@gmail.com') {
          data.user.role = 'ADMIN';
        }
        if (!isLogin) {
          // Kayıt: giriş yap ve yönlendir
          login(data.user);
          navigate("/");
        } else {
          // Giriş: giriş yap ve yönlendir
          login(data.user);
          navigate("/");
        }
        setMessage(data.message + (data.user ? ` Hoşgeldin, ${data.user.name}` : ""));
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Sunucu ile bağlantı hatası");
    }
  };

  return (
    <div style={{
      maxWidth: 370,
      margin: "40px auto",
      padding: 28,
      border: "1.5px solid #e0e0e0",
      borderRadius: 18,
      background: "#fff",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
      fontFamily: "'Nunito', 'Vazirmatn', 'Quicksand', 'Rubik', sans-serif"
    }}>
      <h2 style={{textAlign: 'center', color: '#f7882f', fontWeight: 700, marginBottom: 24, fontFamily: "inherit"}}>
        {isLogin ? "Giriş Yap" : "Kayıt Ol"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Adınız"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ddd", fontFamily: "inherit" }}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="E-posta"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 8, border: "1px solid #ddd", fontFamily: "inherit" }}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 8, border: "1px solid #ddd", fontFamily: "inherit" }}
          required
        />
        <button type="submit" style={{ width: "100%", padding: 12, background: "#f7882f", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 17, fontFamily: "inherit", boxShadow: "0 2px 8px rgba(247,136,47,0.08)" }}>
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </form>
      <button
        onClick={() => {
          if (isLogin) {
            navigate('/auth?tab=register');
          } else {
            navigate('/auth?tab=login');
          }
          setMessage("");
        }}
        style={{ marginTop: 18, background: "none", border: "none", color: "#f7882f", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", fontSize: 15 }}
      >
        {isLogin ? "Hesabınız yok mu? Kayıt Ol" : "Zaten hesabınız var mı? Giriş Yap"}
      </button>
      {message && <div style={{ marginTop: 20, color: "#d35400", textAlign: 'center', fontWeight: 600, fontFamily: "inherit" }}>{message}</div>}
    </div>
  );
}