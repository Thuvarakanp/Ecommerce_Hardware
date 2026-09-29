# IronForge

Online store for bike and vehicle parts, with live stock.

**Stack:** React 19 + Vite + TypeScript + Tailwind v4 (`motion` for animation) · Express 5 + SQLite (`node:sqlite`, Node 22.13+)

```bash
npm install
npm run dev     # web on :5173, API on :3001 (seeds 25 demo products on first run)
npm test        # API tests (in-memory database)
npm start       # production: builds the app and serves it + API on :3001
```

Product photos: put `<SKU>.jpg` in `public/images/products/` (for example `BRK-1001.jpg`). Missing files show a category icon.

## Status
- [x] Catalog: search, category filter, sort, product page
- [x] Cart (saved in the browser) and checkout that records orders and decrements stock atomically
- [ ] Accounts: sign up, login, order history
- [ ] Admin: manage products and stock, view orders and users
- [ ] Payments (Stripe)
