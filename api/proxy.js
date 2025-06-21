import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { source, ...params } = req.query;
  let url = "";
  let options = {};

  try {
    switch (source) {
      case "pixabay":
        url = "https://pixabay.com/api/";
        options = {
          params: {
            key: process.env.PIXABAY_TOKEN,
            ...params,
          },
        };
        break;

      case "getip":
        url = `https://ipinfo.io/${params.q}/json`;
        options = {
          headers: {
            Authorization: `Bearer ${process.env.GETIP_TOKEN}`,
          },
        };
        break;

      default:
        return res.status(400).json({ error: "Unknown source" });
    }

    const response = await axios.get(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error while accessing API" });
  }
}
