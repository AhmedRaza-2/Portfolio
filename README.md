# ahmed-raza.dev

Source for **[ahmed-raza.dev](https://ahmed-raza.dev/)**, the portfolio of **Ahmed Raza**, an AI/ML Engineer and Product Engineer at The Noble Platforms, studying Computer Science at Air University, Islamabad.

Built with React 19, TypeScript, Vite and Tailwind CSS 4. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Where things live

| What | Where |
| :--- | :--- |
| Projects, experience, skills, testimonials | `src/data/portfolioData.ts` |
| FAQ (kept in sync with the FAQPage JSON-LD in `index.html`) | `src/data/faq.ts` |
| SEO: title, meta, Open Graph, structured data | `index.html` |
| Crawlers and AI search | `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` |
| Static pages for search engines | `public/about/`, `public/projects/…` |
