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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}>
        
        <nav className="p-4 md:px-10 md:py-6 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
          {/* Tambahkan max-w agar konten tetap di tengah pada layar lebar */}
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="text-xl font-black italic tracking-tighter shrink-0">
              BIHIN <span className="text-blue-600">NISAN</span>
            </Link>

            {/* TOMBOL HAMBURGER (Hanya muncul di Mobile) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
                )}
              </svg>
            </button>

            {/* MENU DESKTOP (Tersembunyi di Mobile) */}
            <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
              <Link href="/#profil" className="hover:text-blue-600 transition">Profil</Link>
              <Link href="/produk" className="hover:text-blue-600 transition">Produk</Link>
              <Link href="/lokasi" className="hover:text-blue-600 transition">Lokasi</Link>
              <Link href="/testimoni" className="hover:text-blue-600 transition">Testimoni</Link>
              <Link href="/lacak" className="hover:text-blue-600 transition font-black">Lacak Pesanan</Link>
            </div>
          </div>

          {/* MENU MOBILE (Hanya muncul saat isOpen true) */}
          {isOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 font-bold border-t pt-4">
              <Link onClick={() => setIsOpen(false)} href="/#profil" className="px-2 py-1">Profil</Link>
              <Link onClick={() => setIsOpen(false)} href="/produk" className="px-2 py-1">Produk</Link>
              <Link onClick={() => setIsOpen(false)} href="/lokasi" className="px-2 py-1">Lokasi</Link>
              <Link onClick={() => setIsOpen(false)} href="/testimoni" className="px-2 py-1">Testimoni</Link>
              <Link onClick={() => setIsOpen(false)} href="/lacak" className="bg-blue-600 text-white p-3 rounded-xl text-center mx-2">
                Lacak Pesanan
              </Link>
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