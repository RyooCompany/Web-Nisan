"use client";
import { useState } from "react";
import Link from "next/link";

export default function LacakPesanan() {
  const [nomorWA, setNomorWA] = useState("");
  const [hasilCek, setHasilCek] = useState(null);
  const [pesanError, setPesanError] = useState("");

  const handleCekStatus = () => {
    if (!nomorWA) {
      setPesanError("Silakan masukkan nomor WhatsApp Anda.");
      setHasilCek(null);
      return;
    }

    const dataPesanan = JSON.parse(localStorage.getItem("db_pesanan") || "[]");
    
    // Cari pesanan berdasarkan nomor WA
    const found = dataPesanan.find(p => p.wa_pembeli === nomorWA);

    if (found) {
      setHasilCek(found);
      setPesanError("");
    } else {
      setHasilCek(null);
      setPesanError("Maaf, nomor ini belum terdaftar atau Anda belum melakukan pembelian.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center font-sans text-black">
      <div className="w-full max-w-md">
        <Link href="/" className="text-blue-600 text-sm font-bold mb-8 block hover:underline">
          ← Kembali ke Beranda
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Lacak Pesanan</h1>
          <p className="text-slate-500 text-sm mt-2">Masukkan nomor WhatsApp untuk melihat status & metode pembayaran.</p>
        </div>
        
        <div className="bg-white p-8 rounded-[30px] shadow-xl border border-slate-100">
          <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
            Nomor WhatsApp
          </label>
          <input 
            type="text" 
            placeholder="Contoh: 08123456789" 
            className="w-full p-4 border-2 border-slate-100 rounded-2xl mb-4 focus:border-blue-500 outline-none transition-all text-black font-bold"
            value={nomorWA}
            onChange={(e) => setNomorWA(e.target.value)}
          />
          <button 
            onClick={handleCekStatus}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            CEK STATUS PESANAN
          </button>
        </div>

        {/* Tampilan Hasil */}
        <div className="mt-8 transition-all duration-500">
          {hasilCek ? (
            <div className="bg-white border-2 border-blue-500 p-8 rounded-[35px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-6 py-2 rounded-bl-2xl font-black text-[10px] uppercase">
                Pesanan Aktif
              </div>
              
              <h3 className="font-black text-slate-900 text-2xl tracking-tighter leading-tight mb-1">
                {hasilCek.produk}
              </h3>
              <p className="text-slate-400 text-sm font-bold uppercase mb-6">Atas Nama: {hasilCek.nama_pembeli}</p>
              
              {/* Info Utama */}
              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status Pengerjaan:</p>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    hasilCek.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    ● {hasilCek.status}
                  </span>
                </div>

                {/* UPDATE: Info Metode Pembayaran */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Metode Pembayaran:</p>
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    {hasilCek.metode === "COD" ? "🚚 Bayar di Tempat (COD)" : "💳 Transfer Online"}
                  </p>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-400 font-bold text-center italic mt-6">
                Update terakhir: {hasilCek.update_tgl}
              </p>
            </div>
          ) : pesanError && (
            <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[30px] text-center animate-in slide-in-from-bottom-4">
              <div className="text-3xl mb-2">⚠️</div>
              <p className="text-red-600 font-black tracking-tight leading-snug">{pesanError}</p>
              <p className="text-red-400 text-xs mt-2 italic font-medium">Pastikan nomor yang Anda masukkan benar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}