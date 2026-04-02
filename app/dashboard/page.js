"use client";
import { useState } from "react";

export default function UserPublicPage() {
  const [pesanan, setPesanan] = useState([]);

  const daftarBatu = [
    { id: 1, nama: "Nisan Kramik ", harga: "1.500.000", image: "🪦" },
    { id: 2, nama: "Nisan Granit Hitam", harga: "2.500.000", image: "🪦" },
    { id: 3, nama: "Batu Kali Ukir", harga: "800.000", image: "🪦" },
  ];

  const tambahPesanan = (item) => {
    setPesanan([...pesanan, item]);
    alert(`${item.nama} telah dipilih!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Navbar Sederhana */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-800">Toko Batu Nisan</h1>
        <div className="space-x-4">
          <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">User Mode</span>
          <a href="/" className="text-red-500 text-sm font-bold">Logout</a>
        </div>
      </nav>

      <div className="p-8 max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Katalog Produk Publik</h2>
          <p className="text-gray-600">Silakan pilih jenis batu nisan yang sesuai dengan kebutuhan Anda.</p>
        </header>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {daftarBatu.map((batu) => (
            <div key={batu.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:scale-105 transition-transform">
              <div className="text-6xl mb-4 text-center">{batu.image}</div>
              <h3 className="text-xl font-bold mb-2">{batu.nama}</h3>
              <p className="text-blue-600 font-bold mb-4">Rp {batu.harga}</p>
              <button 
                onClick={() => tambahPesanan(batu)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Pilih Produk
              </button>
            </div>
          ))}
        </div>

        {/* Ringkasan Pesanan (Muncul jika ada yang dipilih) */}
        {pesanan.length > 0 && (
          <div className="mt-12 bg-blue-50 p-6 rounded-xl border-2 border-dashed border-blue-200 text-center">
            <h3 className="font-bold text-lg mb-2">Item yang Anda Pilih: {pesanan.length}</h3>
            <button 
              onClick={() => alert("Pesanan Anda sedang diproses!")}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-md"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
}