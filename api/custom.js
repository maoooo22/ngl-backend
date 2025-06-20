export default async function handler(req, res) {
  const method = req.method;
  let username, message, jumlah;

  if (method === 'GET') {
    ({ username, message, jumlah } = req.query);
  } else if (method === 'POST') {
    ({ username, message, jumlah } = req.body);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!username || !message || isNaN(jumlah)) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  let success = 0;
  let failed = 0;

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
      if (result.success) success++;
      else failed++;
    } catch {
      failed++;
    }
  }

  return res.status(200).json({ success, failed });
      }
