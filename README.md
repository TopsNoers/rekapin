# Rekapin - Expense Tracker

Aplikasi Next.js 14 dengan App Router yang terintegrasi dengan Convex untuk tracking pengeluaran melalui upload receipt.

## Fitur

- Upload receipt ke Convex Storage
- Real-time expense list dengan Convex
- Integrasi dengan n8n webhook untuk processing receipt
- Built dengan TypeScript dan Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Setup Convex:
```bash
npx convex dev
```
Ini akan membuat project Convex baru atau menghubungkan ke project yang sudah ada.

3. Buat file `.env.local` dengan variabel berikut:
```
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
N8N_WEBHOOK_URL=<your-n8n-webhook-url>
```

4. Jalankan development server:
```bash
npm run dev
```

Aplikasi akan tersedia di http://localhost:3000

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
