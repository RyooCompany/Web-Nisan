"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CheckoutModal from '@/components/CheckoutModal';

const SUPABASE_URL = "https://zjqtknrztqrevjnttkgh.supabase.co";
const SUPABASE_KEY = "sb_publishable_nk17EXYR5F7VSzUPwsZj3w_ES38Xevy";

function ProdukContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [produkTerpilih, setProdukTerpilih] = useState(null);

  // Ambil Data Produk dari Supabase
  useEffect(() => {
    async function ambilData() {
      try {
        setLoading(true);
        const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          }
        });
        const data = await res.json();
        
        if (filter && filter !== 'semua') {
          setProdukList(data.filter(p => p.kategori?.toLowerCase() === filter.toLowerCase()));
        } else {
          setProdukList(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    ambilData();
  }, [filter]);

  // Data Kategori untuk Filter
  const layananData = [
    { nama: "Nisan Keramik", filter: "kramik", ikon: "🪦", deskripsi: "Bahan Keramik Mulus & Awet." },
    { nama: "Prasasti Granit", filter: "granit", ikon: "⬛", deskripsi: "Kesan mewah dan kokoh." },
    { nama: "Custom Desain", filter: "custom", ikon: "⚒️", deskripsi: "Sesuai keinginan Anda." },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & KARTU FILTER */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            LAYANAN & PRODUK
          </h1>
          <p className="text-gray-400 font-medium">Pilih kategori untuk melihat koleksi kami</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {layananData.map((item, index) => (
            <Link 
              href={`/produk?filter=${item.filter}`}
              key={index} 
              className={`group p-8 md:p-10 rounded-[40px] border flex flex-col items-start transition-all duration-500 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] relative overflow-hidden ${filter === item.filter ? 'bg-blue-900/20 border-blue-500' : 'bg-[#0f172a] border-slate-800'}`}
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{item.ikon}</div>
              <h4 className="text-2xl font-black mb-3 tracking-tight">{item.nama}</h4>
              <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">{item.deskripsi}</p>
              <span className="text-blue-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                FILTER KATEGORI →
              </span>
            </Link>
          ))}
        </div>

        {/* DAFTAR PRODUK DARI SUPABASE */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-b border-slate-800 pb-4">
            {filter ? `Menampilkan Kategori: ${filter.toUpperCase()}` : "Semua Produk"}
          </h2>
          
          {loading ? (
            <div className="text-center py-20 text-blue-500 font-bold animate-pulse tracking-widest uppercase">Memuat Produk...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produkList.length > 0 ? produkList.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#0f172a] rounded-3xl border border-slate-800 overflow-hidden group hover:border-blue-500 transition-all cursor-pointer flex flex-col"
                  onClick={() => setProdukTerpilih(item)}
                >
                  <div className="aspect-square bg-slate-800 overflow-hidden relative">
                    <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-blue-400 uppercase">
                      {item.kategori}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-2 leading-tight">{item.nama}</h3>
                    </div>
                    <div className="mt-4">
                      <p className="text-blue-400 font-black mb-4">Rp {item.harga ? Number(item.harga).toLocaleString('id-ID') : "0"}</p>
                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20">
                        BELI SEKARANG
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-20 bg-[#0f172a] rounded-3xl border border-dashed border-slate-700">
                  <p className="text-slate-500 italic">Belum ada produk di kategori ini.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* MODAL CHECKOUT HANYA MUNCUL JIKA PRODUK DIBAWAH DIKLIK */}
      {produkTerpilih && (
        <CheckoutModal 
          produk={produkTerpilih} 
          onClose={() => setProdukTerpilih(null)} 
        />
      )}
    </div>
  );
}

export default function ProdukKatalog() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Loading...</div>}>
      <ProdukContent />
    </Suspense>
  );
}