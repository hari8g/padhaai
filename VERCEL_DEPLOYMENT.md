# Deploy to Vercel - Step by Step Guide

Your code is now on GitHub at: https://github.com/hari8g/padhaai.git

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel
Visit [vercel.com](https://vercel.com) and sign up/login with your GitHub account.

### Step 2: Import Your Repository
1. Click **"Add New Project"** (or **"Import Project"**)
2. You'll see your GitHub repositories listed
3. Find and click on **"padhaai"** repository
4. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect these settings:
- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**You can leave everything as default!** Just click **"Deploy"**.

### Step 4: Wait for Deployment
- Vercel will install dependencies
- Build your Next.js application
- Deploy it to production
- This takes about 2-3 minutes

### Step 5: Your Site is Live! 🎉
After deployment completes, you'll get:
- A live URL like: `https://padhaai.vercel.app`
- Preview deployments for every push to GitHub
- Automatic HTTPS/SSL certificate

## 📝 Optional: Custom Domain

If you want to use your own domain (like `paadhai.org.in`):

1. Go to **Project Settings** → **Domains**
2. Add your domain name
3. Follow Vercel's DNS configuration instructions
4. Update your DNS records as instructed

## ✅ What Happens Next

- **Automatic Deployments**: Every time you push to `main` branch, Vercel will automatically redeploy
- **Preview Deployments**: Every pull request gets its own preview URL
- **Environment Variables**: Add any needed in Settings → Environment Variables

## 🔧 Troubleshooting

If deployment fails:
1. Check the build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version (Vercel auto-detects, usually fine)

## 📊 Monitoring

After deployment, you can:
- View analytics in Vercel dashboard
- See deployment history
- Check performance metrics
- View error logs

---

**Need help?** Vercel has excellent documentation: https://vercel.com/docs

Your repository: https://github.com/hari8g/padhaai.git

