"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [metodeAmbil, setMetodeAmbil] = useState("Pesan Antar");
  const [metodeBayar, setMetodeBayar] = useState("E-Wallet / QRIS");
  const [sudahBayar, setSudahBayar] = useState(false);

  const ongkir = metodeAmbil === "Pesan Antar" ? 50000 : 0;
  const totalHarga = (produk.harga * jumlah) + ongkir;

  const handlePesan = () => {
    if (!nama || !wa) return alert("Mohon isi Nama Penerima dan Nomor WhatsApp!");
    if (metodeBayar === "E-Wallet / QRIS" && !sudahBayar) return alert("Mohon centang kotak konfirmasi QRIS di bawah barcode!");

    const pesan = `Halo Bihin Nisan, saya ingin pesan:\n\n` +
      `📦 Produk: ${produk.nama}\n` +
      `🔢 Jumlah: ${jumlah}\n` +
      `👤 Nama: ${nama}\n` +
      `🚚 Pengiriman: ${metodeAmbil}\n` +
      `💳 Pembayaran: ${metodeBayar}\n` +
      `💰 Total Bayar: Rp ${totalHarga.toLocaleString("id-ID")}\n\n` +
      (metodeBayar === "E-Wallet / QRIS" ? `*Catatan:* Saya sudah melakukan transfer QRIS, bukti transfer akan saya kirimkan di chat ini. Terima kasih!` : `Mohon info selanjutnya, terima kasih!`);
    
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

          {/* KOLOM KIRI */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto hide-scroll border-b md:border-b-0 md:border-r border-slate-800">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">Detail Pengiriman</h2>
              <p className="text-slate-400 mt-1 text-sm">Lengkapi form di bawah ini.</p>
            </div>

            {/* KARTU PESANAN (Desain Baru: Dark Blue Glassmorphism) */}
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
                  {ongkir > 0 && <p className="text-[10px] font-bold text-blue-300 italic">*Ongkir Rp {ongkir.toLocaleString("id-ID")}</p>}
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

            {/* METODE PENGAMBILAN (Aksen Biru) */}
            <div className="mb-6">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">METODE PENGAMBILAN</label>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setMetodeAmbil("Pesan Antar")} className={`py-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${metodeAmbil === "Pesan Antar" ? "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-slate-800 text-slate-500 bg-[#020617] hover:border-slate-600"}`}>
                  🛵 Pesan Antar
                </button>
                <button onClick={() => setMetodeAmbil("Ambil Sendiri")} className={`py-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${metodeAmbil === "Ambil Sendiri" ? "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-slate-800 text-slate-500 bg-[#020617] hover:border-slate-600"}`}>
                  🏪 Ambil Sendiri
                </button>
              </div>
            </div>

            {/* INPUT DATA */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">NAMA PENERIMA</label>
                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Contoh: Satrio" className="w-full bg-[#020617] border border-slate-800 p-4 rounded-xl text-white font-bold outline-none focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">NOMOR WHATSAPP</label>
                <input type="number" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="08..." className="w-full bg-[#020617] border border-slate-800 p-4 rounded-xl text-white font-bold outline-none focus:border-blue-500 transition-all" />
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Pembayaran */}
          <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto hide-scroll bg-[#020617]">
            <div className="mb-6 pt-2 md:pt-0">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">PILIH METODE PEMBAYARAN</label>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setMetodeBayar("Bayar di Tempat")} className={`py-4 rounded-xl border font-bold flex flex-col items-center justify-center gap-2 transition-all ${metodeBayar === "Bayar di Tempat" ? "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-slate-800 text-slate-500 bg-[#0f172a] hover:border-slate-600"}`}>
                  <span className="text-3xl grayscale opacity-70">💵</span>
                  <span className="text-xs">Bayar di Tempat</span>
                </button>
                <button onClick={() => setMetodeBayar("E-Wallet / QRIS")} className={`py-4 rounded-xl border font-bold flex flex-col items-center justify-center gap-2 transition-all ${metodeBayar === "E-Wallet / QRIS" ? "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-slate-800 text-slate-500 bg-[#0f172a] hover:border-slate-600"}`}>
                  <span className="text-3xl grayscale opacity-70">📱</span>
                  <span className="text-xs">E-Wallet / QRIS</span>
                </button>
              </div>
            </div>

            {/* AREA DINAMIS PEMBAYARAN */}
            <div className="flex-grow flex flex-col">
              {metodeBayar === "E-Wallet / QRIS" ? (
                <div className="border border-slate-800 rounded-2xl overflow-hidden flex flex-col bg-[#0f172a] mb-6 shadow-xl animate-in zoom-in-95 duration-300">
                  <div className="bg-blue-600 p-5 text-center">
                    <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">SCAN UNTUK MEMBAYAR</p>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">BIHIN NISAN</h3>
                    <div className="inline-block bg-black/20 px-4 py-1.5 rounded-full mt-3 border border-white/10">
                      <span className="text-[10px] font-bold text-white tracking-widest">📱 QRIS / GOPAY / DANA</span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex justify-center border-b border-slate-800">
                    <div className="bg-white p-3 rounded-2xl shadow-inner">
                      <img 
                        src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" 
                        alt="QRIS Bihin Nisan" 
                        className="w-48 h-auto object-contain rounded-lg" 
                      />
                    </div>
                  </div>
                  
                  <div className="p-5 flex items-start gap-3 bg-slate-900/50">
                    <input type="checkbox" id="qrisCheck" className="w-5 h-5 rounded border-slate-700 accent-blue-600 cursor-pointer mt-0.5" checked={sudahBayar} onChange={(e) => setSudahBayar(e.target.checked)} />
                    <label htmlFor="qrisCheck" className="text-xs font-medium text-slate-400 cursor-pointer select-none leading-relaxed">
                      Saya telah memindai QRIS dan berhasil mentransfer sesuai total tagihan.
                    </label>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center bg-[#0f172a] rounded-2xl border border-slate-800 mb-6 p-6 text-center animate-in zoom-in-95 duration-300">
                  <div>
                    <span className="text-6xl mb-4 block opacity-80">🚚</span>
                    <h3 className="text-lg font-black text-white mb-2 uppercase">Siapkan Uang Tunai</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">Anda bisa membayar pesanan langsung kepada tim pengiriman kami saat nisan sampai di lokasi.</p>
                  </div>
                </div>
              )}

              {/* TOMBOL PESAN */}
              <button 
                onClick={handlePesan} 
                className={`w-full mt-auto py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${metodeBayar === "E-Wallet / QRIS" && !sudahBayar ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 active:scale-95'}`}
              >
                Kirim Pesanan Ke WhatsApp →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}