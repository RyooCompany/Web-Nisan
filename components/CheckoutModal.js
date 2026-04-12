"use client";
import { useState } from "react";

export default function CheckoutModal({ produk, onClose }) {
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("Bayar di Tempat");
  const [sudahBayar, setSudahBayar] = useState(false);

  const ongkir = 0;
  const totalHarga = (produk.harga * jumlah) + ongkir;

  const handlePesan = () => {
    if (!nama || !wa || !alamat) {
      return alert("Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Lengkap!");
    }

    if (metodeBayar === "Bayar di Tempat") {
      // LOGIKA COD: LANGSUNG SIMPAN KE DATABASE
      const pesananBaru = {
        id: Date.now(),
        nama_pembeli: nama,
        wa_pembeli: wa,
        alamat_pembeli: alamat,
        produk: produk.nama,
        metode_ambil: "Pesan Antar",
        metode_bayar: "COD",
        status: "Proses",
        update_tgl: new Date().toLocaleString('id-ID')
      };

      const dataLama = JSON.parse(localStorage.getItem("db_pesanan") || "[]");
      localStorage.setItem("db_pesanan", JSON.stringify([pesananBaru, ...dataLama]));

      // TANDA PEMBELI: Simpan tanda kalau dia udah beli
      localStorage.setItem("is_pembeli", "true");
      localStorage.setItem("user_wa", wa);

      // --- KODE BARU: Kirim sinyal ke Navbar biar tombol Lacak langsung muncul ---
      window.dispatchEvent(new Event("pembeli_baru"));

      alert("Berhasil! Pesanan COD Anda telah masuk ke sistem kami. Admin akan segera memprosesnya.");
      onClose();

    } else {
      // LOGIKA QRIS: KIRIM KE WHATSAPP
      if (!sudahBayar) return alert("Mohon centang kotak konfirmasi QRIS di bawah barcode!");

      const pesan = `Halo Bihin Nisan, saya ingin pesan:\n\n` +
        `📦 Produk: ${produk.nama}\n` +
        `🔢 Jumlah: ${jumlah}\n` +
        `👤 Nama: ${nama}\n` +
        `📱 WA: ${wa}\n` +
        `📍 Alamat: ${alamat}\n` +
        `💳 Pembayaran: E-Wallet / QRIS\n` +
        `💰 Total Bayar: Rp ${totalHarga.toLocaleString("id-ID")}\n\n` +
        `*Catatan:* Saya sudah melakukan transfer QRIS, bukti transfer akan saya lampirkan.`;
      
      // TANDA PEMBELI: Simpan tanda kalau dia udah beli
      localStorage.setItem("is_pembeli", "true");
      localStorage.setItem("user_wa", wa); // Tambahin juga simpan WA buat QRIS

      // --- KODE BARU: Kirim sinyal ke Navbar biar tombol Lacak langsung muncul ---
      window.dispatchEvent(new Event("pembeli_baru"));

      window.open(`https://wa.me/6281214562122?text=${encodeURIComponent(pesan)}`, "_blank");
      onClose();
    }
  };

  return (
    <>
      <style jsx global>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center p-0 md:p-6 bg-slate-950/80 backdrop-blur-sm font-sans">
        {/* Modal Container */}
        <div className="bg-[#0B1120] w-full md:max-w-2xl rounded-t-[2rem] md:rounded-[2rem] flex flex-col relative max-h-[90vh] border border-slate-800 shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
          
          {/* HEADER FIXED */}
          <div className="p-6 border-b border-slate-800/50 flex justify-between items-center shrink-0 bg-[#0B1120] rounded-t-[2rem]">
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">Checkout</h2>
              <p className="text-xs text-slate-400 mt-1">Selesaikan pesanan Anda</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
              ✕
            </button>
          </div>

          {/* BODY SCROLLABLE */}
          <div className="p-6 overflow-y-auto hide-scroll space-y-8 flex-grow">
            
            {/* 1. RINGKASAN PRODUK */}
            <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-md mb-2 inline-block">
                  {produk.kategori || "Biasa"}
                </span>
                <h3 className="text-lg font-bold text-white">{produk.nama}</h3>
                <p className="text-sm text-slate-400 mt-1">Rp {produk.harga.toLocaleString("id-ID")}</p>
              </div>
              
              {/* Counter Jumlah */}
              <div className="flex items-center gap-3 bg-[#0B1120] border border-slate-800 p-1.5 rounded-xl">
                <button onClick={() => setJumlah(Math.max(1, jumlah - 1))} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-bold transition">-</button>
                <span className="font-black text-white w-4 text-center">{jumlah}</span>
                <button onClick={() => setJumlah(jumlah + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-bold transition">+</button>
              </div>
            </div>

            {/* 2. FORM DATA DIRI */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white border-l-2 border-blue-500 pl-3">Informasi Pengiriman</h4>
              
              <div className="space-y-3">
                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Penerima" className="w-full bg-[#0B1120] border border-slate-800 px-4 py-3.5 rounded-xl text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                <input type="number" value={wa} onChange={(e) => setWa(e.target.value)} placeholder="Nomor WhatsApp" className="w-full bg-[#0B1120] border border-slate-800 px-4 py-3.5 rounded-xl text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Alamat Lengkap (Jalan, RT/RW, Desa)" className="w-full bg-[#0B1120] border border-slate-800 px-4 py-3.5 rounded-xl text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all h-24 resize-none"></textarea>
              </div>
            </div>

            {/* 3. METODE PEMBAYARAN */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white border-l-2 border-blue-500 pl-3">Metode Pembayaran</h4>
              
              <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button onClick={() => setMetodeBayar("Bayar di Tempat")} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${metodeBayar === "Bayar di Tempat" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}>
                  💵 COD / Bayar di Tempat
                </button>
                <button onClick={() => setMetodeBayar("E-Wallet / QRIS")} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${metodeBayar === "E-Wallet / QRIS" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}>
                  📱 E-Wallet / QRIS
                </button>
              </div>

              {/* AREA DINAMIS PEMBAYARAN */}
              <div className="mt-4">
                {metodeBayar === "Bayar di Tempat" ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-4 items-start">
                    <span className="text-2xl mt-1">🚚</span>
                    <div>
                      <h5 className="text-yellow-500 font-bold text-xs uppercase tracking-wider mb-1">Ketentuan Pengiriman COD</h5>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Mohon maaf, jangkauan pengiriman kami saat ini <strong className="text-white">hanya mencakup wilayah Provinsi Riau, Kab. Pelalawan, Kec. Kerumutan.</strong> Terima kasih atas pengertiannya.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Scan QRIS BIHIN NISAN</p>
                    <div className="bg-white p-3 rounded-xl mb-6">
                      <img src="https://zjqtknrztqrevjnttkgh.supabase.co/storage/v1/object/public/foto-produk/WhatsApp%20Image%202026-03-29%20at%2020.50.11.jpeg" alt="QRIS" className="w-40 h-auto object-contain" />
                    </div>
                    <label className="flex items-start gap-3 bg-[#0B1120] p-4 rounded-xl border border-slate-800 cursor-pointer text-left w-full">
                      <input type="checkbox" checked={sudahBayar} onChange={(e) => setSudahBayar(e.target.checked)} className="w-5 h-5 rounded border-slate-600 accent-blue-600 mt-0.5" />
                      <span className="text-xs text-slate-300 leading-relaxed">Saya telah memindai QRIS dan berhasil melakukan transfer sesuai total tagihan.</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* FOOTER FIXED: Tombol Aksi */}
          <div className="p-4 md:p-6 border-t border-slate-800/50 bg-slate-900/50 shrink-0 flex items-center justify-between gap-4 md:rounded-b-[2rem]">
            <div className="hidden md:block">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Total Tagihan</p>
              <p className="text-xl font-black text-white">Rp {totalHarga.toLocaleString("id-ID")}</p>
            </div>
            
            <button 
              onClick={handlePesan} 
              className={`flex-1 md:flex-none w-full md:w-auto px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wide transition-all ${
                metodeBayar === "E-Wallet / QRIS" && !sudahBayar 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95'
              }`}
            >
              {metodeBayar === "Bayar di Tempat" ? "BUAT PESANAN SEKARANG" : "KIRIM BUKTI KE WA"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}