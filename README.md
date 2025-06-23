# FreePublicTV

FreePublicTV is an open-source, modern, and legal TV streaming discovery platform that lists free public channels from around the world — categorized by country, language, and genre. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌍 Demo

[https://freepublictv.com](https://freepublictv.com)

## ✨ Features

- 📺 Browse free public TV channels by country
- 🌐 Clean and modern UI built with mobile-first design
- 🚀 Fast loading with Next.js App Router
- 🗽 Country flags and metadata from world-countries & FlagCDN
- 🔍 Filter and search support
- 🧹 Dynamic routes for:
  - `/channel/[slug]` – Single channel view with player
  - `/country/[code]` – Country-specific archive
  - `/category/[name]` – Category-specific archive
- 🔄 Pagination for archives
- 🧠 SEO-friendly structure

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Static + dynamic loading (feeds.json, languages.json, custom backend API support)
- **Data Sources**: Public domain TV feeds + metadata from open JSON sources

## 📁 Project Structure

```
/app
  /channel/[slug]
  /country/[code]
  /category/[name]
  /api/
  /about
  /contact
/components
/lib
/public
```

## 🛠️ Setup

```bash
git clone https://github.com/bikashthapa01/freepublictv.git
cd freepublictv
npm install
npm run dev
```

Make sure to set up any necessary `.env` files if backend/API keys are introduced.

## 💾 Data Structure

Each channel includes:

- `id`, `name`, `country`, `language`, `category`
- `isLive`, `isHD`, `tags`
- `streamUrl`, `logo`, `description`, `backgroundImage`

## 🤝 Contributing

Pull requests are welcome! Please follow conventional commits and open issues for discussion before major changes.

## 📄 License

[MIT](LICENSE)

## 🧠 Credits

Built and maintained by [@bikashthapa01](https://github.com/bikashthapa01).

- IPTV feeds provided by the amazing [iptv-org](https://github.com/iptv-org/iptv) project.
- Code quality and development are continuously improved with the help of AI tools like GitHub Copilot and ChatGPT.
