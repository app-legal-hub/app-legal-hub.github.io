# Legal Hub - Multi-App Privacy Policy Platform

> A production-ready Next.js static site for hosting privacy policies for multiple mobile applications.

## 🚀 Features

- ✅ **Fully Static**: Exports to pure HTML/CSS/JS - perfect for GitHub Pages
- ✅ **Zero Code Changes**: Add new apps by simply adding a JSON file
- ✅ **SEO Optimized**: Dynamic metadata generation for each privacy policy
- ✅ **Type Safe**: Full TypeScript support with strict typing
- ✅ **Responsive Design**: Beautiful, modern UI that works on all devices
- ✅ **Fast Build**: Static generation at build time using Next.js App Router

## 📋 Tech Stack

- Next.js 16 (App Router)
- TypeScript 5
- TailwindCSS 4
- Static Export (`output: 'export'`)

## 🏗️ Project Structure

```
app-legal-hub/
├── app/
│   ├── page.tsx                # Home page listing all apps
│   └── [app]/privacy/page.tsx  # Dynamic privacy policy page
├── data/
│   ├── fitness-app.json        # Privacy data for Fitness app
│   └── tabugame.json           # Privacy data for Tabu game
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   └── loadApps.ts             # Data loading utilities
└── next.config.ts              # Next.js configuration
```

## 🎯 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Production Build

```bash
npm run build
```

Static files will be generated in the `/out` directory.

## ➕ Adding a New App

Adding a new application is incredibly simple - **no code changes required**!

1. Create a new JSON file in the `/data` directory (e.g., `my-app.json`)
2. Use this structure:

```json
{
  "slug": "my-app",
  "name": "My App Name",
  "lastUpdated": "2026-02-13",
  "email": "privacy@myapp.com",
  "dataCollected": [
    "Example data point 1",
    "Example data point 2"
  ],
  "thirdParties": [
    {
      "name": "Service Name",
      "purpose": "What it's used for",
      "privacyPolicyUrl": "https://example.com/privacy"
    }
  ],
  "retentionPolicy": "How long you keep the data and deletion policy."
}
```

3. Run `npm run build` - your new app is automatically included!

## 📝 JSON Schema

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL-friendly identifier (e.g., "my-app") |
| `name` | string | Display name of the application |
| `lastUpdated` | string | Last update date (YYYY-MM-DD) |
| `email` | string | Contact email for privacy inquiries |
| `dataCollected` | string[] | List of data types collected |
| `thirdParties` | object[] | Third-party services used |
| `retentionPolicy` | string | Data retention and deletion policy |

## 🌐 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Set source to deploy from the `main` branch
4. Your site will be available at `https://yourusername.github.io/repo-name`

### Other Static Hosts

The `/out` directory after build can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3
- Any static file hosting service

## 🎨 Customization

### Styling

All pages use TailwindCSS. To customize:
- Edit `app/globals.css` for global styles
- Modify Tailwind classes in page components
- Update color scheme in component files

### Layout

- Home page: `app/page.tsx`
- Privacy page: `app/[app]/privacy/page.tsx`
- Root layout: `app/layout.tsx`

## 📊 Sample Apps Included

The project includes two fully configured sample applications:

1. **Fitness Tracker Pro** - Health and fitness app
2. **Tabu Master** - Word guessing game app

These serve as examples and can be modified or removed.

## ✅ Verification

Build output confirms successful static generation:

```
Route (app)
┌ ○ /                          (Static homepage)
├ ○ /_not-found                (404 page)
└ ● /[app]/privacy             (Dynamic SSG routes)
  ├ /fitness-app/privacy
  └ /tabugame/privacy
```

## 🔒 Privacy Policy Features

Each privacy policy page includes:
- App name and last updated date
- Data collection details
- Third-party services with links
- Data retention policy
- Contact information
- Professional, clean design

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new features
- Improve styling
- Report bugs
- Suggest enhancements

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using Next.js**
