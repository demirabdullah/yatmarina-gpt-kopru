// api/gonder.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  // İstekten başlık ve içerik al
  const { title, content } = req.body;

  // WordPress bilgilerini DOLDUR
  const wp_url = "https://yatmarina.com.tr/wp-json/wp/v2/posts";
  const username = "chatgpt";
  const application_password = "oU8d ssOy FkmX ArPp nALm 7bAA";

  // Temel auth string (user:pass base64)
  const auth = Buffer.from(`${username}:${application_password}`).toString("base64");

  // WordPress’e gönder
  const response = await fetch(wp_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`
    },
    body: JSON.stringify({
      title: title,
      content: content,
      status: "publish"
    })
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ message: "Başarılı!", post: data });
  } else {
    res.status(500).json({ error: data });
  }
}
