"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("");
  const [metodeAmbil, setMetodeAmbil] = useState("Pesan Antar");

  const totalHarga = (produk.harga * jumlah) + (metodeAmbil === "Pesan Antar" ? 5000 : 0);

  const handlePesan = () => {
    const pesan = `Halo Bihin Nisan, saya ingin pesan:\n\n- Produk: ${produk.nama}\n- Jumlah: ${jumlah}\n- Nama: ${nama}\n- Metode: ${metodeAmbil}\n- Total: Rp ${totalHarga.toLocaleString("id-ID")}`;
    window.open(`https://wa.me/6281214562122?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[#0f172a] w-full max-w-md rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl text-white">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-black uppercase tracking-widest text-sm">Konfirmasi Pesanan</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-blue-600 p-5 rounded-2xl">
            <h3 className="text-xl font-black">{produk.nama}</h3>
            <p className="text-2xl font-black mt-2 text-blue-100">Rp {totalHarga.toLocaleString("id-ID")}</p>
          </div>
          <input 
            type="text" 
            placeholder="Nama Lengkap" 
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none focus:border-blue-500"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <select 
            className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl outline-none"
            value={metodeAmbil}
            onChange={(e) => setMetodeAmbil(e.target.value)}
          >
            <option value="Pesan Antar">🚚 Pesan Antar (+5rb)</option>
            <option value="Ambil Sendiri">🏪 Ambil Sendiri</option>
          </select>
          <button onClick={handlePesan} className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-black tracking-tighter transition-all">
            PESAN VIA WHATSAPP →
          </button>
        </div>
      </div>
    </div>
  );
}