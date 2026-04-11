"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
// Import modal yang sudah kita perbaiki tadi
import CheckoutModal from '@/components/CheckoutModal'; 

export default function ProdukKatalog() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'semua';

  // State untuk melacak produk yang dipilih pembeli untuk di-checkout
  const [produkTerpilih, setProdukTerpilih] = useState(null);

  // Data Layanan Utama (Sesuai kategori yang ada di screenshot kamu)
  const layananData = [
    {
      nama: "Nisan Keramik",
      harga: 755000,
      kategori: "keramik",
      ikon: "🪦",
      deskripsi: "Bahan Keramik Mulus & Awet.",
    },
    {
      nama: "Prasasti Granit",
      harga: 1200000,
      kategori: "granit",
      ikon: "⬛",
      deskripsi: "Kesan mewah dan kokoh.",
    },
    {
      nama: "Custom Desain",
      harga: 500000,
      kategori: "custom",
      ikon: "⚒️",
      deskripsi: "Sesuai keinginan Anda.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            LAYANAN & PRODUK
          </h1>
          <p className="text-gray-400 font-medium">Pilih kategori untuk melihat koleksi kami</p>
        </div>

        {/* Grid Card Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {layananData.map((item, index) => (
            <div 
              key={index} 
              className="group bg-[#0f172a] p-8 md:p-10 rounded-[40px] border border-slate-800 flex flex-col items-start transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] relative overflow-hidden"
            >
              {/* Dekorasi Background Card */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
              
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {item.ikon}
              </div>
              
              <h4 className="text-2xl font-black mb-3 tracking-tight">{item.nama}</h4>
              <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                {item.deskripsi}
              </p>
              
              {/* Tombol Pemicu Modal */}
              <button 
                onClick={() => setProdukTerpilih(item)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black text-sm uppercase tracking-widest transition-all"
              >
                LIHAT PRODUK 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info Tambahan */}
        <div className="text-center border-t border-slate-800 pt-10">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
            Bihin Nisan • Sumedang Jawa Barat
          </p>
        </div>

      </div>

      {/* RENDER MODAL CHECKOUT */}
      {/* Modal ini hanya muncul jika state produkTerpilih tidak null */}
      {produkTerpilih && (
        <CheckoutModal 
          produk={produkTerpilih} 
          onClose={() => setProdukTerpilih(null)} 
        />
      )}

      {/* Gaya Scrollbar Custom */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}