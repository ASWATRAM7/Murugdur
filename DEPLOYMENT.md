# 🚀 Deploying Murgdur to Vercel

## Prerequisites
- Git installed on your computer
- GitHub account
- Vercel account (sign up at vercel.com)

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
git init
git add .
git commit -m "Initial commit - Murgdur Luxury Fashion Website"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `murgdur-luxury` (or any name you prefer)
3. **Do NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

### Step 3: Push to GitHub

Copy the commands from GitHub and run them:

```bash
git remote add origin https://github.com/YOUR-USERNAME/murgdur-luxury.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 4: Deploy to Vercel

**Option A: Using Vercel Website (Recommended)**

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In" (you can use your GitHub account)
3. Click "Add New Project"
4. Click "Import Git Repository"
5. Select your `murgdur-luxury` repository
6. Vercel will auto-detect it's a Create React App
7. Configure settings:
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `build` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)
8. Click "Deploy"
9. Wait 2-3 minutes for deployment to complete
10. Your website will be live at: `https://murgdur-luxury.vercel.app`

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? murgdur-luxury
# - In which directory is your code located? ./
# - Want to override settings? N

# For production deployment
vercel --prod
```

---

## 🎯 Your Live URLs

After deployment, you'll get:

- **Preview URL:** `https://murgdur-luxury-xxx.vercel.app` (auto-generated)
- **Production URL:** `https://murgdur-luxury.vercel.app`

You can also add a custom domain later!

---

## 🔄 Future Updates

Whenever you make changes:

```bash
# Save your changes
git add .
git commit -m "Updated product images"
git push

# Vercel will automatically redeploy!
```

---

## ✅ Deployment Checklist

- [x] vercel.json configuration created
- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Website deployed
- [ ] Live URL tested

---

## 🛠️ Troubleshooting

**Build Failed?**
- Check that all dependencies are installed: `npm install`
- Test build locally: `npm run build`
- Check for console errors

**Images Not Loading?**
- Ensure all images are in `/public/assets/` folder
- Image paths should start with `/assets/`
- Check file names don't have spaces

**Routing Issues?**
- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html`

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

## 🎉 Success!

Once deployed, share your link:
**https://murgdur-luxury.vercel.app**

Your luxury fashion website is now live! 🌟
