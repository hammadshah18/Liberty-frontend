# Liberty Assistant Widget

A lightweight Next.js 15 chatbot widget for the Liberty Assistant backend.

## Installation Commands

```bash
npm install
```

## Next.js Setup

```bash
npm run dev
```

## Tailwind Setup

Tailwind is configured through `tailwind.config.ts` and `postcss.config.mjs`.

## Production Build

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_API_URL=https://liberty-project-production.up.railway.app
```

## Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ChatWidget.tsx
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   └── ChatInput.tsx
├── lib/
│   └── api.ts
└── types/
    └── chat.ts
```

## Vercel Deployment Instructions

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add `NEXT_PUBLIC_API_URL=https://liberty-project-production.up.railway.app` in Project Settings.
4. Deploy.

## WordPress Embedding Recommendations

1. Use the `/embed` route in an `iframe` for the simplest integration.
2. Use `public/liberty-assistant-widget.js` when you want a one-line JavaScript embed on WordPress.
3. The JS widget accepts `data-embed-url`, `data-label`, and `data-launcher-text` on the script tag.

## WordPress Script Example

```html
<script
    src="https://your-domain.com/liberty-assistant-widget.js"
    data-embed-url="https://your-domain.com/embed"
    data-label="Liberty Assistant"
    data-launcher-text="Ask Liberty Assistant"
    defer
></script>
```
