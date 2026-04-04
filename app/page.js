"use client";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function CompanyProfile() {
  const noWA = "6281214562122"; 

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans scroll-smooth">
      
      {/* HERO SECTION */}
      <section className="py-16 md:py-24 px-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Kerajinan Nisan <span className="text-blue-600 underline decoration-blue-200">Keramik & Granit</span> Berkualitas.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Melayani pemesanan kustom dengan teknik ukir profesional. Pengiriman aman dan amanah dari Jatihurip, Sumedang.
          </p>
          <div className="flex justify-center">
            <a href={`https://wa.me/${noWA}`} className="w-full md:w-auto bg-white text-gray-900 border-2 border-gray-900 px-8 md:px-12 py-4 rounded-2xl font-black hover:bg-gray-900 hover:text-white transition-all shadow-lg active:scale-95 text-center">
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>

      {/* PROFIL PERUSAHAAN */}
      <section id="profil" className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <div className="bg-blue-600 w-20 h-1 mb-6 mx-auto md:mx-0"></div>
          <h3 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 uppercase">Mengapa Memilih Kami?</h3>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
            Kami mengombinasikan keahlian seni tradisional dengan material berkualitas tinggi. Detail pekerjaan adalah identitas kami.
          </p>
          <div className="space-y-3 font-bold text-gray-700 text-sm md:text-base">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-blue-600">✔</span> Bahan Keramik & Granit Pilihan
            </div>
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <span className="text-blue-600">✔</span> Ukir Profesional (Manual & CNC)
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 bg-gray-50 aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden shadow-xl border border-gray-100 relative group flex items-center justify-center p-8">
          <img 
            src="/logo(1).png" 
            alt="Logo Bihin Nisan" 
            className="max-w-full max-h-full object-contain transition duration-500 group-hover:scale-105" 
          />
        </div>
      </section>

      {/* KATALOG (GRID KATEGORI) */}
      <section id="produk" className="py-20 bg-gray-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter">Layanan & Produk</h3>
            <p className="text-gray-400 text-sm md:text-base">Pilih kategori untuk melihat koleksi kami</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Link href="/produk?filter=kramik" className="group bg-gray-800 p-8 md:p-10 rounded-[24px] md:rounded-[32px] hover:bg-white transition-all duration-500">
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition">🪦</div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-black">Nisan Keramik</h4>
              <p className="text-gray-400 text-sm mb-6 group-hover:text-gray-600 italic">Bahan Keramik Mulus & Awet.</p>
              <span className="text-blue-400 group-hover:text-blue-600 font-black text-sm">LIHAT PRODUK →</span>
            </Link>

            <Link href="/produk?filter=granit" className="group bg-gray-800 p-8 md:p-10 rounded-[24px] md:rounded-[32px] hover:bg-white transition-all duration-500">
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition">⬛</div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-black">Prasasti Granit</h4>
              <p className="text-gray-400 text-sm mb-6 group-hover:text-gray-600 italic">Kesan mewah dan kokoh.</p>
              <span className="text-blue-400 group-hover:text-blue-600 font-black text-sm">LIHAT PRODUK →</span>
            </Link>

            <Link href="/produk?filter=Costum Desain" className="group bg-gray-800 p-8 md:p-10 rounded-[24px] md:rounded-[32px] hover:bg-white transition-all duration-500">
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition">⚒️</div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-black">Custom Desain</h4>
              <p className="text-gray-400 text-sm mb-6 group-hover:text-gray-600 italic">Sesuai keinginan Anda.</p>
              <span className="text-blue-400 group-hover:text-blue-600 font-black text-sm">LIHAT PRODUK →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t bg-gray-50 px-6 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-xs">
          <p>&copy; 2026 BihinNisan.</p>
          <div className="flex gap-4 font-bold">
            <Link href="/login" className="hover:text-blue-600 transition">Panel Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}