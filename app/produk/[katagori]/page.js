"use client";
import { useState, useEffect, Suspense, use } from "react"; 
import Link from "next/link";

export const dynamic = 'force-dynamic';

// --- ISI DENGAN DATA SUPABASE KAMU ---
const SUPABASE_URL = "https://zjqtknrztqrevjnttkgh.supabase.co";
const SUPABASE_KEY = "sb_publishable_nk17EXYR5F7VSzUPwsZj3w_ES38Xevy"; 

function EtalaseContent({ katagoriPromise }) {
  // 1. Ambil nama kategori dari URL (misal: 'kramik' atau 'granit')
  const params = use(katagoriPromise);
  const katagori = params.katagori;

  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchKategoriData() {
      try {
        setLoading(true);
        // Ambil data dari Supabase
        const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          }
        });
        const allProduk = await res.json();
        
        // Filter berdasarkan kategori yang sedang dibuka
        if (katagori) {
          const hasilFilter = allProduk.filter(p => 
            p.kategori?.trim().toLowerCase() === katagori.trim().toLowerCase()
          );
          setProdukList(hasilFilter);
        } else {
          setProdukList(allProduk);
        }
      } catch (err) {
        console.error("Gagal ambil data kategori:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchKategoriData();
  }, [katagori]);

  const closeModals = () => {
    setSelectedProduct(null);
    setShowPaymentOptions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <Link href="/" className="text-blue-600 font-medium mb-2 block hover:underline text-sm">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
            Katalog Nisan <span className="text-blue-600">{katagori === "kramik" ? "Keramik" : (katagori || "Produk")}</span>
          </h1>
        </header>

        {loading ? (
          <div className="text-center py-20 font-bold text-blue-600 animate-pulse">MEMUAT KATALOG...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {produkList.length > 0 ? (
              produkList.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all group flex flex-col"
                  onClick={() => setSelectedProduct(item)}
                >
                  <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden relative">
                    <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-4 flex-grow">
                    <h2 className="text-sm font-bold text-gray-800 leading-tight mb-1">{item.nama}</h2>
                    <p className="text-blue-600 font-black text-sm">Rp {Number(item.harga).toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic uppercase tracking-widest">Produk {katagori} Belum Tersedia di Database</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL DETAIL (Sama dengan kode sebelumnya) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden relative">
            <button onClick={closeModals} className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">✕</button>
            <div className="max-h-[90vh] overflow-y-auto">
              <img src={selectedProduct.foto} className="w-full aspect-square object-cover" />
              <div className="p-8">
                {!showPaymentOptions ? (
                  <>
                    <h2 className="text-2xl font-black text-gray-900">{selectedProduct.nama}</h2>
                    <p className="text-3xl font-black text-blue-600 my-4">Rp {Number(selectedProduct.harga).toLocaleString('id-ID')}</p>
                    <button onClick={() => setShowPaymentOptions(true)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">BELI SEKARANG</button>
                  </>
                ) : (
                  <div className="text-center">
                    <button onClick={() => setShowPaymentOptions(false)} className="text-blue-600 font-bold mb-4 block">← Kembali</button>
                    <a 
                      href={`https://wa.me/6281214562122?text=Halo Bihin Nisan, saya ingin pesan: ${selectedProduct.nama}`} 
                      target="_blank" 
                      className="block w-full bg-green-500 text-white py-4 rounded-2xl font-bold mb-6"
                    >
                      Pesan via WhatsApp
                    </a>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                       <p className="text-[10px] font-bold mb-2">SCAN QRIS PEMBAYARAN</p>
                       <img src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" className="w-full rounded-xl" />
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

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-blue-600">Memuat Katalog Sabihin...</div>}>
      <EtalaseContent katagoriPromise={params} />
    </Suspense>
  );
}