export default async function handler(req, res) {
  const { username, message, jumlah } = req.query;
  const jumlahPesan = parseInt(jumlah) || 1;

  if (!username || !message || jumlahPesan <= 0) {
    return res.status(400).json({ success: false, message: "Invalid parameters" });
  }

  let sukses = 0, gagal = 0;
  for (let i = 0; i < jumlahPesan; i++) {
    try {
      const nglRes = await fetch('https://ngl.link/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, question: message, deviceId: 'website' })
      });

      const result = await nglRes.json();
      if (result.success) sukses++; else gagal++;
    } catch {
      gagal++;
    }
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
  }

  res.status(200).json({ success: true, sukses, gagal });
}
