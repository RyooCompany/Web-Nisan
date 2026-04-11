"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto pt-4">
        
        {/* DAFTAR PRODUK DARI SUPABASE (Langsung di paling atas) */}
        <div className="mb-20">
          <h1 className="text-3xl md:text-5xl font-black mb-8 border-b border-slate-800 pb-6 uppercase tracking-tighter">
            {filter ? `Kategori: ${filter}` : "Katalog Produk"}
          </h1>
          
          {loading ? (
            <div className="text-center py-20 text-blue-500 font-bold animate-pulse tracking-widest uppercase">Memuat Produk...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {produkList.length > 0 ? produkList.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#0f172a] rounded-3xl border border-slate-800 overflow-hidden group hover:border-blue-500 transition-all cursor-pointer flex flex-col"
                  onClick={() => setProdukTerpilih(item)}
                >
                  <div className="aspect-[4/5] w-full bg-slate-800 overflow-hidden relative">
                    <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-blue-400 uppercase">
                      {item.kategori}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-1 leading-tight">{item.nama}</h3>
                    </div>
                    <div className="mt-3">
                      <p className="text-blue-400 font-black mb-4 text-sm md:text-base">
                        Rp {item.harga ? Number(item.harga).toLocaleString('id-ID') : "0"}
                      </p>
                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20">
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