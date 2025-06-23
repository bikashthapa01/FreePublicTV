export const channels = [
  {
    id: "nasa-tv",
    name: "NASA TV",
    country: "US",
    language: "English",
    category: "Education",
    isLive: true,
    isHD: true,
    tags: ["space", "science", "government"],
    streamUrl: "https://www.nasa.gov/media/nasatv.m3u8",
    logo: "https://pbs.twimg.com/media/EyeRUF0XAAkH8Vp.jpg",
    description:
      "Live coverage of NASA missions, launches, and educational programming.",
    backgroundImage:
      "https://www.nasa.gov/wp-content/uploads/2025/06/nasa-charlesbeason-8907orig.jpg",
  },
  {
    id: "dw-english",
    name: "DW (English)",
    country: "DE",
    language: "English",
    category: "News",
    isLive: true,
    isHD: true,
    tags: ["news", "europe", "international"],
    streamUrl:
      "https://dwstream1-lh.akamaihd.net/i/dwstream1_live@123456/master.m3u8",
    logo: "https://pbs.twimg.com/media/EyeRUF0XAAkH8Vp.jpg",
    description:
      "Deutsche Welle's English channel provides news and information from Germany and around the world.",
    backgroundImage: "https://www.dw.com/image/0,,18629282_401,00.jpg",
  },
  {
    id: "france24-english",
    name: "France 24 (English)",
    country: "FR",
    language: "English",
    category: "News",
    isLive: true,
    isHD: true,
    tags: ["news", "europe", "world"],
    streamUrl: "https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8",
    logo: "https://pbs.twimg.com/media/EyeRUF0XAAkH8Vp.jpg",
    description:
      "France 24's English channel offers international news and analysis from a French perspective.",
    backgroundImage:
      "https://www.france24.com/en/img/logo/france24-logo-en.png",
  },
];

export const countries = [
  { code: "US", name: "United States" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
];

export const categories = [
  "News",
  "Education",
  "Culture",
  "Entertainment",
  "Kids",
  "Sports",
  "Government",
];
