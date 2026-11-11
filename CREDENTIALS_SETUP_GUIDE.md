# DARBAAR — Credentials & Integrations Setup Guide

This guide explains how each of the three core services (**MongoDB**, **Cloudinary**, and **JWT Authentication**) are configured in DARBAAR.

---

## 1. MONGODB ATLAS (Cloud Database)

### Where to Obtain Credentials:
1. Navigate to [cloud.mongodb.com](https://cloud.mongodb.com) and create or log in to your account.
2. Under **Deployments**, click **Create** and select the **M0 (Free)** shared cluster.
3. Choose your closest region (e.g. Mumbai / AWS) and click **Create Deployment**.
4. **Security Quickstart**:
   - **Database User**: Create a username (e.g., `darbaarAdmin`) and a secure password.
   - **Network Access**: Under *Where would you like to connect from?*, select **Allow Access from Anywhere** (`0.0.0.0/0`) so your development server is not blocked.
5. Click **Connect** -> Choose **Drivers** (Node.js).
6. Copy the connection string:
   ```text
   mongodb+srv://darbaarAdmin:<password>@cluster0.xxxxx.mongodb.net/darbaar?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your database user password.

### Where to Place in DARBAAR:
Open `backend/.env` and update the line:
```env
MONGODB_URI=mongodb+srv://darbaarAdmin:YourPassword@cluster0.xxxxx.mongodb.net/darbaar?retryWrites=true&w=majority
```

### Verification Command:
```bash
cd backend && npm run seed
```

---

## 2. CLOUDINARY (Artwork Image Storage Vault)

### Where to Obtain Credentials:
1. Navigate to [cloudinary.com](https://cloudinary.com) and sign up for a free account.
2. Log in to your Cloudinary Dashboard: [console.cloudinary.com](https://console.cloudinary.com).
3. On the main Dashboard page under **Product Environment Credentials**, you will find:
   - **Cloud Name** (e.g., `darbaar-vault`)
   - **API Key** (e.g., `781294829182391`)
   - **API Secret** (Click the copy icon to reveal)

### Where to Place in DARBAAR:
Open `backend/.env` and paste:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Architecture & Security:
- **Never Exposed to Frontend**: `CLOUDINARY_API_SECRET` remains strictly in `backend/.env`.
- **Upload Endpoint**: `POST /api/upload/image` (Requires authentication, uses Multer in-memory streaming, limits to 10MB, strictly validates `image/jpeg`, `image/png`, `image/webp`).
- **Deletion Endpoint**: `DELETE /api/upload/image/:publicId` (Restricted to Admins, Curators, and Dealers).

---

## 3. JWT & CRYPTOGRAPHIC SECURITY

### How It Was Generated:
A 64-byte (128-hex character) cryptographic secret was generated locally using Node.js `crypto.randomBytes(64)`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Current Status:
Already generated and securely stored in `backend/.env`:
```env
JWT_SECRET=adcd99d9a50033e902578d58ae4b5b9e8b0528142c06b6dcce052a775725aef808e94390162ae414a91ef6204592741a5091e42626670e3750b37dfbaa92a24c
JWT_EXPIRES_IN=7d
COOKIE_SECRET=018ca5c4f830407f85085a892826e3b0ad5f510bffacfca6af56224077326950459420fa687123ec1470e8f2fc61f742ee65f649a12aeb165a1a19993b3190cf
```

### Features:
- **Password Hashing**: Bcrypt with 10 salt rounds (`bcrypt.genSalt(10)`).
- **Dual Token Transmission**: Supports both `Authorization: Bearer <token>` and secure `HttpOnly` cookies (`darbaar_token`).
- **RBAC**: Protected corridors enforce role permissions (`client`, `dealer`, `advisor`, `admin`).

---

## 4. SYSTEM DIAGNOSTIC COMMAND

To verify your configuration at any time, run:
```bash
cd backend && npm run test:credentials
```

