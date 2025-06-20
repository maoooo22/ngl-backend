// /api/custom.js
export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { username, message, jumlah } = query;
  const count = parseInt(jumlah || '1');
  
  if (!username || !message || isNaN(count) || count <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  let sukses = 0;
  let gagal = 0;

  for (let i = 0; i < count; i++) {
    try {
      const nglRes = await fetch('https://ngl.link/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username,
          question: message,
          deviceId: 'website'
        })
      });

      const result = await nglRes.json();
      if (result.success) sukses++;
      else gagal++;
    } catch {
      gagal++;
    }

    await new Promise(r => setTimeout(r, Math.random() * 1000 + 1000)); // delay 1–2 detik
  }

  return res.status(200).json({
    success: true,
    username,
    total: count,
    sukses,
    gagal
  });
}
