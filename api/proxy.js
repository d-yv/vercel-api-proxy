export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // или укажи свой GitHub Pages адрес
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { source, q } = req.query;

  let apiUrl = "";
  let headers = {};

  switch (source) {
    case "pixabay":
      apiUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_TOKEN}&q=${q}`;
      break;

    case "getip":
      apiUrl = `https://ipinfo.io/${q}/json`;
      headers = {
        Authorization: `Bearer ${process.env.GETIP_TOKEN}`,
      };
      break;

    //case "":
    //apiUrl = ``;
    //headers:{}
    //break;

    default:
      return res.status(400).json({ error: "Unknown source" });
  }

  try {
    const response = await fetch(apiUrl, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обращении к API" });
  }
}
