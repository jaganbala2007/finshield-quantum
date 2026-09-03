# 🌐 FinShield Quantum – 24/7 Online Cloud Deployment Guide

This guide provides step-by-step instructions to deploy FinShield Quantum **online 24/7 for free** using **Vercel** (Frontend) and **Render.com** (Backend API), or using **Docker**.

---

## 1. Push Code to GitHub

Open terminal in the project root `c:\Users\jagan\Desktop\new project\project - g` and run:

```bash
# 1. Create a new empty repository on GitHub (e.g. finshield-quantum)

# 2. Add your GitHub remote repository URL
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/finshield-quantum.git

# 3. Rename default branch to main and push
git branch -M main
git push -u origin main
```

---

## 2. Deploy FastAPI Backend 24/7 (Render.com)

1. Sign in to [Render.com](https://render.com) using your GitHub account.
2. Click **New +** $\rightarrow$ Select **Web Service**.
3. Connect your `finshield-quantum` GitHub repository.
4. Configure service settings:
   - **Name**: `finshield-quantum-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**.
6. Render will generate a live 24/7 HTTPS URL (e.g. `https://finshield-quantum-api.onrender.com`).

---

## 3. Deploy Next.js Frontend 24/7 (Vercel)

1. Sign in to [Vercel.com](https://vercel.com) using your GitHub account.
2. Click **Add New...** $\rightarrow$ Select **Project**.
3. Import your `finshield-quantum` repository.
4. Configure project settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - Key: `NEXT_PUBLIC_API_BASE_URL`
     - Value: `https://finshield-quantum-api.onrender.com` (Your Render backend URL)
5. Click **Deploy**.
6. Vercel will build and host your frontend live 24/7 (e.g. `https://finshield-quantum.vercel.app`).

---

## 4. Alternative: 1-Command Docker Deployment

If deploying to a Cloud VM (DigitalOcean, AWS EC2, GCP Compute Engine):

```bash
# Clone repository
git clone https://github.com/YOUR_GITHUB_USERNAME/finshield-quantum.git
cd finshield-quantum

# Start backend & frontend containers 24/7
docker-compose up -d --build
```

---

## 🔒 Post-Deployment Checklist

- ✅ Frontend live on Vercel (`https://finshield-quantum.vercel.app`)
- ✅ Backend live on Render (`https://finshield-quantum-api.onrender.com`)
- ✅ CORS configured to accept request headers from Vercel domain
- ✅ `DEMO MODE` and `JUDGE MODE` functional on live domain
