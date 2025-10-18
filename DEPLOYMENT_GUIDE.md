# 🚀 Reva App - Deployment Guide

This guide will walk you through deploying the Reva app to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have completed ALL items in this checklist:

### 1. Environment Setup

- [ ] Install dependencies:
  ```bash
  cd reva-app
  npm install
  ```

- [ ] Create `.env` file from template:
  ```bash
  cp .env.example .env
  ```

- [ ] Fill in your Supabase credentials in `.env`:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
  VITE_APP_URL=https://yourdomain.com  # Optional, for production
  ```

### 2. Supabase Configuration

- [ ] Create a Supabase project at https://app.supabase.com
- [ ] Run the database schema:
  ```bash
  # In Supabase SQL Editor, run:
  cat reva-app/supabase-schema.sql
  ```
- [ ] Configure authentication settings:
  - Enable email authentication
  - Set up email templates (optional)
  - Configure redirect URLs for your domain
- [ ] Configure CORS in Supabase:
  - Go to Settings → API
  - Add your production domain to allowed origins

### 3. Local Testing

- [ ] Test the app locally:
  ```bash
  npm run dev
  ```
- [ ] Test all critical flows:
  - [ ] User signup (marketer and promoter)
  - [ ] User login
  - [ ] Create campaign (marketer)
  - [ ] Generate tracking link (promoter)
  - [ ] Click tracking
  - [ ] Earnings calculation
- [ ] Build production bundle:
  ```bash
  npm run build
  ```
- [ ] Test production build locally:
  ```bash
  npm run preview
  ```

### 4. Code Review

- [ ] Review `BUG_REPORT.md` and ensure all critical issues are fixed
- [ ] Run linter:
  ```bash
  npm run lint
  ```
- [ ] Check for any remaining console.log statements
- [ ] Verify no sensitive data is committed to git

---

## 🌐 Deployment Options

Choose one of the following deployment platforms:

### Option 1: Vercel (Recommended)

Vercel is optimized for Vite/React apps and offers free hosting with great performance.

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from the reva-app directory:**
   ```bash
   cd reva-app
   vercel
   ```

4. **Set environment variables in Vercel:**
   - Go to your project settings on vercel.com
   - Navigate to "Environment Variables"
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_APP_URL` (set to your Vercel domain)

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

#### Configuration File:

Create `vercel.json` in `reva-app/`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize:**
   ```bash
   cd reva-app
   netlify init
   ```

4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Set environment variables:**
   ```bash
   netlify env:set VITE_SUPABASE_URL "your-url"
   netlify env:set VITE_SUPABASE_ANON_KEY "your-key"
   netlify env:set VITE_APP_URL "https://your-site.netlify.app"
   ```

6. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

#### Configuration File:

Create `netlify.toml` in `reva-app/`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)

For a VPS, you'll need to set up a web server (nginx/Apache) to serve the static files.

#### Steps:

1. **Build the app:**
   ```bash
   cd reva-app
   npm run build
   ```

2. **Upload `dist` folder to your VPS**

3. **Configure nginx:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/reva-app/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
   }
   ```

4. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔒 Security Checklist

Before going live, ensure:

- [ ] `.env` is in `.gitignore` and NOT committed to git
- [ ] All environment variables are set in your deployment platform
- [ ] Supabase Row Level Security (RLS) policies are enabled
- [ ] HTTPS is enabled (SSL certificate)
- [ ] CORS is properly configured in Supabase
- [ ] Supabase API keys are the ANON key (not service role key)
- [ ] Rate limiting is considered (via Supabase or CDN)

---

## 📊 Post-Deployment Checklist

After deployment:

### 1. Monitoring

- [ ] Set up error tracking (recommended: Sentry)
  ```bash
  npm install @sentry/react @sentry/vite-plugin
  ```

- [ ] Set up analytics (optional: Google Analytics, Plausible)

- [ ] Monitor Supabase usage in dashboard

### 2. Testing Production

Test all flows in production:

- [ ] Signup/Login
- [ ] Campaign creation
- [ ] Tracking link generation
- [ ] Click tracking and redirection
- [ ] Earnings calculation
- [ ] Dashboard statistics

### 3. Performance

- [ ] Check Lighthouse score
- [ ] Test loading times
- [ ] Verify images are optimized
- [ ] Check mobile responsiveness

### 4. Backups

- [ ] Set up automated database backups in Supabase
- [ ] Document backup restoration procedure

---

## 🔧 Common Issues & Solutions

### Issue: "Missing environment variables" error

**Solution:** Make sure all environment variables are set in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- VPS: Set in `.env` file or system environment

### Issue: 404 on page refresh

**Solution:** Configure redirects/rewrites to serve `index.html` for all routes:
- Vercel: Add to `vercel.json` (see above)
- Netlify: Add to `netlify.toml` (see above)
- nginx: Use `try_files` directive (see above)

### Issue: CORS errors

**Solution:** 
1. Check Supabase Settings → API → CORS configuration
2. Add your production domain to allowed origins
3. Make sure you're using the anon key, not the service role key

### Issue: Supabase connection fails

**Solution:**
1. Verify environment variables are correct
2. Check Supabase project is not paused (free tier)
3. Verify API keys haven't been rotated

---

## 📞 Support & Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **React Router Docs:** https://reactrouter.com/
- **Bug Report:** See `BUG_REPORT.md` in this repository

---

## 🔄 Updating the App

To deploy updates:

1. Make changes locally
2. Test thoroughly
3. Commit changes to git
4. Deploy:
   - **Vercel/Netlify:** Push to git (auto-deploys) or run deploy command
   - **VPS:** Build and upload new `dist` folder

---

## 📈 Scaling Considerations

As your app grows:

1. **Database:**
   - Monitor Supabase usage
   - Add indexes for slow queries
   - Consider upgrading Supabase plan

2. **CDN:**
   - Use a CDN for static assets
   - Vercel/Netlify include CDN by default

3. **Caching:**
   - Implement Redis for session management
   - Cache frequently accessed data

4. **Rate Limiting:**
   - Implement rate limiting for API endpoints
   - Use Supabase functions or middleware

---

## ✅ You're Ready!

Once you've completed all checklists above, your Reva app should be ready for production!

**Remember to:**
- Keep your dependencies updated
- Monitor error logs regularly
- Back up your database
- Keep your environment variables secure

Good luck with your deployment! 🎉
