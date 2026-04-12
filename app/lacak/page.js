"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LacakPesanan() {
  const [pesananSaya, setPesananSaya] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Otomatis mengambil "KTP" WA pembeli yang tersimpan di HP ini
    const userWa = localStorage.getItem("user_wa");
    
    if (userWa) {
      const dataPesanan = JSON.parse(localStorage.getItem("db_pesanan") || "[]");
      // Cari pesanan yang nomor WA-nya cocok
      const pesananDitemukan = dataPesanan.filter(p => p.wa_pembeli === userWa);
      setPesananSaya(pesananDitemukan);
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header Ala E-Commerce */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-xl font-bold text-slate-600 hover:text-blue-600">
            ←
          </Link>
          <h1 className="text-lg font-black tracking-tight uppercase">Riwayat Pesanan</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-6 mt-4 space-y-6">
        
        {loading ? (
          <div className="text-center py-20 animate-pulse text-blue-500 font-bold">Memuat Data Pesanan...</div>
        ) : pesananSaya.length > 0 ? (
          pesananSaya.map((pesanan) => (
            <div key={pesanan.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              
              {/* Header Card Pesanan */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tgl: {pesanan.update_tgl.split(' ')[0]}</span>
                <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase tracking-wider ${
                  pesanan.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {pesanan.status === "Selesai" ? "Selesai" : "Sedang Berjalan"}
                </span>
              </div>

              {/* Info Produk */}
              <div className="p-5 flex items-center gap-4 border-b border-slate-100">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl border border-blue-100">
                  {pesanan.produk.toLowerCase().includes('granit') ? '⬛' : pesanan.produk.toLowerCase().includes('custom') ? '⚒️' : '🪦'}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg leading-tight">{pesanan.produk}</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{pesanan.metode_bayar === "COD" ? "Bayar di Tempat (COD)" : "E-Wallet / QRIS"}</p>
                </div>
              </div>

              {/* Progress Bar Status (Ala Shopee) */}
              <div className="p-6">
                <div className="flex justify-between items-center relative">
                  {/* Garis background */}
                  <div className="absolute top-4 left-[10%] right-[10%] h-[3px] bg-slate-100 -z-10"></div>
                  
                  {/* Garis Progress */}
                  <div className={`absolute top-4 left-[10%] h-[3px] bg-blue-500 -z-10 transition-all duration-500 ${
                    pesanan.status === "Proses" ? "w-[0%]" : 
                    pesanan.status === "Diukir" ? "w-[40%]" : "w-[80%]"
                  }`}></div>

                  {/* Step 1: Dikemas / Proses */}
                  <div className="flex flex-col items-center gap-2 bg-white w-1/3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                      pesanan.status === "Proses" || pesanan.status === "Diukir" || pesanan.status === "Selesai" 
                      ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-white border-slate-200 text-slate-300"
                    }`}>👨🏻‍💻</div>
                    <span className={`text-[10px] font-bold ${pesanan.status === "Proses" ? "text-blue-600" : "text-slate-500"}`}>Diperoses</span>
                  </div>

                  {/* Step 2: Diukir */}
                  <div className="flex flex-col items-center gap-2 bg-white w-1/3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                      pesanan.status === "Diukir" || pesanan.status === "Selesai" 
                      ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-white border-slate-200 text-slate-300"
                    }`}>⚒️</div>
                    <span className={`text-[10px] font-bold ${pesanan.status === "Diukir" ? "text-blue-600" : "text-slate-500"}`}>Diukir</span>
                  </div>

                  {/* Step 3: Dikirim / Selesai */}
                  <div className="flex flex-col items-center gap-2 bg-white w-1/3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                      pesanan.status === "Selesai" 
                      ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-500/20" : "bg-white border-slate-200 text-slate-300"
                    }`}>🚚</div>
                    <span className={`text-[10px] font-bold ${pesanan.status === "Selesai" ? "text-green-600" : "text-slate-500"}`}>Dikirim</span>
                  </div>
                </div>
              </div>

              {/* Tombol Testimoni (Hanya Muncul Jika Selesai) */}
              {pesanan.status === "Selesai" && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <Link href="/testimoni" className="flex items-center gap-2 bg-white border border-orange-500 text-orange-600 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide hover:bg-orange-50 transition-colors shadow-sm">
                    <span className="text-base text-orange-500">⭐</span> Buat Komentar Testimoni
                  </Link>
                </div>
              )}

            </div>
          ))
        ) : (
          /* Tampilan Jika Tidak Ada Pesanan */
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center mt-10">
            <div className="text-6xl mb-4 grayscale opacity-50">🛒</div>
            <h2 className="text-xl font-black text-slate-800 mb-2">Belum ada pesanan</h2>
            <p className="text-slate-500 text-sm">Pesanan Anda akan muncul di sini setelah Anda melakukan checkout.</p>
            <Link href="/" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition">
              Mulai Belanja
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
}