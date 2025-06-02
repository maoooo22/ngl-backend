export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

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
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
