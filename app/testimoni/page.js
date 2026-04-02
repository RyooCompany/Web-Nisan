"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function TestimoniPage() {
  const [listUlasan, setListUlasan] = useState([]);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  // 1. Fungsi Ambil Data (Hanya yang sudah di-ACC oleh Admin)
  async function ambilData() {
    const { data, error } = await supabase
      .from('testimonis')
      .select('*')
      .eq('is_approved', true) // Hanya ambil yang Approved
      .order('created_at', { ascending: false });
    
    if (!error) setListUlasan(data || []);
  }

  useEffect(() => { ambilData(); }, []);

  // 2. Fungsi Kirim Ulasan (Otomatis masuk antrean Admin)
  const kirimUlasan = async (e) => {
    e.preventDefault();
    if (!nama || !pesan) return alert("Mohon isi nama dan pesan Anda!");
    
    setLoading(true);
    
    // Data dikirim dengan status is_approved: false (Default dari database atau paksa di sini)
    const { error } = await supabase
      .from('testimonis')
      .insert([
        { 
          nama, 
          pesan, 
          rating: Number(rating),
          is_approved: false // Masuk ke "kotak kuning" admin
        }
      ]);

    if (!error) {
      alert("Terima kasih! Ulasan Anda sedang menunggu persetujuan admin.");
      setNama(""); 
      setPesan(""); 
      setRating(5); 
      // ambilData(); // Tidak perlu panggil ini karena data belum approved, jadi tidak akan muncul dulu
    } else {
      alert("Gagal mengirim ulasan, coba lagi nanti.");
      console.error(error);
    }
    setLoading(false);
  };

  const styleAnimasi = `
    @keyframes scrollSide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      display: flex;
      width: max-content;
      animation: scrollSide 25s linear infinite; 
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
    .bg-premium {
      background: radial-gradient(circle at top right, #eff6ff, #ffffff, #fdf2f8);
    }
  `;

  return (
    <div className="min-h-screen bg-premium font-sans text-slate-900 overflow-x-hidden">
      <style>{styleAnimasi}</style>

      <main className="max-w-6xl mx-auto py-12 px-4 md:px-6">
        {/* HERO */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-400/10 blur-3xl rounded-full -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 mb-4 drop-shadow-sm">
            Ulasan <span className="text-blue-600">Pelanggan</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-lg mx-auto italic">
            "Kepercayaan Anda adalah amanah bagi kami dalam mengukir kenangan."
          </p>
        </div>

        {/* FORM PENGIRIMAN */}
        <div className="max-w-2xl mx-auto glass-card p-8 md:p-12 rounded-[40px] shadow-2xl shadow-blue-100/40 mb-28 border border-white relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
          
          <h3 className="text-2xl font-bold mb-8 text-slate-800 flex items-center gap-3">
            <span className="bg-blue-600 w-2 h-8 rounded-full"></span>
            Tulis Pengalaman Anda
          </h3>

          <form onSubmit={kirimUlasan} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" placeholder="Nama Anda" 
                className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white/50 transition-all text-black"
                value={nama} onChange={(e) => setNama(e.target.value)}
              />
              <select 
                className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white/50 transition-all cursor-pointer text-black"
                value={rating} onChange={(e) => setRating(e.target.value)}
              >
                <option value="5">⭐⭐⭐⭐⭐ (Sangat Puas)</option>
                <option value="4">⭐⭐⭐⭐ (Puas)</option>
                <option value="3">⭐⭐⭐ (Cukup)</option>
              </select>
            </div>

            <textarea 
              placeholder="Bagaimana kualitas nisan dan pelayanan kami?" 
              className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none h-36 bg-white/50 transition-all text-black"
              value={pesan} onChange={(e) => setPesan(e.target.value)}
            ></textarea>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 disabled:bg-slate-300 flex items-center justify-center gap-2"
            >
              {loading ? "PROSES MENGIRIM..." : "KIRIM TESTIMONI SEKARANG"}
              {!loading && <span className="text-xl">↗</span>}
            </button>
          </form>
        </div>

        {/* DISPLAY TESTIMONI BERGERAK */}
        <div className="space-y-12">
          <div className="text-center">
             <span className="text-blue-600 font-black tracking-widest text-xs uppercase bg-blue-50 px-4 py-1 rounded-full">Katalog Kepuasan</span>
             <h3 className="text-4xl font-black text-slate-900 mt-4 uppercase tracking-tight">Kisah Pelanggan Kami</h3>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-premium to-transparent z-10 hidden md:block"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-premium to-transparent z-10 hidden md:block"></div>

            <div className="overflow-hidden w-full py-10">
              <div className="animate-scroll flex gap-8">
                {listUlasan.length === 0 ? (
                  <div className="w-screen text-center py-10">
                    <p className="text-slate-400 italic font-medium">Belum ada ulasan yang ditampilkan.</p>
                  </div>
                ) : (
                  // Loop 2x untuk efek infinite scroll yang mulus
                  ([...listUlasan, ...listUlasan]).map((item, index) => (
                    <div 
                      key={index} 
                      className="w-[350px] md:w-[450px] flex-shrink-0 glass-card p-10 rounded-[40px] shadow-xl shadow-slate-200/50 hover:-translate-y-3 transition-all duration-500 group border-white/60"
                    >
                      <div className="flex justify-between items-center mb-8">
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:bg-blue-600 transition-colors">
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex gap-1 text-yellow-400 text-lg">
                          {"★".repeat(item.rating || 5)}
                        </div>
                      </div>
                      <p className="text-slate-700 font-medium italic leading-relaxed text-lg mb-8">
                        "{item.pesan}"
                      </p>
                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <h4 className="font-black text-slate-900 uppercase text-sm tracking-tighter">{item.nama}</h4>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Pilihan Terbaik</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center">
        <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          &copy; 2026 BihinNisan Workshop &bull; Saringingin
        </p>
      </footer>
    </div>
  );
}