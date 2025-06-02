export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, message, count } = req.body;
  if (!username || !message || !count || count <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < count; i++) {
    try {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000)); // Delay 1–2 detik

      const resNgl = await fetch("https://ngl.link/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          question: message,
          deviceId: "website"
        })
      });

      const data = await resNgl.json();
      if (data.success) {
        success++;
      } else {
        failed++;
      }
    } catch (err) {
      failed++;
    }
  }

  res.status(200).json({ success, failed });
}
