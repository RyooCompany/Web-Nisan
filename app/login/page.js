"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Akun Admin Statis
    const adminEmail = "user@batu.com";
    const adminPass = "123";

    if (email === adminEmail && password === adminPass) {
      // SET KUNCI LOGIN DI SINI
      localStorage.setItem("isLoggedIn", "true");
      
      alert("Login Berhasil!");
      // Pindah ke halaman admin
      router.push("/admin");
    } else {
      alert("Email atau Password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
      <div className="bg-white p-10 rounded-[30px] shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-600 tracking-tighter">BIHIN ADMIN</h1>
          <p className="text-gray-400 text-sm font-bold uppercase mt-2">Silakan Masuk</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="" 
              className="w-full p-4 border rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 border rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition transform active:scale-95 shadow-xl shadow-blue-100"
          >
            MASUK SEKARANG
          </button>
        </form>
        
        <p className="text-center text-[10px] text-gray-300 mt-8 uppercase tracking-widest">
          Halaman Khusus Pengelola Toko
        </p>
      </div>
    </div>
  );
}