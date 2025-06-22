export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, message, jumlah } = req.query;

  if (!username || !message || !jumlah) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  const count = parseInt(jumlah);
  let berhasil = 0;
  let gagal = 0;

  for (let i = 0; i < count; i++) {
    try {
      const response = await fetch('https://ngl.link/api/submit', {
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

      const result = await response.json();
      if (result.success) {
        berhasil++;
      } else {
        gagal++;
      }

      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
    } catch (error) {
      gagal++;
    }
  }

  return res.status(200).json({
    success: true,
    berhasil,
    gagal
  });
}
