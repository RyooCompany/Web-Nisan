"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// DATA CADANGAN AGAR MUNCUL DI VERCEL
const DATA_DEFAULT = [
  {
    id: 1,
    nama: "Nisan Marmer Premium",
    harga: 1500000,
    kategori: "Granit",
    foto: "https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/sample1.jpg"
  },
  {
    id: 2,
    nama: "Nisan Keramik Standar",
    harga: 750000,
    kategori: "Kramik",
    foto: "https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/sample2.jpg"
  }
];

function EtalaseContent() {
  const searchParams = useSearchParams();
  const kategoriFilter = searchParams.get("filter"); 
  const [produkList, setProdukList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    // 1. Coba ambil dari localStorage dulu (untuk admin lokal)
    const dataLocal = localStorage.getItem("db_nisan");
    let allProduk = [];

    if (dataLocal && JSON.parse(dataLocal).length > 0) {
      allProduk = JSON.parse(dataLocal);
    } else {
      // 2. Jika kosong (seperti di Vercel), pakai data default agar tidak kosong
      allProduk = DATA_DEFAULT;
    }

    // 3. Terapkan Filter
    if (kategoriFilter) {
      setProdukList(allProduk.filter(p => p.kategori?.toLowerCase() === kategoriFilter.toLowerCase()));
    } else {
      setProdukList(allProduk);
    }
  }, [kategoriFilter]);

  const closeModals = () => {
    setSelectedProduct(null);
    setShowPaymentOptions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-blue-600 font-medium mb-2 block hover:underline text-sm">
              ← Kembali ke Beranda
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter">
              Katalog <span className="text-blue-600">{kategoriFilter || "Nisan"}</span>
            </h1>
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Bihin Nisan Premium Stone Art</p>
        </header>

        {/* GRID PRODUK */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {produkList.length > 0 ? produkList.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all group flex flex-col"
              onClick={() => {
                setSelectedProduct(item);
                setShowPaymentOptions(false);
              }}
            >
              <div className="aspect-[4/5] w-full bg-gray-100 overflow-hidden relative">
                <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-blue-600 shadow-sm uppercase">
                  {item.kategori}
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-sm md:text-base font-bold text-gray-800 leading-tight mb-1">{item.nama}</h2>
                  <p className="text-blue-600 font-black text-sm">Rp {Number(item.harga).toLocaleString('id-ID')}</p>
                </div>
                <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition shadow-lg shadow-slate-100">
                  Detail
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold italic uppercase tracking-widest">Belum Ada Produk di Kategori Ini</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DETAIL & PEMBAYARAN */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/20">
            <button onClick={closeModals} className="absolute top-4 right-4 bg-white/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center shadow-lg font-bold text-xl hover:bg-red-500 hover:text-white transition z-20">✕</button>

            <div className="flex flex-col max-h-[90vh] overflow-y-auto">
              <div className="aspect-square w-full">
                <img src={selectedProduct.foto} className="w-full h-full object-cover" alt={selectedProduct.nama} />
              </div>

              <div className="p-8">
                {!showPaymentOptions ? (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">{selectedProduct.nama}</h2>
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">{selectedProduct.kategori}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl mb-6">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimasi Harga</p>
                      <p className="text-3xl font-black text-blue-600 tracking-tighter">Rp {Number(selectedProduct.harga).toLocaleString('id-ID')}</p>
                    </div>
                    <button 
                      onClick={() => setShowPaymentOptions(true)}
                      className="w-full bg-blue-600 text-white py-4 rounded-[1.5rem] font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition animate-in zoom-in-95 duration-200"
                    >
                      BELI SEKARANG
                    </button>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-bottom duration-300">
                    <button onClick={() => setShowPaymentOptions(false)} className="text-blue-600 font-black text-xs mb-4 uppercase tracking-widest">← Kembali</button>
                    <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tighter uppercase">Metode Pembayaran</h2>
                    
                    <div className="space-y-4">
                      <a 
                        href={`https://wa.me/6281214562122?text=${encodeURIComponent(`Halo SabihinNisan, saya ingin memesan:\n\nProduk: ${selectedProduct.nama}\nHarga: Rp ${selectedProduct.harga}`)}`}
                        target="_blank"
                        className="flex items-center gap-4 p-5 bg-green-500 rounded-2xl text-white hover:bg-green-600 transition shadow-lg shadow-green-100"
                      >
                        <div className="bg-white/20 p-2 rounded-lg font-black text-xs uppercase">WA</div>
                        <div className="text-left">
                          <p className="font-black text-sm uppercase leading-none">Pesan via WhatsApp</p>
                          <p className="text-[10px] opacity-80 font-bold uppercase mt-1">Konsultasi & Kirim Detail Nama</p>
                        </div>
                      </a>

                      <div className="p-5 border-2 border-gray-100 rounded-3xl bg-gray-50 text-center">
                        <p className="font-black text-gray-900 text-xs mb-4 uppercase tracking-widest">Scan QRIS / Transfer</p>
                        <img 
                          src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" 
                          alt="QRIS" 
                          className="w-full max-w-[200px] mx-auto rounded-2xl border-4 border-white shadow-sm mb-4" 
                        />
                        <div className="text-[10px] text-gray-500 font-bold space-y-1 uppercase">
                          <p>BCA: 12345678 (A/N Satrio)</p>
                          <p>DANA: 081214562122</p>
                        </div>
                      </div>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black text-blue-600 animate-pulse uppercase tracking-widest">Memuat Etalase...</div>}>
      <EtalaseContent />
    </Suspense>
  );
}