"use client";
import { useState, useEffect, Suspense, use } from "react"; // Tambahkan 'use'
import Link from "next/link";

function EtalaseContent({ katagoriPromise }) {
  // 1. Unwrapping params menggunakan use() agar stabil di Next.js 15
  const params = use(katagoriPromise);
  const katagori = params.katagori;

  const [produkList, setProdukList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    // Reset scroll ke atas setiap ganti kategori
    window.scrollTo(0, 0);

    const data = localStorage.getItem("db_nisan");
    if (data) {
      const allProduk = JSON.parse(data);
      
      if (katagori) {
        // Filter super ketat untuk memastikan tidak bocor
        const hasilFilter = allProduk.filter(p => 
          p.kategori?.trim().toLowerCase() === katagori.trim().toLowerCase()
        );
        setProdukList(hasilFilter);
      } else {
        setProdukList(allProduk);
      }
    }
  }, [katagori]);

  const closeModals = () => {
    setSelectedProduct(null);
    setShowPaymentOptions(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <Link href="/" className="text-blue-600 font-medium mb-2 block hover:underline">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-wide">
            Katalog Nisan {katagori === "kramik" ? "Keramik" : (katagori || "Produk")}
          </h1>
        </header>

        {/* --- GRID PRODUK --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produkList.length > 0 ? (
            produkList.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-md border overflow-hidden cursor-pointer hover:shadow-2xl transition-all group flex flex-col"
                onClick={() => {
                  setSelectedProduct(item);
                  setShowPaymentOptions(false);
                }}
              >
                <div className="aspect-square w-full bg-gray-200 overflow-hidden">
                  <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">{item.kategori}</span>
                    <h2 className="text-lg font-bold text-gray-800 mt-1 leading-tight">{item.nama}</h2>
                    <p className="text-green-600 font-bold text-md mt-2">Rp {Number(item.harga).toLocaleString('id-ID')}</p>
                  </div>
                  <button className="mt-4 w-full bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition border border-gray-100">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 italic font-bold uppercase">Produk {katagori} belum tersedia.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL DETAIL & PEMBAYARAN --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
            <button onClick={closeModals} className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg font-bold text-xl hover:bg-red-500 hover:text-white transition z-10">✕</button>
            
            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img src={selectedProduct.foto} className="w-full h-full object-cover" alt={selectedProduct.nama} />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                {!showPaymentOptions ? (
                  <>
                    <h2 className="text-2xl font-extrabold text-gray-900">{selectedProduct.nama}</h2>
                    <div className="mt-2 inline-block self-start px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">{selectedProduct.kategori}</div>
                    <div className="mt-6">
                      <h4 className="text-sm font-bold text-gray-400 uppercase">Harga</h4>
                      <p className="text-3xl font-black text-green-600">Rp {Number(selectedProduct.harga).toLocaleString('id-ID')}</p>
                    </div>
                    <button 
                      onClick={() => setShowPaymentOptions(true)}
                      className="mt-8 block w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg transition"
                    >
                      Beli Sekarang
                    </button>
                  </>
                ) : (
                  <div className="animate-in slide-in-from-right duration-300">
                    <button onClick={() => setShowPaymentOptions(false)} className="text-blue-600 font-bold text-sm mb-4">← Kembali ke Detail</button>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Pembayaran</h2>
                    <div className="space-y-4">
                      <a 
                        href={`https://wa.me/6281214562122?text=Halo Sabihin Nisan, saya ingin pesan: ${selectedProduct.nama} (Kategori: ${selectedProduct.kategori})`}
                        target="_blank"
                        className="flex items-center gap-4 p-4 border-2 border-green-500 rounded-2xl hover:bg-green-50 transition"
                      >
                        <div className="bg-green-500 p-2 rounded-lg text-white font-bold text-xs">WA</div>
                        <p className="font-bold text-gray-800 text-sm">Chat via WhatsApp</p>
                      </a>
                      <div className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-50">
                        <p className="font-bold text-gray-800 text-sm mb-2 text-center uppercase tracking-tighter">Scan QRIS Sabihin</p>
                        <img 
                          src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" 
                          alt="QRIS" 
                          className="w-full h-auto rounded-xl shadow-sm mb-2" 
                        />
                        <p className="text-[10px] text-center text-gray-400 font-bold">KIRIM BUKTI TRANSFER KE WHATSAPP</p>
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

export default function Page({ params }) {
  // Mengirim params sebagai promise untuk di-unwrap di dalam komponen Client
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">Memuat Katalog Sabihin...</div>}>
      <EtalaseContent katagoriPromise={params} />
    </Suspense>
  );
}