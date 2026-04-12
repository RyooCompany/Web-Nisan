"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [metodeAmbil, setMetodeAmbil] = useState("Pesan Antar");
  const [metodeBayar, setMetodeBayar] = useState("E-Wallet / QRIS"); // Default sesuai gambar
  const [sudahBayar, setSudahBayar] = useState(false);

  // Sesuaikan ongkir (contoh 50.000 untuk nisan)
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm font-sans">
      {/* Kontainer Utama Modal */}
      <div className="bg-[#1e293b] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[95vh]">
        
        {/* Tombol Close (Silang) di Kanan Atas */}
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl font-black z-50">
          ✕
        </button>

        {/* KOLOM KIRI: Detail Pengiriman */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-slate-700">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight">Detail Pengiriman</h2>
            <p className="text-slate-400 mt-1 text-sm">Isi data dengan lengkap ya!</p>
          </div>

          {/* KARTU ORANYE (Ringkasan Pesanan) */}
          <div className="bg-[#ff5a00] p-6 rounded-2xl text-white shadow-lg mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] uppercase font-black opacity-80 mb-1 tracking-widest">PESANANMU:</p>
                <h3 className="text-2xl font-black leading-tight mb-2">{produk.nama}</h3>
                <span className="bg-black/20 px-3 py-1 rounded-lg text-xs font-bold">
                  {produk.kategori || "Biasa"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-black opacity-80 mb-1 tracking-widest">TOTAL BAYAR</p>
                <p className="text-2xl font-black mb-1">Rp {totalHarga.toLocaleString("id-ID")}</p>
                {ongkir > 0 && <p className="text-[10px] font-bold opacity-80 italic">*Termasuk Ongkir Rp {ongkir.toLocaleString("id-ID")}</p>}
              </div>
            </div>
            
            {/* Kuantitas (Jumlah Beli) */}
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <span className="font-black text-sm uppercase tracking-widest">JUMLAH BELI:</span>
              <div className="flex items-center gap-4 bg-black/20 px-3 py-2 rounded-full">
                <button onClick={() => setJumlah(Math.max(1, jumlah - 1))} className="w-7 h-7 flex items-center justify-center bg-[#cc4800] rounded-full font-black text-lg hover:bg-white hover:text-[#ff5a00] transition-colors">-</button>
                <span className="font-black text-lg w-4 text-center">{jumlah}</span>
                <button onClick={() => setJumlah(jumlah + 1)} className="w-7 h-7 flex items-center justify-center bg-white text-[#ff5a00] rounded-full font-black text-lg hover:scale-105 transition-transform">+</button>
              </div>
            </div>
          </div>

          {/* METODE PENGAMBILAN */}
          <div className="mb-6">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">METODE PENGAMBILAN</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setMetodeAmbil("Pesan Antar")} 
                className={`py-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${metodeAmbil === "Pesan Antar" ? "border-[#ff5a00] text-[#ff5a00] bg-[#2d2a32]" : "border-slate-700 text-slate-400 bg-[#0f172a] hover:border-slate-500"}`}
              >
                🛵 Pesan Antar
              </button>
              <button 
                onClick={() => setMetodeAmbil("Ambil Sendiri")} 
                className={`py-4 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${metodeAmbil === "Ambil Sendiri" ? "border-[#ff5a00] text-[#ff5a00] bg-[#2d2a32]" : "border-slate-700 text-slate-400 bg-[#0f172a] hover:border-slate-500"}`}
              >
                🏪 Ambil Sendiri
              </button>
            </div>
          </div>

          {/* INPUT DATA DIRI */}
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">NAMA PENERIMA</label>
              <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama..." className="w-full bg-[#0f172a] border border-slate-700 p-4 rounded-xl text-white font-bold outline-none focus:border-[#ff5a00] transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">NOMOR WHATSAPP</label>
              <input type="number" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="08..." className="w-full bg-[#0f172a] border border-slate-700 p-4 rounded-xl text-white font-bold outline-none focus:border-[#ff5a00] transition-all" />
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: Pembayaran */}
        <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar bg-[#1e293b]">
          <div className="mb-6 pt-2 md:pt-0">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">PILIH METODE PEMBAYARAN</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setMetodeBayar("Bayar di Tempat")} 
                className={`py-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center gap-2 transition-all ${metodeBayar === "Bayar di Tempat" ? "border-[#ff5a00] text-[#ff5a00] bg-[#2d2a32]" : "border-slate-700 text-slate-400 bg-[#0f172a] hover:border-slate-500"}`}
              >
                <span className="text-3xl">💵</span>
                <span className="text-xs">Bayar di Tempat</span>
              </button>
              <button 
                onClick={() => setMetodeBayar("E-Wallet / QRIS")} 
                className={`py-4 rounded-xl border-2 font-bold flex flex-col items-center justify-center gap-2 transition-all ${metodeBayar === "E-Wallet / QRIS" ? "border-[#ff5a00] text-[#ff5a00] bg-[#2d2a32]" : "border-slate-700 text-slate-400 bg-[#0f172a] hover:border-slate-500"}`}
              >
                <span className="text-3xl">📱</span>
                <span className="text-xs">E-Wallet / QRIS</span>
              </button>
            </div>
          </div>

          {/* AREA DINAMIS PEMBAYARAN */}
          <div className="flex-grow flex flex-col">
            {metodeBayar === "E-Wallet / QRIS" ? (
              // TAMPILAN QRIS (Warna Hijau Teal)
              <div className="border border-slate-700 rounded-2xl overflow-hidden flex flex-col bg-[#0f172a] mb-6 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="bg-[#00b894] p-5 text-center">
                  <p className="text-[10px] font-black text-white/90 uppercase tracking-widest mb-1">SCAN UNTUK MEMBAYAR</p>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">BIHIN NISAN</h3>
                  <div className="inline-block bg-slate-900/40 px-4 py-1.5 rounded-full mt-3 border border-white/20">
                    <span className="text-[10px] font-bold text-white tracking-widest">📱 QRIS / GOPAY / DANA</span>
                  </div>
                </div>
                
                <div className="p-8 flex justify-center border-b border-slate-700 border-dashed">
                  {/* FOTO QRIS ASLI KAMU */}
                  <div className="bg-white p-2 rounded-2xl border-4 border-slate-700 shadow-inner">
                    <img 
                      src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" 
                      alt="QRIS Bihin Nisan" 
                      className="w-48 h-auto object-contain rounded-xl" 
                    />
                  </div>
                </div>
                
                {/* CHECKBOX KONFIRMASI */}
                <div className="p-5 flex items-start gap-3 bg-slate-800/50">
                  <input 
                    type="checkbox" 
                    id="qrisCheck" 
                    className="w-5 h-5 rounded border-slate-600 accent-[#00b894] cursor-pointer mt-0.5" 
                    checked={sudahBayar} 
                    onChange={(e) => setSudahBayar(e.target.checked)} 
                  />
                  <label htmlFor="qrisCheck" className="text-xs font-bold text-slate-300 cursor-pointer select-none leading-relaxed">
                    Saya telah memindai QRIS dan berhasil mentransfer sesuai total tagihan.
                  </label>
                </div>
              </div>
            ) : (
              // TAMPILAN COD
              <div className="flex-grow flex items-center justify-center bg-[#0f172a] rounded-2xl border border-slate-700 mb-6 p-6 text-center animate-in zoom-in-95 duration-300">
                <div>
                  <span className="text-6xl mb-4 block">🚚</span>
                  <h3 className="text-lg font-black text-white mb-2 uppercase">Siapkan Uang Tunai</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">Anda bisa membayar pesanan langsung kepada tim pengiriman kami saat nisan sampai di lokasi.</p>
                </div>
              </div>
            )}

            {/* TOMBOL PESAN (Selalu di bawah) */}
            <button 
              onClick={handlePesan} 
              className={`w-full mt-auto py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${metodeBayar === "E-Wallet / QRIS" && !sudahBayar ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-[#00b894] hover:bg-[#00a383] text-white shadow-lg shadow-teal-900/30 active:scale-95'}`}
            >
              Kirim Pesanan Ke WhatsApp →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}