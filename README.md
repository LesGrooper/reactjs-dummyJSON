# ⚡ MyApp — React Dashboard

Mini project React JS modern dengan fitur **Auth**, **Product CRUD**, **Dark Mode**, dan **Protected Routes**.

---

## 🧰 Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router DOM v7 |
| State Management | Zustand (dengan persist middleware) |
| HTTP Client | Axios (dengan interceptors) |
| Notifications | react-hot-toast |
| Styling | CSS Modules |
| API | [DummyJSON](https://dummyjson.com) |

---

## 📋 Prasyarat

Pastikan sudah terinstall:

- **Node.js** versi 18 ke atas → [Download](https://nodejs.org)
- **npm** (sudah include bersama Node.js)

Cek versi:

```bash
node -v
npm -v
```

---

## 🚀 Cara Menjalankan (Development)

### 1. Clone / masuk ke folder project

```bash
cd c:\laragon\www\asdf123
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file environment

Buat file `.env` di root project (sudah tersedia), isinya:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

> Jika ingin ganti base URL API, ubah nilai `VITE_API_BASE_URL` di file `.env`.

### 4. Jalankan dev server

```bash
npm run dev
```

Buka browser di **http://localhost:5173**

> Jika port 5173 sudah dipakai, Vite otomatis pakai port berikutnya (misal 5174).

---

## 🔐 Login

Gunakan kredensial berikut:

| Field | Value |
|---|---|
| Username | `emilys` |
| Password | `emilyspass` |

Setelah login, token & data user tersimpan otomatis di **localStorage** melalui Zustand persist.

---

## 📦 Cara Build untuk Production

```bash
npm run build
```

Output tersimpan di folder `dist/`.

### Preview hasil build secara lokal

```bash
npm run preview
```

Buka browser di **http://localhost:4173**

---

## 📁 Struktur Folder

```
src/
├── api/                  # Axios instance + interceptors
├── components/
│   ├── common/           # Button, Input, Modal, Loader, dll.
│   ├── layout/           # Navbar, Sidebar
│   └── product/          # ProductForm (shared Add/Edit)
├── hooks/                # useAuth, useProducts, useDarkMode
├── layouts/              # DashboardLayout
├── pages/
│   ├── LoginPage.jsx
│   ├── HomePage.jsx
│   └── products/         # List, Detail, Add, Edit
├── routes/               # AppRoutes, ProtectedRoute, PublicRoute
├── services/             # authService, productService
├── store/                # authStore, productStore (Zustand)
├── styles/               # globals.css (CSS variables + dark mode)
└── utils/                # constants.js, helpers.js
```

---

## 🗺️ Daftar Route

| Route | Deskripsi | Akses |
|---|---|---|
| `/login` | Halaman login | Public (redirect ke `/` jika sudah login) |
| `/` | Home / dashboard | Protected |
| `/products` | List semua produk | Protected |
| `/products/add` | Tambah produk baru | Protected |
| `/products/:id` | Detail produk | Protected |
| `/products/edit/:id` | Edit produk | Protected |

---

## ✨ Fitur Utama

- **Login** dengan validasi form, show/hide password, loading state & error handling
- **Protected Route** — halaman dashboard tidak bisa diakses tanpa login
- **Product CRUD** — List, Detail, Add, Edit, Delete
- **Search** dengan debounce 400ms
- **Pagination** sederhana
- **Loading skeleton** di tabel produk
- **Confirm modal** sebelum delete
- **Toast notification** untuk setiap aksi (success / error)
- **Sidebar collapsible** — klik tombol ☰ di navbar
- **Dark mode** — klik tombol 🌙 di navbar, tersimpan di localStorage
- **Lazy loading** — setiap halaman di-load on-demand (code splitting)
- **Axios interceptors** — auto-attach token + normalisasi error response
- **Zustand persist** — auth state bertahan setelah refresh halaman

---

## 🛠️ Scripts

| Command | Fungsi |
|---|---|
| `npm run dev` | Jalankan dev server dengan HMR |
| `npm run build` | Build untuk production ke folder `dist/` |
| `npm run preview` | Preview hasil build secara lokal |
| `npm run lint` | Jalankan ESLint |

---

## ⚙️ Environment Variables

| Variable | Default | Keterangan |
|---|---|---|
| `VITE_API_BASE_URL` | `https://dummyjson.com` | Base URL untuk semua API call |

> Semua env variable di Vite **harus** diawali dengan `VITE_` agar bisa diakses di client-side.

