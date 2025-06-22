export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { username, message, jumlah } = req.query;

  if (!username || !message || isNaN(jumlah)) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  let sukses = 0;
  let gagal = 0;

  for (let i = 0; i < parseInt(jumlah); i++) {
    try {
      const nglRes = await fetch('https://ngl.link/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          username: username,
          question: message,
          deviceId: 'website'
        })
      });

      const result = await nglRes.json();
      if (result.success) {
        sukses++;
      } else {
        gagal++;
      }
    } catch (err) {
      gagal++;
    }

    const delay = Math.random() * 1000 + 1000; // 1-2 detik delay
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return res.status(200).json({
    success: true,
    sukses,
    gagal
  });
}
