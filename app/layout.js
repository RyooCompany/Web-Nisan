"use client";
import { useState, useEffect } from "react"; // Tambah useEffect di sini
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPembeli, setIsPembeli] = useState(false); // STATE BARU: Buat ngecek KTP Pembeli

  // FUNGSI BARU: Ngecek localStorage pas web baru dibuka
  useEffect(() => {
    const cekPembeli = localStorage.getItem("is_pembeli");
    if (cekPembeli === "true") {
      setIsPembeli(true);
    }
  }, []);

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}>
        
        <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-[100] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            
            {/* LOGO */}
            <Link href="/" className="text-xl font-black italic tracking-tighter shrink-0">
              BIHIN <span className="text-blue-600">NISAN</span>
            </Link>

            {/* MENU DESKTOP */}
            <div className="hidden xl:flex items-center gap-8 font-semibold text-xs">
              <Link href="/#profil">Profil</Link>
              <Link href="/produk">Produk</Link>
              <Link href="/lokasi">Lokasi</Link>
              <Link href="/testimoni">Testimoni</Link>
              
              {/* TOMBOL LACAK: Cuma muncul kalau isPembeli bernilai true */}
              {isPembeli && (
                <Link href="/lacak" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Lacak Pesanan</Link>
              )}
            </div>

            {/* TOMBOL HAMBURGER */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 text-slate-600 bg-gray-50 rounded-lg shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16" />
                )}
              </svg>
            </button>
          </div>

          {/* MENU MOBILE OVERLAY */}
          {isOpen && (
            <div className="fixed inset-0 bg-white z-[99] flex flex-col p-6 pt-24 xl:hidden">
               <div className="flex flex-col gap-6 text-xl font-bold">
                  <Link onClick={() => setIsOpen(false)} href="/#profil" className="border-b pb-4">Profil</Link>
                  <Link onClick={() => setIsOpen(false)} href="/produk" className="border-b pb-4">Produk</Link>
                  <Link onClick={() => setIsOpen(false)} href="/lokasi" className="border-b pb-4">Lokasi</Link>
                  
                  {/* TOMBOL LACAK HP: Cuma muncul kalau isPembeli bernilai true */}
                  {isPembeli && (
                    <Link onClick={() => setIsOpen(false)} href="/lacak" className="bg-blue-600 text-white p-4 rounded-xl text-center">Lacak Pesanan</Link>
                  )}
               </div>
            </div>
          )}
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}