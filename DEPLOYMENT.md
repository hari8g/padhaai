# Deployment Guide for Vercel

This guide will help you deploy the Padhaai website to Vercel.

## ✅ Pre-Deployment Checklist

Before deploying, make sure:
- ✅ Build passes locally (`npm run build`)
- ✅ All dependencies are installed (`npm install`)
- ✅ No TypeScript errors
- ✅ All images are in `/public` folder
- ✅ Content files are in `/content` folder

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (free at https://vercel.com)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to Git Repository

First, make sure your code is in a Git repository:

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit"

# Create a repository on GitHub/GitLab/Bitbucket, then:
git remote add origin <your-repository-url>
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Project Settings

Vercel should auto-detect:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Environment Variables (if needed)

If you have any environment variables, add them in:
- Settings → Environment Variables

For this project, no environment variables are currently required.

### Step 5: Deploy

Click **"Deploy"** and wait for the build to complete!

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Post-Deployment Checklist

### ✅ Verify Build

Make sure the build completes successfully:
- Check the build logs for any errors
- Verify all pages are accessible

### ✅ Check Images

Ensure all images load correctly:
- Local images in `/public` folder should work automatically
- External images from `padhaai.org.in` should work (already configured in `next.config.js`)

### ✅ Test Routes

Verify these pages work:
- `/` - Homepage
- `/about` - About Us
- `/about/founder` - Founder page
- `/participate` - Participate
- `/gallery` - Gallery
- `/blog` - Blog
- `/contact` - Contact Us
- `/donate` - Donate page
- `/news/[slug]` - Initiative pages

### ✅ Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Important Notes

1. **Image Optimization**: Next.js Image component is configured for:
   - Local images in `/public` folder
   - External images from `padhaai.org.in`

2. **Build Settings**: The project uses:
   - Node.js (Vercel auto-detects version)
   - npm (from package.json)

3. **File Size**: Make sure large files are in `.gitignore`:
   - `node_modules/`
   - `.next/`
   - `.env*.local`

4. **Content Files**: All content files in `/content` and `/public` folders will be included in deployment.

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript errors are resolved

### Images Not Loading

1. Check `next.config.js` has correct image domains
2. Verify image paths are correct
3. Check browser console for errors

### Environment Variables

If you add environment variables later:
- Add them in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

**Your site will be live at**: `https://your-project-name.vercel.app`

