"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [produkList, setProdukList] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("custom"); 
  const [fileFoto, setFileFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState("");
  const [komentarList, setKomentarList] = useState([]);
  const [loading, setLoading] = useState(false);

  // STATE: Untuk Lacak Pesanan & Input Manual
  const [pesananList, setPesananList] = useState([]);
  const [namaPembeli, setNamaPembeli] = useState("");
  const [waPembeli, setWaPembeli] = useState("");
  const [alamatPembeli, setAlamatPembeli] = useState(""); 
  const [produkDipesan, setProdukDipesan] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("Bayar di Tempat"); // Hanya metode bayar yang tersisa

  const router = useRouter();

  async function ambilData() {
    const { data: testies } = await supabase
      .from('testimonis')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });
    if (testies) setKomentarList(testies);

    const { data: produkData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (produkData) setProdukList(produkData);

    const savedPesanan = localStorage.getItem("db_pesanan");
    if (savedPesanan) setPesananList(JSON.parse(savedPesanan));
  }

  useEffect(() => {
    const sudahLogin = localStorage.getItem("isLoggedIn");
    if (sudahLogin !== "true") {
      window.location.replace("/login");
    } else {
      ambilData(); 
    }
  }, []);

  // --- FUNGSI PESANAN MANUAL ---
  const tambahPesanan = (e) => {
    e.preventDefault();
    const baru = {
      id: Date.now(),
      nama_pembeli: namaPembeli,
      wa_pembeli: waPembeli,
      alamat_pembeli: alamatPembeli, 
      produk: produkDipesan,
      metode_bayar: metodeBayar, 
      status: "Proses", 
      update_tgl: new Date().toLocaleString('id-ID')
    };
    const update = [baru, ...pesananList];
    setPesananList(update);
    localStorage.setItem("db_pesanan", JSON.stringify(update));
    
    // Reset Form
    setNamaPembeli(""); setWaPembeli(""); setAlamatPembeli(""); setProdukDipesan("");
    setMetodeBayar("Bayar di Tempat");
    alert("Pesanan manual berhasil dicatat!");
  };

  const updateStatusPesanan = (id, statusBaru) => {
    const update = pesananList.map(p => 
      p.id === id ? { ...p, status: statusBaru, update_tgl: new Date().toLocaleString('id-ID') } : p
    );
    setPesananList(update);
    localStorage.setItem("db_pesanan", JSON.stringify(update));
  };

  const hapusPesanan = (id) => {
    if (confirm("Hapus data pesanan ini?")) {
      const update = pesananList.filter(p => p.id !== id);
      setPesananList(update);
      localStorage.setItem("db_pesanan", JSON.stringify(update));
    }
  };

  // --- FUNGSI TESTIMONI & PRODUK ---
  const terimaKomentar = async (idUlasan) => {
    const { error } = await supabase.from('testimonis').update({ is_approved: true }).eq('id', idUlasan); 
    if (!error) {
      setKomentarList(komentarList.filter(k => k.id !== idUlasan));
      alert("Testimoni diterima!");
    }
  };

  const tolakKomentar = async (idUlasan, namaOrang) => {
    if (confirm(`Hapus ulasan dari ${namaOrang}?`)) {
      const { error } = await supabase.from('testimonis').delete().eq('id', idUlasan);
      if (!error) setKomentarList(komentarList.filter(k => k.id !== idUlasan));
    }
  };

  const uploadKeBucket = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('foto-produk').upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('foto-produk').getPublicUrl(fileName);
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileFoto) return alert("Pilih foto!");
    setLoading(true);
    try {
      const urlFotoCloud = await uploadKeBucket(fileFoto);
      const produkBaru = { nama, harga: Number(harga.replace(/\D/g, "")), foto: urlFotoCloud, kategori };
      const { data, error } = await supabase.from('products').insert([produkBaru]).select();
      if (error) throw error;
      if (data && data.length > 0) setProdukList([data[0], ...produkList]);
      setNama(""); setHarga(""); setPreviewFoto(""); setFileFoto(null);
      alert("Produk Berhasil Masuk ke Database!");
    } catch (err) {
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const hapusProduk = async (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) setProdukList(produkList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm mb-8">
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter">BIHIN ADMIN PANEL</h1>
          <button onClick={() => {localStorage.removeItem("isLoggedIn"); window.location.replace("/");}} className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-xl font-bold transition">LOGOUT</button>
        </div>

        {/* GRID UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* FORM TAMBAH PRODUK */}
          <div className="bg-white p-8 rounded-[35px] shadow-md border">
            <h2 className="text-xl font-bold mb-6 text-blue-600">📦 Tambah Produk Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama Produk" className="w-full p-4 border rounded-2xl bg-gray-50" value={nama} onChange={(e) => setNama(e.target.value)} required />
              <input type="text" placeholder="Harga (Angka saja, cth: 800000)" className="w-full p-4 border rounded-2xl bg-gray-50" value={harga} onChange={(e) => setHarga(e.target.value)} required />
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full p-4 border rounded-2xl bg-white font-bold">
                <option value="kramik">Nisan Kramik</option>
                <option value="granit">Prasasti Granit</option>
                <option value="custom">Costum Desain</option>
              </select>
              <div className="bg-blue-50 p-4 rounded-2xl border-2 border-dashed border-blue-200">
                <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs w-full" required />
                {previewFoto && <img src={previewFoto} alt="Preview" className="mt-4 h-32 w-full object-cover rounded-xl" />}
              </div>
              <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black disabled:bg-gray-400">
                {loading ? "MENYIMPAN..." : "SIMPAN PRODUK"}
              </button>
            </form>
          </div>

          {/* FORM PESANAN MANUAL */}
          <div className="bg-white p-8 rounded-[35px] shadow-md border border-green-100">
            <h2 className="text-xl font-bold mb-6 text-green-600">📝 Catat Pesanan Manual</h2>
            <form onSubmit={tambahPesanan} className="space-y-3">
              <input type="text" placeholder="Nama Pembeli" className="w-full p-3.5 border rounded-2xl bg-gray-50 text-sm" value={namaPembeli} onChange={(e) => setNamaPembeli(e.target.value)} required />
              <input type="text" placeholder="WhatsApp (08...)" className="w-full p-3.5 border rounded-2xl bg-gray-50 text-sm" value={waPembeli} onChange={(e) => setWaPembeli(e.target.value)} required />
              <textarea placeholder="Alamat Lengkap" className="w-full p-3.5 border rounded-2xl bg-gray-50 text-sm h-20 resize-none custom-scrollbar" value={alamatPembeli} onChange={(e) => setAlamatPembeli(e.target.value)} required></textarea>
              <input type="text" placeholder="Produk Dipesan" className="w-full p-3.5 border rounded-2xl bg-gray-50 text-sm" value={produkDipesan} onChange={(e) => setProdukDipesan(e.target.value)} required />
              
              {/* Hanya ada pilihan metode pembayaran sekarang */}
              <div className="w-full">
                <select value={metodeBayar} onChange={(e) => setMetodeBayar(e.target.value)} className="w-full p-3.5 border rounded-2xl bg-white text-xs font-bold outline-none focus:border-green-500">
                  <option value="Bayar di Tempat">💵 Bayar di Tempat (COD)</option>
                  <option value="E-Wallet / QRIS">📱 E-Wallet / QRIS</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-black mt-2">
                SIMPAN PESANAN
              </button>
            </form>
          </div>
        </div>

        {/* TABEL MONITORING PESANAN */}
        <div className="bg-white rounded-[35px] shadow-xl border overflow-hidden mb-10">
          <div className="p-6 bg-green-600 text-white font-bold uppercase tracking-widest flex justify-between items-center">
            <span>Daftar Pesanan (Web & Manual)</span>
            <span className="bg-white text-green-600 px-3 py-1 rounded-full text-xs flex items-center">{pesananList.length} Order</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-5 w-1/3">Info Pembeli</th>
                  <th className="p-5">Produk & Pembayaran</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pesananList.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                    
                    <td className="p-5">
                      <p className="font-bold text-gray-900">{p.nama_pembeli}</p>
                      <p className="text-xs text-blue-600 font-bold mt-0.5">{p.wa_pembeli}</p>
                      {p.alamat_pembeli && (
                        <p className="text-[10px] text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100 leading-relaxed">
                          📍 {p.alamat_pembeli}
                        </p>
                      )}
                    </td>

                    <td className="p-5">
                      <p className="font-bold text-gray-800">{p.produk}</p>
                      <div className="mt-2">
                        {/* Hanya menampilkan badge pembayaran */}
                        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border inline-block ${
                          p.metode_bayar === "Bayar di Tempat" || p.metode_bayar === "COD" ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-teal-50 text-teal-600 border-teal-100"
                        }`}>
                          {p.metode_bayar === "Bayar di Tempat" || p.metode_bayar === "COD" ? "COD" : "Transfer / QRIS"}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <select 
                        value={p.status} 
                        onChange={(e) => updateStatusPesanan(p.id, e.target.value)}
                        className={`p-2 rounded-xl text-xs font-bold border outline-none cursor-pointer shadow-sm ${
                          p.status === "Proses" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : 
                          p.status === "Diukir" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        <option value="Proses">Proses</option>
                        <option value="Diukir">Sedang Diukir</option>
                        <option value="Selesai">Selesai / Dikirim</option>
                      </select>
                    </td>

                    <td className="p-5 text-center">
                      <button onClick={() => hapusPesanan(p.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg text-xs font-black uppercase transition-colors">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pesananList.length === 0 && <p className="p-10 text-center text-gray-400 italic">Belum ada pesanan masuk.</p>}
          </div>
        </div>

        {/* KATALOG & TESTIMONI BAWAH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white rounded-3xl shadow-md border overflow-hidden">
              <div className="p-4 bg-slate-800 text-white font-bold">📦 Katalog Produk Database</div>
              <div className="divide-y max-h-[400px] overflow-y-auto custom-scrollbar">
                {produkList.map(p => (
                  <div key={p.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={p.foto} className="w-12 h-12 object-cover rounded-xl shadow-sm border border-gray-100" alt="" />
                      <div>
                        <p className="text-sm font-bold">{p.nama}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-md inline-block mt-1">{p.kategori}</p>
                      </div>
                    </div>
                    <button onClick={() => hapusProduk(p.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold transition">Hapus</button>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white rounded-3xl shadow-md border overflow-hidden">
              <div className="p-4 bg-yellow-500 text-white font-bold">💬 Testimoni Pending</div>
             <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                {komentarList.map((k) => (
                  <div key={k.id} className="border-b border-gray-100 pb-3">
                    <p className="font-bold text-sm uppercase text-gray-800">{k.nama}</p>
                    <p className="text-xs italic text-gray-500 mt-1">"{k.pesan}"</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => terimaKomentar(k.id)} className="text-[10px] bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold shadow-sm transition">Terima</button>
                      <button onClick={() => tolakKomentar(k.id, k.nama)} className="text-[10px] bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-bold shadow-sm transition">Tolak</button>
                    </div>
                  </div>
                ))}
                {komentarList.length === 0 && <p className="text-center text-gray-400 text-xs py-4">Semua testimoni sudah diproses.</p>}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}