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

  for (let i = 0; i < Number(jumlah); i++) {
    try {
      const result = await fetch("https://ngl.link/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          username,
          question: message,
          deviceId: "website"
        }),
      });

      const data = await result.json();
      if (data.success) sukses++;
      else gagal++;
    } catch {
      gagal++;
    }

    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000)); // delay 1–2 detik
  }

  return res.status(200).json({ success: true, sukses, gagal });
}
