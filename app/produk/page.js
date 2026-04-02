"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function EtalaseContent() {
  const searchParams = useSearchParams();
  const kategoriFilter = searchParams.get("filter"); 
  const [produkList, setProdukList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("db_nisan");
    if (data) {
      const allProduk = JSON.parse(data);
      if (kategoriFilter) {
        setProdukList(allProduk.filter(p => p.kategori?.toLowerCase() === kategoriFilter.toLowerCase()));
      } else {
        setProdukList(allProduk);
      }
    }
  }, [kategoriFilter]);

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
            Katalog Nisan {kategoriFilter === "Kramik" ? "Keramik" : (kategoriFilter || "Produk Batu")}
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produkList.length > 0 ? produkList.map((item) => (
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
          )) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 italic">Produk belum tersedia.</p>
            </div>
          )}
        </div>
      </div>

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
                      <h4 className="text-sm font-bold text-gray-400 uppercase">Harga Estimasi</h4>
                      <p className="text-3xl font-black text-green-600">Rp {Number(selectedProduct.harga).toLocaleString('id-ID')}</p>
                    </div>
                    <p className="mt-4 text-gray-600 text-sm">Dikerjakan Dengan Sepenuh Hati ❤️.</p>
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
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Pilih Metode Pembayaran</h2>
                    
                    <div className="space-y-4">
                      <a 
                        href={`https://wa.me/6281214562122?text=${encodeURIComponent(`Halo SabihinNisan, saya ingin memesan:\n\nProduk: ${selectedProduct.nama}\nKategori: ${selectedProduct.kategori}\nHarga: Rp ${selectedProduct.harga}`)}`}
                        target="_blank"
                        className="flex items-center gap-4 p-4 border-2 border-green-500 rounded-2xl hover:bg-green-50 transition"
                      >
                        <div className="bg-green-500 p-2 rounded-lg text-white font-bold text-xs">WA</div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">Pesan via WhatsApp</p>
                          <p className="text-xs text-gray-500">Konsultasi & Bayar Manual</p>
                        </div>
                      </a>

                      <div className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-50">
                        <p className="font-bold text-gray-800 text-sm mb-2">Scan QRIS / Transfer</p>
                        <div className="bg-white p-2 rounded-xl border flex flex-col items-center">
                          {/* UKURAN DIPERBAIKI: w-full dan h-auto agar QR dapat dipindai dengan mudah */}
                          <img 
                            src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg " 
                            alt="QRIS" 
                            className="w-full h-auto max-w-[250px] object-contain mb-2" 
                          />
                          <p className="text-[10px] text-center text-gray-400 font-bold uppercase">Silakan scan dan kirim bukti ke WA</p>
                        </div>
                        <div className="mt-3 text-xs text-gray-600 space-y-1">
                          <p><b>Bank:</b> BCA 12345678 (A/N Satrio)</p>
                          <p><b>E-Wallet:</b> Dana 081214562122</p>
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
    <Suspense fallback={<div className="p-20 text-center font-bold">Memuat Etalase...</div>}>
      <EtalaseContent />
    </Suspense>
  );
}