"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const SUPABASE_URL = "https://zjqtknrztqrevjnttkgh.supabase.co";
const SUPABASE_KEY = "sb_publishable_nk17EXYR5F7VSzUPwsZj3w_ES38Xevy"; 

function EtalaseContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter"); 
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

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
        
        if (filter) {
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

  const closeModals = () => {
    setSelectedProduct(null);
    setShowPaymentOptions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-blue-600 font-medium mb-2 block hover:underline text-sm">
              ← Kembali ke Beranda
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
              Katalog <span className="text-blue-600">{filter || "Nisan"}</span>
            </h1>
          </div>
        </header>

        {loading ? (
          <div className="text-center py-20 font-bold text-blue-600 animate-pulse uppercase tracking-widest">
            Memuat Produk...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produkList.length > 0 ? (
              produkList.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all group flex flex-col"
                  onClick={() => setSelectedProduct(item)}
                >
                  <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden relative">
                    <img 
                      src={item.foto} 
                      alt={item.nama} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    />
                  </div>
                  <div className="p-5 flex-grow">
                    <p className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-1">
                      {item.kategori || "Tanpa Kategori"}
                    </p>

                    <h3 className="font-bold text-gray-800 mb-1">{item.nama}</h3>
                    
                    {/* PERBAIKAN 1: Mengubah item.price menjadi item.harga */}
                    <p className="text-blue-600 font-black text-sm">
                      Rp {item.harga ? Number(item.harga).toLocaleString('id-ID') : "0"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">Produk belum tersedia.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL DETAIL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-md">
          {/* PERBAIKAN 2: Mengubah max-lg menjadi max-w-md agar pop-up tidak memenuhi layar */}
          <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden relative shadow-2xl">
            <button 
              onClick={closeModals} 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg z-10 hover:bg-red-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="max-h-[90vh] overflow-y-auto">
              <img src={selectedProduct.foto} className="w-full aspect-square object-cover" />
              <div className="p-8">
                {!showPaymentOptions ? (
                  <>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{selectedProduct.kategori}</p>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedProduct.nama}</h2>
                    
                    {/* PERBAIKAN 3: Mengubah selectedProduct.price menjadi selectedProduct.harga */}
                    <p className="text-3xl font-black text-blue-600 my-5">
                      Rp {selectedProduct.harga ? Number(selectedProduct.harga).toLocaleString('id-ID') : "0"}
                    </p>
                    <button 
                      onClick={() => setShowPaymentOptions(true)} 
                      className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-200"
                    >
                      BELI SEKARANG
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <button onClick={() => setShowPaymentOptions(false)} className="text-blue-600 font-bold mb-6 flex items-center justify-center gap-2 mx-auto hover:gap-4 transition-all">
                      ← Kembali ke Detail
                    </button>
                    {/* PERBAIKAN 4: Mengubah selectedProduct.price menjadi selectedProduct.harga pada link WhatsApp */}
                    <a 
                      href={`https://wa.me/6281214562122?text=Halo Bihin Nisan, saya ingin pesan produk ini:%0A%0A- Nama: ${selectedProduct.nama}%0A- Kategori: ${selectedProduct.kategori}%0A- Harga: Rp ${selectedProduct.harga ? Number(selectedProduct.harga).toLocaleString('id-ID') : "0"}`} 
                      target="_blank" 
                      className="block w-full bg-green-500 text-white py-5 rounded-2xl font-bold mb-8 hover:bg-green-600 shadow-lg shadow-green-100 transition-all"
                    >
                      Pesan via WhatsApp
                    </a>
                    <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                       <p className="text-[10px] font-black text-blue-600 mb-4 tracking-widest">SCAN QRIS UNTUK PEMBAYARAN</p>
                       <img src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" className="w-full rounded-2xl shadow-sm" alt="QRIS Payment" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EtalasePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-blue-600 animate-pulse">MEMUAT...</div>}>
      <EtalaseContent />
    </Suspense>
  );
}