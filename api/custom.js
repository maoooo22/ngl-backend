// File: api/sendMessage.js

// Ini adalah fungsi utama yang akan dijalankan Vercel
// req = request (data dari frontend), res = response (jawaban ke frontend)
export default async function handler(req, res) {
  // Pastikan request-nya adalah metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metode tidak diizinkan, harus POST' });
  }

  try {
    // Ambil data dari body request yang dikirim frontend
    const { username, message, count } = req.body;

    // Validasi sederhana, pastikan semua data ada
    if (!username || !message || !count) {
      return res.status(400).json({ message: 'Semua field harus diisi!' });
    }

    //
    // --- DI SINILAH SEHARUSNYA LOGIKA PENGIRIMAN KE NGL BERADA ---
    //
    // TAPI, untuk sekarang, kita hanya akan simulasi dan kirim balik pesan sukses.
    // Ini membuktikan bahwa frontend dan backend sudah terhubung dengan benar.
    //
    
    console.log(`Menerima permintaan untuk: ${username}, Pesan: ${message}, Jumlah: ${count}`);

    // Kirim jawaban sukses (status 200) ke frontend
    res.status(200).json({ 
      message: `Berhasil menerima permintaan untuk mengirim ${count} pesan ke ${username}. (Ini hanya simulasi dari backend ya!)` 
    });

  } catch (error) {
    // Kalau ada error di backend, kirim pesan error
    res.status(500).json({ message: 'Waduh, servernya error bro!', error: error.message });
  }
}
