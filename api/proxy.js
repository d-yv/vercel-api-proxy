export default async function handler(req, res) {
  const API_TOKEN = process.env.GETIP_API_TOKEN;
  const ip = req.query.q;

  try {
    const response = await fetch(`https://ipinfo.io/${ip}json?`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при запросе к API" });
  }
}
