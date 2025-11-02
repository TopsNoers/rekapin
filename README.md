# Rekapin - Expense Tracker

Aplikasi Next.js 14 dengan App Router yang terintegrasi dengan Convex untuk tracking pengeluaran melalui upload receipt.

## Fitur

- Upload receipt ke Convex Storage
- Real-time expense list dengan Convex
- Integrasi dengan n8n webhook untuk processing receipt
- Built dengan TypeScript dan Tailwind CSS

## Setup dengan Docker

### Prerequisites
- Docker dan Docker Compose terinstall
- Node.js dan npm terinstall

### Langkah Setup

1. Install dependencies:
```bash
npm install
```

2. Jalankan Convex dengan Docker:
```bash
npm run docker:up
# atau
docker-compose up -d
```

3. Setup Convex untuk development:
```bash
npx convex dev --once --url http://localhost:3210
```
**Catatan**: Command ini akan:
- Menghubungkan ke Convex yang berjalan di Docker
- Menjalankan fungsi Convex di lokal yang terhubung ke Docker backend
- Generate file konfigurasi yang diperlukan

4. Buat file `.env.local` dengan variabel berikut:
```env
NEXT_PUBLIC_CONVEX_URL=http://localhost:3210
N8N_WEBHOOK_URL=<your-n8n-webhook-url>
```

5. Jalankan Next.js development server:
```bash
npm run dev
```

Aplikasi akan tersedia di http://localhost:3000

### Docker Commands

- **Menjalankan Convex container**: `npm run docker:up` atau `docker-compose up -d`
- **Menghentikan container**: `npm run docker:down` atau `docker-compose down`
- **Melihat logs**: `npm run docker:logs` atau `docker-compose logs -f convex`
- **Menghentikan dan menghapus volume**: `docker-compose down -v`

## Setup Alternatif: Convex Cloud Dev

Jika ingin menggunakan Convex Cloud Dev (tanpa Docker):

1. Login ke Convex:
```bash
npx convex login
```

2. Setup Convex Cloud Dev Server:
```bash
npx convex dev
```

3. File `.env.local` akan di-generate otomatis dengan `NEXT_PUBLIC_CONVEX_URL` dari cloud

## Convex Docker Setup

Project ini dikonfigurasi untuk menggunakan **Convex dengan Docker**.
- ✅ Convex backend berjalan di Docker container
- ✅ Data tersimpan di volume Docker (persistent)
- ✅ Port 3210 dan 3211 digunakan untuk Convex API
- ✅ Tidak perlu setup database terpisah

**Catatan Penting**: 
- Pastikan port 3210 dan 3211 tidak digunakan aplikasi lain
- Data akan tersimpan di Docker volume `convex-data`
- Untuk reset data, hapus volume dengan `docker-compose down -v`

## Struktur Project

- `app/page.tsx` - Halaman utama yang menampilkan upload dan list expenses
- `app/actions.ts` - Server Action untuk trigger n8n webhook
- `components/UploadReceipt.tsx` - Komponen upload file
- `components/ExpenseList.tsx` - Komponen daftar expenses real-time
- `convex/expenses.ts` - Convex functions untuk expenses
- `convex/schema.ts` - Schema database Convex

## Catatan

Setelah file di-upload ke Convex Storage, aplikasi akan secara otomatis trigger n8n webhook dengan storageId. n8n workflow diharapkan untuk:
1. Download file dari Convex Storage menggunakan storageId
2. Process file (OCR untuk extract data)
3. Simpan data ke Convex database menggunakan mutation `api.expenses.create`
