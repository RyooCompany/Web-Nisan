"use client";
import { useState } from "react";
import Link from "next/link";

export default function LacakPesanan() {
  const [nomorWA, setNomorWA] = useState("");
  const [hasilCek, setHasilCek] = useState([]);
  const [pesanError, setPesanError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleCekStatus = () => {
    const waBersih = nomorWA.trim();

    if (!waBersih) {
      setPesanError("Silakan masukkan nomor WhatsApp Anda.");
      setHasilCek([]);
      return;
    }

    setIsSearching(true);
    setPesanError("");
    setHasilCek([]);

    // Simulasi loading sedikit biar kerasa 'ngecek'
    setTimeout(() => {
      const dataPesanan = JSON.parse(localStorage.getItem("db_pesanan") || "[]");
      const pesananDitemukan = dataPesanan.filter(p => p.wa_pembeli === waBersih);

      if (pesananDitemukan.length > 0) {
        setHasilCek(pesananDitemukan);
      } else {
        setPesanError("Akses Ditolak! Nomor WhatsApp ini belum pernah melakukan pembelian di Bihin Nisan.");
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    // LATAR BELAKANG BARU: Putih-Biru Bergerak (animate-gradient-xy)
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 text-slate-900 p-6 flex flex-col items-center font-sans animate-gradient-xy bg-[length:400%_400%]">
      <div className="w-full max-w-2xl mt-8 md:mt-16">
        
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 text-sm font-bold mb-10 hover:text-blue-700 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-3 text-slate-950">
            Lacak <span className="text-blue-600">Pesanan</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Fitur eksklusif khusus untuk pelanggan Bihin Nisan. Masukkan nomor WhatsApp Anda saat memesan.
          </p>
        </div>
        
        {/* KOTAK PENCARIAN (Glassmorphism Light) */}
        <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[30px] shadow-2xl shadow-blue-500/10 border border-blue-100 transition-all hover:shadow-blue-500/20">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1">
            Nomor WhatsApp Saat Memesan
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="number" 
              placeholder="Contoh: 0812..." 
              className="flex-grow p-4.5 bg-white border border-blue-100 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 font-bold shadow-inner placeholder:text-slate-400 placeholder:font-medium"
              value={nomorWA}
              onChange={(e) => setNomorWA(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCekStatus()}
            />
            <button 
              onClick={handleCekStatus}
              disabled={isSearching}
              className="md:w-auto w-full bg-blue-600 text-white px-8 py-4.5 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 disabled:bg-slate-400 flex items-center justify-center gap-3 shrink-0"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                  MENGECEK...
                </>
              ) : "CEK STATUS PESANAN →"}
            </button>
          </div>
        </div>

        {/* TAMPILAN HASIL (Gaya Light Premium) */}
        <div className="mt-12 transition-all duration-500 space-y-8 mb-16">
          {hasilCek.length > 0 ? (
            hasilCek.map((pesanan) => (
              <div key={pesanan.id} className="bg-white p-8 rounded-[30px] shadow-xl border border-blue-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                {/* Badge Status */}
                <div className={`absolute top-0 right-0 px-6 py-2.5 rounded-bl-2xl font-black text-[10px] uppercase tracking-wider ${pesanan.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {pesanan.status === "Selesai" ? "Selesai" : "Pesanan Aktif"}
                </div>
                
                <div className="mb-6">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1.5">PRODUK DIPESAN:</p>
                  <h3 className="font-black text-slate-950 text-2xl md:text-3xl tracking-tighter leading-tight mb-2">
                    {pesanan.produk}
                  </h3>
                  <p className="text-slate-600 text-sm font-semibold mb-6 border-b border-blue-50 pb-4">
                    Pelanggan: <span className="text-slate-950 font-bold">{pesanan.nama_pembeli}</span>
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Status */}
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col gap-1.5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status Saat Ini:</p>
                    <span className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border inline-block w-fit ${
                      pesanan.status === "Selesai" ? "bg-green-500 text-white border-green-600" : 
                      pesanan.status === "Diukir" ? "bg-blue-500 text-white border-blue-600" : 
                      "bg-yellow-400 text-slate-950 border-yellow-500"
                    }`}>
                       ● {pesanan.status}
                    </span>
                  </div>

                  {/* Info Pembayaran & Alamat */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col gap-1.5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Metode Pembayaran:</p>
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      {pesanan.metode_bayar === "COD" ? "💵 Bayar di Tempat (COD)" : "📱 Transfer E-Wallet/QRIS"}
                    </p>
                  </div>

                  {pesanan.alamat_pembeli && (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col gap-1.5 md:col-span-2">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alamat Pengiriman:</p>
                       <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-100 shadow-inner">
                         📍 {pesanan.alamat_pembeli}
                       </p>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-10 pt-5 border-t border-blue-50">
                  <p className="text-[11px] text-slate-500 font-bold bg-slate-100 px-4 py-1.5 rounded-full inline-block">
                    Terakhir diperbarui pada: <span className="text-blue-700">{pesanan.update_tgl}</span>
                  </p>
                </div>
              </div>
            ))
          ) : pesanError && (
            // PESAN ERROR
            <div className="bg-red-50 border border-red-100 p-10 rounded-[30px] text-center animate-in slide-in-from-bottom-4 shadow-xl shadow-red-500/5">
              <div className="text-5xl mb-4 opacity-90">🛑</div>
              <p className="text-red-700 font-black tracking-tight leading-snug text-lg">{pesanError}</p>
              <p className="text-slate-500 text-sm mt-4 italic font-medium leading-relaxed">
                Fitur ini dikunci menggunakan Nomor WhatsApp. Jika Anda merasa sudah memesan, mohon pastikan nomor WA yang Anda masukkan <strong className="text-slate-700">sama persis</strong> dengan saat memesan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}