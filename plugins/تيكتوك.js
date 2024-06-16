// npm install tiktok-scraper-without-watermark --save
const TikTokScraper = require('tiktok-scraper-without-watermark');

(async () => {
  const videoUrl = 'https://www.tiktok.com/@username/video/123456789'; // Replace with the TikTok video URL

  // Use API key (optional, but recommended)
  const apiKay = 'https://shizoapi.onrender.com/api/download/tiktok?url=https://vt.tiktok.com/ZS82u2sDu/&apikey=shizo'; // Replace with your TikTok API key

  const scraper = new TikTokScraper();

  try {
    const result = await scraper.getVideoMeta(videoUrl, { apiKay: apiKay });

    console.log(result); // Log the video metadata
    console.log(result.videoUrl); // Log the video URL without watermark
  } catch (error) {
    console.log(error); // Handle any errors
  }
})();
};
handler.help = ['tektok']
handler.tags = ['fun']
handler.command = /^(تيك)$/i

export default handler
