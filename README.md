# KBIH An Nur - Landing Page

A modern, professional landing page for **KBIH An Nur**, a trusted Umrah & Hajj travel agency in Surabaya.

## Technical Stack
- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router, Turbo)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## Features
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.
- **Dynamic Package Pages**: SEO-friendly detail pages for each Umrah package with article-style layout.
- **Interactive UI**: Horizontal scrolling package lists, background carousels, and smooth hover effects.
- **Fast Navigation**: Instant page transitions without layout shift.
- **SEO Optimized**: Dynamic metadata generation for every package page.

## Getting Started

### Prerequisites
- Node.js (v18.17.0 or later recommended)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push code to GitHub.
2. Import project in Vercel.
3. Deploy (Zero Config required).

## Project Structure
- `src/app`: App Router pages and layout.
- `src/components`: Reusable UI components (Hero, Navbar, etc.).
- `src/components/home`: Landing page specific sections.
- `src/lib`: Utilities (Tailwind class merger) and Data.

## Content Management
- **Packages**: Manage package data (prices, dates, features) in `src/lib/packages.ts`. Changes here automatically update both the Home listing and Detail pages.
- **Images**: Update Hero carousel or Gallery images in their respective component files (`Hero.tsx`, `GallerySection.tsx`).

## Customization
- **Colors & Fonts**: Edit `src/app/globals.css`.
- **Content**: Update text in specific component files (e.g., `Hero.tsx`).
