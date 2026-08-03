# SMS - Sistem Manajemen Santri (PWA)

Aplikasi Progressive Web App (PWA) untuk manajemen santri/instansi pendidikan.

## 📱 Cara Hosting di GitHub Pages

### Langkah 1: Buat Repository Baru
1. Login ke [GitHub](https://github.com)
2. Klik **New repository** (+ icon di pojok kanan atas)
3. Nama repository: `sms-pwa` (atau nama lain sesuai keinginan)
4. Pilih **Public**
5. Klik **Create repository**

### Langkah 2: Upload File
1. Ekstrak file ZIP ini
2. Di halaman repository GitHub, klik **uploading an existing file**
3. Drag & drop SEMUA file dari folder yang sudah diekstrak
4. Pastikan `index.html` berada di root folder (tidak di dalam subfolder)
5. Klik **Commit changes**

### Langkah 3: Aktifkan GitHub Pages
1. Buka repository Anda → klik tab **Settings**
2. Di menu kiri, scroll ke **Pages**
3. Pada bagian **Source**, pilih **Deploy from a branch**
4. Pilih branch **main** → folder **/(root)**
5. Klik **Save**
6. Tunggu 1-2 menit, lalu refresh halaman Settings → Pages
7. URL aplikasi Anda akan muncul, contoh:
   ```
   https://USERNAME.github.io/sms-pwa/
   ```

### Langkah 4: Install sebagai PWA
- **Android (Chrome):** Buka URL → menu ⋮ → **Install app** / **Add to Home screen**
- **iOS (Safari):** Buka URL → tombol Share → **Add to Home Screen**
- **Desktop (Chrome):** Buka URL → klik icon Install di address bar

## 📁 Struktur File

```
sms-pwa/
├── index.html              # File utama aplikasi
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (offline support)
├── .nojekyll               # Mencegah Jekyll processing di GitHub Pages
├── README.md               # Dokumentasi ini
├── icon-16.png             # Icon 16x16
├── icon-32.png             # Icon 32x32 (favicon)
├── favicon-32.png          # Favicon 32x32
├── favicon-16.png          # Favicon 16x16
├── icon-48.png             # Icon 48x48
├── icon-72.png             # Icon 72x72
├── icon-96.png             # Icon 96x96
├── icon-120.png            # Icon 120x120 (iPhone)
├── icon-152.png            # Icon 152x152 (iPad)
├── icon-167.png            # Icon 167x167 (iPad Pro)
├── icon-180.png            # Icon 180x180 (Apple Touch)
├── icon-192.png            # Icon 192x192 (Android)
├── icon-512.png            # Icon 512x512 (PWA standard)
└── icon-maskable-512.png   # Maskable icon 512x512
```

## 🔐 Default Login

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Super Admin |
| tu | tu123 | Admin TU |
| ustadz | ustadz123 | Guru/Ustadz |
| keuangan | keuangan123 | Kasir Keuangan |

## ✨ Fitur PWA

- ✅ Installable di Android, iOS, dan Desktop
- ✅ Berjalan offline (Service Worker caching)
- ✅ Icon aplikasi di Home Screen
- ✅ Fullscreen mode (standalone display)
- ✅ Splash screen otomatis
- ✅ Tema warna hijau (#04432A)
