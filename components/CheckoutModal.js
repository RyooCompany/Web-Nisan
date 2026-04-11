"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [metodeAmbil, setMetodeAmbil] = useState("Pesan Antar");
  const [metodeBayar, setMetodeBayar] = useState("Bayar di Tempat");

  const ongkir = metodeAmbil === "Pesan Antar" ? 5000 : 0;
  const totalHarga = (produk.harga * jumlah) + ongkir;

  const handlePesan = () => {
    const pesan = `Halo Bihin Nisan, saya ingin pesan:\n\n` +
      `- Produk: ${produk.nama}\n` +
      `- Jumlah: ${jumlah}\n` +
      `- Nama: ${nama}\n` +
      `- Alamat/Ambil: ${metodeAmbil}\n` +
      `- Pembayaran: ${metodeBayar}\n` +
      `- Total: Rp ${totalHarga.toLocaleString("id-ID")}`;
    
    window.open(`https://wa.me/6281214562122?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md text-white font-sans">
      <div className="bg-[#0f172a] w-full max-w-lg rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-black uppercase tracking-tighter">Konfirmasi Pesanan</h2>
          <button onClick={onClose} className="bg-slate-800 text-white w-10 h-10 rounded-full hover:bg-red-500 transition-all">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info Produk */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl shadow-lg">
            <p className="text-[10px] uppercase font-black opacity-70">Item:</p>
            <h3 className="text-2xl font-black mb-1">{produk.nama}</h3>
            <div className="flex justify-between items-end mt-4">
              <div>
                <p className="text-[10px] uppercase font-black opacity-70">Harga Satuan:</p>
                <p className="font-bold">Rp {produk.harga.toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-black opacity-70">Total Bayar:</p>
                <p className="text-2xl font-black">Rp {totalHarga.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>

          {/* Form Input */}
          <div className="space-y-4">
            <input type="text" placeholder="Nama Lengkap" className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-blue-500" value={nama} onChange={(e) => setNama(e.target.value)} />
            <input type="text" placeholder="Nomor WhatsApp" className="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 outline-none focus:border-blue-500" value={wa} onChange={(e) => setWa(e.target.value)} />
            
            <div className="grid grid-cols-2 gap-3">
              <select value={metodeAmbil} onChange={(e) => setMetodeAmbil(e.target.value)} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-sm font-bold">
                <option value="Pesan Antar">🚚 Pesan Antar</option>
                <option value="Ambil Sendiri">🏪 Ambil Sendiri</option>
              </select>
              <select value={metodeBayar} onChange={(e) => setMetodeBayar(e.target.value)} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 text-sm font-bold">
                <option value="Bayar di Tempat">💵 COD</option>
                <option value="Transfer Online">💳 Transfer</option>
              </select>
            </div>
          </div>

          <button onClick={handlePesan} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-3xl font-black text-lg transition-all active:scale-95 shadow-xl shadow-blue-600/20">
            KIRIM PESANAN KE WA →
          </button>
        </div>
      </div>
    </div>
  );
}