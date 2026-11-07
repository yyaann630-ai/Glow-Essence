TOKO AKSESORIS - CARA PAKAI
1. Klik dua kali start.bat (atau di CMD: node server.js). Tidak perlu npm install. Butuh Node.js 22.5+.
2. Pelanggan: http://localhost:3000        Admin: http://localhost:3000/admin  (password awal: admin123)
3. Di admin buka tab "Tampilan": isi nama toko, unggah logo, banner, dan gambar QRIS.
4. Tab "Produk": buat kategori (Gelang, Kalung, dst), lalu tambah produk beserta fotonya.
5. Cara terima pesanan (pilihan pelanggan): Antar ke rumah, Ambil di tempat, atau COD.
   - Antar ke rumah: dibayar QRIS (kalau QRIS sudah diunggah), kalau belum ada QRIS dibayar tunai saat tiba.
   - Ambil di tempat: tunai atau QRIS. Isi "Alamat toko" di tab Tampilan supaya pelanggan tahu lokasinya.
   - COD: tunai saat barang diterima.
6. Tab "Keuangan" (5 hari terakhir): QRIS dicatat saat "Terima pembayaran" ditekan. Tunai (COD / ambil / antar tunai) dicatat saat
   pesanan ditandai selesai, karena uangnya baru diterima saat itu. Pembatalan menghapus catatannya. Tombol "Catat uang keluar" untuk pengeluaran.
7. Suara: efek suara lucu dan musik kotak musik dibuat di browser (tanpa file audio). Pelanggan bisa mematikan lewat tombol di pojok atas.
   Admin: bunyi ting-tong berulang selama ada pesanan yang menunggu konfirmasi.
8. Nomor WhatsApp admin: isi di tab "Tampilan" (mis. 0812xxxx). Pelanggan lalu melihat tombol "Chat Admin" di header, banner, halaman pesanan, dan bagian bawah toko. Kosongkan kalau tidak mau ada tombol chat.
   Tab "Transaksi": semua pesanan 5 hari terakhir per hari, bisa difilter (Berjalan / Selesai / Dibatalkan), lengkap dengan ringkasan dan produk terlaris.
8b. Ulasan: setelah pesanan ditandai selesai, pelanggan melihat form bintang (1-5) + komentar di halaman status pesanan. Satu pesanan satu ulasan.
   Ulasan tampil di bagian bawah halaman toko (rata-rata bintang, nama hanya nama depan). Admin bisa melihat dan menghapus di tab "Ulasan".
9. Ganti password:  set ADMIN_PASSWORD=passwordkamu   lalu   node server.js
10. Tes di HP (satu WiFi): buka http://IP-laptop:3000 (cek lewat ipconfig). Izinkan Node.js di Windows Firewall.
Hosting: butuh hosting Node.js 22.5+ (bukan hosting statis). Data & foto tersimpan di toko.db, jangan sampai terhapus saat deploy.
