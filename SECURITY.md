## Security Notes

This portfolio is now hardened on the client side (CSP, safer links, URL sanitization), but full pentest protection depends on hosting/server configuration.

### What this frontend already does
- Uses a restrictive Content Security Policy in `main.html`.
- Sanitizes project URLs in `script.js` to block `javascript:` and invalid schemes.
- Uses safe link attributes (`rel="noopener noreferrer"` for external links).
- Avoids inline JS/CSS and avoids unsafe HTML insertion APIs.

### What must be enforced on hosting
- Add HTTP security headers at the server/CDN level.
- Restrict HTTP methods to `GET` and `HEAD` for static hosting.
- Enable rate limiting and connection limiting.
- Hide server version banners.
- Block access to hidden files and sensitive paths.
- Put the site behind a firewall/WAF (Cloudflare, AWS WAF, Azure WAF, etc.).

Use `vercel.json` if you deploy on Vercel, or `nginx-security.conf` as a baseline for Nginx.

### Important limitation
`nmap` scans network ports/services. That cannot be blocked by frontend code alone.
Protection comes from firewall rules, closed ports, and secure server configuration.
