// Lokasi file: api/sendMessage.js

/**
 * Ini adalah Serverless Function yang akan dijalankan oleh Vercel.
 * Fungsinya untuk menerima data dari frontend dan meresponnya.
 *
 * @param {object} req - Objek request, berisi data yang dikirim dari frontend.
 * @param {object} res - Objek response, untuk mengirim jawaban kembali ke frontend.
 */
export default async function handler(req, res) {
  // 1. Cek Metode Request
  // Keamanan dasar, kita hanya mau menerima request dengan metode 'POST'.
  if (req.method !== 'POST') {
    // Jika bukan 'POST', kirim status error 405 (Method Not Allowed)
    return res.status(405).json({ message: 'Metode tidak diizinkan, harus POST' });
  }

  try {
    // 2. Ambil dan Bongkar Data
    // Kita ambil data (username, message, count) dari body request yang dikirim frontend.
    const { username, message, count } = req.body;

    // 3. Validasi Data
    // Cek apakah semua data yang dibutuhkan sudah dikirim.
    if (!username || !message || !count) {
      // Jika ada yang kurang, kirim status error 400 (Bad Request)
      return res.status(400).json({ message: 'Data tidak lengkap! Username, message, dan count harus diisi.' });
    }

    // 4. Proses Logika Inti (Simulasi)
    // Di sinilah nanti kita akan menempatkan kode untuk benar-benar mengirim pesan ke NGL.
    // Untuk saat ini, kita hanya melakukan simulasi untuk memastikan koneksi berhasil.
    
    // Mencatat di log server (bisa dilihat di dashboard Vercel nanti) untuk debugging.
    console.log(`[LOG] Menerima permintaan untuk: ${username}, Pesan: "${message}", Jumlah: ${count}`);

    // 5. Kirim Jawaban Sukses
    // Jika semua langkah di atas berhasil, kirim status 200 (OK) beserta pesan sukses.
    res.status(200).json({ 
      message: `Backend berhasil menerima permintaan! Siap mengirim ${count} pesan ke "${username}". (Status: Simulasi)` 
    });

  } catch (error) {
    // 6. Penanganan Error
    // Jika terjadi error tak terduga di dalam blok 'try', tangkap errornya.
    console.error('[SERVER ERROR]', error);
    
    // Kirim status error 500 (Internal Server Error) ke frontend.
    res.status(500).json({ message: 'Terjadi kesalahan di server backend.', error: error.message });
  }
}
