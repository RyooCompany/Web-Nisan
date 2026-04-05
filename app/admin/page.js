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

  // STATE: Untuk Lacak Pesanan
  const [pesananList, setPesananList] = useState([]);
  const [namaPembeli, setNamaPembeli] = useState("");
  const [waPembeli, setWaPembeli] = useState("");
  const [produkDipesan, setProdukDipesan] = useState("");

  const router = useRouter();

  // 1. Ambil data dari Supabase & LocalStorage
  async function ambilData() {
    // FIX: Ambil ulasan berdasarkan status is_approved false
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

  // --- FUNGSI PESANAN ---
  const tambahPesanan = (e) => {
    e.preventDefault();
    const baru = {
      id: Date.now(),
      nama_pembeli: namaPembeli,
      wa_pembeli: waPembeli,
      produk: produkDipesan,
      status: "Proses", 
      update_tgl: new Date().toLocaleString('id-ID')
    };
    const update = [baru, ...pesananList];
    setPesananList(update);
    localStorage.setItem("db_pesanan", JSON.stringify(update));
    setNamaPembeli(""); setWaPembeli(""); setProdukDipesan("");
    alert("Pesanan berhasil dicatat!");
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

  // --- FUNGSI TESTIMONI (FIXED: Menggunakan ID unik bukan Nama) ---
  const terimaKomentar = async (idUlasan) => {
    const { error } = await supabase
      .from('testimonis')
      .update({ is_approved: true })
      .eq('id', idUlasan); // Lebih akurat pakai ID

    if (!error) {
      setKomentarList(komentarList.filter(k => k.id !== idUlasan));
      alert("Testimoni diterima!");
    } else {
      alert("Gagal: Pastikan RLS Update sudah aktif!");
    }
  };

  const tolakKomentar = async (idUlasan, namaOrang) => {
    if (confirm(`Hapus ulasan dari ${namaOrang}?`)) {
      const { error } = await supabase
        .from('testimonis')
        .delete()
        .eq('id', idUlasan);
      if (!error) setKomentarList(komentarList.filter(k => k.id !== idUlasan));
    }
  };

  // --- FUNGSI PRODUK ---
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
      const produkBaru = { 
        nama: nama, 
        harga: Number(harga.replace(/\D/g, "")), 
        foto: urlFotoCloud, 
        kategori: kategori 
      };
      const { data, error } = await supabase.from('products').insert([produkBaru]).select();
      if (error) throw error;
      if (data) setProdukList([data[0], ...produkList]);
      setNama(""); setHarga(""); setPreviewFoto(""); setFileFoto(null);
      alert("Produk Berhasil Masuk!");
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
    if (confirm("Hapus produk ini?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) setProdukList(produkList.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 text-black font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER: Fix Logout ke Halaman Utama */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm mb-8">
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter">BIHIN ADMIN PANEL</h1>
          <button 
            onClick={() => {
              localStorage.removeItem("isLoggedIn"); 
              window.location.replace("/"); // Kembali ke publik
            }} 
            className="bg-red-500 text-white px-8 py-2 rounded-xl font-bold hover:bg-red-600 transition"
          >
            LOGOUT
          </button>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-8 rounded-[35px] shadow-md border">
            <h2 className="text-xl font-bold mb-6 text-blue-600">📦 Tambah Produk Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama Produk" className="w-full p-4 border rounded-2xl bg-gray-50" value={nama} onChange={(e) => setNama(e.target.value)} required />
              <input type="text" placeholder="Harga (Cth: 800000)" className="w-full p-4 border rounded-2xl bg-gray-50" value={harga} onChange={(e) => setHarga(e.target.value)} required />
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
                {loading ? "PROSES..." : "SIMPAN PRODUK"}
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-[35px] shadow-md border border-green-100">
            <h2 className="text-xl font-bold mb-6 text-green-600">📝 Catat Pesanan Baru</h2>
            <form onSubmit={tambahPesanan} className="space-y-4">
              <input type="text" placeholder="Nama Pembeli" className="w-full p-4 border rounded-2xl bg-gray-50" value={namaPembeli} onChange={(e) => setNamaPembeli(e.target.value)} required />
              <input type="text" placeholder="WhatsApp" className="w-full p-4 border rounded-2xl bg-gray-50" value={waPembeli} onChange={(e) => setWaPembeli(e.target.value)} required />
              <input type="text" placeholder="Produk Dipesan" className="w-full p-4 border rounded-2xl bg-gray-50" value={produkDipesan} onChange={(e) => setProdukDipesan(e.target.value)} required />
              <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-black">SIMPAN PESANAN</button>
            </form>
          </div>
        </div>

        {/* MONITORING */}
        <div className="bg-white rounded-[35px] shadow-xl border overflow-hidden mb-10">
          <div className="p-6 bg-green-600 text-white font-bold uppercase flex justify-between">
            <span>Daftar Pesanan & Status Lacak</span>
            <span className="bg-white text-green-600 px-3 rounded-full text-xs flex items-center">{pesananList.length} Order</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
                  <th className="p-5">Pembeli</th>
                  <th className="p-5">Produk</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pesananList.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-5">
                      <p className="font-bold">{p.nama_pembeli}</p>
                      <p className="text-xs text-gray-400">{p.wa_pembeli}</p>
                    </td>
                    <td className="p-5 font-medium">{p.produk}</td>
                    <td className="p-5">
                      <select value={p.status} onChange={(e) => updateStatusPesanan(p.id, e.target.value)} className="p-2 rounded-lg text-xs font-bold bg-gray-100">
                        <option value="Proses">Proses</option>
                        <option value="Diukir">Sedang Diukir</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                    <td className="p-5">
                      <button onClick={() => hapusPesanan(p.id)} className="text-red-400 font-bold">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER LISTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-md border overflow-hidden">
            <div className="p-4 bg-slate-800 text-white font-bold">📦 Katalog Produk</div>
            <div className="divide-y max-h-[300px] overflow-y-auto">
              {produkList.map(p => (
                <div key={p.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={p.foto} className="w-10 h-10 object-cover rounded-lg" alt="" />
                    <p className="text-sm font-bold">{p.nama}</p>
                  </div>
                  <button onClick={() => hapusProduk(p.id)} className="text-red-500 text-xs font-bold">Hapus</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border overflow-hidden">
            <div className="p-4 bg-yellow-500 text-white font-bold">💬 Testimoni Pending</div>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {komentarList.map((k) => (
                <div key={k.id} className="border-b pb-2">
                  <p className="font-bold text-sm uppercase">{k.nama}</p>
                  <p className="text-xs italic text-gray-600">"{k.pesan}"</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => terimaKomentar(k.id)} className="text-[10px] bg-green-500 text-white px-3 py-1 rounded font-bold">Terima</button>
                    <button onClick={() => tolakKomentar(k.id, k.nama)} className="text-[10px] bg-red-500 text-white px-3 py-1 rounded font-bold">Tolak</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}