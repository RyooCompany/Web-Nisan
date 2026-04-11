"use client";
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';

function ProdukContent() {
  const searchParams = useSearchParams();
  const [produkTerpilih, setProdukTerpilih] = useState(null);

  const layananData = [
    {
      nama: "Nisan Keramik",
      harga: 755000,
      ikon: "🪦",
      deskripsi: "Bahan Keramik Mulus & Awet.",
    },
    {
      nama: "Prasasti Granit",
      harga: 1200000,
      ikon: "⬛",
      deskripsi: "Kesan mewah dan kokoh.",
    },
    {
      nama: "Custom Desain",
      harga: 500000,
      ikon: "⚒️",
      deskripsi: "Sesuai keinginan Anda.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            LAYANAN & PRODUK
          </h1>
          <p className="text-gray-400 font-medium">Pilih kategori untuk melihat koleksi kami</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {layananData.map((item, index) => (
            <div
              key={index}
              className="group bg-[#0f172a] p-8 rounded-[40px] border border-slate-800 flex flex-col items-start transition-all duration-500 hover:border-blue-500 relative overflow-hidden"
            >
              <div className="text-5xl mb-6">{item.ikon}</div>
              <h4 className="text-2xl font-black mb-3">{item.nama}</h4>
              <p className="text-slate-400 text-sm mb-8 flex-grow">{item.deskripsi}</p>
              <button
                onClick={() => setProdukTerpilih(item)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black text-sm uppercase tracking-widest"
              >
                LIHAT PRODUK →
              </button>
            </div>
          ))}
        </div>
      </div>

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