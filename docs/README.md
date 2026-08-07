# GetMenu handoff

GetMenu adalah layanan menu digital dari GetStore untuk restoran, kafe, kedai, dan usaha makanan lokal.

## Product definition

GetMenu punya dua paket yang sengaja dibedakan berdasarkan kebutuhan operasional:

| Paket | Harga awal | Cocok untuk | Isi |
| --- | ---: | --- | --- |
| Static Menu | Rp150.000 | Usaha yang menerima pembayaran di kasir | Menu tetap, cart statis, ringkasan pesanan untuk ditunjukkan ke kasir, dan QR code stylized untuk dicetak di setiap meja |
| Self Service | Rp300.000 | Usaha yang ingin menerima pesanan dan pembayaran online | Menu dengan database admin, perubahan menu, integrasi Midtrans, dan QR code stylized untuk dicetak di setiap meja |

Harga di halaman publik adalah harga awal. Detail domain, perubahan di luar scope, maintenance, dan biaya pihak ketiga perlu dikonfirmasi per proyek.

## Routes

- `/` — landing page GetMenu. Menjelaskan dua paket, harga, alur, dan link ke GetStore.
- `/demo` — demo publik Static Menu untuk Kedai Pagi. Tidak ada login, dashboard, API, atau pembayaran nyata. Pengunjung dapat filter menu, menambahkan item, mengubah jumlah, dan membuka ringkasan untuk ditunjukkan ke kasir.

Production domain yang direncanakan: `https://menu.getstore.my.id`.

## Technical notes

- Next.js App Router, React, TypeScript, dan Tailwind CSS v4.
- Font mengikuti GetStore: DM Sans untuk display dan Geist Mono untuk label teknis.
- Cart demo berada di `src/app/demo/demo-menu.tsx` sebagai Client Component. Data menu masih hard-coded di file tersebut.
- Tidak ada dependency UI tambahan. Ini menjaga demo ringan dan mudah dipindahkan menjadi template tenant.
- Semua harga menggunakan integer rupiah dan diformat melalui `Intl.NumberFormat("id-ID")`.

## Next implementation: Self Service

Untuk paket Rp300K, pertahankan pengalaman publik `/demo` sebagai fallback yang cepat. Tambahkan lapisan berikut secara bertahap:

1. Buat model tenant, category, menu item, order, dan order item di database.
2. Tambahkan admin terproteksi untuk CRUD kategori, item, harga, ketersediaan, dan urutan tampil.
3. Ganti sumber `items` hard-coded dengan fetch berdasarkan tenant/slug.
4. Buat order endpoint yang memvalidasi harga di server, menyimpan status order, dan menghasilkan Midtrans Snap token.
5. Tambahkan halaman sukses/gagal pembayaran dan webhook untuk sinkronisasi status.
6. Pisahkan branding tenant (nama, logo, warna, alamat, jam buka) dari komponen menu.

Jangan menganggap nilai harga dari browser tepercaya. Total dan detail order harus dihitung ulang di server sebelum membuat transaksi Midtrans.

## Handoff checklist

- [ ] Set DNS `menu.getstore.my.id` ke deployment GetMenu.
- [ ] Tambahkan environment variable Midtrans hanya pada deployment Self Service.
- [ ] Ganti data Kedai Pagi dengan data tenant saat onboarding.
- [ ] Pastikan link `https://menu.getstore.my.id` di GetStore mengarah ke deployment produksi.
- [ ] Uji tampilan pada lebar 360px, 768px, dan desktop.
- [ ] Uji keyboard focus, tombol disabled saat cart kosong, dan modal ringkasan.
- [ ] Tambahkan privacy/terms jika mulai menyimpan data pelanggan atau order.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page or `http://localhost:3000/demo` for the static menu demo.
