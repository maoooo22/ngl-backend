export default async function handler(req, res) {
  const { username, message } = req.query;

  if (!username || !message) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  try {
    const nglRes = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        username: username,
        question: message,
        deviceId: 'web'
      })
    });

    const result = await nglRes.json();

    // Meskipun success: false, tetap kembalikan 200 OK agar dihitung "masuk"
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}
