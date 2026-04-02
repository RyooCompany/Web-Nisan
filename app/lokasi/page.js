"use client";

export default function LokasiPage() {
  // GANTI bagian ini dengan koordinat yang kamu salin tadi
  const lat = "-0.013139"; // Contoh Lintang
  const lng = "102.315528"; // Contoh Bujur

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-black text-center mb-12 uppercase tracking-tighter text-gray-900">
          Lokasi Workshop Kami
        </h1>

        <div className="bg-white p-4 md:p-8 rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="w-full h-[450px] rounded-[24px] overflow-hidden border border-gray-100 mb-8 bg-gray-100">
            {/* Trik: Menggunakan query koordinat agar pin merah muncul tepat di titiknya */}
            <iframe 
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <span className="text-blue-600"></span> 
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Jln PT Medco Dusun 1(sungai buluh Desa Mak Teduh) <br />
                Kecamatan : kerumutan, <br />
                Kabupaten :Pelalawan.
                Propinsi :Riau
              </p>
            </div>
            
            <div className="flex flex-col justify-end">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                target="_blank"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl text-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 uppercase"
              >
                Buka Petunjuk Jalan
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}