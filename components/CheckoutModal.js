"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [metodeAmbil, setMetodeAmbil] = useState("Pesan Antar");
  const [metodeBayar, setMetodeBayar] = useState("Bayar di Tempat");
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");

  // Perhitungan harga (Contoh harga default jika data produk tidak lengkap)
  const hargaSatuan = produk.harga || 500000;
  const ongkir = metodeAmbil === "Pesan Antar" ? 50000 : 0;
  const totalBayar = (hargaSatuan * jumlah) + ongkir;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const prosesPesanan = () => {
    if (!nama || !wa) return alert("Mohon isi Nama dan Nomor WhatsApp!");
    
    const teksWA = `Halo Bihin Nisan, saya ingin memesan:\n\n` +
      `📦 Produk: ${produk.nama}\n` +
      `🔢 Jumlah: ${jumlah}\n` +
      `🚚 Pengiriman: ${metodeAmbil}\n` +
      `💳 Pembayaran: ${metodeBayar}\n` +
      `👤 Nama: ${nama}\n` +
      `📱 WA: ${wa}\n\n` +
      `💰 Total: ${formatRupiah(totalBayar)}\n\n` +
      `Mohon info selanjutnya, terima kasih!`;

    const nomorAdmin = "6281234567890"; // Ganti dengan nomor WhatsApp kamu
    window.open(`https://wa.me/${nomorAdmin}?text=${encodeURIComponent(teksWA)}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 font-sans text-slate-800">
      <div className="bg-white w-full max-w-4xl rounded-[30px] shadow-2xl flex flex-col md:flex-row relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-6 right-6 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl z-10 transition-colors">
          ✕
        </button>

        {/* KOLOM KIRI: Detail Produk */}
        <div className="flex-1 p-8 md:p-10 border-r border-slate-100">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Pesanan Anda</h2>
            <p className="text-slate-500 text-sm mt-1">Lengkapi rincian pesanan untuk dikirim ke admin.</p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-8">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">PRODUK PILIHAN</p>
            <h3 className="text-2xl font-black text-slate-900">{produk.nama}</h3>
            
            <div className="flex justify-between items-center pt-5 mt-5 border-t border-blue-200/60">
              <span className="font-bold text-sm text-slate-600 uppercase">Jumlah</span>
              <div className="flex items-center gap-2 bg-white rounded-xl border border-blue-100 p-1">
                <button onClick={() => setJumlah(Math.max(1, jumlah - 1))} className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 font-bold">-</button>
                <span className="font-black text-lg w-8 text-center text-blue-700">{jumlah}</span>
                <button onClick={() => setJumlah(jumlah + 1)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold">+</button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">METODE PENGAMBILAN</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setMetodeAmbil("Pesan Antar")} className={`py-4 rounded-2xl border-2 font-bold transition-all ${metodeAmbil === "Pesan Antar" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-slate-200 text-slate-500"}`}>
                🚚 Pesan Antar
              </button>
              <button onClick={() => setMetodeAmbil("Ambil Sendiri")} className={`py-4 rounded-2xl border-2 font-bold transition-all ${metodeAmbil === "Ambil Sendiri" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-slate-200 text-slate-500"}`}>
                🏪 Ambil di Toko
              </button>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Form & Total */}
        <div className="flex-1 p-8 md:p-10 bg-slate-50 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Nama Penerima</label>
              <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Satrio Dicky" className="w-full bg-white border-2 border-slate-200 p-4 rounded-2xl text-slate-800 font-bold outline-none focus:border-blue-500 transition-all shadow-sm" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Nomor WhatsApp</label>
              <input type="number" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="0812..." className="w-full bg-white border-2 border-slate-200 p-4 rounded-2xl text-slate-800 font-bold outline-none focus:border-blue-500 transition-all shadow-sm" />
            </div>
            
            <div className="pt-4">
              <p className="text-xs font-black text-slate-400 uppercase mb-3">Metode Pembayaran</p>
              <div className="flex gap-3">
                <button onClick={() => setMetodeBayar("Bayar di Tempat")} className={`flex-1 p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 ${metodeBayar === "Bayar di Tempat" ? "border-blue-600 bg-white shadow-sm ring-2 ring-blue-100" : "border-slate-200 text-slate-500"}`}>
                  💵 COD
                </button>
                <button onClick={() => setMetodeBayar("Transfer Online")} className={`flex-1 p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 ${metodeBayar === "Transfer Online" ? "border-blue-600 bg-white shadow-sm ring-2 ring-blue-100" : "border-slate-200 text-slate-500"}`}>
                  💳 Transfer
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-3xl border border-slate-200">
            <div className="flex justify-between items-end mb-6">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Bayar</span>
              <span className="text-2xl font-black text-blue-600">{formatRupiah(totalBayar)}</span>
            </div>
            <button onClick={prosesPesanan} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-5 rounded-2xl shadow-xl shadow-blue-600/30 transition-all">
              Beli via WhatsApp →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}