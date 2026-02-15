# Legal Documents Hub

A modern, static Next.js website for hosting privacy policies and legal documents for multiple applications. Built with shadcn/ui design principles and deployed to GitHub Pages.

## 🚀 Features

- ✅ **Modern UI**: Clean, professional design inspired by shadcn/ui
- ✅ **Fully Static**: Zero backend, pure HTML/CSS/JS exported for GitHub Pages
- ✅ **Markdown-Based**: Write policies in Markdown with frontmatter
- ✅ **Copy to Clipboard**: Easy link sharing for each document
- ✅ **SEO Optimized**: Dynamic metadata generation for each page
- ✅ **Responsive**: Works beautifully on mobile, tablet, and desktop
- ✅ **Type Safe**: Full TypeScript support

## 📋 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Markdown**: react-markdown + gray-matter
- **Deployment**: GitHub Pages (Static Export)

## 🏗️ Project Structure

```
app-legal-hub/
├── app/
│   ├── page.tsx                    # Homepage with app cards
│   ├── [app]/privacy/page.tsx      # Privacy policy page
│   └── components/
│       └── CopyButton.tsx          # Clipboard copy component
├── data/privacy/
│   ├── tabugame.md                 # Tabu Game privacy policy
│   └── fitness-app.md              # Fitness App privacy policy
├── lib/
│   ├── types.ts                    # TypeScript definitions
│   └── loadApps.ts                 # Data loading utilities
└── .github/workflows/
    └── nextjs.yml                  # Auto-deploy to GitHub Pages
```

## 🎯 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Production Build

```bash
npm run build
```

Static files will be in the `out/` directory.

## ➕ Adding a New App & Privacy Policy

### Step-by-Step Guide

#### 1. Create a Markdown File

Create a new file in `data/privacy/` with your app's slug as the filename:

```bash
touch data/privacy/my-app.md
```

#### 2. Add Frontmatter and Content

Open the file and add YAML frontmatter at the top, followed by your privacy policy in Markdown:

```markdown
---
slug: my-app
name: My App Name
email: support@myapp.com
lastUpdated: 2026-02-15
---

# Privacy Policy

Last Updated: February 15, 2026

## Introduction

Your app description here...

## Information We Collect

- User data type 1
- User data type 2

## How We Use Your Information

We use the collected information to...

## Third-Party Services

We use the following third-party services:

- **Service Name**: Purpose
- **Another Service**: Purpose

## Data Retention

We retain your data for...

## Contact Us

If you have questions, contact us at support@myapp.com
```

#### 3. Frontmatter Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `slug` | ✅ | URL-friendly identifier | `my-app` |
| `name` | ✅ | Display name of the app | `My App Name` |
| `email` | ✅ | Contact email | `support@myapp.com` |
| `lastUpdated` | ✅ | Date in YYYY-MM-DD format | `2026-02-15` |

#### 4. Test Locally

```bash
npm run dev
```

Visit:
- Homepage: `http://localhost:3000/`
- Your policy: `http://localhost:3000/my-app/privacy`

#### 5. Build and Deploy

```bash
npm run build
git add .
git commit -m "Add privacy policy for My App"
git push origin main
```

GitHub Actions will automatically deploy your changes!

## 📝 Markdown Formatting

You can use all standard Markdown features:

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Lists

```markdown
- Bullet point 1
- Bullet point 2

1. Number item 1
2. Number item 2
```

### Links

```markdown
[Link text](https://example.com)
```

### Emphasis

```markdown
**Bold text**
*Italic text*
```

### Code

```markdown
Inline `code` or:

\`\`\`
Code block
\`\`\`
```

## 🌐 Deployment

### GitHub Pages (Automated)

This project is configured for automatic deployment to GitHub Pages:

1. **Already Set Up**: The `.github/workflows/nextjs.yml` workflow handles everything
2. **On Every Push**: Any push to `main` triggers a build and deploy
3. **View Your Site**: `https://your-username.github.io/repo-name`

### Manual Deployment

If you want to deploy manually:

```bash
npm run build
# Upload contents of `out/` directory to your hosting provider
```

Compatible with:
- Vercel
- Netlify  
- Cloudflare Pages
- AWS S3
- Any static hosting service

## 🎨 Customization

### Colors

The project uses Tailwind's slate color palette. To change:

Edit `app/page.tsx` and `app/[app]/privacy/page.tsx`, replacing:
- `slate-50` → your background color
- `slate-900` → your primary text color
- `blue-600` → your accent color

### Typography

Current font stack uses system fonts. To change, edit `app/layout.tsx`:

```tsx
className="font-sans"  // Replace with your font
```

### Adding More Document Types

Currently supports `privacy` pages. To add Terms of Service:

1. Create `data/terms/` directory
2. Add markdown files
3. Create `app/[app]/terms/page.tsx` 
4. Update `lib/loadApps.ts` with new loader function

## 📊 Sample Apps

Two sample applications are included:

1. **Tabu Game** (`data/privacy/tabugame.md`)
2. **Fitness App** (`data/privacy/fitness-app.md`)

Feel free to modify or delete these examples.

## 🔍 SEO

Each privacy policy page includes:
- Dynamic `<title>` tags
- Meta descriptions
- Open Graph tags
- Clean, semantic HTML

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Changes Not Showing

1. Hard refresh your browser (Cmd+Shift+R / Ctrl+F5)
2. Check GitHub Actions for deployment status
3. Verify your markdown frontmatter is valid YAML

### New App Not Appearing  

1. Check filename: Must be in `data/privacy/` with `.md` extension
2. Verify frontmatter has all required fields
3. Ensure `slug` matches filename (without `.md`)

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Review sample apps for examples

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
