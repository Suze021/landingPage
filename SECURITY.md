## Security Notes

### What this index layer already does
- Uses a restrictive Content Security Policy in `index/index.html`.
- Sanitizes project URLs in `index/js/app.js` to block `javascript:` and invalid schemes.
- Uses safe link attributes (`rel="noopener noreferrer"` for external links).
- Avoids inline JS/CSS and avoids unsafe HTML insertion APIs.
- Serves localized portfolio data from server API (`/api/portfolio`) with language normalization.

### What must be enforced on hosting
- Add HTTP security headers at the server/CDN level.
- Restrict HTTP methods to `GET` and `HEAD` for static hosting.
- Enable rate limiting and connection limiting.
- Hide server version banners.
- Block access to hidden files and sensitive paths.
- Put the site behind a firewall/WAF (Cloudflare, AWS WAF, Azure WAF, etc.).

Use `vercel.json` if you deploy on Vercel, or `nginx-security.conf` as a baseline for Nginx.

### Important limitation
`nmap` scans network ports/services. That cannot be blocked by index code alone.
Protection comes from firewall rules, closed ports, and secure server configuration.

