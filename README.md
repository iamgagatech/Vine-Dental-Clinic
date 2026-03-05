# 🦷 Vine Dental Clinic Website

> Trusted Dental Care Since 1995 — Healthier Smiles Start Here

A modern, high-converting dental clinic website built with Vite, React, TypeScript, and Tailwind CSS.

![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

## 🌟 Features

- **Gorgeous UI/UX** — Glassmorphism, smooth animations, stunning gradients
- **Mobile-First Design** — Optimized for all devices
- **Booking System** — Multi-step appointment request form
- **Admin Dashboard** — Manage bookings, patients, leads
- **Payment Integration** — Paystack for online payments
- **WhatsApp Integration** — Direct messaging to clinic
- **SEO Optimized** — Meta tags, sitemap-ready, semantic HTML
- **Accessibility** — WCAG AA compliant, keyboard navigation
- **Performance** — Code splitting, lazy loading, optimized images

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vine-dental-clinic.git
cd vine-dental-clinic

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | TypeScript type checking |

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Required variables:
- `VITE_APP_URL` — Your site URL (default: `http://localhost:5173`)
- `ADMIN_TOKEN` — Token for admin dashboard access

Optional variables:
- Paystack keys for payments
- SMTP settings for email notifications
- Analytics tracking IDs

## 🌐 Deployment

### Deploy to Vercel

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Option 2: Vercel Dashboard

1. Connect your GitHub repository to Vercel
2. Import `vine-dental-clinic`
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables
5. Deploy!

### Environment Variables in Vercel

Add these in Vercel → Project Settings → Environment Variables:

```
VITE_APP_URL=https://yourdomain.com
ADMIN_TOKEN=your-secure-token
VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
```

### Custom Domain

1. Go to Vercel → Project → Domains
2. Add your custom domain
3. Update DNS records:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

## 📁 Project Structure

```
vine-dental-clinic/
├── public/                 # Static assets
│   ├── images/            # Images and logo
│   └── favicon.ico
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Page sections
│   │   └── admin/        # Admin components
│   ├── lib/              # Utilities and helpers
│   ├── data/             # Static data
│   ├── types/            # TypeScript types
│   ├── pages/            # Page components
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## 🎨 Customization

### Brand Colors

Edit `src/lib/tokens.ts` to customize colors:

```typescript
export const COLORS = {
  primary: '#0D7377',      // Deep teal
  secondary: '#D97706',    // Amber/gold
  accent: '#10B981',       // Success green
  // ...
};
```

### Adding Images

Place images in `public/images/`:

```
public/images/
├── logo.svg
├── hero-bg.jpg
├── services/
│   ├── scaling-polishing.jpg
│   ├── implants.jpg
│   └── ...
```

Reference in code with `/images/filename.jpg`.

### Services

Edit `src/data/services.ts` to add/modify services.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage
```

## 🔒 Security

- Environment variables for secrets
- CORS headers configured
- XSS protection headers
- Input validation with Zod
- Rate limiting (TODO: implement)

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, services, reviews |
| Services | `/services` | All services listing |
| Service Detail | `/services/:slug` | Individual service page |
| Book | `/book` | Appointment booking form |
| Contact | `/contact` | Contact form and location |
| About | `/about` | Clinic story and team |
| Admin | `/admin` | Admin dashboard |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for Vine Dental Clinic.

## ☕ Support

For support, email vinedentalclinic@yahoo.co.uk or call +2348023657067.

---

Built with ❤️ for Vine Dental Clinic — Est. 1995