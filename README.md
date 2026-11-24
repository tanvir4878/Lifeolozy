# Lifeolozy (GitHub + Cloudflare Workers, D1 + R2)

## File map: kon file-e ki edit korben
| File | Ki ache |
|---|---|
| src/worker.js | Homepage, section page, article page, SEO, sitemap, API (layout/text/section naam ekhane) |
| src/style.css | Sob color, design, mobile layout (theme color: `--p`, `--p2`, button: `--ac` ekdom upore) |
| src/admin.html | Admin panel (/admin) |
| wrangler.jsonc | Cloudflare config (D1 ID ekhane) |
| schema.sql | Database table (shudhu ekbar run korte hoy) |

## Setup
1. GitHub repo-te sob file upload (`src` folder shoho). Ager `public` folder thakle delete korun, ar lagbe na.
2. Cloudflare D1: `lifeolozy-db` banan, Console-e schema.sql run korun, Database ID `wrangler.jsonc`-e boshan.
3. R2 bucket `lifeolozy-images` banan.
4. Workers & Pages > Import repository, Worker name `lifeolozy`, deploy command `npx wrangler deploy`.
5. Settings > Variables and Secrets > Secret `ADMIN_PASSWORD` add kore redeploy.
6. `https://YOUR-SITE/admin` e login.

## Kivabe edit/update korben
1. GitHub-e file-e click > pencil (Edit) icon > change > Commit changes.
2. Cloudflare auto deploy kore, 1-2 minute por site-e dekha jabe (Ctrl+Shift+R).
3. Color change: `src/style.css` er prothom 2 line-e `--p` (main deep green), `--p2` (aro dark), `--ac` (Buy Now orange).
4. Section-er nam/icon change: `src/worker.js` er shurur `const S=[...]` list.
5. Content, product, ads: Admin panel theke (code edit lagbe na).
