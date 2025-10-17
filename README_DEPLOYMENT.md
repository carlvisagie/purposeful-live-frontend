# Purposeful Live Coaching - Frontend Deployment Guide

Complete guide for deploying the Purposeful Live Coaching frontend to production.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/carlvisagie/purposeful-live-frontend.git
cd purposeful-live-frontend

# Update API URL in all files
# Replace API_BASE_URL with your backend URL

# Deploy to Vercel
vercel --prod
```

## 📋 Project Structure

```
purposeful-live-frontend/
├── index.html              # Landing page
├── login.html              # Login/Register page
├── onboarding.html         # 5-step onboarding flow
├── client/
│   └── dashboard.html      # Client dashboard
├── coach/
│   └── dashboard.html      # Coach dashboard
├── admin/
│   └── dashboard.html      # Admin dashboard
├── legal/
│   ├── terms-of-service.html
│   └── privacy-policy.html
└── style.css               # Global styles
```

## 🔧 Configuration

### Update API Base URL

Before deploying, update the `API_BASE_URL` in all HTML files:

```javascript
// Change this:
const API_BASE_URL = 'http://localhost:5000/api';

// To your production URL:
const API_BASE_URL = 'https://api.your-domain.com/api';
```

**Files to update:**
- `login.html`
- `onboarding.html`
- `client/dashboard.html`
- `coach/dashboard.html`
- `admin/dashboard.html`

### Update Stripe Publishable Key

In `onboarding.html`, update the Stripe publishable key:

```javascript
const stripe = Stripe('pk_live_your_publishable_key');
```

## ☁️ Deployment Options

### Option 1: Vercel (Recommended)

**1. Install Vercel CLI**
```bash
npm install -g vercel
```

**2. Login**
```bash
vercel login
```

**3. Deploy**
```bash
vercel --prod
```

**4. Configure Custom Domain**
- Go to Vercel dashboard
- Settings → Domains
- Add your domain: `purposefullivecoaching.academy`
- Follow DNS configuration instructions

**5. Environment Variables (if needed)**
- Settings → Environment Variables
- Add any required variables

### Option 2: Netlify

**1. Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**2. Login**
```bash
netlify login
```

**3. Deploy**
```bash
netlify deploy --prod
```

**4. Configure Domain**
- Domain settings → Add custom domain
- Follow DNS instructions

### Option 3: Cloudflare Pages

**1. Create Cloudflare Account**
- Go to https://dash.cloudflare.com
- Add your domain

**2. Create Pages Project**
- Pages → Create a project
- Connect GitHub repository
- Build settings:
  - Build command: (leave empty)
  - Build output directory: `/`

**3. Deploy**
- Click "Save and Deploy"
- Configure custom domain

### Option 4: GitHub Pages

**1. Enable GitHub Pages**
- Repository Settings → Pages
- Source: Deploy from branch
- Branch: `main`, folder: `/root`

**2. Configure Custom Domain**
- Add CNAME file with your domain
- Configure DNS

**3. Access**
- Your site will be at: `https://username.github.io/repository-name`

### Option 5: AWS S3 + CloudFront

**1. Create S3 Bucket**
```bash
aws s3 mb s3://your-bucket-name
```

**2. Upload Files**
```bash
aws s3 sync . s3://your-bucket-name --exclude ".git/*"
```

**3. Configure Static Website Hosting**
```bash
aws s3 website s3://your-bucket-name --index-document index.html
```

**4. Create CloudFront Distribution**
- Origin: S3 bucket
- Enable HTTPS
- Configure custom domain

## 🌐 DNS Configuration

### For Vercel/Netlify
```
Type: A
Name: @
Value: (provided by hosting)

Type: CNAME
Name: www
Value: (provided by hosting)
```

### For Cloudflare
```
Type: CNAME
Name: @
Value: your-site.pages.dev
Proxied: Yes
```

## 🔒 SSL/HTTPS

All recommended hosting providers (Vercel, Netlify, Cloudflare) provide free SSL certificates automatically.

**Manual SSL (if using custom hosting):**
- Use Let's Encrypt: https://letsencrypt.org
- Or Cloudflare SSL

## 📱 Mobile Optimization

All pages are mobile-responsive. Test on:
- iOS Safari
- Android Chrome
- Various screen sizes

## 🎨 Customization

### Branding

**Update Logo:**
- Replace logo references in HTML files
- Update `style.css` with brand colors

**Color Scheme:**
```css
/* Primary color */
--primary-color: #4CAF50;

/* Secondary color */
--secondary-color: #2196F3;

/* Accent color */
--accent-color: #FF9800;
```

### Content

**Update Text:**
- Landing page copy in `index.html`
- Legal documents in `legal/` folder
- Email templates (in backend)

## 🧪 Testing

### Pre-Deployment Checklist

- [ ] All API URLs updated to production
- [ ] Stripe publishable key updated
- [ ] Legal documents reviewed
- [ ] Contact information updated
- [ ] All links working
- [ ] Forms submitting correctly
- [ ] Mobile responsive
- [ ] Cross-browser tested

### Test User Flows

1. **Registration Flow**
   - Visit landing page
   - Click "Get Started"
   - Complete registration
   - Verify email works

2. **Onboarding Flow**
   - Complete assessment
   - Select tier
   - Process payment
   - Schedule appointment

3. **Dashboard Access**
   - Login
   - View dashboard
   - Navigate sections
   - Test all features

## 📊 Analytics

### Google Analytics

Add to `<head>` of all pages:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel

Add to `<head>` of all pages:

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend CORS is configured correctly
- Check `FRONTEND_URL` in backend `.env`

### API Connection Failed
- Verify `API_BASE_URL` is correct
- Check backend is running
- Verify SSL certificates

### Payment Not Working
- Check Stripe publishable key
- Verify Stripe is in live mode
- Check browser console for errors

### Calendly Not Loading
- Verify Calendly embed URL
- Check Calendly account is active

## 📈 Performance Optimization

### Minification

**HTML/CSS/JS:**
```bash
# Install minifier
npm install -g html-minifier clean-css-cli uglify-js

# Minify
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
cleancss -o style.min.css style.css
```

### Image Optimization

- Use WebP format
- Compress images
- Use CDN for assets

### Caching

Add to hosting configuration:

```
Cache-Control: public, max-age=31536000
```

## 🔐 Security

### Content Security Policy

Add to `<head>`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://js.stripe.com https://assets.calendly.com;
  style-src 'self' 'unsafe-inline' https://assets.calendly.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.your-domain.com;
  frame-src https://js.stripe.com https://calendly.com;
">
```

### HTTPS Enforcement

All hosting providers enforce HTTPS automatically.

## 📱 PWA (Progressive Web App)

### Add Service Worker

Create `sw.js`:

```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/style.css',
        '/index.html'
      ]);
    })
  );
});
```

### Add Manifest

Create `manifest.json`:

```json
{
  "name": "Purposeful Live Coaching",
  "short_name": "Purposeful",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#4CAF50",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🆘 Support

- **Documentation**: This file
- **Issues**: https://github.com/carlvisagie/purposeful-live-frontend/issues
- **Email**: support@purposefullivecoaching.academy

## 📝 Maintenance

### Regular Updates

- Update dependencies monthly
- Review analytics weekly
- Test all flows monthly
- Update content as needed

### Backup

- Frontend is in Git (automatic backup)
- Export analytics data monthly
- Document all customizations

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready

