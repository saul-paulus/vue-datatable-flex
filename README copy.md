# 🏧 Aplikasi Monitoring Kaset (SIMOKA)

**SIMOKA (Sistem Monitoring Kaset)** adalah aplikasi berbasis web yang digunakan untuk **memantau kondisi dan perbaikan kaset ATM di seluruh cabang**.  
Aplikasi ini membantu tim operasional CHM maupun manajer cabang untuk melacak status kaset, mencatat histori perawatan, serta memastikan ketersediaan kaset yang layak pakai di setiap mesin ATM.

![alt text](image.png)

---

## 🚀 Teknologi yang Digunakan

- ⚙️ **Backend:** Laravel (API)
- 💻 **Frontend:** Vue.js
- 🗄️ **Database:** MySQL
- 📦 **Package Manager:** Composer & NPM
- 🌐 **Server Requirements:** PHP 8.1+, Node.js 18+, MySQL 5.7+, NginX

---

## ✨ Fitur Utama

- 🔍 **Monitoring Real-time:** Melihat jumlah dan status kaset berdasarkan cabang, tipe mesin, dan kondisi (Good/Bad).
- 🧾 **Manajemen Kaset:** Input, update, dan tracking kondisi kaset ATM dan CRM.
- 🛠️ **Perawatan Kaset:** Mencatat aktivitas perbaikan, penggantian, dan validasi kondisi.
- 📊 **Dashboard Interaktif:** Visualisasi data per cabang dan per vendor mesin (Hyosung, Wincor, NCR).
- 👥 **Manajemen Pengguna:** Role-based access (Admin, Cabang, Teknisi).
- 📤 **Import/Export Data:** Mendukung impor file Excel dan ekspor laporan.
- 🔐 **Autentikasi Aman:** Menggunakan Laravel Sanctum untuk token-based authentication.

---

## 📂 Dokumentasi Modul

Proyek ini terbagi menjadi dua bagian utama:

1.  [**Backend (Laravel API)**](file:///srv/http/kaset-app-V1/back-end/README.md) - Berisi logika bisnis, database, dan API.
2.  [**Frontend (Vue.js)**](file:///srv/http/kaset-app-V1/front-end/README.md) - Berisi antarmuka pengguna dan interaksi dashboard.

---

## 🚀 Persiapan Cepat (Quick Start)

Jika Anda ingin menjalankan seluruh aplikasi secara lokal:

### 1. Jalankan Backend
```bash
cd back-end
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 2. Jalankan Frontend
```bash
cd front-end
npm install
npm run dev
```

---

## 🧩 Struktur Proyek

```bash
simoka/
├── back-end/             # Dokumentasi: [Lihat README.md](back-end/README.md)
├── front-end/            # Dokumentasi: [Lihat README.md](front-end/README.md)
└── README.md
```

## 📄 License

This project is open-source software licensed under the MIT License.
See [LICENSE](LICENSE)
