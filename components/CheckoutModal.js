"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  
  // Karena fitur pilih metode dihapus, kita set default yang aman.
  const metodyBayar = "Bayar di Tempat";
  const metodeAmbil = "Ambil Sendiri"; // Pengiriman terbatas, asumsikan ambil sendiri
  
  // Ongkir dinonaktifkan karena pengiriman terbatas.
  const ongkir = 0;
  const totalHarga = (produk.harga * jumlah) + ongkir;

  const handlePesan = () => {
    if (!nama || !wa) return alert("Mohon isi Nama Penerima dan Nomor WhatsApp!");

    const pesan = `Halo Bihin Nisan, saya ingin pesan:\n\n` +
      `📦 Produk: ${produk.nama}\n` +
      `🔢 Jumlah: ${jumlah}\n` +
      `👤 Nama: ${nama}\n` +
      `🚚 Pengiriman: ${metodeAmbil}\n` +
      `💳 Pembayaran: ${metodyBayar}\n` +
      `💰 Total Bayar: Rp ${totalHarga.toLocaleString("id-ID")}\n\n` +
      `Mohon info selanjutnya, terima kasih!`;
    
    window.open(`https://wa.me/6281214562122?text=${encodeURIComponent(pesan)}`, "_blank");
    onClose();
  };

  return (
    <>
      {/* CSS untuk menyembunyikan scrollbar jelek tapi tetap bisa di-scroll */}
      <style jsx global>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-sm font-sans">
        <div className="bg-[#0f172a] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[95vh] border border-slate-800">
          
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white text-xl font-black z-50 transition-colors">
            ✕
          </button>

          {/* KOLOM KIRI: Detail Pengiriman & Peringatan */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto hide-scroll border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">Detail Pengiriman</h2>
              <p className="text-slate-400 mt-1 text-sm">Lengkapi form di bawah ini.</p>
            </div>

            {/* INPUT DATA DIR */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">NAMA PENERIMA</label>
                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Satrio" className="w-full bg-[#020617] border border-slate-800 p-4 rounded-xl text-white font-bold outline-none focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">NOMOR WHATSAPP</label>
                <input type="number" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="08..." className="w-full bg-[#020617] border border-slate-800 p-4 rounded-xl text-white font-bold outline-none focus:border-blue-500 transition-all" />
              </div>
            </div>

            {/* AREA PERINGATAN PENGIRIMAN (Menggantikan COD view) */}
            <div className="mt-auto flex flex-col items-center justify-center bg-[#020617] rounded-2xl border border-slate-800 p-6 text-center animate-in zoom-in-95 duration-300">
              <span className="text-6xl mb-4 block opacity-80">🚚</span>
              <h3 className="text-lg font-black text-white mb-2 uppercase">Mohon maaf, jangkauan pengiriman kami saat ini hanya mencakup alamat provinsi Riau Kab.Pelalawan Kec.Kerumutan.</h3>
              <p className="text-slate-500 text-xs leading-relaxed">Terima kasih atas pengertiannya.</p>
            </div>
          </div>

          {/* KOLOM KANAN: Ringkasan Pesanan & Tombol Pesan */}
          <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto hide-scroll bg-[#020617]">
            <div className="mb-6 pt-2 md:pt-0">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">RINGKASAN PESANAN</label>
            </div>

            {/* KARTU PESANAN (Elegansi Dark Blue) */}
            <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 p-6 rounded-2xl text-white shadow-lg border border-blue-500/20 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <p className="text-[10px] uppercase font-black text-blue-400 mb-1 tracking-widest">PESANANMU:</p>
                  <h3 className="text-2xl font-black leading-tight mb-2 text-white">{produk.nama}</h3>
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-md text-xs font-bold">
                    {produk.kategori || "Biasa"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">TOTAL BAYAR</p>
                  <p className="text-2xl font-black mb-1 text-white">Rp {totalHarga.toLocaleString("id-ID")}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-700/50 relative z-10">
                <span className="font-black text-sm uppercase tracking-widest text-slate-300">JUMLAH BELI:</span>
                <div className="flex items-center gap-4 bg-slate-950/50 px-3 py-2 rounded-full border border-slate-800">
                  <button onClick={() => setJumlah(Math.max(1, jumlah - 1))} className="w-7 h-7 flex items-center justify-center bg-slate-800 text-white rounded-full font-black text-lg hover:bg-blue-600 transition-colors">-</button>
                  <span className="font-black text-lg w-4 text-center">{jumlah}</span>
                  <button onClick={() => setJumlah(jumlah + 1)} className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded-full font-black text-lg hover:bg-blue-500 transition-colors">+</button>
                </div>
              </div>
            </div>

            {/* TOMBOL PESAN */}
            <button 
              onClick={handlePesan} 
              className="w-full mt-auto py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95"
            >
              Kirim Pesanan Ke WhatsApp →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}