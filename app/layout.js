"use client";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Meta tag ini wajib agar responsif di HP */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}>
        
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 md:px-10 md:py-6 flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="text-xl font-black italic tracking-tighter shrink-0 z-[101]">
              BIHIN <span className="text-blue-600">NISAN</span>
            </Link>

            {/* TOMBOL HAMBURGER - Dipaksa muncul di layar < 1024px (lg) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600 z-[101] outline-none"
              aria-label="Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            {/* MENU DESKTOP - Hanya muncul di layar sangat lebar (lg: 1024px+) */}
            <div className="hidden lg:flex items-center gap-8 font-semibold text-sm">
              <Link href="/#profil" className="hover:text-blue-600 transition">Profil</Link>
              <Link href="/produk" className="hover:text-blue-600 transition">Produk</Link>
              <Link href="/lokasi" className="hover:text-blue-600 transition">Lokasi</Link>
              <Link href="/testimoni" className="hover:text-blue-600 transition">Testimoni</Link>
              <Link href="/lacak" className="hover:text-blue-600 transition font-black">Lacak Pesanan</Link>
            </div>
          </div>

          {/* MENU MOBILE - Tampilan Full Screen Overlay agar pas di HP */}
          {isOpen && (
            <div className="fixed inset-0 bg-white z-[100] flex flex-col p-6 pt-24 animate-in fade-in duration-300">
              <div className="flex flex-col gap-6 text-2xl font-bold">
                <Link onClick={() => setIsOpen(false)} href="/#profil" className="border-b pb-4">Profil</Link>
                <Link onClick={() => setIsOpen(false)} href="/produk" className="border-b pb-4">Produk</Link>
                <Link onClick={() => setIsOpen(false)} href="/lokasi" className="border-b pb-4">Lokasi</Link>
                <Link onClick={() => setIsOpen(false)} href="/testimoni" className="border-b pb-4">Testimoni</Link>
                <Link onClick={() => setIsOpen(false)} href="/lacak" className="bg-blue-600 text-white p-5 rounded-2xl text-center text-xl mt-4 shadow-xl">
                  Lacak Pesanan
                </Link>
              </div>
            </div>
          )}
        </nav>

        <main>{children}</main>

        <footer className="py-12 text-center text-gray-400 text-[10px] border-t bg-gray-50/50 mt-20 uppercase tracking-widest">
          <p className="font-bold">© 2026 Bihin Nisan Premium Stone Art</p>
        </footer>
      </body>
    </html>
  );
}