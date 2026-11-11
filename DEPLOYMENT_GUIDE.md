# DARBAAR — Production Deployment Guide (Vercel & Cloud)

This guide provides step-by-step instructions to deploy **Project DARBAAR** to **Vercel** with global CDN edge routing, MongoDB Atlas database connectivity, Cloudinary media vault, and Gmail SMTP notifications.

---

## Architecture Overview

* **Frontend**: Next.js 16 (App Router, Turbopack, Tailwind CSS, TypeScript).
* **Backend**: Express API with Vercel Serverless Function support (`backend/api/index.ts` & `backend/vercel.json`).
* **Database**: MongoDB Atlas Cluster (Connected: `darbaar`).
* **Media Assets**: Cloudinary Media Vault (`ebnwmsqd`).
* **Email Corridor**: Gmail SMTP with Google App Password (`darbaar3001@gmail.com`).

---

## Step 1: Push Code to GitHub

1. Create a new repository on [GitHub](https://github.com/new), named **`Project_Darbaar`**.
2. Open your terminal in this directory (`/Users/satyamkumar/Project_Darbaar`) and run:

```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/Project_Darbaar.git
git branch -M main
git push -u origin main
```

*(Replace `<YOUR_GITHUB_USERNAME>` with your actual GitHub username).*

---

## Step 2: Deploy Frontend on Vercel

1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your **`Project_Darbaar`** repository and click **Import**.
4. Configure the deployment settings:
   * **Project Name**: `darbaar`
   * **Framework Preset**: `Next.js`
   * **Root Directory**: Click *Edit* and select **`frontend`**.
5. Add the following **Environment Variable**:
   * `NEXT_PUBLIC_API_URL` = `https://<YOUR_BACKEND_URL>/api` *(or your deployed backend domain)*
6. Click **Deploy**. Vercel will build and assign you a live HTTPS domain (e.g. `https://darbaar.vercel.app`).

---

## Step 3: Deploy Backend API on Vercel

1. On your Vercel Dashboard, click **"Add New..."** → **"Project"** again.
2. Select the same **`Project_Darbaar`** repository and click **Import**.
3. Configure settings:
   * **Project Name**: `darbaar-api`
   * **Framework Preset**: `Other`
   * **Root Directory**: Click *Edit* and select **`backend`**.
4. In **Environment Variables**, add the following credentials:

| Key | Value |
|---|---|
| `PORT` | `5001` |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://darbaar.vercel.app` *(your frontend URL)* |
| `MONGODB_URI` | `mongodb://ssingh48619_db_user:LmnePvuftJGqa10T@ac-bvflyvr-shard-00-00.0ix10w9.mongodb.net:27017,ac-bvflyvr-shard-00-01.0ix10w9.mongodb.net:27017,ac-bvflyvr-shard-00-02.0ix10w9.mongodb.net:27017/darbaar?ssl=true&replicaSet=atlas-t6pgaj-shard-0&authSource=admin&compressors=zlib` |
| `CLOUDINARY_CLOUD_NAME` | `ebnwmsqd` |
| `CLOUDINARY_API_KEY` | `237643546843144` |
| `CLOUDINARY_API_SECRET` | `VTJt4mWFQEY5jFUcGYWJ2ngF9Ys` |
| `JWT_SECRET` | `adcd99d9a50033e902578d58ae4b5b9e8b0528142c06b6dcce052a775725aef808e94390162ae414a91ef6204592741a5091e42626670e3750b37dfbaa92a24c` |
| `COOKIE_SECRET` | `018ca5c4f830407f85085a892826e3b0ad5f510bffacfca6af56224077326950459420fa687123ec1470e8f2fc61f742ee65f649a12aeb165a1a19993b3190cf` |
| `DIRECTORATE_EMAIL` | `darbaar3001@gmail.com` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `darbaar3001@gmail.com` |
| `SMTP_PASS` | `ckiymdavkphaanhw` |

5. Click **Deploy**. Vercel will deploy the serverless API (e.g. `https://darbaar-api.vercel.app`).

---

## Step 4: Link Frontend to Backend

In your frontend project on Vercel:
1. Go to **Settings** → **Environment Variables**.
2. Set `NEXT_PUBLIC_API_URL` to `https://darbaar-api.vercel.app/api`.
3. Click **Redeploy** on the latest deployment.

---

## Step 5: Verification Checklist

Once live:
* [ ] Visit `https://darbaar.vercel.app/` — verify catalogue, currency toggle (`INR ₹`), and high-res imagery.
* [ ] Visit `https://darbaar.vercel.app/login` — sign in with Superadmin `darbaar3001@gmail.com` / `1234@Darbaar`.
* [ ] Visit `https://darbaar.vercel.app/admin` — verify the live AUM valuation and Curatorial Registry.
* [ ] Submit a test inquiry on any specimen — verify the alert email lands in `darbaar3001@gmail.com`.

