"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">B</div>
          <span className="font-black uppercase tracking-tighter text-xl">Bihin<span className="text-blue-600">Nisan</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
          <Link href="/profil" className="hover:text-blue-600 transition-colors">Profil</Link>
          <Link href="/produk" className="hover:text-blue-600 transition-colors">Produk</Link>
          <Link href="/lokasi" className="hover:text-blue-600 transition-colors">Lokasi</Link>
          <Link href="/testimoni" className="hover:text-blue-600 transition-colors">Testimoni</Link>
        </div>
        <Link href="/lacak" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          Lacak Pesanan
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          Abadikan <span className="text-blue-600">Kenangan</span> <br /> Dengan Presisi.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-medium mb-12 leading-relaxed">
          Penyedia batu nisan kustom berkualitas tinggi di Sumedang. Menggunakan bahan pilihan untuk hasil yang elegan dan tahan lama.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="/produk" className="w-full md:w-auto bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
            Lihat Katalog
          </Link>
          <Link href="/profil" className="w-full md:w-auto bg-gray-100 text-gray-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
            Pelajari Profil
          </Link>
        </div>
      </section>

      {/* KATEGORI QUICK ACCESS */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/produk?filter=Kramik" className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-500 transition-all shadow-sm">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Koleksi</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-blue-600">Nisan Kramik</h3>
            </Link>
            <Link href="/produk?filter=Granit" className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-500 transition-all shadow-sm">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Koleksi</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-blue-600">Nisan Granit</h3>
            </Link>
            <Link href="/produk?filter=Costum Desain" className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-500 transition-all shadow-sm">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">Eksklusif</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-blue-600">Custom Desain</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 text-center border-t border-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-300 mb-4">© 2026 Bihin Nisan Sumedang</p>
          <div className="flex justify-center gap-6 text-gray-400 font-bold text-sm uppercase tracking-widest">
             <a href="https://tiktok.com/@ryocreator" className="hover:text-blue-600">TikTok</a>
             <a href="#" className="hover:text-blue-600">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}