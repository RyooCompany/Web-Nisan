import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bihin Nisan | Kerajinan Nisan & Prasasti Berkualitas",
  description: "Spesialis pembuatan nisan keramik, granit, dan marmer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}>
        
        {/* --- NAVBAR UTAMA --- */}
        <nav className="p-4 md:px-10 md:py-6 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          {/* LOGO */}
          <Link href="/" className="text-xl font-black italic tracking-tighter shrink-0">
            BIHIN <span className="text-blue-600">NISAN</span>
          </Link>
          
          {/* MENU NAVIGASI (Semua menu digabung di sini agar sejajar) */}
          <div className="flex items-center gap-4 md:gap-8 font-semibold text-sm md:text-base">
            <Link href="/#profil" className="hover:text-blue-600 transition">Profil</Link>
            <Link href="/produk" className="hover:text-blue-600 transition">Produk</Link>
            <Link href="/lokasi" className="hover:text-blue-600 transition">Lokasi</Link>
            <Link href="/testimoni" className="hover:text-blue-600 transition">Testimoni</Link>
            
            {/* PINDAHKAN KE DALAM SINI: Tombol Lacak Pesanan dengan gaya khusus */}
            <Link 
              href="/lacak" 
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs md:text-sm font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95 whitespace-nowrap"
            >
              LACAK PESANAN
            </Link>
          </div>
        </nav>

        {/* --- KONTEN HALAMAN --- */}
        <main>
          {children}
        </main>

        {/* --- FOOTER --- */}
        <footer className="py-12 text-center text-gray-400 text-[10px] border-t bg-gray-50/50 mt-20 uppercase tracking-widest">
          <p className="font-bold">© 2026 Bihin Nisan Premium Stone Art</p>
        </footer>

      </body>
    </html>
  );
}