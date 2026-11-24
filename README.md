# Lifeolozy – Setup (GitHub + Cloudflare Workers, D1 + R2)

1. **GitHub**: new repo, upload ALL files from this zip (keep folders: src, public, wrangler.jsonc, schema.sql).
2. **D1 database**: Cloudflare dashboard > Storage & Databases > D1 > Create `lifeolozy-db`.
   Open it > Console > paste the content of `schema.sql` > Execute.
   Copy the Database ID, paste into `wrangler.jsonc` (`PASTE_YOUR_D1_ID_HERE`), commit to GitHub.
3. **R2 bucket**: Storage > R2 > Create bucket named `lifeolozy-images` (for image uploads).
4. **Deploy**: Workers & Pages > Create > Import a repository (GitHub) > select repo. Worker name must be `lifeolozy`
   (same as in wrangler.jsonc). Build command: leave empty. Deploy command: `npx wrangler deploy`.
5. **Admin password**: Worker > Settings > Variables and Secrets > Add > Type = **Secret**, name `ADMIN_PASSWORD`, your password. Then redeploy.
6. Open `https://YOUR-WORKER.workers.dev/admin`, login, add content and products (min 5 products per section for best look).
7. **Domain**: Worker > Settings > Domains & Routes > Add custom domain.
8. **SEO**: submit `https://yourdomain/sitemap.xml` in Google Search Console and Bing Webmaster.
9. **AdSense**: Admin > Google Ads > paste verification/auto-ads script in "Head code". Also put your ads.txt line in `public/ads.txt`.
