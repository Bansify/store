# 🥝 KIWI STORE — Domain, D1 & SSO Configuration Reference

This document summarizes the production domain mapping, Cloudflare D1 binding, Worker routes, and brand configuration for **Kiwi Store**.

---

## 1. Production Subdomains (`*.bansify.com`)

| Surface | Production URL | Worker API Route |
|---|---|---|
| **Store** | `https://store.bansify.com` | `store.bansify.com/api/*` |
| **Developer Console** | `https://storeconsole.bansify.com` | `storeconsole.bansify.com/api/*` |
| **Admin Panel** | `https://storeadmin.bansify.com` | `storeadmin.bansify.com/api/*` |
| **Store App Landing** | `https://store.bansify.com` | `store.bansify.com/api/*` |

All four subdomains are single-level subdomains covered by Cloudflare Universal SSL (`*.bansify.com`) and share `.bansify.com` HttpOnly SSO cookies.

---

## 2. Cloudflare D1 & Worker Routes (`worker/wrangler.toml`)

```toml
name = "kiwi-store-api"
main = "src/index.ts"
compatibility_date = "2025-02-01"
keep_vars = true

routes = [
  { pattern = "store.bansify.com/api/*", zone_name = "bansify.com" },
  { pattern = "storeconsole.bansify.com/api/*", zone_name = "bansify.com" },
  { pattern = "storeadmin.bansify.com/api/*", zone_name = "bansify.com" },
  { pattern = "store.bansify.com/api/*", zone_name = "bansify.com" }
]

[[d1_databases]]
binding = "DB"
database_name = "store"
database_id = "a3dc3e71-cf89-4e0a-89d1-693fcf6f227a"
```

---

## 3. Environment Variables & Secrets

- `keep_vars = true` is enabled in `worker/wrangler.toml` so Cloudflare Dashboard variables are preserved across deployments.
- Optional Worker secret for APK uploads to `Bansify/storefiles`:
  ```bash
  cd worker
  npx wrangler secret put GITHUB_TOKEN
  ```
  (`GITHUB_FILES_TOKEN` is also supported as an alias.)
- Legacy `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `IMGBB_API_KEY` are completely removed.

---

## 4. Customizing Brand or Domain Names Without Code Changes

All defaults live in **`shared/brand.ts`** and are consumed by the browser (`src/lib/config.ts`), Vite build (`vite.config.ts`), and Worker (`worker/src/index.ts`):

| Setting | Pages Environment Variable | Worker Variable (`wrangler.toml`) |
|---|---|---|
| Store brand name | `VITE_APP_NAME=My Store` | `APP_NAME=My Store` |
| Short brand name | `VITE_APP_SHORT_NAME=My` | `APP_SHORT_NAME=My` |
| Root domain | `VITE_APP_DOMAIN=example.com` | `APP_DOMAIN=example.com` |
| Subdomain prefixes | `VITE_STORE_HOST`, `VITE_CONSOLE_HOST`, `VITE_ADMIN_HOST`, `VITE_STOREAPP_HOST` | `STORE_HOST`, `CONSOLE_HOST`, `ADMIN_HOST`, `STOREAPP_HOST` |
| Accounts URLs | `VITE_ACCOUNTS_API_URL`, `VITE_ACCOUNTS_SIGNIN_URL` | `AUTH_HUB_URL`, `AUTH_SIGNIN_URL` |
